import Link from "next/link";
import { ShieldCheck, ArrowRight, Building, CheckCircle2, Terminal, Users, Lock, Compass, Cpu } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-[#E2E8F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#16A34A]">
              SOLUTIONS BY INDUSTRY & ROLE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight">
              Designed for Organizations That Cannot Afford Testing Contamination
            </h1>
            <p className="text-lg text-[#64748B] leading-relaxed">
              Whether you are an AI-native company gating product releases, an independent red-team consultancy delivering client assessments, or an enterprise engineering team building internal safeguards.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solution 1 */}
            <div className="clay-card p-8 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A]">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#16A34A]">FOR AI PRODUCT COMPANIES</span>
                <h3 className="text-2xl font-bold text-[#1E293B]">Release Gates for Autonomous Agents</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Before releasing model updates, assistant skills, or tool-use capabilities, run automated adversarial regression tests in airgapped environments without contaminating proprietary prompts.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#94A3B8] space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Canary injection tests block payload leakages
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Cryptographic proof of pass/fail gates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Continuous CI/CD regression testing support
                </li>
              </ul>
            </div>

            {/* Solution 2 */}
            <div className="clay-card p-8 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/20 flex items-center justify-center text-[#16A34A]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#16A34A]">FOR RED-TEAM CONSULTANCIES</span>
                <h3 className="text-2xl font-bold text-[#1E293B]">Defensible Client Audit Receipts</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Provide your clients with verifiable proof that adversarial evaluations were executed precisely as specified, with zero data exposure or cross-client test contamination.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#94A3B8] space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Multi-tenant isolated client workspaces
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Ed25519-signed client assessment deliverables
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Offline verification tools for client risk officers
                </li>
              </ul>
            </div>

            {/* Solution 3 */}
            <div className="clay-card p-8 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] border border-[#A5A0F4]/20 flex items-center justify-center text-[#7C3AED]">
                <Building className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#7C3AED]">FOR ENTERPRISE SECURITY TEAMS</span>
                <h3 className="text-2xl font-bold text-[#1E293B]">Internal AI Risk Assurance & Governance</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Establish an auditable repository of all safety checks performed across internal business LLMs. Provide your governance board with cryptographically sealed evaluation evidence.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#94A3B8] space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Centralized policy enforcement across departments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Evidence Vault with tamper-detection alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
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
                <h3 className="text-2xl font-bold text-[#1E293B]">Underlying Isolation Infrastructure</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Embed AIRLOCK&apos;s broker and audit engine as a white-labeled or underlying execution layer for your existing benchmark and evaluation suites.
                </p>
              </div>
              <ul className="text-xs font-mono text-[#94A3B8] space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  REST API integration for dynamic run execution
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  Plug-and-play Ed25519 verification seals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
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
