import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121C30] border border-[#86A8FF]/20 text-xs font-mono text-[#86A8FF]">
            TRANSPARENT COMMERCIAL PACKAGING
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F4F6FB] tracking-tight max-w-2xl mx-auto">
            Predictable Plans for High-Assurance AI Teams
          </h1>
          <p className="text-base sm:text-lg text-[#ADBBD0] max-w-xl mx-auto">
            All plans include isolated chamber execution, policy broker mediation, and cryptographic receipts. Choose the scale that matches your release velocity.
          </p>
        </div>
      </section>

      <section className="py-20 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Plan */}
            <div className="clay-card p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#ADBBD0] uppercase">STARTER</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#F4F6FB]">$490</span>
                  <span className="text-xs text-[#7587A4]">/ month</span>
                </div>
                <p className="text-xs text-[#ADBBD0]">
                  Essential evaluation assurance for AI product startups preparing initial production gates.
                </p>
                <div className="pt-4 border-t border-white/[0.06] space-y-2.5 text-xs font-mono text-[#ADBBD0]">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    100 Evaluations / month
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Single Project Workspace
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Ed25519 Signed Audit Receipts
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Standard Canary Exfiltration Guard
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Community Support
                  </p>
                </div>
              </div>

              <Link
                href="/login"
                className="w-full text-center py-3 rounded-xl bg-[#121C30] hover:bg-[#1B2942] text-sm font-semibold text-[#F4F6FB] border border-white/10 transition-colors"
              >
                Start Trial
              </Link>
            </div>

            {/* Professional Plan (Featured) */}
            <div className="clay-card p-8 flex flex-col justify-between space-y-6 border-[#86A8FF]/40 shadow-[0_20px_50px_rgba(134,168,255,0.12)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#86A8FF] text-[#0B1220] font-mono text-[11px] font-bold tracking-wider">
                RECOMMENDED
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono text-[#86A8FF] uppercase">PROFESSIONAL</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#F4F6FB]">$1,890</span>
                  <span className="text-xs text-[#7587A4]">/ month</span>
                </div>
                <p className="text-xs text-[#ADBBD0]">
                  Full-capacity evaluation infrastructure for scaling AI engineering teams and red-team firms.
                </p>
                <div className="pt-4 border-t border-white/[0.06] space-y-2.5 text-xs font-mono text-[#ADBBD0]">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    1,500 Evaluations / month
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Unlimited Projects & Workspaces
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    TinyFish Live Threat Research Sync
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Role-Based Access Control (Auditor/Eng)
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Full REST API & CLI Verifier Access
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Priority Slack & Engineering Support
                  </p>
                </div>
              </div>

              <Link
                href="/evaluations/studio"
                className="w-full clay-btn-primary text-center py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                <span>Launch Professional Pilot</span>
                <ArrowRight className="w-4 h-4 text-[#86A8FF]" />
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="clay-card p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#A5A0F4] uppercase">ENTERPRISE</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#F4F6FB]">Custom</span>
                </div>
                <p className="text-xs text-[#ADBBD0]">
                  Dedicated self-hosted airgapped brokers, custom hardware enclaves, and enterprise compliance.
                </p>
                <div className="pt-4 border-t border-white/[0.06] space-y-2.5 text-xs font-mono text-[#ADBBD0]">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Unlimited Dedicated Evaluation Volume
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Self-Hosted Airgapped Broker Option
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Custom Model Provider Endpoints
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    SAML / Okta / Azure AD SSO
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
                    Dedicated DevSecOps SLA & Architecture
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full text-center py-3 rounded-xl bg-[#121C30] hover:bg-[#1B2942] text-sm font-semibold text-[#F4F6FB] border border-white/10 transition-colors"
              >
                Contact Enterprise Sales
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center text-xs font-mono text-[#7587A4]">
            * Commercial pilot pricing. Invoicing available via Stripe or custom enterprise contract.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
