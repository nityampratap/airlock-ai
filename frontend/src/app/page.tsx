"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Cpu,
  Fingerprint,
  Radar,
  FileCheck2,
  CheckCircle2,
  Terminal,
  Activity,
  ChevronRight,
  ShieldAlert,
  Server,
  Zap,
  Layers
} from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

const WORKFLOW_STEPS = [
  {
    step: "01",
    id: "discover",
    title: "Discover Threat Vectors",
    desc: "Ingest structured adversarial findings from permitted public intelligence sources (OWASP GenAI, MITRE ATLAS) into quarantined review buffers.",
    telemetry: "TinyFish Crawler: 4 public advisories ingested. Zero code execution permitted."
  },
  {
    step: "02",
    id: "approve",
    title: "Approve Safe Fixtures",
    desc: "Security engineers review sanitized attack vectors, assign synthetic canary tokens, and attach boundary policies before any test can execute.",
    telemetry: "Gatekeeper: Approved TC-8921. Canary bound: CANARY-AIRLOCK-SEC-8921."
  },
  {
    step: "03",
    id: "execute",
    title: "Execute Inside Airgapped Broker",
    desc: "Red Team workloads and Client Models run in isolated chambers. Every packet transits the Central Policy Broker for microsecond policy enforcement.",
    telemetry: "Broker Transit: Rule SEC-POL-01 active. Quarantined 1 probe. Zero model contamination."
  },
  {
    step: "04",
    id: "verify",
    title: "Cryptographically Verify Evidence",
    desc: "Audit events form a canonical SHA-256 hash chain sealed with an Ed25519 signature. Receipts can be independently audited offline via open-source CLI.",
    telemetry: "Ed25519 Root Hash: 208307772a5a... Sealed and untampered."
  }
];

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden border-b border-white/[0.06]">
        {/* Ambient subtle glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#86A8FF]/10 via-[#A5A0F4]/10 to-[#7CD5E4]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121C30] border border-[#86A8FF]/20 text-xs font-mono text-[#86A8FF] shadow-[0_0_20px_rgba(134,168,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#68CFA9] animate-pulse"></span>
              AI EVALUATION SECURITY INFRASTRUCTURE
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F4F6FB] font-sans leading-[1.12]">
              AI safety testing you can <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F6FB] via-[#ADBBD0] to-[#86A8FF]">
                actually trust.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#ADBBD0] max-w-2xl mx-auto leading-relaxed">
              Run adversarial AI evaluations inside controlled environments, prevent canary contamination, and produce independently verifiable cryptographic evidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/evaluations/studio"
                className="w-full sm:w-auto clay-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-[#86A8FF]/10"
              >
                <span>Launch Evaluation Studio</span>
                <ArrowRight className="w-4 h-4 text-[#86A8FF]" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-[#ADBBD0] hover:text-[#F4F6FB] bg-[#121C30]/80 hover:bg-[#1B2942] border border-white/10 hover:border-white/20 transition-all"
              >
                <span>Book Architectural Demo</span>
              </Link>
            </div>

            {/* Tagline micro-proof */}
            <div className="pt-2 flex items-center justify-center gap-6 text-xs font-mono text-[#7587A4]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#68CFA9]" />
                Zero Canary Exfiltration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#68CFA9]" />
                Ed25519 Signed Audit Receipts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#68CFA9]" />
                Airgapped Broker Boundary
              </span>
            </div>
          </div>

          {/* Authentic Generated Hero Architecture Asset Showcase */}
          <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] bg-[#0A101C]">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/assets/hero_architecture.jpg"
                alt="AIRLOCK AI Three-Chamber Isolated Security Architecture"
                fill
                priority
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-80" />
            </div>

            {/* Interactive Telemetry Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-xl bg-[#0E1626]/90 backdrop-blur-md border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#86A8FF]/10 border border-[#86A8FF]/20 flex items-center justify-center text-[#86A8FF] shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F4F6FB] flex items-center gap-2">
                    <span>LIVE BROKER TOPOLOGY: AIRGAPPED MODE</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#68CFA9]/10 text-[#68CFA9] font-mono">ENFORCING</span>
                  </p>
                  <p className="text-xs text-[#ADBBD0] font-mono">
                    Red Team [Chamber 01] ➔ Central Policy Broker ➔ Protected Target [Chamber 02]
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-[#7587A4]">
                <div>
                  <span className="text-[#ADBBD0]">Transit Latency:</span> <span className="text-[#68CFA9]">4.2ms</span>
                </div>
                <div>
                  <span className="text-[#ADBBD0]">Canary Token:</span> <span className="text-[#86A8FF]">SHIELDED</span>
                </div>
                <Link
                  href="/evaluations/studio"
                  className="px-3 py-1.5 rounded-lg bg-[#1B2942] hover:bg-[#283A5C] text-[#F4F6FB] text-xs font-medium border border-white/10 transition-colors"
                >
                  Inspect Studio ➔
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Architecture Section */}
      <section className="py-16 border-b border-white/[0.06] bg-[#0E1626]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-[#7587A4]">
            BUILT FOR AI TEAMS, PLATFORM ARCHITECTS & RED-TEAM CONSULTANCIES
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-4 text-left">
            <div className="p-4 rounded-xl bg-[#121C30]/60 border border-white/[0.06]">
              <p className="text-xs font-mono text-[#86A8FF]">CHAMBER ISOLATION</p>
              <p className="text-sm font-semibold text-[#F4F6FB] mt-1">Zero Memory Contamination</p>
              <p className="text-xs text-[#7587A4] mt-1">Attack payloads cannot leak across tenant model boundaries.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#121C30]/60 border border-white/[0.06]">
              <p className="text-xs font-mono text-[#68CFA9]">POLICY BROKER</p>
              <p className="text-sm font-semibold text-[#F4F6FB] mt-1">Microsecond Inspection</p>
              <p className="text-xs text-[#7587A4] mt-1">Every evaluation request is authorized against active security rules.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#121C30]/60 border border-white/[0.06]">
              <p className="text-xs font-mono text-[#A5A0F4]">AUDIT INTEGRITY</p>
              <p className="text-sm font-semibold text-[#F4F6FB] mt-1">Ed25519 & SHA-256</p>
              <p className="text-xs text-[#7587A4] mt-1">Audit logs are tamper-evident and independently verifiable offline.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#121C30]/60 border border-white/[0.06]">
              <p className="text-xs font-mono text-[#7CD5E4]">THREAT INTEL</p>
              <p className="text-sm font-semibold text-[#F4F6FB] mt-1">Safe Web Research</p>
              <p className="text-xs text-[#7587A4] mt-1">TinyFish parses public vulnerabilities into safe review fixtures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[#86A8FF] uppercase tracking-wider">CORE PROMISE</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F6FB]">
              Secure the evaluation process. <br />
              Make its results accountable.
            </h2>
            <p className="text-[#ADBBD0] text-base">
              Traditional safety testing exposes sensitive prompts, leaks canary tokens, and produces unverifiable text logs. AIRLOCK AI provides a verifiable infrastructure layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="clay-card p-7 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#86A8FF]/10 border border-[#86A8FF]/20 flex items-center justify-center text-[#86A8FF]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F6FB]">1. Isolate sensitive evaluations</h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                Separate adversarial red-team execution from client model weights and defensive tools. No test workload can inspect another customer&apos;s prompts or canary tokens.
              </p>
              <ul className="space-y-2 text-xs font-mono text-[#7587A4] pt-2 border-t border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86A8FF]"></span>
                  Airgapped Execution Boundaries
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#86A8FF]"></span>
                  Cross-Tenant Memory Segregation
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="clay-card p-7 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#68CFA9]/10 border border-[#68CFA9]/20 flex items-center justify-center text-[#68CFA9]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F6FB]">2. Control every test interaction</h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                All traffic between red team and model passes through the Central Policy Broker. Enforce network egress boundaries, rate limits, canary masking, and payload size controls.
              </p>
              <ul className="space-y-2 text-xs font-mono text-[#7587A4] pt-2 border-t border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#68CFA9]"></span>
                  Live Microsecond Policy Decisions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#68CFA9]"></span>
                  Synthetic Canary Token Guarding
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="clay-card p-7 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#A5A0F4]/10 border border-[#A5A0F4]/20 flex items-center justify-center text-[#A5A0F4]">
                <Fingerprint className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F4F6FB]">3. Verify the evidence independently</h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                Receive Ed25519-signed audit receipts backed by SHA-256 canonical event chaining. Anyone can verify receipts with our portable zero-dependency Python verifier.
              </p>
              <ul className="space-y-2 text-xs font-mono text-[#7587A4] pt-2 border-t border-white/[0.06]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A5A0F4]"></span>
                  Cryptographic Tamper-Evidence
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A5A0F4]"></span>
                  Portable Offline Python CLI Verifier
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Step Product Workflow Walkthrough */}
      <section className="py-24 border-b border-white/[0.06] bg-[#0A101C]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[#86A8FF] uppercase tracking-wider">END-TO-END FLOW</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4F6FB]">
              Discover ➔ Approve ➔ Execute ➔ Verify
            </h2>
            <p className="text-[#ADBBD0] text-sm">
              Click through the stages of the evaluation assurance pipeline to see how policies and audit seals protect each step.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step Selection Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {WORKFLOW_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeStep === idx
                      ? "bg-[#1B2942] border-[#86A8FF]/40 shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                      : "bg-[#121C30]/50 border-white/[0.06] hover:bg-[#121C30] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#86A8FF] font-semibold">{s.step}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#7587A4]">
                      PHASE {s.step}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-[#F4F6FB] mt-1">{s.title}</h4>
                  <p className="text-xs text-[#ADBBD0] mt-1 line-clamp-2">{s.desc}</p>
                </button>
              ))}
            </div>

            {/* Interactive Telemetry Box */}
            <div className="lg:col-span-7">
              <div className="clay-card p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#68CFA9] animate-pulse"></span>
                    <span className="text-xs font-mono text-[#F4F6FB] font-medium">
                      PIPELINE TELEMETRY: {WORKFLOW_STEPS[activeStep].title.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#86A8FF]">STEP {WORKFLOW_STEPS[activeStep].step} OF 04</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#F4F6FB]">
                    {WORKFLOW_STEPS[activeStep].title}
                  </h3>
                  <p className="text-sm text-[#ADBBD0] leading-relaxed">
                    {WORKFLOW_STEPS[activeStep].desc}
                  </p>
                </div>

                {/* Simulated Live Broker Terminal Box */}
                <div className="p-4 rounded-xl bg-[#070D18] border border-white/[0.08] font-mono text-xs space-y-2 text-[#ADBBD0]">
                  <div className="text-[#7587A4] flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <span>broker@airlock-engine-01:~$</span>
                    <span className="text-[#68CFA9]">ACTIVE</span>
                  </div>
                  <p className="text-[#86A8FF]">{">"} {WORKFLOW_STEPS[activeStep].telemetry}</p>
                  <p className="text-[#7587A4] text-[11px]">Audit Chain Seq: #{activeStep + 1} | Cryptographic Hash: SHA-256(H_{activeStep} || canonical_payload)</p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href="/evaluations/studio"
                    className="clay-btn-primary inline-flex items-center gap-2 text-xs px-4 py-2 rounded-lg font-medium"
                  >
                    <span>Test In Evaluation Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#86A8FF]" />
                  </Link>
                  <span className="text-xs text-[#7587A4] font-mono">Status: Policy Enforced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Spotlights with Generated Assets */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Feature 1: Evaluation Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono text-[#86A8FF] uppercase tracking-wider">CHAMBER ISOLATION</span>
              <h3 className="text-3xl font-bold text-[#F4F6FB] leading-snug">
                Physical Separation for Red Teams and Client Models
              </h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                Most AI evaluation runs take place inside monolithic testing containers where red-team payloads, model context, and internal tools share memory. AIRLOCK enforces a three-chamber isolation boundary connected strictly via the central policy broker.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-[#121C30] border border-white/[0.08]">
                  <p className="text-xs font-mono text-[#68CFA9]">ZERO CONTAMINATION</p>
                  <p className="text-xs text-[#ADBBD0] mt-1">Attack payloads cannot touch client memory outside approved broker channels.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121C30] border border-white/[0.08]">
                  <p className="text-xs font-mono text-[#86A8FF]">LATENCY TELEMETRY</p>
                  <p className="text-xs text-[#ADBBD0] mt-1">Under 5ms policy inspection overhead on standard evaluation pipelines.</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A101C]">
              <Image
                src="/assets/eval_architecture.jpg"
                alt="Evaluation Architecture Chambers"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Feature 2: Cryptographic Receipts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A101C]">
              <Image
                src="/assets/crypto_evidence.jpg"
                alt="Cryptographic Signed Receipts"
                fill
                className="object-cover"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <span className="text-xs font-mono text-[#68CFA9] uppercase tracking-wider">CRYPTOGRAPHIC ACCOUNTABILITY</span>
              <h3 className="text-3xl font-bold text-[#F4F6FB] leading-snug">
                Ed25519 Digital Seals and SHA-256 Event Chaining
              </h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                Did the safety evaluation actually happen as reported? With AIRLOCK, every event—from payload ingestion to policy denial—is cryptographically bound to the previous event in a canonical hash chain and sealed with an Ed25519 digital signature.
              </p>
              <div className="space-y-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#121C30] border border-white/[0.08] text-[#ADBBD0]">
                  <span className="text-[#68CFA9]">Proof Verification:</span> Run our open-source <span className="text-[#F4F6FB]">cli_verifier.py</span> offline to validate receipts with zero third-party dependencies.
                </div>
              </div>
              <Link
                href="/vault"
                className="clay-btn-primary inline-flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg font-medium"
              >
                <span>Inspect Evidence Vault</span>
                <ChevronRight className="w-4 h-4 text-[#86A8FF]" />
              </Link>
            </div>
          </div>

          {/* Feature 3: Threat Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono text-[#A5A0F4] uppercase tracking-wider">SOURCE-BACKED THREAT INTEL</span>
              <h3 className="text-3xl font-bold text-[#F4F6FB] leading-snug">
                TinyFish Curated Research Ingestion Without Code Execution
              </h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                Connect external model security research (OWASP GenAI Top 10, NIST AI RMF, MITRE ATLAS) into your evaluation lifecycle without allowing unvetted external scripts to run inside privileged environments.
              </p>
              <div className="p-4 rounded-xl bg-[#121C30] border border-white/[0.08] space-y-2 text-xs">
                <p className="font-mono text-[#86A8FF]">Strict Untrusted-Evidence Boundary:</p>
                <p className="text-[#ADBBD0]">
                  TinyFish browsing modules operate in quarantined read-only contexts with strict source allowlisting. Public vectors require explicit human approval before conversion into test cases.
                </p>
              </div>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A101C]">
              <Image
                src="/assets/threat_intel.jpg"
                alt="Threat Intelligence Stream"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Commercial CTA */}
      <section className="py-24 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#070D18] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-[#86A8FF]/10 border border-[#86A8FF]/20 text-[#86A8FF] mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F6FB] tracking-tight">
            Make every AI evaluation accountable.
          </h2>
          <p className="text-base sm:text-lg text-[#ADBBD0] max-w-xl mx-auto">
            Ready to isolate adversarial workloads, prevent canary exfiltration, and generate verifiable audit proofs?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/evaluations/studio"
              className="w-full sm:w-auto clay-btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold"
            >
              <span>Start Evaluating</span>
              <ArrowRight className="w-4 h-4 text-[#86A8FF]" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium text-[#ADBBD0] hover:text-[#F4F6FB] bg-[#121C30] hover:bg-[#1B2942] border border-white/10 transition-colors"
            >
              <span>Talk to Solutions Engineering</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
