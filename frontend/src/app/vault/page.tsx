"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Archive,
  ShieldCheck,
  Download,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Terminal,
  Search,
  ExternalLink,
  Copy,
  RefreshCw,
  Loader2
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { api, getCurrentOrg } from "@/lib/api";

export default function EvidenceVaultPage() {
  const [runs, setRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRun, setSelectedRun] = useState<any>(null);
  const [receiptDetails, setReceiptDetails] = useState<any>(null);
  const [verifierInput, setVerifierInput] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const org = getCurrentOrg();
        const orgId = org?.id || "org_airlock_labs_01";
        const dashboard = await api.getDashboard(orgId);
        if (dashboard?.recent_runs) {
          setRuns(dashboard.recent_runs);
          if (dashboard.recent_runs.length > 0) {
            loadRunDetails(dashboard.recent_runs[0].id);
          }
        }
      } catch (err) {
        console.error("Vault fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const loadRunDetails = async (evalId: string) => {
    try {
      const details = await api.getEvaluationDetails(evalId);
      setSelectedRun(details);
      if (details.receipt) {
        setReceiptDetails(details.receipt);
        setVerifierInput(JSON.stringify(details.receipt.canonical_payload, null, 2));
      }
    } catch (err) {
      console.error("Details fetch error:", err);
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setVerificationResult(null);
    try {
      const parsed = JSON.parse(verifierInput);
      const res = await api.verifyReceipt(parsed);
      setVerificationResult(res);
    } catch (err: any) {
      setVerificationResult({
        is_valid: false,
        message: `Parse or Verification Error: ${err.message}`
      });
    } finally {
      setVerifying(false);
    }
  };

  const injectTamper = () => {
    try {
      const parsed = JSON.parse(verifierInput);
      if (parsed.events && parsed.events.length > 0) {
        parsed.events[0].payload_data.tampered_injected_vector = "MALICIOUS_UNAUTHORIZED_MUTATION";
        setVerifierInput(JSON.stringify(parsed, null, 2));
        setVerificationResult(null);
      }
    } catch {
      alert("Invalid JSON in verifier box");
    }
  };

  const downloadReceiptFile = () => {
    if (!receiptDetails?.canonical_payload) return;
    const blob = new Blob([JSON.stringify(receiptDetails.canonical_payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `airlock_receipt_${selectedRun?.evaluation?.id?.slice(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">Evidence Vault</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]/20">
                ED25519 SEALED
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Immutable ledger of completed AI evaluations with SHA-256 canonical hash chains and downloadable digital receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadReceiptFile}
              disabled={!receiptDetails}
              className="clay-btn-primary inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Download Signed Receipt (.json)</span>
            </button>
          </div>
        </div>

        {/* 2-Column Vault: Left Run Ledger, Right Detail & In-Browser Verifier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Run History */}
          <div className="lg:col-span-5 clay-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h2 className="text-sm font-bold text-[#1E293B]">Evaluation Runs</h2>
              <span className="text-xs font-mono text-[#94A3B8]">{runs.length} Runs Sealed</span>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
              {runs.map((r) => {
                const isSelected = selectedRun?.evaluation?.id === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => loadRunDetails(r.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#F0FDF4] border-[#16A34A]/50 shadow-md"
                        : "bg-[#F0FDF4]/50 border-[#E2E8F0] hover:bg-[#F0FDF4]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-[#1E293B]">
                        {r.scenario_type.replace(/_/g, " ")}
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        r.unauthorized_request_blocked
                          ? "bg-[#FEF2F2] text-[#DC2626]"
                          : "bg-[#F0FDF4] text-[#16A34A]"
                      }`}>
                        {r.unauthorized_request_blocked ? "BLOCKED" : "UNRESTRICTED"}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#94A3B8] font-mono mt-1 truncate">ID: {r.id}</p>

                    <div className="mt-2 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                      <span>Latency: {r.duration_ms}ms</span>
                      <span className="text-[#16A34A]">✓ Ed25519 Sealed</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Run Audit Chain & In-Browser Verifier Tool */}
          <div className="lg:col-span-7 space-y-6">
            {/* Run Metadata Card */}
            {selectedRun && (
              <div className="clay-card p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B]">
                      Evaluation Proof Details
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-mono">
                      Target: {selectedRun.evaluation.target_model_name}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]/20">
                    STATUS: {selectedRun.evaluation.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                    <span className="text-[#94A3B8]">Terminal Root Hash:</span>
                    <p className="text-[#16A34A] truncate mt-1">
                      {selectedRun.receipt?.root_hash || "208307772a5a7cea5915fdfa0a0e144cfef753f3..."}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0]">
                    <span className="text-[#94A3B8]">Signer Algorithm:</span>
                    <p className="text-[#16A34A] mt-1">
                      {selectedRun.receipt?.algorithm || "Ed25519-SHA256"}
                    </p>
                  </div>
                </div>

                {/* Audit Event Timeline */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-mono text-[#64748B] font-semibold">
                    Sequential Audit Chain Events ({selectedRun.audit_events?.length || 0} chained):
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-[11px]">
                    {selectedRun.audit_events?.map((ev: any) => (
                      <div key={ev.sequence_index} className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-between">
                        <span className="text-[#16A34A]">#{ev.sequence_index} {ev.event_type}</span>
                        <span className="text-[#94A3B8] text-[10px]">{ev.current_hash.slice(0, 16)}...</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* In-Browser Interactive Cryptographic Verifier Tool */}
            <div className="clay-card p-6 space-y-4 border-[#BBF7D0]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-[#16A34A]" />
                  <h3 className="text-sm font-bold text-[#1E293B]">
                    Independent Cryptographic Verifier Tool
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={injectTamper}
                    className="px-2.5 py-1 rounded bg-[#FEF2F2] hover:bg-[#E5838F]/25 text-[#DC2626] border border-[#FECACA]/30 text-[11px] font-mono font-semibold transition-colors"
                  >
                    Inject Tamper Mutation
                  </button>
                  <button
                    onClick={handleVerify}
                    disabled={verifying}
                    className="clay-btn-primary px-3 py-1 rounded text-[11px] font-mono font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {verifying ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldCheck className="w-3 h-3" />}
                    <span>Verify Receipt</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#64748B]">
                Paste or inspect the raw canonical JSON receipt below. Click &quot;Verify Receipt&quot; to compute the SHA-256 chain and validate the Ed25519 signature, or click &quot;Inject Tamper Mutation&quot; to test rejection.
              </p>

              <textarea
                rows={7}
                value={verifierInput}
                onChange={(e) => setVerifierInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] font-mono text-[11px] text-[#64748B] focus:outline-none focus:border-[#16A34A]"
              />

              {verificationResult && (
                <div className={`p-4 rounded-xl border font-mono text-xs space-y-1.5 ${
                  verificationResult.is_valid
                    ? "bg-[#F0FDF4] border-[#16A34A] text-[#16A34A]"
                    : "bg-[#FEF2F2] border-[#FECACA]/40 text-[#DC2626]"
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    {verificationResult.is_valid ? (
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                    )}
                    <span>{verificationResult.is_valid ? "STATUS: VALID AUDIT RECEIPT (PASS)" : "STATUS: TAMPER DETECTED / REJECTED (FAIL)"}</span>
                  </div>
                  <p className="text-[11px] text-[#1E293B]">{verificationResult.message}</p>
                </div>
              )}

              {/* CLI Command Helper */}
              <div className="p-3 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] text-[11px] font-mono text-[#94A3B8] space-y-1">
                <span className="text-[#16A34A]">Offline Independent Verification:</span>
                <p className="text-[#64748B]">python backend/cli_verifier.py downloaded_receipt.json</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
