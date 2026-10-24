# AIRLOCK AI — Commercial Billing & Entitlements

## 1. Commercial Packaging Model

AIRLOCK AI is offered as a tiered B2B subscription designed to match enterprise evaluation volume and governance requirements.

### Tier Comparison

| Feature | Starter | Professional (Recommended) | Enterprise |
|:---|:---:|:---:|:---:|
| **Monthly Price** | $490 / month | $1,890 / month | Custom Pricing |
| **Monthly Evaluations** | 100 runs / mo | 1,500 runs / mo | Unlimited Dedicated Volume |
| **Active Projects** | 1 Project | Unlimited Projects | Unlimited Projects |
| **Isolation Profile** | Standard Broker | Airgapped Broker Profile | Dedicated MicroVM / Enclave |
| **Canary Exfiltration Shield** | Basic | Advanced Multi-Canary | Custom Synthetic Payloads |
| **Ed25519 Signed Receipts** | Included | Included | Included |
| **Offline CLI Verifier** | Included | Included | Included |
| **Threat Intelligence** | Manual Review | TinyFish Live Sync | Custom Threat Ingestion |
| **RBAC & Auditor Roles** | — | Included (Auditor/Eng) | Custom SAML / SSO RBAC |
| **Support SLA** | Community | Priority Slack (4hr SLA) | Dedicated DevSecOps (1hr SLA) |

---

## 2. Server-Enforced Entitlements

All evaluation limits are enforced on the backend by querying the `Subscription` table in the database before initializing an evaluation run:
- If `current_period_evaluations_used >= monthly_evaluation_limit`, the API returns HTTP 402 Payment Required with an upgrade directive.
- Usage counters reset on the first day of each billing period.

---

## 3. Stripe Integration (Test Mode)

- Development and pilot environments operate with Stripe test-mode simulation.
- No live payment credentials are charged without explicit customer onboarding and signed commercial agreements.
- In-app plan upgrades trigger a verified test session checkout confirmation.
