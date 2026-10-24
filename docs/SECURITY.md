# AIRLOCK AI — Security Architecture & Cryptographic Trust Model

## 1. Security Architecture Overview

AIRLOCK AI is designed with an explicit principle: **trust nothing across boundaries without broker authorization and cryptographic proof.**

### Implementation Status Matrix
- **Implemented and Tested:**
  - Three-chamber logical environment separation and broker dispatch.
  - Sub-5ms policy enforcement engine (`ALLOW` / `DENY` / `REDACT`).
  - Synthetic canary detection and quarantine (`CANARY-AIRLOCK-SEC-8921`).
  - Canonical SHA-256 event chaining (deterministic JSON serialization).
  - Ed25519 digital signature signing and receipt generation.
  - In-browser and standalone CLI independent verification and tamper rejection.
  - Multi-tenant data segregation with user-to-organization membership verification.
- **Implemented but not independently audited:**
  - Ed25519 private key local file storage in `backend/keys/`.
  - JWT token lifecycle and bcrypt password hashing.
- **Partially Implemented:**
  - TinyFish web research integration (safe curated feed parsing and human approval workflow implemented; live web crawler uses mocked read-only proxy in pilot mode).
- **Planned:**
  - Dedicated hardware security module (HSM) / AWS KMS / Vault integration for root private keys.
  - MicroVM isolation (Firecracker) for untrusted multi-tenant host execution.

---

## 2. Cryptographic Audit Proof Specification

### Canonical Serialization
To guarantee that identical JSON payloads always yield identical SHA-256 hashes across different programming languages and runtimes:
- Keys are sorted lexicographically in ASCII order.
- Extraneous whitespace around delimiters is eliminated (separators: `','` and `':'`).
- Numbers and booleans maintain standard JSON formatting.

### Event Hash Chaining
Let $E_1, E_2, \dots, E_m$ be the sequence of audit events for evaluation run $R$.
- $H_0 = \text{"0"}^{64}$ (64 ASCII zeros)
- For $i = 1 \dots m$:
  $$H_i = \text{SHA-256}(H_{i-1} \parallel \text{CanonicalJSON}(E_i))$$
- $H_{\text{root}} = H_m$

### Digital Signature Seal
The evaluation receipt is sealed using Ed25519:
$$\text{Signature} = \text{Sign}_{\text{Ed25519}}(\text{PrivateKey}, H_{\text{root}})$$

Any alteration to:
1. The sequence of events ($E_i \leftrightarrow E_j$)
2. Any payload field or canary value inside $E_i$
3. Any timestamp or identifier
4. The root hash or signature
immediately causes independent verification to fail with a specific tamper detection alert.

---

## 3. Responsible Disclosure

If you believe you have discovered a vulnerability in AIRLOCK AI's broker logic or cryptographic implementation, contact our security team:
- **Email:** `security@airlock.ai`
- **Response Commitment:** Initial acknowledgment within 24 hours. Remediation roadmap provided within 72 hours.
