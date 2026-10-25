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
    color: "#16A34A"
  },
  {
    step: "02",
    id: "approve",
    title: "Approve Safe Fixtures",
    desc: "Security engineers review sanitized attack vectors, assign synthetic canary tokens, and attach boundary policies before any test can execute.",
    telemetry: "Gatekeeper: Approved TC-8921. Canary bound: CANARY-AIRLOCK-SEC-8921.",
    icon: ShieldCheck,
    color: "#15803D"
  },
  {
    step: "03",
    id: "execute",
    title: "Execute Inside Isolated Environment",
    desc: "Red Team workloads and Client Models run in isolated chambers. Every packet transits the Central Policy Engine for microsecond policy enforcement.",
    telemetry: "Policy Engine Transit: Rule SEC-POL-01 active. Quarantined 1 probe. Zero model contamination.",
    icon: Cpu,
    color: "#0D9488"
  },
  {
    step: "04",
    id: "verify",
    title: "Cryptographically Verify Evidence",
    desc: "Audit events form a canonical SHA-256 hash chain sealed with an Ed25519 signature. Receipts can be independently audited offline via open-source CLI.",
    telemetry: "Ed25519 Root Hash: 208307772a5a... Sealed and untampered.",
    icon: Fingerprint,
    color: "#166534"
  }
];

const TRUST_PILLARS = [
  {
    icon: Cpu,
    color: "#16A34A",
    title: "Isolate sensitive evaluations",
    description: "Separate adversarial red-team execution from client model weights and defensive tools. No test workload can inspect another customer\u2019s prompts or canary tokens.",
    features: ["Isolated Execution Boundaries", "Cross-Tenant Memory Segregation"]
  },
  {
    icon: Shield,
    color: "#0D9488",
    title: "Control every test interaction",
    description: "All traffic between red team and model passes through the Central Policy Engine. Enforce network egress boundaries, rate limits, canary masking, and payload size controls.",
    features: ["Live Microsecond Policy Decisions", "Synthetic Canary Token Guarding"]
  },
  {
    icon: Fingerprint,
    color: "#15803D",
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
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">
      <Navbar />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-16 pb-28 overflow-hidden border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto space-y-7"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F0F7F4] border border-[#16A34A]/20 text-xs font-medium text-[#15803D]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              AI Evaluation Security Infrastructure
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1E293B] leading-[1.1]">
              AI safety testing you can{" "}
              <br className="hidden sm:inline" />
              <span className="text-[#16A34A]">
                actually trust.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed">
              Run adversarial AI evaluations inside controlled environments, prevent canary contamination, and produce independently verifiable cryptographic evidence.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/evaluations/studio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors shadow-sm"
              >
                <span>Launch Evaluation Studio</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium bg-white text-[#1E293B] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFB] transition-colors"
              >
                <span>Book Architectural Demo</span>
              </Link>
            </motion.div>

            {/* Micro-proof badges */}
            <motion.div variants={fadeUp} custom={4} className="pt-1 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#15803D] bg-[#F0F7F4] border border-[#16A34A]/15 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Zero Canary Exfiltration
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0D9488] bg-[#F0FDFA] border border-[#0D9488]/15 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                Ed25519 Signed Receipts
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#15803D] bg-[#F0F7F4] border border-[#16A34A]/15 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Isolated Policy Boundary
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Architecture Asset */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg bg-white">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/assets/hero_architecture.jpg"
                  alt="AIRLOCK AI Three-Chamber Isolated Security Architecture"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
              </div>

              {/* Overlay Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F7F4] border border-[#16A34A]/20 flex items-center justify-center text-[#16A34A] shrink-0">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1E293B] flex items-center gap-2">
                      <span>Live Policy Topology: Isolated Mode</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#15803D] bg-[#F0F7F4] border border-[#16A34A]/15 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                        Active
                      </span>
                    </p>
                    <p className="text-xs text-[#64748B] font-mono">
                      Red Team [Chamber 01] ➔ Central Policy Engine ➔ Protected Target [Chamber 02]
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-[#94A3B8]">
                  <div>
                    <span className="text-[#64748B]">Latency:</span>{" "}
                    <span className="text-[#16A34A]">4.2ms</span>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Canary:</span>{" "}
                    <span className="text-[#0D9488]">Shielded</span>
                  </div>
                  <Link
                    href="/evaluations/studio"
                    className="px-3 py-1.5 rounded-lg text-[11px] font-medium bg-white border border-[#E2E8F0] text-[#1E293B] hover:border-[#CBD5E1] hover:bg-[#F8FAFB] transition-colors"
                  >
                    Inspect Studio ➔
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST ARCHITECTURE STRIP ═══ */}
      <section className="py-14 border-b border-[#E2E8F0] bg-[#F8FAFB]">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <motion.p variants={fadeUp} custom={0} className="text-xs font-medium uppercase tracking-widest text-[#94A3B8]">
            Built for AI teams, platform architects &amp; red-team consultancies
          </motion.p>
          <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
            {[
              { label: "Isolation", title: "Zero Memory Contamination", desc: "Attack payloads cannot leak across tenant model boundaries.", color: "#16A34A" },
              { label: "Policy Engine", title: "Microsecond Inspection", desc: "Every evaluation request is authorized against active security rules.", color: "#15803D" },
              { label: "Audit Integrity", title: "Ed25519 & SHA-256", desc: "Audit logs are tamper-evident and independently verifiable offline.", color: "#0D9488" },
              { label: "Threat Intel", title: "Safe Web Research", desc: "TinyFish parses public vulnerabilities into safe review fixtures.", color: "#166534" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-left space-y-1.5 hover:border-[#CBD5E1] transition-colors">
                <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: item.color }}>{item.label}</p>
                <p className="text-sm font-semibold text-[#1E293B]">{item.title}</p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ═══ 3 CORE VALUE PILLARS ═══ */}
      <section className="py-24 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <AnimatedSection className="text-center max-w-3xl mx-auto space-y-3">
            <motion.span variants={fadeUp} custom={0} className="text-xs font-semibold text-[#16A34A] uppercase tracking-wider">Core Promise</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[#1E293B] leading-tight">
              Secure the evaluation process.{" "}
              <br className="hidden sm:inline" />
              Make its results accountable.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#64748B] text-base">
              Traditional safety testing exposes sensitive prompts, leaks canary tokens, and produces unverifiable text logs. Airlock provides a verifiable infrastructure layer.
            </motion.p>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRUST_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={pillar.title} variants={fadeUp} custom={idx}>
                  <div className="h-full bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-5 hover:border-[#CBD5E1] hover:shadow-sm transition-all">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${pillar.color}12`,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: `${pillar.color}25`,
                        color: pillar.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1E293B]">
                      {idx + 1}. {pillar.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {pillar.description}
                    </p>
                    <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                      {pillar.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-[#475569]">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillar.color }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 4-STEP PIPELINE WALKTHROUGH ═══ */}
      <section className="py-24 border-b border-[#E2E8F0] bg-[#F8FAFB] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3">
            <motion.span variants={fadeUp} custom={0} className="text-xs font-semibold text-[#16A34A] uppercase tracking-wider">End-to-End Flow</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-bold text-[#1E293B]">
              Discover ➔ Approve ➔ Execute ➔ Verify
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#64748B] text-sm">
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
                        ? "bg-white border-[#16A34A]/30 shadow-sm"
                        : "bg-white/60 border-[#E2E8F0] hover:bg-white hover:border-[#CBD5E1]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          backgroundColor: activeStep === idx ? `${s.color}15` : "#F8FAFB",
                          color: activeStep === idx ? s.color : "#94A3B8",
                        }}
                      >
                        <StepIcon className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold" style={{ color: s.color }}>
                            Step {s.step}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#1E293B] mt-0.5">{s.title}</h4>
                        {activeStep === idx && (
                          <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{s.desc}</p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Telemetry Box */}
            <div className="lg:col-span-7 lg:sticky lg:top-24">
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#15803D] bg-[#F0F7F4] border border-[#16A34A]/15 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                      Active
                    </span>
                    <span className="text-xs text-[#1E293B] font-medium">
                      {WORKFLOW_STEPS[activeStep].title}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#16A34A]">
                    Step {WORKFLOW_STEPS[activeStep].step} of 04
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#1E293B]">
                    {WORKFLOW_STEPS[activeStep].title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {WORKFLOW_STEPS[activeStep].desc}
                  </p>
                </div>

                <div className="bg-[#F8FAFB] rounded-lg border border-[#E2E8F0] p-4 font-mono text-sm">
                  <p className="text-[#16A34A]">{">"} {WORKFLOW_STEPS[activeStep].telemetry}</p>
                  <p className="text-[#94A3B8] text-[11px] mt-1">
                    Audit Chain Seq: #{activeStep + 1} | Cryptographic Hash: SHA-256(H_{activeStep} || canonical_payload)
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href="/evaluations/studio"
                    className="inline-flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl font-semibold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors shadow-sm"
                  >
                    <span>Test In Evaluation Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                  <span className="inline-flex items-center text-xs font-medium text-[#0D9488] bg-[#F0FDFA] border border-[#0D9488]/15 px-2.5 py-1 rounded-full">
                    Policy Enforced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE SPOTLIGHTS ═══ */}
      <section className="py-24 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {/* Feature 1: Evaluation Architecture */}
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} custom={0} className="space-y-6">
              <span className="text-xs font-semibold text-[#16A34A] uppercase tracking-wider">Chamber Isolation</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B] leading-snug">
                Physical Separation for Red Teams and Client Models
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Most AI evaluation runs take place inside monolithic testing containers where red-team payloads, model context, and internal tools share memory. Airlock enforces a three-chamber isolation boundary connected strictly via the central policy engine.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8FAFB] rounded-xl border border-[#E2E8F0] p-3.5 space-y-1">
                  <p className="text-[11px] font-semibold text-[#15803D] uppercase tracking-wide">Zero Contamination</p>
                  <p className="text-xs text-[#64748B]">Attack payloads cannot touch client memory outside approved channels.</p>
                </div>
                <div className="bg-[#F8FAFB] rounded-xl border border-[#E2E8F0] p-3.5 space-y-1">
                  <p className="text-[11px] font-semibold text-[#16A34A] uppercase tracking-wide">Low Latency</p>
                  <p className="text-xs text-[#64748B]">Under 5ms policy inspection overhead on standard evaluation pipelines.</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg bg-[#F8FAFB]">
              <Image src="/assets/eval_architecture.jpg" alt="Evaluation Architecture Chambers" fill className="object-cover" />
            </motion.div>
          </AnimatedSection>

          {/* Feature 2: Cryptographic Receipts */}
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} custom={0} className="order-2 lg:order-1 relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg bg-[#F8FAFB]">
              <Image src="/assets/crypto_evidence.jpg" alt="Cryptographic Signed Receipts" fill className="object-cover" />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="order-1 lg:order-2 space-y-6">
              <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider">Cryptographic Accountability</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B] leading-snug">
                Ed25519 Digital Seals and SHA-256 Event Chaining
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Did the safety evaluation actually happen as reported? With Airlock, every event—from payload ingestion to policy denial—is cryptographically bound to the previous event in a canonical hash chain and sealed with an Ed25519 digital signature.
              </p>
              <div className="bg-[#F8FAFB] rounded-xl border border-[#E2E8F0] p-3.5 text-xs">
                <p className="text-[#15803D] font-semibold">Proof Verification:</p>
                <p className="text-[#64748B] mt-1">
                  Run our open-source <span className="text-[#1E293B] font-medium font-mono">cli_verifier.py</span> offline to validate receipts with zero third-party dependencies.
                </p>
              </div>
              <Link href="/vault" className="inline-flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl font-semibold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors shadow-sm">
                <span>Inspect Evidence Vault</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </Link>
            </motion.div>
          </AnimatedSection>

          {/* Feature 3: Threat Intelligence */}
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} custom={0} className="space-y-6">
              <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider">Source-Backed Threat Intel</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B] leading-snug">
                TinyFish Curated Research Ingestion Without Code Execution
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Connect external model security research (OWASP GenAI Top 10, NIST AI RMF, MITRE ATLAS) into your evaluation lifecycle without allowing unvetted external scripts to run inside privileged environments.
              </p>
              <div className="bg-[#F8FAFB] rounded-xl border border-[#E2E8F0] p-4 space-y-2 text-xs">
                <p className="font-semibold text-[#16A34A]">Strict Untrusted-Evidence Boundary:</p>
                <p className="text-[#64748B]">
                  TinyFish browsing modules operate in quarantined read-only contexts with strict source allowlisting. Public vectors require explicit human approval before conversion into test cases.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg bg-[#F8FAFB]">
              <Image src="/assets/threat_intel.jpg" alt="Threat Intelligence Stream" fill className="object-cover" />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ 10 TEST CASES & SCENIC LAB SHOWCASE (LOCKSCREEN PICTURE INSPIRED) ═══ */}
      <section className="py-20 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#16A34A] uppercase tracking-wider">
              Comprehensive Safety Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">
              10 Automated AI Security Test Cases
            </h2>
            <p className="text-sm text-[#64748B]">
              Tested against OWASP GenAI Top 10 and MITRE ATLAS matrices inside our verified staging environments.
            </p>
          </AnimatedSection>

          {/* Scenic Landscape Frame with Floating Security Widget */}
          <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md max-w-5xl mx-auto">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src="/assets/scenic_landscape.jpg"
                alt="Ona Coastal Staging Station"
                fill
                className="object-cover object-center filter brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />

              {/* Floating Windows Lock Screen Style Widget */}
              <div className="absolute top-6 left-6 z-10 p-4 rounded-xl bg-white/85 backdrop-blur-md border border-white/80 shadow-lg max-w-xs text-xs text-[#1E293B] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#15803D] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                    Security Baseline: Clear
                  </span>
                  <span className="font-mono text-[10px] bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full font-bold">
                    22°C Safe
                  </span>
                </div>
                <p className="text-[#475569] text-[11px] leading-relaxed">
                  Real-time assurance station monitoring autonomous business transactions and canary token boundaries.
                </p>
                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#64748B]">
                  <span>Ona Station Node</span>
                  <span className="font-mono text-[#16A34A] font-bold">10/10 Shielded</span>
                </div>
              </div>

              {/* 10 Test Cases Chips overlaying the landscape bottom */}
              <div className="absolute bottom-6 left-6 right-6 z-10 p-5 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-lg">
                <div className="text-xs font-bold text-[#1E293B] mb-3 flex items-center justify-between">
                  <span>Active Test Fixtures Suite:</span>
                  <Link
                    href="/evaluations/studio"
                    className="text-[11px] text-[#16A34A] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Launch Evaluation Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                  {[
                    "1. Unauthorized Tool Access",
                    "2. Prompt Injection",
                    "3. Out-of-Bounds SSRF",
                    "4. Base64 Exfiltration",
                    "5. Autonomous Refund Logic",
                    "6. Cross-Tenant Bleed",
                    "7. Poisoned RAG Injection",
                    "8. Memory Inversion",
                    "9. Recursive DoS Loops",
                    "10. Output Shell Injection",
                  ].map((name, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] font-medium text-center truncate"
                      title={name}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 bg-[#F0F7F4] relative overflow-hidden">
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div variants={fadeUp} custom={0} className="inline-flex p-3.5 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/20 text-[#16A34A] mb-2">
            <ShieldCheck className="w-8 h-8" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight">
            Make every AI evaluation accountable.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            Ready to isolate adversarial workloads, prevent canary exfiltration, and generate verifiable audit proofs?
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/evaluations/studio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors shadow-sm"
            >
              <span>Start Evaluating</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium bg-white text-[#1E293B] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFB] transition-colors"
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
