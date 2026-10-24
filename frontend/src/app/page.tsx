"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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
  Layers,
  Shield,
  Eye,
  Binary
} from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import {
  ClayCard,
  ClayButton,
  GlassPanel,
  StatusBadge,
  ClayTerminal,
  AmbientOrb,
  SectionHeader
} from "@/components/ui/clay";

const WORKFLOW_STEPS = [
  {
    step: "01",
    id: "discover",
    title: "Discover Threat Vectors",
    desc: "Ingest structured adversarial findings from permitted public intelligence sources (OWASP GenAI, MITRE ATLAS) into quarantined review buffers.",
    telemetry: "TinyFish Crawler: 4 public advisories ingested. Zero code execution permitted.",
    icon: Radar,
    color: "#8CA9FF"
  },
  {
    step: "02",
    id: "approve",
    title: "Approve Safe Fixtures",
    desc: "Security engineers review sanitized attack vectors, assign synthetic canary tokens, and attach boundary policies before any test can execute.",
    telemetry: "Gatekeeper: Approved TC-8921. Canary bound: CANARY-AIRLOCK-SEC-8921.",
    icon: ShieldCheck,
    color: "#75D6B1"
  },
  {
    step: "03",
    id: "execute",
    title: "Execute Inside Airgapped Broker",
    desc: "Red Team workloads and Client Models run in isolated chambers. Every packet transits the Central Policy Broker for microsecond policy enforcement.",
    telemetry: "Broker Transit: Rule SEC-POL-01 active. Quarantined 1 probe. Zero model contamination.",
    icon: Cpu,
    color: "#ADA4F5"
  },
  {
    step: "04",
    id: "verify",
    title: "Cryptographically Verify Evidence",
    desc: "Audit events form a canonical SHA-256 hash chain sealed with an Ed25519 signature. Receipts can be independently audited offline via open-source CLI.",
    telemetry: "Ed25519 Root Hash: 208307772a5a... Sealed and untampered.",
    icon: Fingerprint,
    color: "#85D8E7"
  }
];

const TRUST_PILLARS = [
  {
    icon: Cpu,
    color: "#8CA9FF",
    title: "Isolate sensitive evaluations",
    description: "Separate adversarial red-team execution from client model weights and defensive tools. No test workload can inspect another customer\u2019s prompts or canary tokens.",
    features: ["Airgapped Execution Boundaries", "Cross-Tenant Memory Segregation"]
  },
  {
    icon: Shield,
    color: "#75D6B1",
    title: "Control every test interaction",
    description: "All traffic between red team and model passes through the Central Policy Broker. Enforce network egress boundaries, rate limits, canary masking, and payload size controls.",
    features: ["Live Microsecond Policy Decisions", "Synthetic Canary Token Guarding"]
  },
  {
    icon: Fingerprint,
    color: "#ADA4F5",
    title: "Verify the evidence independently",
    description: "Receive Ed25519-signed audit receipts backed by SHA-256 canonical event chaining. Anyone can verify receipts with our portable zero-dependency Python verifier.",
    features: ["Cryptographic Tamper-Evidence", "Portable Offline Python CLI Verifier"]
  }
];

// Fade-in animation variants
const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col">
      <Navbar />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-16 pb-28 overflow-hidden border-b border-white/[0.06]">
        {/* Ambient background orbs */}
        <AmbientOrb color="#8CA9FF" size={800} blur={140} opacity={0.07} position="center" />
        <AmbientOrb color="#ADA4F5" size={400} blur={100} opacity={0.05} position="top-right" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto space-y-7"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111B2E]/80 border border-[#8CA9FF]/20 text-xs font-mono text-[#8CA9FF] shadow-[0_0_24px_rgba(140,169,255,0.12)] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#75D6B1] animate-pulse" />
              AI EVALUATION SECURITY INFRASTRUCTURE
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F6FC] leading-[1.1]">
              AI safety testing you can{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F6FC] via-[#B3C0D4] to-[#8CA9FF]">
                actually trust.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-[#B3C0D4] max-w-2xl mx-auto leading-relaxed">
              Run adversarial AI evaluations inside controlled environments, prevent canary contamination, and produce independently verifiable cryptographic evidence.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/evaluations/studio"
                className="w-full sm:w-auto clay-btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold"
              >
                <span>Launch Evaluation Studio</span>
                <ArrowRight className="w-4 h-4 text-[#8CA9FF]" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto clay-btn-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium"
              >
                <span>Book Architectural Demo</span>
              </Link>
            </motion.div>

            {/* Micro-proof badges */}
            <motion.div variants={fadeUp} custom={4} className="pt-1 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <StatusBadge variant="safe" dot>Zero Canary Exfiltration</StatusBadge>
              <StatusBadge variant="info" dot>Ed25519 Signed Receipts</StatusBadge>
              <StatusBadge variant="safe" dot>Airgapped Broker Boundary</StatusBadge>
            </motion.div>
          </motion.div>

          {/* Hero Architecture Asset */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] bg-[#0A101C]">
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

              {/* Overlay Card */}
              <GlassPanel intensity="strong" padding="none" className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#8CA9FF]/10 border border-[#8CA9FF]/20 flex items-center justify-center text-[#8CA9FF] shrink-0">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#F4F6FC] flex items-center gap-2">
                      <span>LIVE BROKER TOPOLOGY: AIRGAPPED MODE</span>
                      <StatusBadge variant="safe" dot pulseDot>ENFORCING</StatusBadge>
                    </p>
                    <p className="text-xs text-[#B3C0D4] font-mono">
                      Red Team [Chamber 01] ➔ Central Policy Broker ➔ Protected Target [Chamber 02]
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-[#8191AB]">
                  <div>
                    <span className="text-[#B3C0D4]">Latency:</span>{" "}
                    <span className="text-[#75D6B1]">4.2ms</span>
                  </div>
                  <div>
                    <span className="text-[#B3C0D4]">Canary:</span>{" "}
                    <span className="text-[#8CA9FF]">SHIELDED</span>
                  </div>
                  <Link
                    href="/evaluations/studio"
                    className="clay-btn-secondary px-3 py-1.5 rounded-lg text-[11px] font-medium"
                  >
                    Inspect Studio ➔
                  </Link>
                </div>
              </GlassPanel>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST ARCHITECTURE STRIP ═══ */}
      <section className="py-14 border-b border-white/[0.06] bg-[#0E1626]/30">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-mono uppercase tracking-widest text-[#8191AB]">
            BUILT FOR AI TEAMS, PLATFORM ARCHITECTS & RED-TEAM CONSULTANCIES
          </motion.p>
          <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
            {[
              { label: "CHAMBER ISOLATION", title: "Zero Memory Contamination", desc: "Attack payloads cannot leak across tenant model boundaries.", color: "#8CA9FF" },
              { label: "POLICY BROKER", title: "Microsecond Inspection", desc: "Every evaluation request is authorized against active security rules.", color: "#75D6B1" },
              { label: "AUDIT INTEGRITY", title: "Ed25519 & SHA-256", desc: "Audit logs are tamper-evident and independently verifiable offline.", color: "#ADA4F5" },
              { label: "THREAT INTEL", title: "Safe Web Research", desc: "TinyFish parses public vulnerabilities into safe review fixtures.", color: "#85D8E7" },
            ].map((item) => (
              <div key={item.label} className="clay-surface p-4 text-left space-y-1.5">
                <p className="text-[11px] font-mono" style={{ color: item.color }}>{item.label}</p>
                <p className="text-sm font-semibold text-[#F4F6FC]">{item.title}</p>
                <p className="text-xs text-[#8191AB] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ═══ 3 CORE VALUE PILLARS ═══ */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimatedSection className="text-center max-w-3xl mx-auto space-y-3">
            <motion.span variants={fadeUp} custom={0} className="text-xs font-mono text-[#8CA9FF] uppercase tracking-wider">CORE PROMISE</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[#F4F6FC] leading-tight">
              Secure the evaluation process.{" "}
              <br className="hidden sm:inline" />
              Make its results accountable.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#B3C0D4] text-base">
              Traditional safety testing exposes sensitive prompts, leaks canary tokens, and produces unverifiable text logs. AIRLOCK AI provides a verifiable infrastructure layer.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRUST_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title} variants={fadeUp} custom={idx}>
                  <ClayCard variant="default" padding="lg" className="h-full space-y-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${pillar.color}15`,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: `${pillar.color}30`,
                        color: pillar.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#F4F6FC]">
                      {idx + 1}. {pillar.title}
                    </h3>
                    <p className="text-sm text-[#B3C0D4] leading-relaxed">
                      {pillar.description}
                    </p>
                    <div className="pt-3 border-t border-white/[0.06] space-y-2">
                      {pillar.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs font-mono text-[#8191AB]">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillar.color }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </ClayCard>
                </motion.div>
              );
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 4-STEP PIPELINE WALKTHROUGH ═══ */}
      <section className="py-24 border-b border-white/[0.06] bg-[#0A101C]/50 relative overflow-hidden">
        <AmbientOrb color="#ADA4F5" size={500} blur={120} opacity={0.04} position="bottom-right" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3">
            <motion.span variants={fadeUp} custom={0} className="text-xs font-mono text-[#8CA9FF] uppercase tracking-wider">END-TO-END FLOW</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[#F4F6FC]">
              Discover ➔ Approve ➔ Execute ➔ Verify
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#B3C0D4] text-sm">
              Click through the stages of the evaluation assurance pipeline to see how policies and audit seals protect each step.
            </motion.p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step Selection */}
            <div className="lg:col-span-5 space-y-2.5">
              {WORKFLOW_STEPS.map((s, idx) => {
                const StepIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      activeStep === idx
                        ? "clay-card border-[#8CA9FF]/30"
                        : "bg-[#111B2E]/40 border-white/[0.06] hover:bg-[#111B2E]/80 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          backgroundColor: activeStep === idx ? `${s.color}20` : "rgba(255,255,255,0.04)",
                          color: activeStep === idx ? s.color : "#8191AB",
                        }}
                      >
                        <StepIcon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-semibold" style={{ color: s.color }}>
                            STEP {s.step}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#F4F6FC] mt-0.5">{s.title}</h4>
                        {activeStep === idx && (
                          <p className="text-xs text-[#B3C0D4] mt-1 line-clamp-2">{s.desc}</p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Telemetry Box */}
            <div className="lg:col-span-7 lg:sticky lg:top-24">
              <ClayCard variant="default" padding="lg" glow="periwinkle" className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <StatusBadge variant="safe" dot pulseDot>ACTIVE</StatusBadge>
                    <span className="text-xs font-mono text-[#F4F6FC] font-medium">
                      {WORKFLOW_STEPS[activeStep].title.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#8CA9FF]">
                    STEP {WORKFLOW_STEPS[activeStep].step} OF 04
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#F4F6FC]">
                    {WORKFLOW_STEPS[activeStep].title}
                  </h3>
                  <p className="text-sm text-[#B3C0D4] leading-relaxed">
                    {WORKFLOW_STEPS[activeStep].desc}
                  </p>
                </div>

                <ClayTerminal
                  prompt="broker@airlock-engine-01:~$"
                  status="ACTIVE"
                >
                  <p className="text-[#8CA9FF]">{">"} {WORKFLOW_STEPS[activeStep].telemetry}</p>
                  <p className="text-[#8191AB] text-[11px]">
                    Audit Chain Seq: #{activeStep + 1} | Cryptographic Hash: SHA-256(H_{activeStep} || canonical_payload)
                  </p>
                </ClayTerminal>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href="/evaluations/studio"
                    className="clay-btn-primary inline-flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl font-semibold"
                  >
                    <span>Test In Evaluation Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8CA9FF]" />
                  </Link>
                  <StatusBadge variant="info">Policy Enforced</StatusBadge>
                </div>
              </ClayCard>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE SPOTLIGHTS ═══ */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {/* Feature 1: Evaluation Architecture */}
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} custom={0} className="space-y-6">
              <span className="text-xs font-mono text-[#8CA9FF] uppercase tracking-wider">CHAMBER ISOLATION</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F6FC] leading-snug">
                Physical Separation for Red Teams and Client Models
              </h3>
              <p className="text-sm text-[#B3C0D4] leading-relaxed">
                Most AI evaluation runs take place inside monolithic testing containers where red-team payloads, model context, and internal tools share memory. AIRLOCK enforces a three-chamber isolation boundary connected strictly via the central policy broker.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="clay-surface p-3.5 space-y-1">
                  <p className="text-[11px] font-mono text-[#75D6B1]">ZERO CONTAMINATION</p>
                  <p className="text-xs text-[#B3C0D4]">Attack payloads cannot touch client memory outside approved broker channels.</p>
                </div>
                <div className="clay-surface p-3.5 space-y-1">
                  <p className="text-[11px] font-mono text-[#8CA9FF]">LATENCY TELEMETRY</p>
                  <p className="text-xs text-[#B3C0D4]">Under 5ms policy inspection overhead on standard evaluation pipelines.</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A101C]">
              <Image src="/assets/eval_architecture.jpg" alt="Evaluation Architecture Chambers" fill className="object-cover" />
            </motion.div>
          </AnimatedSection>

          {/* Feature 2: Cryptographic Receipts */}
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} custom={0} className="order-2 lg:order-1 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A101C]">
              <Image src="/assets/crypto_evidence.jpg" alt="Cryptographic Signed Receipts" fill className="object-cover" />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="order-1 lg:order-2 space-y-6">
              <span className="text-xs font-mono text-[#75D6B1] uppercase tracking-wider">CRYPTOGRAPHIC ACCOUNTABILITY</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F6FC] leading-snug">
                Ed25519 Digital Seals and SHA-256 Event Chaining
              </h3>
              <p className="text-sm text-[#B3C0D4] leading-relaxed">
                Did the safety evaluation actually happen as reported? With AIRLOCK, every event—from payload ingestion to policy denial—is cryptographically bound to the previous event in a canonical hash chain and sealed with an Ed25519 digital signature.
              </p>
              <div className="terminal-block p-3.5 text-xs">
                <p className="text-[#75D6B1]">Proof Verification:</p>
                <p className="text-[#B3C0D4] mt-1">
                  Run our open-source <span className="text-[#F4F6FC] font-medium">cli_verifier.py</span> offline to validate receipts with zero third-party dependencies.
                </p>
              </div>
              <Link href="/vault" className="clay-btn-primary inline-flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl font-semibold">
                <span>Inspect Evidence Vault</span>
                <ChevronRight className="w-4 h-4 text-[#8CA9FF]" />
              </Link>
            </motion.div>
          </AnimatedSection>

          {/* Feature 3: Threat Intelligence */}
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} custom={0} className="space-y-6">
              <span className="text-xs font-mono text-[#ADA4F5] uppercase tracking-wider">SOURCE-BACKED THREAT INTEL</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F6FC] leading-snug">
                TinyFish Curated Research Ingestion Without Code Execution
              </h3>
              <p className="text-sm text-[#B3C0D4] leading-relaxed">
                Connect external model security research (OWASP GenAI Top 10, NIST AI RMF, MITRE ATLAS) into your evaluation lifecycle without allowing unvetted external scripts to run inside privileged environments.
              </p>
              <div className="clay-surface p-4 space-y-2 text-xs">
                <p className="font-mono text-[#8CA9FF]">Strict Untrusted-Evidence Boundary:</p>
                <p className="text-[#B3C0D4]">
                  TinyFish browsing modules operate in quarantined read-only contexts with strict source allowlisting. Public vectors require explicit human approval before conversion into test cases.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A101C]">
              <Image src="/assets/threat_intel.jpg" alt="Threat Intelligence Stream" fill className="object-cover" />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#070D18] relative overflow-hidden">
        <AmbientOrb color="#8CA9FF" size={600} blur={140} opacity={0.06} position="center" />
        
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div variants={fadeUp} custom={0} className="inline-flex p-3.5 rounded-2xl bg-[#8CA9FF]/10 border border-[#8CA9FF]/20 text-[#8CA9FF] mb-2">
            <ShieldCheck className="w-8 h-8" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-5xl font-extrabold text-[#F4F6FC] tracking-tight">
            Make every AI evaluation accountable.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-base sm:text-lg text-[#B3C0D4] max-w-xl mx-auto">
            Ready to isolate adversarial workloads, prevent canary exfiltration, and generate verifiable audit proofs?
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/evaluations/studio"
              className="w-full sm:w-auto clay-btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold"
            >
              <span>Start Evaluating</span>
              <ArrowRight className="w-4 h-4 text-[#8CA9FF]" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto clay-btn-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium"
            >
              <span>Talk to Solutions Engineering</span>
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
