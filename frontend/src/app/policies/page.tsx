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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#F4F6FB] tracking-tight">Policy Center</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#68CFA9]/10 text-[#68CFA9] border border-[#68CFA9]/20">
                ACTIVE VERSION {policies[0]?.version || 1}
              </span>
            </div>
            <p className="text-xs text-[#ADBBD0] mt-1">
              Configure in-transit broker enforcement rules, network isolation levels, and canary exfiltration guards.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#7587A4]">
            <span>Enforcement:</span>
            <span className="text-[#68CFA9]">GATEWAY BROKER 01</span>
          </div>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-xl bg-[#68CFA9]/10 border border-[#68CFA9]/30 text-xs font-mono text-[#68CFA9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#68CFA9]" />
              <span>{successMsg}</span>
            </div>
            <span className="text-[10px] text-[#7587A4]">Audit logged</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Policy Settings Form */}
          <div className="lg:col-span-8 clay-card p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-white/[0.08]">
              <h2 className="text-lg font-bold text-[#F4F6FB]">Broker Boundary Controls</h2>
              <p className="text-xs text-[#7587A4]">These rules govern the Central Policy Broker in every evaluation run.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#ADBBD0]">Policy Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                />
              </div>

              {/* Network Isolation Level */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#ADBBD0]">Network Isolation Profile</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setForm({ ...form, network_isolation_level: "airgapped_broker_only" })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      form.network_isolation_level === "airgapped_broker_only"
                        ? "bg-[#1B2942] border-[#86A8FF]/50 text-[#F4F6FB]"
                        : "bg-[#121C30]/50 border-white/[0.06] text-[#ADBBD0] hover:bg-[#121C30]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold font-mono">Airgapped Broker Only</p>
                      <span className="w-2 h-2 rounded-full bg-[#68CFA9]"></span>
                    </div>
                    <p className="text-[11px] text-[#7587A4] mt-1">
                      Zero direct socket or internet access. All packets transit the policy broker exclusively.
                    </p>
                  </div>

                  <div
                    onClick={() => setForm({ ...form, network_isolation_level: "monitored_egress" })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      form.network_isolation_level === "monitored_egress"
                        ? "bg-[#1B2942] border-[#86A8FF]/50 text-[#F4F6FB]"
                        : "bg-[#121C30]/50 border-white/[0.06] text-[#ADBBD0] hover:bg-[#121C30]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold font-mono">Monitored Egress</p>
                      <span className="w-2 h-2 rounded-full bg-[#E8BB75]"></span>
                    </div>
                    <p className="text-[11px] text-[#7587A4] mt-1">
                      Permits approved outbound tool calls with full logging and TLS interception.
                    </p>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#86A8FF]">Enforcement Rules</h4>

                {/* Rule 1 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070D18] border border-white/[0.06]">
                  <div>
                    <p className="text-xs font-bold text-[#F4F6FB]">Block Synthetic Canary Exfiltration (SEC-POL-01)</p>
                    <p className="text-[11px] text-[#7587A4]">Quarantines any payload containing registered canary tokens.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.block_synthetic_canaries}
                    onChange={(e) => setForm({ ...form, block_synthetic_canaries: e.target.checked })}
                    className="w-4 h-4 accent-[#86A8FF] cursor-pointer"
                  />
                </div>

                {/* Rule 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070D18] border border-white/[0.06]">
                  <div>
                    <p className="text-xs font-bold text-[#F4F6FB]">Quarantine Raw Prompt Injection Patterns (SEC-POL-02)</p>
                    <p className="text-[11px] text-[#7587A4]">Blocks system instruction override directives.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={form.block_raw_prompt_injection}
                    onChange={(e) => setForm({ ...form, block_raw_prompt_injection: e.target.checked })}
                    className="w-4 h-4 accent-[#86A8FF] cursor-pointer"
                  />
                </div>

                {/* Rule 3 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#070D18] border border-white/[0.06]">
                  <div>
                    <p className="text-xs font-bold text-[#F4F6FB]">Intercept Unauthorized Tool Call Exfiltration (SEC-POL-03)</p>
                    <p className="text-[11px] text-[#7587A4]">Prevents SSRF attempts targeting cloud metadata endpoints.</p>
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
                  <label className="text-xs font-mono text-[#ADBBD0]">Max Payload Size (Bytes)</label>
                  <input
                    type="number"
                    value={form.max_payload_bytes}
                    onChange={(e) => setForm({ ...form, max_payload_bytes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#ADBBD0]">Evaluation Timeout (Seconds)</label>
                  <input
                    type="number"
                    value={form.evaluation_timeout_sec}
                    onChange={(e) => setForm({ ...form, evaluation_timeout_sec: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <button
                  type="submit"
                  disabled={saving}
                  className="clay-btn-primary px-6 py-2.5 rounded-xl font-semibold text-xs inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#86A8FF]" />
                      <span>Updating Broker Fleet...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-[#86A8FF]" />
                      <span>Deploy Policy Update (v{(policies[0]?.version || 1) + 1})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Policy Version History & Audit Card */}
          <div className="lg:col-span-4 clay-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
              <History className="w-4 h-4 text-[#86A8FF]" />
              <h3 className="text-sm font-bold text-[#F4F6FB]">Policy Audit Log</h3>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#070D18] border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between text-[#86A8FF]">
                  <span>Version {policies[0]?.version || 1}</span>
                  <span className="text-[#68CFA9]">ACTIVE</span>
                </div>
                <p className="text-[11px] text-[#ADBBD0]">Updated by Elena Vance (secops@airlock.ai)</p>
                <p className="text-[10px] text-[#7587A4]">Enforces SEC-POL-01 Canary Shield</p>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-[#7587A4] font-mono">
              All policy edits create immutable change receipts stored in the Evidence Vault.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
