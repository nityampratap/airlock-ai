import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-[#E2E8F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#16A34A]">
            TRANSPARENT COMMERCIAL PACKAGING
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight max-w-2xl mx-auto">
            Predictable Plans for High-Assurance AI Teams
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            All plans include isolated chamber execution, policy broker mediation, and cryptographic receipts. Choose the scale that matches your release velocity.
          </p>
        </div>
      </section>

      <section className="py-20 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <div className="clay-card p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#64748B] uppercase">STARTER</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#1E293B]">$490</span>
                  <span className="text-xs text-[#94A3B8]">/ month</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Essential evaluation assurance for AI product startups preparing initial production gates.
                </p>
                <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5 text-xs font-mono text-[#64748B]">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    100 Evaluations / month
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Single Project Workspace
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Ed25519 Signed Audit Receipts
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Standard Canary Exfiltration Guard
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Community Support
                  </p>
                </div>
              </div>

              <Link
                href="/login"
                className="w-full text-center py-3 rounded-xl bg-[#F0FDF4] hover:bg-[#F0FDF4] text-sm font-semibold text-[#1E293B] border border-[#E2E8F0] transition-colors"
              >
                Start Trial
              </Link>
            </div>

            {/* Professional Plan (Featured) */}
            <div className="clay-card p-8 flex flex-col justify-between space-y-6 border-[#16A34A] shadow-[0_20px_50px_rgba(134,168,255,0.12)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#16A34A] text-[#1E293B] font-mono text-[11px] font-bold tracking-wider">
                RECOMMENDED
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono text-[#16A34A] uppercase">PROFESSIONAL</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#1E293B]">$1,890</span>
                  <span className="text-xs text-[#94A3B8]">/ month</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Full-capacity evaluation infrastructure for scaling AI engineering teams and red-team firms.
                </p>
                <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5 text-xs font-mono text-[#64748B]">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    1,500 Evaluations / month
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Unlimited Projects & Workspaces
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    TinyFish Live Threat Research Sync
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Role-Based Access Control (Auditor/Eng)
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Full REST API & CLI Verifier Access
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Priority Slack & Engineering Support
                  </p>
                </div>
              </div>

              <Link
                href="/evaluations/studio"
                className="w-full clay-btn-primary text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                <span>Launch Professional Pilot</span>
                <ArrowRight className="w-4 h-4 text-[#16A34A]" />
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="clay-card p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#7C3AED] uppercase">ENTERPRISE</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#1E293B]">Custom</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Dedicated self-hosted airgapped brokers, custom hardware enclaves, and enterprise compliance.
                </p>
                <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5 text-xs font-mono text-[#64748B]">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Unlimited Dedicated Evaluation Volume
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Self-Hosted Airgapped Broker Option
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Custom Model Provider Endpoints
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    SAML / Okta / Azure AD SSO
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Dedicated DevSecOps SLA & Architecture
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full text-center py-3 rounded-xl bg-[#F0FDF4] hover:bg-[#F0FDF4] text-sm font-semibold text-[#1E293B] border border-[#E2E8F0] transition-colors"
              >
                Contact Enterprise Sales
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center text-xs font-mono text-[#94A3B8]">
            * Commercial pilot pricing. Invoicing available via Stripe or custom enterprise contract.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
