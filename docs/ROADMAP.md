# AIRLOCK AI — Product & Engineering Roadmap

## Implementation Status Classification

In accordance with Section 16 of the product development standard, all capabilities are categorized under four explicit statuses:

- **Implemented and Tested:** Fully coded, functional in the application, and validated via automated tests or browser verification.
- **Implemented but not Independently Audited:** Feature is operational, but has not yet undergone formal external penetration testing or cryptographic audit.
- **Partially Implemented:** Functional prototype or UI slice present with simulated or fallback backend capabilities.
- **Planned:** Future milestone on the commercial roadmap.

---

## 1. Feature Status Matrix

| Capability | Current Status | Notes |
|:---|:---:|:---|
| **Public Commercial Website (7 Pages)** | **Implemented and Tested** | Homepage, Platform, Solutions, Security, Pricing, Docs, Contact all operational |
| **Tactile Midnight Clay & Glass Visual System** | **Implemented and Tested** | Cohesive tokens, custom clay cards, glass panels, Manrope/Inter/IBM Plex fonts |
| **Spatial Evaluation Studio (3 Chambers)** | **Implemented and Tested** | Red Team, Central Policy Broker, Client Model chambers with live transit |
| **Validation Scenario A (Vulnerable Demo)** | **Implemented and Tested** | Proves synthetic canary leakage in unbrokered baseline |
| **Validation Scenario B (Hardened Execution)** | **Implemented and Tested** | Broker inspects payload, denies canary probe (SEC-POL-01), preserves model context |
| **Validation Scenario C (Evidence & Tamper)** | **Implemented and Tested** | Verifies signed receipts and rejects tampered copies both in-browser and via CLI |
| **Ed25519 & SHA-256 Cryptographic Engine** | **Implemented and Tested** | Canonical JSON hashing, sequential chaining, Ed25519 signatures |
| **Portable Independent CLI Verifier** | **Implemented and Tested** | Zero-dependency standalone Python tool (`backend/cli_verifier.py`) |
| **Evidence Vault & Receipt Download** | **Implemented and Tested** | Searchable evaluation ledger, canonical JSON download, interactive verification |
| **Threat Intelligence (TinyFish Feed)** | **Implemented and Tested** | OWASP GenAI & MITRE ATLAS parsed vectors with human approval workflow |
| **Policy Center (SEC-POL Management)** | **Implemented and Tested** | Network isolation profile, canary guard toggles, version audit history |
| **Multi-Tenant RBAC & JWT Session Auth** | **Implemented and Tested** | User registration, login, organization membership authorization |
| **Commercial Billing & Metering** | **Implemented and Tested** | Usage progress meters, tiered plans, simulated test-mode Stripe checkout |
| **Lead Capture & Demo Request Pipeline** | **Implemented and Tested** | Contact form validation, database persistence, confirmation workflows |
| **HSM / Cloud KMS Enclave Key Management** | **Planned** | Will migrate local PEM keys to FIPS 140-2 Level 3 hardware modules |
| **Firecracker MicroVM Sandbox Backend** | **Planned** | Dedicated microVMs for untrusted multi-tenant host workloads |
| **Enterprise SSO (SAML 2.0 / Okta)** | **Planned** | Planned for Enterprise tier customer deployments |

---

## 2. Release Milestones

### Milestone 1.0 (Pilot Launch — Current)
- Complete commercial marketing presence and authenticated SaaS console.
- Three-chamber broker evaluation architecture with verified canary shielding.
- Cryptographically signed audit receipts and offline CLI verifier.
- Automated test suite with 100% pass rate.

### Milestone 2.0 (Enterprise Hardening — Q1 2027)
- Integration of AWS CloudHSM / Vault for root signature keys.
- Firecracker microVM backend for hostile multi-tenant execution.
- Enterprise SSO via SAML/OIDC.
- Third-party cryptographic audit by independent security research firm.
