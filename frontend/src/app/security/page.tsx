import Link from "next/link";
import { ShieldCheck, AlertTriangle, Fingerprint, Lock, CheckCircle2, Terminal, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-[#E2E8F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#16A34A]">
              SECURITY TRANSPARENCY & ASSURANCE
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight">
              Security Architecture & Trust Model
            </h1>
            <p className="text-lg text-[#64748B] leading-relaxed">
              We believe security claims must be backed by verifiable technical controls. Here is an honest, precise breakdown of how AIRLOCK isolates workloads, protects secrets, and seals evidence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section 1: Isolation Model */}
          <div className="clay-card p-8 space-y-4" id="isolation">
            <span className="text-xs font-mono text-[#16A34A]">01 / ISOLATION MODEL</span>
            <h2 className="text-2xl font-bold text-[#1E293B]">Chamber Boundary Guarantees</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              The evaluation harness (Red Team) and target model (Client Model) never share memory, disk volumes, or direct network sockets. All communications are mediated strictly via the Central Policy Broker.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-1.5">
                <p className="text-[#16A34A] font-semibold">Local & Pilot Environment</p>
                <p className="text-[#64748B]">Process namespace & container partitioning with strict broker socket mediation.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-1.5">
                <p className="text-[#16A34A] font-semibold">Enterprise Deployment</p>
                <p className="text-[#64748B]">Dedicated microVMs (Firecracker / gVisor) or physical self-hosted airgapped enclaves.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Cryptographic Audit Model */}
          <div className="clay-card p-8 space-y-4" id="cryptography">
            <span className="text-xs font-mono text-[#16A34A]">02 / CRYPTOGRAPHIC AUDIT MODEL</span>
            <h2 className="text-2xl font-bold text-[#1E293B]">Ed25519 & SHA-256 Canonical Chaining</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Every evaluation run produces an unalterable audit chain. Audit events are serialized into canonical, deterministic JSON (RFC 8785 subset) and chained using SHA-256. The terminal root hash is digitally signed with an Ed25519 private key stored in an encrypted vault.
            </p>
            <div className="p-4 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] font-mono text-xs space-y-2 text-[#64748B]">
              <p className="text-[#94A3B8]">// Canonical Chaining Formula</p>
              <p className="text-[#16A34A]">H_0 = 0x00000000...00 (64 zeros)</p>
              <p className="text-[#16A34A]">H_n = SHA-256(H_(n-1) || canonical_json(event_n))</p>
              <p className="text-[#16A34A]">Signature = Ed25519_Sign(Private_Key, H_root)</p>
            </div>
          </div>

          {/* Section 3: Known Limitations */}
          <div className="clay-card p-8 space-y-4 border-[#E8BB75]/30">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#E8BB75]" />
              <span className="text-xs font-mono text-[#E8BB75]">03 / SECURITY TRANSPARENCY & LIMITATIONS</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1E293B]">What AIRLOCK Guarantees & What It Does Not</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              We believe in technical honesty over marketing exaggeration:
            </p>
            <ul className="text-xs font-mono text-[#64748B] space-y-2.5 pt-2">
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">✓ DOES GUARANTEE:</span>
                <span>Audit events are cryptographically sealed and any modification to event order or payloads is mathematically detectable.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">✓ DOES GUARANTEE:</span>
                <span>The Central Policy Broker strictly mediates payloads between chambers and enforces active allow/deny policies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E8BB75] font-bold">✕ DOES NOT CLAIM:</span>
                <span>A signed receipt alone does not prove the model is 100% immune to novel, unknown attacks. It proves that the designated evaluation was executed faithfully without tampering.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#E8BB75] font-bold">✕ DOES NOT CLAIM:</span>
                <span>Shared-kernel Docker alone is not marketed as a hostile multi-tenant boundary. Production multi-tenancy requires dedicated microVMs or airgapped hardware.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Responsible Disclosure */}
          <div className="clay-card p-8 space-y-4" id="disclosure">
            <span className="text-xs font-mono text-[#7C3AED]">04 / VULNERABILITY DISCLOSURE</span>
            <h2 className="text-2xl font-bold text-[#1E293B]">Responsible Disclosure Policy</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              If you identify a security issue in our broker or cryptographic implementation, please report it to our security engineering team directly at:
            </p>
            <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#E2E8F0] inline-block font-mono text-sm text-[#16A34A]">
              security@airlock.ai (PGP Fingerprint available upon request)
            </div>
            <p className="text-xs text-[#94A3B8]">
              We commit to acknowledging all submissions within 24 hours and providing remediation progress updates.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
