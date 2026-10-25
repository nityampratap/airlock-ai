import Link from "next/link";
import { Terminal, Copy, ArrowRight, ShieldCheck, FileCode, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-[#E2E8F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-mono text-[#16A34A]">
            DEVELOPER & ARCHITECTURE MANUAL
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight">
            Documentation & Implementation Guide
          </h1>
          <p className="text-lg text-[#64748B] max-w-2xl leading-relaxed">
            Everything you need to configure broker policies, execute isolated evaluations, and independently verify Ed25519-signed audit receipts.
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Docs Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-1 text-xs font-mono">
              <p className="text-[#16A34A] font-bold uppercase tracking-wider pb-2">Getting Started</p>
              <a href="#quickstart" className="block py-1.5 text-[#64748B] hover:text-[#1E293B]">1. Quickstart</a>
              <a href="#lifecycle" className="block py-1.5 text-[#64748B] hover:text-[#1E293B]">2. Evaluation Lifecycle</a>
              <a href="#auth" className="block py-1.5 text-[#64748B] hover:text-[#1E293B]">3. API Authentication</a>
              <p className="text-[#16A34A] font-bold uppercase tracking-wider pt-4 pb-2">Verification & Engine</p>
              <a href="#cli-verifier" className="block py-1.5 text-[#64748B] hover:text-[#1E293B]">4. Portable CLI Verifier</a>
              <a href="#hash-chain" className="block py-1.5 text-[#64748B] hover:text-[#1E293B]">5. Hash Chaining Spec</a>
              <a href="#limitations" className="block py-1.5 text-[#64748B] hover:text-[#1E293B]">6. Known Limitations</a>
            </div>
          </div>

          {/* Docs Content */}
          <div className="lg:col-span-9 space-y-14">
            {/* Quickstart */}
            <div className="space-y-4" id="quickstart">
              <h2 className="text-2xl font-bold text-[#1E293B]">1. Quickstart: Running an Evaluation</h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Trigger a hardened evaluation run via our REST API. The broker intercepts any synthetic canaries and produces a sealed cryptographic receipt.
              </p>
              <div className="p-4 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] font-mono text-xs text-[#64748B] space-y-2">
                <p className="text-[#94A3B8]"># Launch hardened evaluation</p>
                <p className="text-[#16A34A]">curl -X POST http://localhost:8005/api/v1/evaluations/run \</p>
                <p className="pl-4 text-[#1E293B]">-H &quot;Authorization: Bearer $AIRLOCK_JWT&quot; \</p>
                <p className="pl-4 text-[#1E293B]">-H &quot;Content-Type: application/json&quot; \</p>
                <p className="pl-4 text-[#1E293B]">-d &apos;{JSON.stringify({ project_id: "prj_01", test_case_id: "tc_01", scenario_type: "scenario_b_hardened" })}&apos;</p>
              </div>
            </div>

            {/* Evaluation Lifecycle */}
            <div className="space-y-4" id="lifecycle">
              <h2 className="text-2xl font-bold text-[#1E293B]">2. Evaluation Lifecycle</h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                An AIRLOCK evaluation progresses through five unbypassable states:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#E2E8F0]">
                  <p className="text-[#16A34A] font-bold">1. EVAL_INIT</p>
                  <p className="text-[#94A3B8] mt-1">Chamber sandbox initialized; canary token registered.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#E2E8F0]">
                  <p className="text-[#16A34A] font-bold">2. PAYLOAD_INGESTION</p>
                  <p className="text-[#94A3B8] mt-1">Adversarial payload parsed into quarantined buffer.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#E2E8F0]">
                  <p className="text-[#16A34A] font-bold">3. BROKER_INSPECTION</p>
                  <p className="text-[#94A3B8] mt-1">Active policy evaluation (SEC-POL rule matching).</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#E2E8F0]">
                  <p className="text-[#7C3AED] font-bold">4. POLICY_DECISION</p>
                  <p className="text-[#94A3B8] mt-1">ALLOW or DENY enforced; client model context shielded.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#E2E8F0] sm:col-span-2">
                  <p className="text-[#16A34A] font-bold">5. EVAL_SEAL</p>
                  <p className="text-[#94A3B8] mt-1">Terminal SHA-256 root hash signed via Ed25519 private key.</p>
                </div>
              </div>
            </div>

            {/* CLI Verifier */}
            <div className="space-y-4" id="cli-verifier">
              <h2 className="text-2xl font-bold text-[#1E293B]">4. Portable CLI Verifier</h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                To guarantee zero vendor lock-in and authentic independent auditability, we supply a standalone Python CLI script (<code className="text-[#16A34A]">backend/cli_verifier.py</code>). It requires only standard Python with <code className="text-[#16A34A]">cryptography</code>.
              </p>
              <div className="p-4 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] font-mono text-xs text-[#64748B] space-y-2">
                <p className="text-[#94A3B8]"># Verify any downloaded receipt file</p>
                <p className="text-[#16A34A]">python backend/cli_verifier.py path/to/receipt.json</p>
                <p className="text-[#94A3B8] pt-2"># Test tamper detection rejection</p>
                <p className="text-[#DC2626]">python backend/cli_verifier.py path/to/receipt.json --tamper</p>
              </div>
            </div>

            {/* Limitations */}
            <div className="space-y-4" id="limitations">
              <h2 className="text-2xl font-bold text-[#1E293B]">6. Documented Limitations</h2>
              <p className="text-sm text-[#64748B] leading-relaxed">
                A signed receipt provides mathematical proof that an evaluation ran as specified and that the recorded audit trail is unaltered. It does not replace operational patch management or guarantee zero-day vulnerability immunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
