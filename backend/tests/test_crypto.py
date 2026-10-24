import pytest
import json
from backend.app.crypto.crypto_engine import crypto_engine

def test_canonical_json_determinism():
    d1 = {"b": 2, "a": 1, "nested": {"z": 9, "y": 8}}
    d2 = {"nested": {"y": 8, "z": 9}, "a": 1, "b": 2}
    c1 = crypto_engine.canonical_json(d1)
    c2 = crypto_engine.canonical_json(d2)
    assert c1 == c2
    assert " " not in c1.replace('":', '":')

def test_event_hash_chaining():
    h0 = "0" * 64
    event_1 = {"type": "INIT", "user": "alice"}
    h1 = crypto_engine.compute_event_hash(h0, event_1)
    assert len(h1) == 64
    assert h1 != h0

    event_2 = {"type": "PROBE", "status": "DENIED"}
    h2 = crypto_engine.compute_event_hash(h1, event_2)
    assert len(h2) == 64
    assert h2 != h1

def test_signature_and_receipt_verification():
    h0 = "0" * 64
    events = [
        {
            "sequence_index": 1,
            "event_type": "INIT",
            "payload_data": {"action": "start"},
            "previous_hash": h0,
            "current_hash": crypto_engine.compute_event_hash(h0, {"action": "start"})
        }
    ]
    h1 = events[0]["current_hash"]
    events.append({
        "sequence_index": 2,
        "event_type": "SEAL",
        "payload_data": {"status": "success"},
        "previous_hash": h1,
        "current_hash": crypto_engine.compute_event_hash(h1, {"status": "success"})
    })
    root_hash = events[1]["current_hash"]
    sig = crypto_engine.sign_root_hash(root_hash)

    receipt = {
        "evaluation_id": "eval_test_123",
        "root_hash": root_hash,
        "public_key_hex": crypto_engine.public_key_hex,
        "signature_hex": sig,
        "events": events
    }

    # Verify valid receipt
    is_valid, msg = crypto_engine.verify_receipt(receipt)
    assert is_valid is True

    # Tamper with an event payload
    tampered_receipt = json.loads(json.dumps(receipt))
    tampered_receipt["events"][0]["payload_data"]["action"] = "tampered_malicious_start"
    is_valid_tampered, tamper_msg = crypto_engine.verify_receipt(tampered_receipt)
    assert is_valid_tampered is False
    assert "tamper" in tamper_msg.lower() or "mismatch" in tamper_msg.lower()

    # Tamper with root hash
    tampered_receipt_2 = json.loads(json.dumps(receipt))
    tampered_receipt_2["root_hash"] = "f" * 64
    is_valid_tampered_2, _ = crypto_engine.verify_receipt(tampered_receipt_2)
    assert is_valid_tampered_2 is False
