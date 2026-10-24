# AIRLOCK AI — Threat Model & Boundary Analysis

## 1. System Threat Landscape

AIRLOCK operates in an environment where **adversarial inputs are executed intentionally**. Therefore, the security perimeter is not designed to prevent attacks from arriving, but to **contain them within Chamber 01 and prevent lateral exfiltration or audit corruption.**

---

## 2. Threat Actors & Capabilities

| Threat Actor | Motivation | Access Level | Primary Attack Vectors |
|:---|:---|:---|:---|
| **Malicious Test Author / Insider** | Exfiltrate private client prompts or canary tokens | Authorized to submit test cases | Prompt injection, context window smuggling, canary probing |
| **Compromised Target Model / Agent** | Execute unauthorized tool calls or egress requests | Running inside Chamber 02 | SSRF, cloud metadata access, malicious tool invocation |
| **Adversarial Evaluator / Attacker** | Tamper with evaluation receipts to forge safety certification | Possesses downloaded receipt JSON | Modifying event logs, altering timestamps, forging pass/fail status |
| **External Untrusted Intelligence Source** | Compromise evaluation runner via malicious web research | Public web content crawled via TinyFish | Malicious scripts, stored XSS, prompt injection in research feeds |

---

## 3. Threat Mitigation Matrix

### Threat 1: Canary Token Exfiltration
- **Vector:** Red team workload crafts an adversarial prompt designed to make the client assistant regurgitate confidential canary strings.
- **Mitigation:** The Central Policy Broker inspects payloads in real-time. Registered canaries (`CANARY-AIRLOCK-SEC-8921`) are matched against in-transit text. If detected, the broker enforces `decision = DENY`, blocks transmission to Chamber 02, and seals the violation into the audit chain.
- **Residual Risk:** Complex semantic encoding or steganographic canary concealment. Mitigated by prompt entropy analysis and multiple randomized canary variants.

### Threat 2: Audit Trail Fabrication or Post-Hoc Editing
- **Vector:** An organization modifies an evaluation result to claim a model passed safety checks when it actually leaked canaries.
- **Mitigation:** Canonical SHA-256 event chaining mathematically locks the order and content of every audit event. Any alteration breaks the chain link $H_i \neq \text{SHA-256}(H_{i-1} \parallel E_i)$. Furthermore, the root hash is signed with Ed25519; unauthorized parties cannot generate a valid signature for an altered root hash without the private key.
- **Residual Risk:** Enclave private key compromise. Mitigated by key isolation, short-lived session sub-keys, and HSM anchoring.

### Threat 3: Untrusted External Content Execution via TinyFish
- **Vector:** A public webpage ingested by TinyFish contains malicious payload scripts intended to execute inside the platform.
- **Mitigation:** The TinyFish service runs in a strictly sandboxed, read-only worker. Ingested data is strictly typed as unvalidated `ThreatFinding` objects. Findings require explicit human review and conversion into sanitized strings before becoming runnable test cases. Zero external code execution is permitted.

### Threat 4: Cross-Tenant Data Leakage
- **Vector:** Tenant A queries or modifies Tenant B's policies, evaluations, or test cases.
- **Mitigation:** Strict tenant-aware authorization (`require_org_member`) enforced on every sensitive API router. The database query scopes all records by `organization_id` verified from the caller's cryptographic JWT claims.
