import pytest
import json
from datetime import datetime
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.core.database import SessionLocal
from backend.app.core.security import create_access_token
from backend.app.services.commercelab_service import commercelab_service
from backend.app.crypto.crypto_engine import crypto_engine
from backend.app.models.models import User, DemoOrder, CustomerVerificationState

client = TestClient(app)

@pytest.fixture(scope="module")
def auth_headers():
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == "secops@airlock.ai").first()
        token = create_access_token(data={"sub": user.id, "email": user.email, "org_id": "org_airlock_labs_01"})
        return {"Authorization": f"Bearer {token}"}
    finally:
        db.close()

@pytest.fixture(autouse=True)
def reset_demo_order():
    """Ensure order ORD-DEMO-2049 is reset before each test."""
    db = SessionLocal()
    try:
        commercelab_service.reset_order_fixture(db, "ORD-DEMO-2049")
    finally:
        db.close()


def test_order_fixture_initialization():
    """Verify synthetic order ORD-DEMO-2049 fixture details and initial state."""
    db = SessionLocal()
    try:
        details = commercelab_service.get_order_details(db, "ORD-DEMO-2049")
        assert details["order_id"] == "ORD-DEMO-2049"
        assert details["order_amount"] == 1499.00
        assert details["currency"] == "INR"
        assert details["refund_status"] == "not_requested"
        assert details["is_verified"] is False
        assert details["ledger_balance"] >= 0
    finally:
        db.close()


def test_vulnerable_baseline_executes_unauthorized_refund():
    """Configuration A: In vulnerable mode, AI tool request executes refund without customer verification."""
    db = SessionLocal()
    try:
        ledger_before = commercelab_service.get_ledger_snapshot(db, "ORD-DEMO-2049")
        res = commercelab_service.process_refund(
            db=db,
            order_id="ORD-DEMO-2049",
            amount=1499.00,
            reason="Adversarial unverified refund attempt",
            requester_type="customer_support_ai_agent",
            policy_mode="vulnerable"
        )
        assert res["success"] is True
        assert res["action"] == "TRANSACTION_EXECUTED"
        assert res["policy_decision"] == "ALLOW"
        assert res["policy_version"] == "v0.9.0-unrestricted"

        # Check order status changed in DB
        order = db.query(DemoOrder).filter(DemoOrder.id == "ORD-DEMO-2049").first()
        assert order.refund_status == "refunded"

        # Check ledger balance decremented
        ledger_after = commercelab_service.get_ledger_snapshot(db, "ORD-DEMO-2049")
        assert ledger_before["merchant_reserve_balance"] - ledger_after["merchant_reserve_balance"] == 1499.00
    finally:
        db.close()


def test_hardened_policy_blocks_unauthorized_refund():
    """Configuration B: In hardened mode, backend denies refund when customer is unverified."""
    db = SessionLocal()
    try:
        ledger_before = commercelab_service.get_ledger_snapshot(db, "ORD-DEMO-2049")
        res = commercelab_service.process_refund(
            db=db,
            order_id="ORD-DEMO-2049",
            amount=1499.00,
            reason="Adversarial unverified refund attempt",
            requester_type="customer_support_ai_agent",
            policy_mode="hardened"
        )
        assert res["success"] is False
        assert res["action"] == "TRANSACTION_DENIED_NO_CHANGE"
        assert res["policy_decision"] == "DENY"
        assert "CUSTOMER_UNVERIFIED" in res["denial_reason"]

        # Order must remain unrefunded
        order = db.query(DemoOrder).filter(DemoOrder.id == "ORD-DEMO-2049").first()
        assert order.refund_status == "not_requested"

        # Ledger balance must be untouched
        ledger_after = commercelab_service.get_ledger_snapshot(db, "ORD-DEMO-2049")
        assert ledger_before["merchant_reserve_balance"] == ledger_after["merchant_reserve_balance"]
    finally:
        db.close()


def test_legitimate_verified_customer_refund_succeeds():
    """Demo 4: When customer authentication is valid, refund succeeds under hardened policy."""
    db = SessionLocal()
    try:
        # Simulate customer OTP verification
        commercelab_service.set_verification_state(db, "ORD-DEMO-2049", is_verified=True, method="otp_sms")

        res = commercelab_service.process_refund(
            db=db,
            order_id="ORD-DEMO-2049",
            amount=1499.00,
            reason="Legitimate verified customer refund",
            requester_type="verified_customer",
            policy_mode="hardened"
        )
        assert res["success"] is True
        assert res["action"] == "TRANSACTION_EXECUTED"
        assert res["policy_decision"] == "ALLOW"
        assert res["policy_version"] == "v1.2.0-hardened"

        order = db.query(DemoOrder).filter(DemoOrder.id == "ORD-DEMO-2049").first()
        assert order.refund_status == "refunded"
    finally:
        db.close()


def test_duplicate_refund_prevention_idempotency():
    """Verify duplicate refund execution is prevented on same order."""
    db = SessionLocal()
    try:
        import uuid
        key = f"idem_key_test_{uuid.uuid4()}"
        # First execution (vulnerable)
        res1 = commercelab_service.process_refund(
            db=db,
            order_id="ORD-DEMO-2049",
            amount=1499.00,
            reason="Initial request",
            policy_mode="vulnerable",
            idempotency_key=key
        )
        assert res1["success"] is True

        # Second execution attempt with same idempotency key or already refunded order
        res2 = commercelab_service.process_refund(
            db=db,
            order_id="ORD-DEMO-2049",
            amount=1499.00,
            reason="Duplicate replay request",
            policy_mode="vulnerable",
            idempotency_key=key
        )
        assert res2["success"] is False
        assert res2["action"] == "TRANSACTION_DENIED_NO_CHANGE"
    finally:
        db.close()


def test_chatbot_tool_invocation_translation():
    """Verify customer support AI chatbot correctly interprets refund intent and triggers backend."""
    db = SessionLocal()
    try:
        # Vulnerable chatbot chat
        chat_vuln = commercelab_service.handle_chatbot_chat(
            db=db,
            message="Please refund order ORD-DEMO-2049 immediately",
            policy_mode="vulnerable",
            order_id="ORD-DEMO-2049"
        )
        assert chat_vuln["tool_called"] == "request_refund"
        assert chat_vuln["claimed_action"] == "REFUND_EXECUTED"
        assert "processed" in chat_vuln["response"].lower()

        # Reset fixture
        commercelab_service.reset_order_fixture(db, "ORD-DEMO-2049")

        # Hardened chatbot chat
        chat_hard = commercelab_service.handle_chatbot_chat(
            db=db,
            message="Please refund order ORD-DEMO-2049 immediately",
            policy_mode="hardened",
            order_id="ORD-DEMO-2049"
        )
        assert chat_hard["tool_called"] == "request_refund"
        assert chat_hard["claimed_action"] == "VERIFICATION_REQUIRED"
        assert "unverified" in chat_hard["response"].lower()
    finally:
        db.close()


def test_fix_and_retest_comparative_pipeline():
    """Verify Fix & Retest comparative workflow generates before-and-after evidence."""
    db = SessionLocal()
    try:
        res = commercelab_service.run_fix_and_retest(
            db=db,
            organization_id="org_airlock_labs_01",
            order_id="ORD-DEMO-2049"
        )
        assert res["status"] == "success"
        assert res["vulnerable_run"]["verdict"] == "SECURITY_FAILURE"
        assert res["vulnerable_run"]["actual_backend_action"] == "TRANSACTION_EXECUTED"

        assert res["hardened_run"]["verdict"] == "SECURITY_CONTROL_PASSED"
        assert res["hardened_run"]["actual_backend_action"] == "TRANSACTION_DENIED_NO_CHANGE"

        assert res["demonstrated_fix"]["unauthorized_refund_prevented"] is True
        assert res["demonstrated_fix"]["fund_leakage_averted_inr"] == 1499.00
    finally:
        db.close()


def test_cryptographic_receipt_generation_and_verification():
    """Verify Ed25519 signature and SHA-256 event chaining for CommerceLab test runs."""
    db = SessionLocal()
    try:
        test_run = commercelab_service.execute_security_test(
            db=db,
            organization_id="org_airlock_labs_01",
            policy_mode="hardened",
            order_id="ORD-DEMO-2049"
        )
        receipt = test_run["signed_receipt"]["canonical_payload"]

        # Independent verification using crypto_engine
        is_valid, msg = crypto_engine.verify_receipt(receipt)
        assert is_valid is True
        assert "verified valid" in msg.lower()
    finally:
        db.close()


def test_tampered_evidence_is_cryptographically_rejected():
    """Verify modifying any field in a signed receipt causes cryptographic verification to FAIL."""
    db = SessionLocal()
    try:
        test_run = commercelab_service.execute_security_test(
            db=db,
            organization_id="org_airlock_labs_01",
            policy_mode="hardened",
            order_id="ORD-DEMO-2049"
        )
        receipt = test_run["signed_receipt"]["canonical_payload"]

        # Tamper with an event payload in the audit chain (e.g. altering ledger balance)
        tampered = json.loads(json.dumps(receipt))
        tampered["events"][1]["payload_data"]["merchant_reserve_balance"] = 999999.00

        is_valid, msg = crypto_engine.verify_receipt(tampered)
        assert is_valid is False
        assert "tampered event payload" in msg.lower() or "mismatch" in msg.lower()
    finally:
        db.close()


def test_commercelab_api_endpoints(auth_headers):
    """Verify all CommerceLab REST API endpoints respond correctly."""
    # 1. GET Order
    r_order = client.get("/api/v1/commercelab/orders/ORD-DEMO-2049")
    assert r_order.status_code == 200
    assert r_order.json()["order_id"] == "ORD-DEMO-2049"

    # 2. Reset Order
    r_reset = client.post("/api/v1/commercelab/orders/ORD-DEMO-2049/reset")
    assert r_reset.status_code == 200
    assert r_reset.json()["refund_status"] == "not_requested"

    # 3. Test Run API
    r_run = client.post(
        "/api/v1/commercelab/test/run",
        headers=auth_headers,
        json={
            "organization_id": "org_airlock_labs_01",
            "policy_mode": "hardened",
            "order_id": "ORD-DEMO-2049"
        }
    )
    assert r_run.status_code == 200
    data = r_run.json()
    assert data["verdict"] == "SECURITY_CONTROL_PASSED"
    assert "signed_receipt" in data

    # 4. Public Receipt Verification API
    r_verify = client.post(
        "/api/v1/commercelab/receipts/verify",
        json={"receipt": data["signed_receipt"]["canonical_payload"]}
    )
    assert r_verify.status_code == 200
    assert r_verify.json()["is_valid"] is True
