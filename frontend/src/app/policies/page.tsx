"use client";

import { useEffect, useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Save,
  Loader2,
  Terminal,
  Activity,
  History
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { api, getCurrentOrg } from "@/lib/api";

export default function PolicyCenterPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "Strict Airgapped Broker Policy",
    network_isolation_level: "airgapped_broker_only",
    block_synthetic_canaries: true,
    block_raw_prompt_injection: true,
    block_tool_call_exfiltration: true,
    max_payload_bytes: 16384,
    evaluation_timeout_sec: 120,
  });

  useEffect(() => {
    async function loadPolicies() {
      try {
        const org = getCurrentOrg();
        const orgId = org?.id || "org_airlock_labs_01";
        const data = await api.getPolicies(orgId);
        setPolicies(data);
        if (data && data.length > 0) {
          const p = data[0];
          setForm({
            name: p.name,
            network_isolation_level: p.network_isolation_level,
            block_synthetic_canaries: p.block_synthetic_canaries,
            block_raw_prompt_injection: p.block_raw_prompt_injection,
            block_tool_call_exfiltration: p.block_tool_call_exfiltration,
            max_payload_bytes: p.max_payload_bytes,
            evaluation_timeout_sec: p.evaluation_timeout_sec,
          });
        }
      } catch (err) {
        console.error("Policy fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPolicies();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    try {
      const org = getCurrentOrg();
      const orgId = org?.id || "org_airlock_labs_01";
      const res = await api.updatePolicy(orgId, form);
      setSuccessMsg(`Security policy updated successfully (Version ${res.version}). Active in all broker gateway nodes.`);
      // Reload
      const updated = await api.getPolicies(orgId);
      setPolicies(updated);
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">Policy Center</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]/20">
                ACTIVE VERSION {policies[0]?.version || 1}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Configure in-transit broker enforcement rules, network isolation levels, and canary exfiltration guards.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
            <span>Enforcement:</span>
            <span className="text-[#16A34A]">GATEWAY BROKER 01</span>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/30 text-xs font-mono text-[#16A34A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span>{successMsg}</span>
            </div>
            <span className="text-[10px] text-[#94A3B8]">Audit logged</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Policy Settings Form */}
          <div className="lg:col-span-8 clay-card p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-bold text-[#1E293B]">Broker Boundary Controls</h2>
              <p className="text-xs text-[#94A3B8]">These rules govern the Central Policy Broker in every evaluation run.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#64748B]">Policy Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:border-[#16A34A]"
                />
              </div>

              {/* Network Isolation Level */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#64748B]">Network Isolation Profile</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setForm({ ...form, network_isolation_level: "airgapped_broker_only" })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      form.network_isolation_level === "airgapped_broker_only"
                        ? "bg-[#F0FDF4] border-[#16A34A]/50 text-[#1E293B]"
                        : "bg-[#F0FDF4]/50 border-[#E2E8F0] text-[#64748B] hover:bg-[#F0FDF4]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold font-mono">Airgapped Broker Only</p>
                      <span className="w-2 h-2 rounded-full bg-[#68CFA9]"></span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-1">
                      Zero direct socket or internet access. All packets transit the policy broker exclusively.
                    </p>
                  </div>

                  <div
                    onClick={() => setForm({ ...form, network_isolation_level: "monitored_egress" })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      form.network_isolation_level === "monitored_egress"
                        ? "bg-[#F0FDF4] border-[#16A34A]/50 text-[#1E293B]"
                        : "bg-[#F0FDF4]/50 border-[#E2E8F0] text-[#64748B] hover:bg-[#F0FDF4]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold font-mono">Monitored Egress</p>
                      <span className="w-2 h-2 rounded-full bg-[#E8BB75]"></span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-1">
                      Permits approved outbound tool calls with full logging and TLS interception.
                    </p>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-2 border-t border-[#E2E8F0]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#16A34A]">Enforcement Rules</h4>

                {/* Rule 1 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0]">
                  <div>
                    <p className="text-xs font-bold text-[#1E293B]">Block Synthetic Canary Exfiltration (SEC-POL-01)</p>
                    <p className="text-[11px] text-[#94A3B8]">Quarantines any payload containing registered canary tokens.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.block_synthetic_canaries}
                    onChange={(e) => setForm({ ...form, block_synthetic_canaries: e.target.checked })}
                    className="w-4 h-4 accent-[#86A8FF] cursor-pointer"
                  />
                </div>

                {/* Rule 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0]">
                  <div>
                    <p className="text-xs font-bold text-[#1E293B]">Quarantine Raw Prompt Injection Patterns (SEC-POL-02)</p>
                    <p className="text-[11px] text-[#94A3B8]">Blocks system instruction override directives.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.block_raw_prompt_injection}
                    onChange={(e) => setForm({ ...form, block_raw_prompt_injection: e.target.checked })}
                    className="w-4 h-4 accent-[#86A8FF] cursor-pointer"
                  />
                </div>

                {/* Rule 3 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0]">
                  <div>
                    <p className="text-xs font-bold text-[#1E293B]">Intercept Unauthorized Tool Call Exfiltration (SEC-POL-03)</p>
                    <p className="text-[11px] text-[#94A3B8]">Prevents SSRF attempts targeting cloud metadata endpoints.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.block_tool_call_exfiltration}
                    onChange={(e) => setForm({ ...form, block_tool_call_exfiltration: e.target.checked })}
                    className="w-4 h-4 accent-[#86A8FF] cursor-pointer"
                  />
                </div>
              </div>

              {/* Numeric settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#64748B]">Max Payload Size (Bytes)</label>
                  <input
                    type="number"
                    value={form.max_payload_bytes}
                    onChange={(e) => setForm({ ...form, max_payload_bytes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:border-[#16A34A]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#64748B]">Evaluation Timeout (Seconds)</label>
                  <input
                    type="number"
                    value={form.evaluation_timeout_sec}
                    onChange={(e) => setForm({ ...form, evaluation_timeout_sec: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:border-[#16A34A]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <button
                  type="submit"
                  disabled={saving}
                  className="clay-btn-primary px-6 py-2.5 rounded-xl font-semibold text-xs inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#16A34A]" />
                      <span>Updating Broker Fleet...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>Deploy Policy Update (v{(policies[0]?.version || 1) + 1})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Policy Version History & Audit Card */}
          <div className="lg:col-span-4 clay-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <History className="w-4 h-4 text-[#16A34A]" />
              <h3 className="text-sm font-bold text-[#1E293B]">Policy Audit Log</h3>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between text-[#16A34A]">
                  <span>Version {policies[0]?.version || 1}</span>
                  <span className="text-[#16A34A]">ACTIVE</span>
                </div>
                <p className="text-[11px] text-[#64748B]">Updated by Elena Vance (secops@airlock.ai)</p>
                <p className="text-[10px] text-[#94A3B8]">Enforces SEC-POL-01 Canary Shield</p>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-[#94A3B8] font-mono">
              All policy edits create immutable change receipts stored in the Evidence Vault.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
