import Link from "next/link";
import { ShieldCheck, ArrowRight, Building, CheckCircle2, Terminal, Users, Lock, Compass, Cpu } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121C30] border border-[#86A8FF]/20 text-xs font-mono text-[#86A8FF]">
              SOLUTIONS BY INDUSTRY & ROLE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F4F6FB] tracking-tight">
              Designed for Organizations That Cannot Afford Testing Contamination
            </h1>
            <p className="text-lg text-[#ADBBD0] leading-relaxed">
              Whether you are an AI-native company gating product releases, an independent red-team consultancy delivering client assessments, or an enterprise engineering team building internal safeguards.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solution 1 */}
            <div className="clay-card p-8 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-[#86A8FF]/10 border border-[#86A8FF]/20 flex items-center justify-center text-[#86A8FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#86A8FF]">FOR AI PRODUCT COMPANIES</span>
                <h3 className="text-2xl font-bold text-[#F4F6FB]">Release Gates for Autonomous Agents</h3>
                <p className="text-sm text-[#ADBBD0] leading-relaxed">
                  Before releasing model updates, assistant skills, or tool-use capabilities, run automated adversarial regression tests in airgapped environments without contaminating proprietary prompts.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#7587A4] space-y-2.5 pt-4 border-t border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Canary injection tests block payload leakages
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Cryptographic proof of pass/fail gates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Continuous CI/CD regression testing support
                </li>
              </ul>
            </div>

            {/* Solution 2 */}
            <div className="clay-card p-8 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-[#68CFA9]/10 border border-[#68CFA9]/20 flex items-center justify-center text-[#68CFA9]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#68CFA9]">FOR RED-TEAM CONSULTANCIES</span>
                <h3 className="text-2xl font-bold text-[#F4F6FB]">Defensible Client Audit Receipts</h3>
                <p className="text-sm text-[#ADBBD0] leading-relaxed">
                  Provide your clients with verifiable proof that adversarial evaluations were executed precisely as specified, with zero data exposure or cross-client test contamination.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#7587A4] space-y-2.5 pt-4 border-t border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Multi-tenant isolated client workspaces
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Ed25519-signed client assessment deliverables
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Offline verification tools for client risk officers
                </li>
              </ul>
            </div>

            {/* Solution 3 */}
            <div className="clay-card p-8 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-[#A5A0F4]/10 border border-[#A5A0F4]/20 flex items-center justify-center text-[#A5A0F4]">
                <Building className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#A5A0F4]">FOR ENTERPRISE SECURITY TEAMS</span>
                <h3 className="text-2xl font-bold text-[#F4F6FB]">Internal AI Risk Assurance & Governance</h3>
                <p className="text-sm text-[#ADBBD0] leading-relaxed">
                  Establish an auditable repository of all safety checks performed across internal business LLMs. Provide your governance board with cryptographically sealed evaluation evidence.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#7587A4] space-y-2.5 pt-4 border-t border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Centralized policy enforcement across departments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Evidence Vault with tamper-detection alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Role-based access control with auditor roles
                </li>
              </ul>
            </div>

            {/* Solution 4 */}
            <div className="clay-card p-8 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-[#7CD5E4]/10 border border-[#7CD5E4]/20 flex items-center justify-center text-[#7CD5E4]">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#7CD5E4]">FOR EVALUATION PLATFORMS</span>
                <h3 className="text-2xl font-bold text-[#F4F6FB]">Underlying Isolation Infrastructure</h3>
                <p className="text-sm text-[#ADBBD0] leading-relaxed">
                  Embed AIRLOCK&apos;s broker and audit engine as a white-labeled or underlying execution layer for your existing benchmark and evaluation suites.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#7587A4] space-y-2.5 pt-4 border-t border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  REST API integration for dynamic run execution
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Plug-and-play Ed25519 verification seals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                  Configurable isolation backends (Container / VM)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
