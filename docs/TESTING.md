# AIRLOCK AI — Automated Test Suite & Validation Strategy

## 1. Test Architecture

The AIRLOCK AI test suite is divided into three automated verification tiers:
1. **Cryptographic Integrity & Tamper Rejection Tests (`backend/tests/test_crypto.py`)**
2. **Isolation Scenario & Broker Enforcement Tests (`backend/tests/test_isolation_scenarios.py`)**
3. **Authentication, Tenant Isolation & RBAC Tests (`backend/tests/test_auth_rbac.py`)**

---

## 2. Running Automated Tests

To execute the full backend test suite:
```bash
# From workspace root with activated venv:
$env:PYTHONPATH="."
.venv/Scripts/pytest backend/tests -v
```

### Measured Test Results (100% Passing):
```
backend/tests/test_auth_rbac.py::test_health_endpoint PASSED             [ 11%]
backend/tests/test_auth_rbac.py::test_login_demo_user PASSED             [ 22%]
backend/tests/test_auth_rbac.py::test_invalid_login PASSED               [ 33%]
backend/tests/test_auth_rbac.py::test_register_new_tenant PASSED         [ 44%]
backend/tests/test_crypto.py::test_canonical_json_determinism PASSED     [ 55%]
backend/tests/test_crypto.py::test_event_hash_chaining PASSED            [ 66%]
backend/tests/test_crypto.py::test_signature_and_receipt_verification PASSED [ 77%]
backend/tests/test_isolation_scenarios.py::test_scenario_a_vulnerable_canary_leak PASSED [ 88%]
backend/tests/test_isolation_scenarios.py::test_scenario_b_hardened_broker_blocks_canary PASSED [100%]

======================== 9 passed in 2.63s ========================
```

---

## 3. Core Acceptance Scenario Validations

### Scenario A — Vulnerable Demonstration
- **Objective:** Demonstrates that in an unbrokered baseline environment, synthetic canary tokens leak to adversarial testers.
- **Verification:** `test_scenario_a_vulnerable_canary_leak` confirms that `canary_exfiltrated == True` and `unauthorized_request_blocked == False`.

### Scenario B — Hardened Broker Execution
- **Objective:** Proves that AIRLOCK's Central Policy Broker intercepts canary probes in real-time, denies the unauthorized action (`decision == "DENY"`), preserves clean model isolation, and signs the completed run.
- **Verification:** `test_scenario_b_hardened_broker_blocks_canary` confirms `canary_exfiltrated == False`, `unauthorized_request_blocked == True`, and verifies the resulting Ed25519 digital receipt.

### Scenario C — Independent Evidence Verification & Tamper Detection
- **Objective:** Proves that modifying any field in an evaluation receipt causes independent verification to fail.
- **Verification:** `test_signature_and_receipt_verification` confirms that untampered receipts pass verification, and any injected mutation in an event payload or root hash is rejected immediately.
- **CLI Verifier Execution:**
  ```bash
  python backend/cli_verifier.py sample_receipt.json          # Returns EXIT 0 (VALID)
  python backend/cli_verifier.py sample_receipt.json --tamper # Returns EXIT 2 (TAMPER DETECTED)
  ```
