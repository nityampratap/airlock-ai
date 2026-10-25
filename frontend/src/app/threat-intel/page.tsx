"use client";

import { useEffect, useState } from "react";
import {
  Radar,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Plus,
  Loader2,
  Filter,
  Search,
  AlertCircle
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { api, getCurrentOrg } from "@/lib/api";

export default function ThreatIntelPage() {
  const [findings, setFindings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadFindings() {
      try {
        const org = getCurrentOrg();
        const orgId = org?.id || "org_airlock_labs_01";
        const data = await api.getThreatFindings(orgId);
        setFindings(data);
      } catch (err) {
        console.error("Threat intel fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFindings();
  }, []);

  const handleApprove = async (findingId: string) => {
    setApprovingId(findingId);
    setSuccessMsg(null);
    try {
      const res = await api.approveThreatFinding(findingId, "prj_autonomous_agent_01");
      setFindings((prev) =>
        prev.map((f) => (f.id === findingId ? { ...f, review_status: "approved" } : f))
      );
      setSuccessMsg(`Approved and converted to active evaluation test case: "${res.title}"`);
    } catch (err: any) {
      alert(`Approval error: ${err.message}`);
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">Threat Intelligence</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F5F3FF] text-[#7C3AED] border border-[#A5A0F4]/20">
                TINYFISH STREAM ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Curated public adversarial research mapped into quarantined test fixtures. Zero untrusted code execution permitted.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#68CFA9] animate-pulse"></span>
              Sources: OWASP GenAI, MITRE ATLAS, NIST
            </span>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/30 text-xs font-mono text-[#16A34A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span>{successMsg}</span>
            </div>
            <span className="text-[10px] text-[#94A3B8]">Ready to evaluate in Studio</span>
          </div>
        )}

        {/* Findings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] px-1">
            <span>SHOWING {findings.length} QUARANTINED FINDINGS</span>
            <span>REVIEW STATUS: PENDING APPROVAL BEFORE EXECUTION</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {findings.map((f) => (
              <div key={f.id} className="clay-card p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      f.severity === "CRITICAL"
                        ? "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]/30"
                        : "bg-[#E8BB75]/15 text-[#E8BB75] border border-[#E8BB75]/30"
                    }`}>
                      {f.severity}
                    </span>
                    <span className="text-xs font-mono text-[#16A34A]">{f.category}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-[#94A3B8]">
                    <a
                      href={f.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#1E293B] flex items-center gap-1 transition-colors"
                    >
                      <span>{f.source_name}</span>
                      <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                    </a>
                    <span>•</span>
                    <span>{new Date(f.retrieval_timestamp).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#1E293B]">{f.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{f.description}</p>
                </div>

                {/* Sanitized Vector Box */}
                <div className="p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] font-mono text-xs space-y-1">
                  <p className="text-[#94A3B8] text-[10px]">// Sanitized Test Vector (Quarantined String)</p>
                  <p className="text-[#1E293B] text-[11px] break-all">{f.sanitized_vector}</p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      f.review_status === "approved"
                        ? "bg-[#F0FDF4] text-[#16A34A]"
                        : "bg-[#F1F5F9] text-[#94A3B8]"
                    }`}>
                      Status: {f.review_status.toUpperCase()}
                    </span>
                  </div>

                  {f.review_status === "approved" ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#16A34A]">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      Active Evaluation Test Case
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApprove(f.id)}
                      disabled={approvingId === f.id}
                      className="clay-btn-primary inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg font-medium cursor-pointer disabled:opacity-50"
                    >
                      {approvingId === f.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#16A34A]" />
                          <span>Converting...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#16A34A]" />
                          <span>Approve & Create Test Case</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
