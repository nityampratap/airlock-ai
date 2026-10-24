# AIRLOCK AI — REST API Reference

The AIRLOCK AI backend exposes a RESTful API compliant with OpenAPI 3.1. Interactive API documentation is available locally at `http://localhost:8005/api/v1/docs` (Swagger UI) and `http://localhost:8005/api/v1/redoc` (ReDoc).

---

## 1. Authentication & Session

### `POST /api/v1/auth/login`
Authenticates a user session and returns a JWT access token along with tenant organizations.

**Request Body:**
```json
{
  "email": "secops@airlock.ai",
  "password": "AirlockSec2026!"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
  "token_type": "bearer",
  "user": {
    "id": "usr_airlock_secops_01",
    "email": "secops@airlock.ai",
    "full_name": "Elena Vance"
  },
  "organizations": [
    {
      "id": "org_airlock_labs_01",
      "name": "Airlock Security Labs",
      "slug": "airlock-security-labs",
      "role": "owner",
      "plan_tier": "enterprise"
    }
  ]
}
```

### `POST /api/v1/auth/register`
Creates a new user account, initial organization, default policy, and starter project.

---

## 2. Evaluation Engine & Execution

### `POST /api/v1/evaluations/run`
Executes an adversarial evaluation run through the isolated chambers and Central Policy Broker.

**Request Body:**
```json
{
  "project_id": "prj_autonomous_agent_01",
  "test_case_id": "tc_hardened_broker_02",
  "policy_id": "pol_strict_airgap_01",
  "scenario_type": "scenario_b_hardened"
}
```

**Supported Scenarios:**
- `scenario_b_hardened`: Executes with active broker quarantine, canary shielding, and Ed25519 sealing.
- `scenario_a_vulnerable`: Baseline demonstration mode showing canary leakage in unbrokered environments.
- `scenario_c_evidence`: Cryptographic evidence run with multi-stage hash chaining.

**Response (200 OK):**
```json
{
  "evaluation_id": "4aec882d-a241-473d-b03e-7097440d7c0a",
  "scenario_type": "scenario_b_hardened",
  "status": "completed",
  "unauthorized_request_blocked": true,
  "canary_exfiltrated": false,
  "duration_ms": 25,
  "summary": "HARDENED ASSURANCE: Broker successfully quarantined payload and prevented canary exfiltration.",
  "receipt_id": "d981881a-0e9e-4e9c-...",
  "root_hash": "decb23ba575f3a5aceb9a66db3bd2491a5a2cd99e5f42b11d87038947f8468cd"
}
```

---

## 3. Evidence Vault & Receipts

### `GET /api/v1/evaluations/{eval_id}`
Returns full evaluation metadata, sequential audit events with intermediate hashes, and signed receipt payload.

### `GET /api/v1/receipts/{eval_id}/download`
Downloads the canonical JSON signed receipt for independent offline verification.

### `POST /api/v1/receipts/verify`
Independently verifies a provided receipt JSON against its canonical event hash chain and Ed25519 signature.

---

## 4. Threat Intelligence

### `GET /api/v1/organizations/{org_id}/threat-findings`
Fetches curated threat intelligence findings synchronized via TinyFish.

### `POST /api/v1/threat-findings/{finding_id}/approve?project_id={project_id}`
Approves a sanitized threat finding and converts it into an active evaluation test case.

---

## 5. System Health

### `GET /api/v1/health`
Returns service operational health and the enclave's public key fingerprint.
