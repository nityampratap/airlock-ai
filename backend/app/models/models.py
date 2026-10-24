import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Text, Boolean, Integer, Float, ForeignKey, DateTime, JSON
)
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

def gen_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    memberships = relationship("OrganizationMember", back_populates="user", cascade="all, delete-orphan")


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    plan_tier = Column(String(50), default="professional")  # starter, professional, enterprise
    is_hardened_enforced = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    members = relationship("OrganizationMember", back_populates="organization", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="organization", cascade="all, delete-orphan")
    policies = relationship("SecurityPolicy", back_populates="organization", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="organization", cascade="all, delete-orphan")


class OrganizationMember(Base):
    __tablename__ = "organization_members"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(50), default="member")  # owner, admin, security_engineer, auditor, member
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="members")
    user = relationship("User", back_populates="memberships")


class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    target_model_name = Column(String(255), default="llama-3.1-70b-instruct")
    target_model_endpoint = Column(String(512), default="https://api.model-provider.internal/v1")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="projects")
    evaluations = relationship("EvaluationRun", back_populates="project", cascade="all, delete-orphan")
    test_cases = relationship("TestCase", back_populates="project", cascade="all, delete-orphan")


class SecurityPolicy(Base):
    __tablename__ = "security_policies"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    version = Column(Integer, default=1)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Specific policy toggles
    network_isolation_level = Column(String(50), default="airgapped_broker_only") # airgapped_broker_only, monitored_egress, unconstrained_debug
    block_synthetic_canaries = Column(Boolean, default=True)
    block_raw_prompt_injection = Column(Boolean, default=True)
    block_tool_call_exfiltration = Column(Boolean, default=True)
    redact_sensitive_payloads = Column(Boolean, default=True)
    max_payload_bytes = Column(Integer, default=32768)
    evaluation_timeout_sec = Column(Integer, default=180)
    requires_approval_for_live_eval = Column(Boolean, default=True)
    
    raw_rules = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="policies")
    policy_decisions = relationship("PolicyDecision", back_populates="policy")


class ThreatFinding(Base):
    __tablename__ = "threat_findings"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # Prompt Injection, Canary Leakage, Jailbreak, Unsafe Tool Use
    severity = Column(String(20), default="HIGH")    # CRITICAL, HIGH, MEDIUM, LOW
    source_name = Column(String(255), nullable=False) # OWASP GenAI, TinyFish Web Research, CVE
    source_url = Column(String(512), nullable=False)
    description = Column(Text, nullable=False)
    sanitized_vector = Column(Text, nullable=False)
    evidence_excerpt = Column(Text, nullable=True)
    suggested_defensive_control = Column(Text, nullable=True)
    source_domain = Column(String(255), nullable=True)
    tinyfish_task_id = Column(String(255), nullable=True)
    streaming_url = Column(String(512), nullable=True)
    raw_extraction = Column(JSON, nullable=True)
    review_status = Column(String(50), default="pending_review") # pending_review, approved, rejected
    retrieval_timestamp = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)


class ThreatLoopRun(Base):
    __tablename__ = "threatloop_runs"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=True)

    # 1. Discovery
    source_url = Column(String(512), nullable=False)
    source_domain = Column(String(255), nullable=False)
    goal = Column(Text, nullable=False)
    tinyfish_task_id = Column(String(255), nullable=True)
    streaming_url = Column(String(512), nullable=True)
    is_live_agent = Column(Boolean, default=True)
    discovery_status = Column(String(50), default="completed") # streaming, completed, failed

    # 2. Finding & Review
    finding_id = Column(String(36), ForeignKey("threat_findings.id", ondelete="SET NULL"), nullable=True)
    extracted_data = Column(JSON, nullable=True)
    review_status = Column(String(50), default="pending_review") # pending_review, approved, rejected
    reviewed_by = Column(String(255), nullable=True)
    review_notes = Column(Text, nullable=True)

    # 3. Safe Test Mapping
    template_id = Column(String(100), nullable=True)
    test_case_id = Column(String(36), ForeignKey("test_cases.id", ondelete="SET NULL"), nullable=True)

    # 4. Before-and-After Evaluation
    vulnerable_eval_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="SET NULL"), nullable=True)
    hardened_eval_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="SET NULL"), nullable=True)

    # 5. Staging Browser Testing
    staging_target_url = Column(String(512), nullable=True)
    browser_test_status = Column(String(50), nullable=True) # pending, running, completed, failed
    browser_observed_response = Column(Text, nullable=True)
    browser_canary_detected = Column(Boolean, default=False)

    # 6. Cryptographic Evidence
    receipt_id = Column(String(36), ForeignKey("signed_receipts.id", ondelete="SET NULL"), nullable=True)
    verification_status = Column(String(50), default="unverified")

    # 7. Upstream Drift
    source_content_hash = Column(String(64), nullable=True)
    drift_detected = Column(Boolean, default=False)
    drift_last_checked = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class TestCase(Base):
    __tablename__ = "test_cases"
    __test__ = False

    id = Column(String(36), primary_key=True, default=gen_uuid)
    project_id = Column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    finding_id = Column(String(36), ForeignKey("threat_findings.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    adversarial_payload = Column(Text, nullable=False)
    expected_behavior = Column(Text, nullable=False)
    synthetic_canary = Column(String(255), nullable=True) # e.g. "CANARY-AIRLOCK-SEC-8921"
    is_approved = Column(Boolean, default=True)
    approved_by = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="test_cases")
    versions = relationship("TestCaseVersion", back_populates="test_case", cascade="all, delete-orphan")


class TestCaseVersion(Base):
    __tablename__ = "test_case_versions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    test_case_id = Column(String(36), ForeignKey("test_cases.id", ondelete="CASCADE"), nullable=False)
    version_number = Column(Integer, default=1)
    payload_snapshot = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    test_case = relationship("TestCase", back_populates="versions")


class EvaluationRun(Base):
    __tablename__ = "evaluation_runs"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    project_id = Column(String(36), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    test_case_id = Column(String(36), ForeignKey("test_cases.id", ondelete="CASCADE"), nullable=False)
    policy_id = Column(String(36), ForeignKey("security_policies.id", ondelete="SET NULL"), nullable=True)
    scenario_type = Column(String(50), default="scenario_b_hardened") # scenario_a_vulnerable, scenario_b_hardened, scenario_c_evidence
    status = Column(String(50), default="pending") # pending, initializing, running, completed, denied, failed
    
    # Results & Metrics
    canary_exfiltrated = Column(Boolean, default=False)
    unauthorized_request_blocked = Column(Boolean, default=False)
    red_team_payload_hash = Column(String(64), nullable=True)
    client_response_hash = Column(String(64), nullable=True)
    duration_ms = Column(Integer, default=0)
    summary = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    project = relationship("Project", back_populates="evaluations")
    audit_events = relationship("AuditEvent", back_populates="evaluation", cascade="all, delete-orphan")
    signed_receipt = relationship("SignedReceipt", back_populates="evaluation", uselist=False, cascade="all, delete-orphan")
    policy_decisions = relationship("PolicyDecision", back_populates="evaluation", cascade="all, delete-orphan")


class PolicyDecision(Base):
    __tablename__ = "policy_decisions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    evaluation_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="CASCADE"), nullable=False)
    policy_id = Column(String(36), ForeignKey("security_policies.id", ondelete="SET NULL"), nullable=True)
    action_attempted = Column(String(100), nullable=False)
    decision = Column(String(50), nullable=False) # ALLOW, DENY, REDACT
    reason = Column(Text, nullable=False)
    enforced_at = Column(DateTime, default=datetime.utcnow)

    evaluation = relationship("EvaluationRun", back_populates="policy_decisions")
    policy = relationship("SecurityPolicy", back_populates="policy_decisions")


class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    evaluation_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="CASCADE"), nullable=False)
    sequence_index = Column(Integer, nullable=False) # 1, 2, 3...
    event_type = Column(String(100), nullable=False) # EVAL_INIT, PAYLOAD_INSPECTION, POLICY_DECISION, BROKER_TRANSIT, CANARY_PROBE, EVAL_SEAL
    payload_data = Column(JSON, nullable=False)
    previous_hash = Column(String(64), nullable=False)
    current_hash = Column(String(64), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    evaluation = relationship("EvaluationRun", back_populates="audit_events")


class SignedReceipt(Base):
    __tablename__ = "signed_receipts"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    evaluation_id = Column(String(36), ForeignKey("evaluation_runs.id", ondelete="CASCADE"), unique=True, nullable=False)
    receipt_version = Column(String(20), default="1.0.0")
    algorithm = Column(String(50), default="Ed25519-SHA256")
    public_key_hex = Column(String(128), nullable=False)
    root_hash = Column(String(64), nullable=False)
    signature_hex = Column(Text, nullable=False)
    canonical_payload_json = Column(Text, nullable=False)
    verification_status = Column(String(50), default="VERIFIED_VALID")
    created_at = Column(DateTime, default=datetime.utcnow)

    evaluation = relationship("EvaluationRun", back_populates="signed_receipt")


class IntegrationConfiguration(Base):
    __tablename__ = "integration_configurations"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    service_name = Column(String(100), nullable=False) # TinyFish, Webhook, SIEM_Export, ModelProvider
    is_enabled = Column(Boolean, default=False)
    config_data = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    plan_tier = Column(String(50), default="professional")
    status = Column(String(50), default="active") # active, trialing, past_due, canceled
    monthly_evaluation_limit = Column(Integer, default=500)
    current_period_evaluations_used = Column(Integer, default=0)
    stripe_customer_id = Column(String(100), nullable=True)
    stripe_subscription_id = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="subscriptions")


class ContactLead(Base):
    __tablename__ = "contact_leads"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    name = Column(String(255), nullable=False)
    work_email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    organization_size = Column(String(100), nullable=False)
    primary_use_case = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="new")
    created_at = Column(DateTime, default=datetime.utcnow)


# =====================================================================
# AIRLOCK COMMERCELAB — AUTONOMOUS BUSINESS-ACTION SECURITY LAB MODELS
# =====================================================================

class DemoCustomer(Base):
    """Synthetic customer entity for Northstar Store security testing."""
    __tablename__ = "demo_customers"

    id = Column(String(64), primary_key=True)  # e.g. cust_demo_01
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    account_tier = Column(String(50), default="standard")
    created_at = Column(DateTime, default=datetime.utcnow)

    orders = relationship("DemoOrder", back_populates="customer")


class DemoOrder(Base):
    """Synthetic e-commerce order under test (e.g. ORD-DEMO-2049, ₹1,499)."""
    __tablename__ = "demo_orders"

    id = Column(String(64), primary_key=True)  # e.g. ORD-DEMO-2049
    customer_id = Column(String(64), ForeignKey("demo_customers.id"), nullable=False)
    customer_name = Column(String(255), nullable=False)
    order_amount = Column(Float, nullable=False, default=1499.00)
    currency = Column(String(10), default="INR")
    currency_symbol = Column(String(10), default="₹")
    payment_status = Column(String(50), default="paid")  # paid, refunded, partially_refunded
    refund_status = Column(String(50), default="not_requested")  # not_requested, pending, refunded, denied
    items_summary = Column(Text, default="Apex Wireless Noise-Cancelling Headphones (Midnight Black)")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer = relationship("DemoCustomer", back_populates="orders")
    verification_state = relationship("CustomerVerificationState", back_populates="order", uselist=False)
    refund_requests = relationship("RefundRequest", back_populates="order")
    refund_transactions = relationship("RefundTransaction", back_populates="order")


class CustomerVerificationState(Base):
    """Independent customer authentication/verification state for an order session."""
    __tablename__ = "customer_verification_states"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    order_id = Column(String(64), ForeignKey("demo_orders.id", ondelete="CASCADE"), unique=True, nullable=False)
    customer_id = Column(String(64), ForeignKey("demo_customers.id"), nullable=False)
    is_verified = Column(Boolean, default=False)
    verification_method = Column(String(50), default="none")  # none, otp_sms, id_document, biometric
    session_token = Column(String(128), nullable=True)
    verified_at = Column(DateTime, nullable=True)
    expires_at = Column(DateTime, nullable=True)

    order = relationship("DemoOrder", back_populates="verification_state")


class RefundRequest(Base):
    """Tracks incoming refund requests from customer or AI chatbot tool calls."""
    __tablename__ = "refund_requests"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    order_id = Column(String(64), ForeignKey("demo_orders.id"), nullable=False)
    customer_id = Column(String(64), nullable=False)
    requested_amount = Column(Float, nullable=False)
    reason = Column(Text, nullable=False)
    requester_type = Column(String(50), default="customer_support_ai_agent")  # customer_support_ai_agent, verified_customer, unauthenticated_web_client
    status = Column(String(50), default="pending")  # pending, authorized, denied, executed
    idempotency_key = Column(String(128), unique=True, index=True, nullable=False)
    policy_mode = Column(String(50), default="vulnerable")  # vulnerable, hardened
    created_at = Column(DateTime, default=datetime.utcnow)

    order = relationship("DemoOrder", back_populates="refund_requests")
    transaction = relationship("RefundTransaction", back_populates="refund_request", uselist=False)


class RefundTransaction(Base):
    """Immutable synthetic financial ledger transaction recording executed refunds."""
    __tablename__ = "refund_transactions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    refund_request_id = Column(String(36), ForeignKey("refund_requests.id"), nullable=False)
    order_id = Column(String(64), ForeignKey("demo_orders.id"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String(50), default="executed")  # executed, failed
    ledger_account = Column(String(100), default="SYNTHETIC_MERCHANT_RESERVE_INR")
    balance_before = Column(Float, nullable=False)
    balance_after = Column(Float, nullable=False)
    reference_code = Column(String(64), nullable=False)
    executed_at = Column(DateTime, default=datetime.utcnow)

    order = relationship("DemoOrder", back_populates="refund_transactions")
    refund_request = relationship("RefundRequest", back_populates="transaction")


class RefundPolicyDecision(Base):
    """Audit log of policy decisions made on refund requests."""
    __tablename__ = "refund_policy_decisions"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    test_run_id = Column(String(36), nullable=True)
    order_id = Column(String(64), nullable=False)
    policy_mode = Column(String(50), nullable=False)  # vulnerable, hardened
    policy_version = Column(String(50), default="v1.0.0-hardened")
    decision = Column(String(50), nullable=False)  # ALLOW, DENY
    checks_performed = Column(JSON, default=dict)  # {"order_exists": true, "customer_verified": false, ...}
    denial_reason = Column(Text, nullable=True)
    enforced_at = Column(DateTime, default=datetime.utcnow)


class SecurityTestRun(Base):
    """End-to-end autonomous business-action security test execution record."""
    __tablename__ = "security_test_runs"

    id = Column(String(36), primary_key=True, default=gen_uuid)
    organization_id = Column(String(36), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    scenario_id = Column(String(100), default="SCENARIO_REFUND_UNAUTHORIZED_01")
    order_id = Column(String(64), nullable=False)
    policy_mode = Column(String(50), default="vulnerable")  # vulnerable, hardened
    policy_version = Column(String(50), default="v0.9.0-unrestricted")
    tinyfish_task_id = Column(String(255), nullable=True)
    is_live_agent = Column(Boolean, default=False)
    browser_session_url = Column(String(512), nullable=True)
    test_prompt = Column(Text, nullable=False)
    chatbot_observed_response = Column(Text, nullable=True)
    chatbot_claimed_action = Column(String(50), nullable=True)  # REFUND_EXECUTED, REFUND_DENIED, VERIFICATION_REQUIRED, INCONCLUSIVE
    actual_backend_action = Column(String(50), nullable=True)   # TRANSACTION_EXECUTED, TRANSACTION_DENIED_NO_CHANGE
    verdict = Column(String(50), nullable=False)  # SECURITY_FAILURE, SECURITY_CONTROL_PASSED, RESPONSE_INTEGRITY_ISSUE, INCONCLUSIVE
    before_ledger_snapshot = Column(JSON, nullable=False)
    after_ledger_snapshot = Column(JSON, nullable=False)
    evidence_summary = Column(Text, nullable=True)
    receipt_id = Column(String(36), ForeignKey("signed_receipts.id", ondelete="SET NULL"), nullable=True)
    is_regression_test = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

