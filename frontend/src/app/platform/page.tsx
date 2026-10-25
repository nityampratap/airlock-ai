import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Cpu, ArrowRight, Lock, CheckCircle2, Server, Eye, Fingerprint, Zap } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-[#E2E8F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#16A34A]">
              SYSTEM ARCHITECTURE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight">
              The Three-Chamber Evaluation Architecture
            </h1>
            <p className="text-lg text-[#64748B] leading-relaxed">
              AIRLOCK AI decouples the adversarial testing harness from the target model environment. Every request is mediated by a low-latency, deterministic policy broker that enforces isolation, protects sensitive canaries, and constructs canonical cryptographic receipts.
            </p>
          </div>

          {/* Architecture Illustration */}
          <div className="mt-12 relative aspect-[16/9] max-w-5xl rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-2xl bg-white">
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
      <section className="py-20 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-[#1E293B]">Chamber Dissection</h2>
            <p className="text-sm text-[#64748B]">
              How execution environments are partitioned to prevent cross-contamination and guarantee reproducible audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chamber 1 */}
            <div className="clay-card chamber-red p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#DC2626] font-semibold">CHAMBER 01</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626]">UNTRUSTED WORKLOAD</span>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B]">Red Team Chamber</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Contains the adversarial evaluation runner, prompt mutation scripts, jailbreak suites, and test case vectors. Restricted from direct model access or external unapproved network egress.
              </p>
              <ul className="text-xs text-[#94A3B8] space-y-2 pt-4 border-t border-[#E2E8F0] font-mono">
                <li>• No direct IP access to client infrastructure</li>
                <li>• Quarantined memory space</li>
                <li>• Synthetic canary tracking enabled</li>
              </ul>
            </div>

            {/* Chamber 2 */}
            <div className="clay-card chamber-broker p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#16A34A] font-semibold">CORE BROKER</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A]">AIRGAPPED GATE</span>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B]">Central Policy Broker</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                The security boundary. Inspects every incoming payload in real time against organization rules (SEC-POL). Decides whether to ALLOW, DENY, or REDACT before packet transit.
              </p>
              <ul className="text-xs text-[#94A3B8] space-y-2 pt-4 border-t border-[#E2E8F0] font-mono">
                <li>• Sub-5ms policy evaluation</li>
                <li>• Deterministic canary detection</li>
                <li>• In-flight payload hashing</li>
              </ul>
            </div>

            {/* Chamber 3 */}
            <div className="clay-card chamber-blue p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#16A34A] font-semibold">CHAMBER 02</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A]">PROTECTED MODEL</span>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B]">Client Model Chamber</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Houses the target model weights or private inference proxy. Completely isolated from the red-team environment. Canary tokens embedded in system instructions cannot be probed directly.
              </p>
              <ul className="text-xs text-[#94A3B8] space-y-2 pt-4 border-t border-[#E2E8F0] font-mono">
                <li>• Zero model contamination</li>
                <li>• Protected system context & canary tokens</li>
                <li>• Clean response isolation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-20 border-b border-[#E2E8F0] bg-white/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
              Standard Testing vs. AIRLOCK Assurance
            </h2>
            <p className="text-xs text-[#64748B]">
              Why ad-hoc evaluation scripts fail enterprise security requirements.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#F0FDF4]/70">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F0FDF4] text-[#64748B] border-b border-[#E2E8F0] uppercase tracking-wider">
                <tr>
                  <th className="p-4">Security Capability</th>
                  <th className="p-4 text-[#DC2626]">Standard LLM Eval Script</th>
                  <th className="p-4 text-[#16A34A]">AIRLOCK AI Infrastructure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-[#1E293B]">
                <tr>
                  <td className="p-4 font-semibold text-[#64748B]">Execution Isolation</td>
                  <td className="p-4 text-[#DC2626]">Shared container / shared memory</td>
                  <td className="p-4 text-[#16A34A]">Three isolated chambers with broker boundary</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#64748B]">Canary Protection</td>
                  <td className="p-4 text-[#DC2626]">Canary tokens leak through debug logs</td>
                  <td className="p-4 text-[#16A34A]">Deterministic canary detection & auto-quarantine</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#64748B]">Policy Control</td>
                  <td className="p-4 text-[#DC2626]">None / Hardcoded post-hoc check</td>
                  <td className="p-4 text-[#16A34A]">Active in-transit broker enforcement (ALLOW/DENY)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#64748B]">Audit Verifiability</td>
                  <td className="p-4 text-[#DC2626]">Unsigned flat JSON / easily edited text</td>
                  <td className="p-4 text-[#16A34A]">Ed25519 digital signature & SHA-256 canonical chain</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#64748B]">Offline Independent Audit</td>
                  <td className="p-4 text-[#DC2626]">Impossible to verify independently</td>
                  <td className="p-4 text-[#16A34A]">Portable zero-dependency Python CLI verifier</td>
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
