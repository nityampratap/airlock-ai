# AIRLOCK AI

> **"Prove the test. Then trust the result."**

AIRLOCK AI is an enterprise AI evaluation assurance platform designed to solve the critical vulnerability in AI safety testing: **untrusted evaluation environments, contamination between adversarial tests and models, payload leakage, and unverifiable audit records.**

AIRLOCK AI isolates red-team and target-model execution environments, enforces active broker security policies in real-time, shields synthetic canary tokens from exfiltration, and produces cryptographically verifiable audit evidence sealed with Ed25519 digital signatures and SHA-256 canonical event chaining.

---

## Key Capabilities

1. **Three-Chamber Evaluation Architecture**
   - **Chamber 01 (Red Team):** Quarantined execution of prompt injection attacks, jailbreaks, and adversarial vectors.
   - **Central Policy Broker:** Active mediation gateway evaluating rules (ALLOW, DENY, REDACT) in sub-5ms latency.
   - **Chamber 02 (Client Model):** Protected target model weights and private context with zero cross-tenant contamination.
2. **Cryptographic Audit Assurance**
   - Sequential audit events chained via canonical SHA-256 (`H_n = SHA-256(H_{n-1} || canonical_json(event_n))`).
   - Terminal root hash sealed with Ed25519 digital signature.
   - Portable, zero-dependency offline verification via `backend/cli_verifier.py`.
3. **Canary Protection & Containment**
   - Deterministic synthetic canary tracking (`CANARY-AIRLOCK-SEC-8921`).
   - Active quarantine prevents canary extraction by red-team probes.
4. **Source-Backed Threat Intelligence**
   - Integrated TinyFish intelligence pipeline ingesting public research from OWASP GenAI, MITRE ATLAS, and NIST AI RMF.
   - Strict read-only quarantine: public vectors require human review before converting to safe test cases.

---

## Quickstart

### Prerequisites
- Node.js 18+ (tested on Node v22.20)
- Python 3.10+ (tested on Python 3.11)

### 1. Launch Backend API (Port 8005)
```bash
# Setup Python virtual environment
python -m venv .venv
.venv/Scripts/activate     # Windows (.venv\Scripts\activate)
pip install -r backend/requirements.txt

# Run backend service
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8005
```

### 2. Launch Next.js Application (Port 3000)
```bash
cd frontend
npm install
npm run dev
# Or production build:
npm run build
npm run start -- -p 3000
```

Visit `http://localhost:3000` to access the public website, or click **"Launch Console"** to enter the authenticated SaaS application.

### Demo Credentials
- **Email:** `secops@airlock.ai`
- **Password:** `AirlockSec2026!`
*(Or click "One-Click Preload" on the login screen to enter immediately)*

---

## Verifying an Audit Receipt Offline

Any completed evaluation receipt can be verified independently with zero cloud dependencies using the standalone Python CLI verifier:

```bash
# Verify untampered receipt
python backend/cli_verifier.py sample_receipt.json

# Test simulated tamper rejection
python backend/cli_verifier.py sample_receipt.json --tamper
```

---

## Documentation Index

For complete technical and commercial manuals, see the [`docs/`](file:///c:/Projects/Airlock_ai/docs/) directory:

- [PRODUCT.md](file:///c:/Projects/Airlock_ai/docs/PRODUCT.md) — Product identity, buyer personas, market problem, and value propositions.
- [ARCHITECTURE.md](file:///c:/Projects/Airlock_ai/docs/ARCHITECTURE.md) — Three-chamber system topology, data flow, and broker mechanics.
- [SECURITY.md](file:///c:/Projects/Airlock_ai/docs/SECURITY.md) — Security boundaries, isolation guarantees, and cryptographic specifications.
- [THREAT_MODEL.md](file:///c:/Projects/Airlock_ai/docs/THREAT_MODEL.md) — Attacker models, attack vectors, mitigations, and residual risks.
- [API.md](file:///c:/Projects/Airlock_ai/docs/API.md) — REST API reference, endpoints, schemas, and authentication.
- [DEPLOYMENT.md](file:///c:/Projects/Airlock_ai/docs/DEPLOYMENT.md) — Pilot, multi-container, and enterprise airgapped deployment guides.
- [BILLING.md](file:///c:/Projects/Airlock_ai/docs/BILLING.md) — Commercial pricing tiers, entitlements, and Stripe integration.
- [TESTING.md](file:///c:/Projects/Airlock_ai/docs/TESTING.md) — Automated test suite, cryptographic tests, and scenario verification.
- [KNOWN_LIMITATIONS.md](file:///c:/Projects/Airlock_ai/docs/KNOWN_LIMITATIONS.md) — Transparent disclosure of current architectural boundaries.
- [ROADMAP.md](file:///c:/Projects/Airlock_ai/docs/ROADMAP.md) — Implementation status matrix and development roadmap.
