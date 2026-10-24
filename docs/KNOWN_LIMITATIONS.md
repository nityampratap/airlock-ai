# AIRLOCK AI — Known Limitations & Architectural Boundaries

In accordance with our commitment to technical honesty and commercial credibility, this document defines what AIRLOCK AI currently guarantees and what remains outside the scope of the pilot architecture.

---

## 1. Execution Boundary Boundaries

### Local Development / Pilot Isolation
- In the local pilot build, execution chambers are separated logically via process namespaces and socket proxy mediation.
- **Limitation:** Shared-kernel container isolation alone does not constitute a complete hostile multi-tenant sandbox boundary. Hostile untrusted code running arbitrary kernel exploits could theoretically escape shared-kernel Docker containers.
- **Enterprise Requirement:** For hostile untrusted tenant workloads, production deployments require hardware-isolated microVMs (e.g., AWS Firecracker or gVisor) or dedicated physical hardware enclaves.

---

## 2. Cryptographic Scope

### Receipt Verification vs. Security Guarantees
- **What Is Proven:** An Ed25519-signed audit receipt mathematically proves that an evaluation run occurred as recorded in the canonical SHA-256 chain, that no intermediate events were modified or omitted, and that the root hash was signed by the enclave key.
- **What Is Not Proven:** A signed receipt alone does not prove that a client model is immune to novel, zero-day adversarial attacks not included in the test suite. It guarantees audit integrity and test reproducibility, not mathematical invulnerability of the underlying model weights.

---

## 3. Cryptographic Key Management

- In the current pilot build, the enclave Ed25519 private key is persisted as a local PEM file with filesystem access controls in `backend/keys/ed25519_private.pem`.
- Production enterprise deployments will migrate this key to a FIPS 140-2 Level 3 Hardware Security Module (HSM) or cloud KMS.

---

## 4. Threat Intelligence Ingestion (TinyFish)

- TinyFish intelligence ingestion operates in an untrusted sandbox. All ingested findings are classified as `pending_review` and require explicit human security engineer approval before conversion into test cases.
- TinyFish cannot execute instructions found in external research documents.
