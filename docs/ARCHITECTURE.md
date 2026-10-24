# AIRLOCK AI — Technical Architecture Specification

## 1. System Topology Overview

AIRLOCK AI is organized into three isolated operational tiers and an independent verification layer:

```
+----------------------------------------------------------------------------------------------------+
|                                           AIRLOCK AI                                               |
+------------------------------------+-----------------------------------+---------------------------+
|         RED TEAM CHAMBER           |       CENTRAL POLICY BROKER       |    CLIENT MODEL CHAMBER   |
|   - Adversarial Vectors            |   - Tenant Rule Matching (SEC-POL)|   - Private Target Model  |
|   - Quarantined Runner             |   - Sub-5ms Decision Pipeline     |   - Zero Contamination    |
|   - Synthetic Threat Ingestion     |   - Real-time Intermediate Hashing|   - Canary Token Shield   |
+------------------------------------+-----------------+-----------------+---------------------------+
                                                       |
                                                       v
                                     +-----------------------------------+
                                     |          AUDIT COLLECTOR          |
                                     |   - Canonical SHA-256 Hash Chain  |
                                     |   - Ed25519 Hardware Enclave Seal |
                                     |   - Verifiable Receipt Export     |
                                     +-----------------------------------+
```

---

## 2. Component Dissection

### A. Chamber 01 — Red Team Workload
- **Responsibility:** Executes prompt mutations, jailbreak vectors, and adversarial probes.
- **Isolation Constraint:** Has zero direct network or socket visibility to the Client Model or external internet. Outbound communication must target the broker socket exclusively.

### B. Central Policy Broker
- **Responsibility:** Active policy enforcement gateway.
- **Decision Pipeline:**
  1. Receives payload from Chamber 01.
  2. Computes canonical SHA-256 hash of payload.
  3. Checks payload against active organization policies (`block_synthetic_canaries`, `block_raw_prompt_injection`, `max_payload_bytes`).
  4. Returns decision:
     - `ALLOW`: Forwards sanitized packet to Chamber 02.
     - `DENY`: Quarantines payload, logs policy decision violation (`PolicyDecision`), and returns simulated safe stub.
     - `REDACT`: Strips detected sensitive substrings before transit.
  5. Emits structured `AuditEvent` to the sequential audit pipeline.

### C. Chamber 02 — Client Model
- **Responsibility:** Houses private model inference proxies (Claude 3.5 Sonnet, Llama 3.1, or customer self-hosted weights).
- **Isolation Constraint:** Receives only broker-approved packets. Internal system context and synthetic canary tokens are shielded from unmediated memory access.

### D. Audit Collector & Cryptographic Sealer
- **Responsibility:** Records an unalterable chronological record of the evaluation.
- **Chaining Mechanics:**
  - $H_0 = 0x00000000...00$ (64 hexadecimal zeros)
  - For each step $i$: $H_i = \text{SHA-256}(H_{i-1} \parallel \text{canonical\_json}(\text{event}_i))$
  - Final root hash $H_{\text{root}}$ is signed using the enclave's Ed25519 private key:
    $$\text{Signature} = \text{Ed25519\_Sign}(\text{PrivKey}, H_{\text{root}})$$

---

## 3. Technology Stack

| Layer | Technologies | Rationale |
|:---|:---|:---|
| **Frontend & Public Web** | Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lucide | High performance, static prerendering, modern design system |
| **Backend REST Engine** | FastAPI, Pydantic v2, Python 3.11, Uvicorn | Sub-5ms async broker throughput, auto-generated OpenAPI documentation |
| **Persistence** | SQLAlchemy 2.0, SQLite (dev/pilot) / PostgreSQL (production) | ACID transactions, strict relational constraints, tenant-partitioned tables |
| **Cryptography** | Python `cryptography` (Ed25519, SHA-256, PKCS8) | Industry-standard high-performance cryptographic primitives |
| **Independent Verifier** | Standalone Python CLI (`backend/cli_verifier.py`) | Zero external infrastructure dependencies for offline client audits |
