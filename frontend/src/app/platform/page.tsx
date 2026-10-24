import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Cpu, ArrowRight, Lock, CheckCircle2, Server, Eye, Fingerprint, Zap } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121C30] border border-[#86A8FF]/20 text-xs font-mono text-[#86A8FF]">
              SYSTEM ARCHITECTURE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F4F6FB] tracking-tight">
              The Three-Chamber Evaluation Architecture
            </h1>
            <p className="text-lg text-[#ADBBD0] leading-relaxed">
              AIRLOCK AI decouples the adversarial testing harness from the target model environment. Every request is mediated by a low-latency, deterministic policy broker that enforces isolation, protects sensitive canaries, and constructs canonical cryptographic receipts.
            </p>
          </div>

          {/* Architecture Illustration */}
          <div className="mt-12 relative aspect-[16/9] max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A101C]">
            <Image
              src="/assets/eval_architecture.jpg"
              alt="Airlock Architecture Diagram"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Deep-Dive on the 3 Chambers */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-[#F4F6FB]">Chamber Dissection</h2>
            <p className="text-sm text-[#ADBBD0]">
              How execution environments are partitioned to prevent cross-contamination and guarantee reproducible audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chamber 1 */}
            <div className="clay-card chamber-red p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#E5838F] font-semibold">CHAMBER 01</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E5838F]/10 text-[#E5838F]">UNTRUSTED WORKLOAD</span>
              </div>
              <h3 className="text-xl font-bold text-[#F4F6FB]">Red Team Chamber</h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                Contains the adversarial evaluation runner, prompt mutation scripts, jailbreak suites, and test case vectors. Restricted from direct model access or external unapproved network egress.
              </p>
              <ul className="text-xs text-[#7587A4] space-y-2 pt-4 border-t border-white/[0.06] font-mono">
                <li>• No direct IP access to client infrastructure</li>
                <li>• Quarantined memory space</li>
                <li>• Synthetic canary tracking enabled</li>
              </ul>
            </div>

            {/* Chamber 2 */}
            <div className="clay-card chamber-broker p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#86A8FF] font-semibold">CORE BROKER</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#86A8FF]/10 text-[#86A8FF]">AIRGAPPED GATE</span>
              </div>
              <h3 className="text-xl font-bold text-[#F4F6FB]">Central Policy Broker</h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                The security boundary. Inspects every incoming payload in real time against organization rules (SEC-POL). Decides whether to ALLOW, DENY, or REDACT before packet transit.
              </p>
              <ul className="text-xs text-[#7587A4] space-y-2 pt-4 border-t border-white/[0.06] font-mono">
                <li>• Sub-5ms policy evaluation</li>
                <li>• Deterministic canary detection</li>
                <li>• In-flight payload hashing</li>
              </ul>
            </div>

            {/* Chamber 3 */}
            <div className="clay-card chamber-blue p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#68CFA9] font-semibold">CHAMBER 02</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#68CFA9]/10 text-[#68CFA9]">PROTECTED MODEL</span>
              </div>
              <h3 className="text-xl font-bold text-[#F4F6FB]">Client Model Chamber</h3>
              <p className="text-sm text-[#ADBBD0] leading-relaxed">
                Houses the target model weights or private inference proxy. Completely isolated from the red-team environment. Canary tokens embedded in system instructions cannot be probed directly.
              </p>
              <ul className="text-xs text-[#7587A4] space-y-2 pt-4 border-t border-white/[0.06] font-mono">
                <li>• Zero model contamination</li>
                <li>• Protected system context & canary tokens</li>
                <li>• Clean response isolation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-20 border-b border-white/[0.06] bg-[#0A101C]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F6FB]">
              Standard Testing vs. AIRLOCK Assurance
            </h2>
            <p className="text-xs text-[#ADBBD0]">
              Why ad-hoc evaluation scripts fail enterprise security requirements.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#121C30]/70">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#1B2942] text-[#ADBBD0] border-b border-white/10 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Security Capability</th>
                  <th className="p-4 text-[#E5838F]">Standard LLM Eval Script</th>
                  <th className="p-4 text-[#68CFA9]">AIRLOCK AI Infrastructure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-[#F4F6FB]">
                <tr>
                  <td className="p-4 font-semibold text-[#ADBBD0]">Execution Isolation</td>
                  <td className="p-4 text-[#E5838F]">Shared container / shared memory</td>
                  <td className="p-4 text-[#68CFA9]">Three isolated chambers with broker boundary</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#ADBBD0]">Canary Protection</td>
                  <td className="p-4 text-[#E5838F]">Canary tokens leak through debug logs</td>
                  <td className="p-4 text-[#68CFA9]">Deterministic canary detection & auto-quarantine</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#ADBBD0]">Policy Control</td>
                  <td className="p-4 text-[#E5838F]">None / Hardcoded post-hoc check</td>
                  <td className="p-4 text-[#68CFA9]">Active in-transit broker enforcement (ALLOW/DENY)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#ADBBD0]">Audit Verifiability</td>
                  <td className="p-4 text-[#E5838F]">Unsigned flat JSON / easily edited text</td>
                  <td className="p-4 text-[#68CFA9]">Ed25519 digital signature & SHA-256 canonical chain</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#ADBBD0]">Offline Independent Audit</td>
                  <td className="p-4 text-[#E5838F]">Impossible to verify independently</td>
                  <td className="p-4 text-[#68CFA9]">Portable zero-dependency Python CLI verifier</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
