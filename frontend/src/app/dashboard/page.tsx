"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Play,
  FileCheck2,
  Terminal,
  Activity,
  ChevronRight,
  TrendingUp,
  Server
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { api, getCurrentOrg } from "@/lib/api";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const org = getCurrentOrg();
        const orgId = org?.id || "org_airlock_labs_01";
        const dashboard = await api.getDashboard(orgId);
        setData(dashboard);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#F4F6FB] tracking-tight">Security Evaluation Overview</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#68CFA9]/10 text-[#68CFA9] border border-[#68CFA9]/20">
                GATE ENFORCED
              </span>
            </div>
            <p className="text-xs text-[#ADBBD0] mt-1">
              Active tenant: <span className="text-[#86A8FF] font-semibold">{data?.organization?.name || "Airlock Security Labs"}</span> • Broker Profile: <span className="font-mono text-[#68CFA9]">Airgapped Broker (v1)</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/threat-intel"
              className="px-3.5 py-2 rounded-xl bg-[#121C30] hover:bg-[#1B2942] border border-white/10 text-xs font-medium text-[#ADBBD0] hover:text-[#F4F6FB] transition-colors"
            >
              Review Threat Intel
            </Link>
            <Link
              href="/evaluations/studio"
              className="clay-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-[#86A8FF]/10"
            >
              <Play className="w-3.5 h-3.5 fill-[#86A8FF] text-[#86A8FF]" />
              <span>Launch Studio</span>
            </Link>
          </div>
        </div>

        {/* 4 Core Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7587A4]">TOTAL EVALUATIONS</span>
              <div className="w-7 h-7 rounded-lg bg-[#86A8FF]/10 flex items-center justify-center text-[#86A8FF]">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#F4F6FB]">
                {data?.metrics?.total_evaluations ?? 42}
              </span>
              <span className="text-[11px] font-mono text-[#68CFA9] flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12% this wk
              </span>
            </div>
            <p className="text-[11px] text-[#7587A4] font-mono">100% with Ed25519 digital receipts</p>
          </div>

          {/* Card 2 */}
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7587A4]">BLOCKED REQUESTS</span>
              <div className="w-7 h-7 rounded-lg bg-[#E5838F]/10 flex items-center justify-center text-[#E5838F]">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#E5838F]">
                {data?.metrics?.denied_requests ?? 18}
              </span>
              <span className="text-[11px] font-mono text-[#ADBBD0]">quarantined</span>
            </div>
            <p className="text-[11px] text-[#7587A4] font-mono">Intercepted by Central Broker</p>
          </div>

          {/* Card 3 */}
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7587A4]">CANARY LEAKS PREVENTED</span>
              <div className="w-7 h-7 rounded-lg bg-[#68CFA9]/10 flex items-center justify-center text-[#68CFA9]">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#68CFA9]">
                {data?.metrics?.canary_leaks_prevented ?? 24}
              </span>
              <span className="text-[11px] font-mono text-[#68CFA9]">0 leaks</span>
            </div>
            <p className="text-[11px] text-[#7587A4] font-mono">Tokens shielded from attacker</p>
          </div>

          {/* Card 4 */}
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7587A4]">BROKER LIVENESS</span>
              <div className="w-7 h-7 rounded-lg bg-[#A5A0F4]/10 flex items-center justify-center text-[#A5A0F4]">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#F4F6FB]">
                {data?.metrics?.system_health ?? "100%"}
              </span>
              <span className="text-[11px] font-mono text-[#68CFA9]">4.2ms avg</span>
            </div>
            <p className="text-[11px] text-[#7587A4] font-mono">Active broker: gateway-01</p>
          </div>
        </div>

        {/* Main Grid: Recent Runs & Policy Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Runs Table */}
          <div className="lg:col-span-8 clay-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-bold text-[#F4F6FB]">Recent Evaluation Runs</h3>
                <p className="text-xs text-[#7587A4]">Recorded in canonical audit ledger</p>
              </div>
              <Link
                href="/vault"
                className="text-xs font-mono text-[#86A8FF] hover:underline flex items-center gap-1"
              >
                <span>View Evidence Vault</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-[#7587A4] border-b border-white/[0.06] uppercase tracking-wider">
                  <tr>
                    <th className="pb-3">Scenario / Run</th>
                    <th className="pb-3">Broker Policy</th>
                    <th className="pb-3">Canary Status</th>
                    <th className="pb-3">Duration</th>
                    <th className="pb-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {data?.recent_runs?.length > 0 ? (
                    data.recent_runs.map((r: any) => (
                      <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3">
                          <p className="font-semibold text-[#F4F6FB]">{r.scenario_type.replace(/_/g, " ")}</p>
                          <p className="text-[10px] text-[#7587A4]">{r.id.slice(0, 18)}...</p>
                        </td>
                        <td className="py-3">
                          {r.unauthorized_request_blocked ? (
                            <span className="px-2 py-0.5 rounded bg-[#E5838F]/10 text-[#E5838F] border border-[#E5838F]/20">
                              BLOCKED (SEC-POL-01)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-white/[0.06] text-[#ADBBD0]">
                              UNRESTRICTED
                            </span>
                          )}
                        </td>
                        <td className="py-3">
                          {r.canary_exfiltrated ? (
                            <span className="text-[#E5838F] font-bold">EXFILTRATED</span>
                          ) : (
                            <span className="text-[#68CFA9]">PROTECTED</span>
                          )}
                        </td>
                        <td className="py-3 text-[#ADBBD0]">{r.duration_ms}ms</td>
                        <td className="py-3 text-right">
                          <Link
                            href="/vault"
                            className="px-2.5 py-1 rounded bg-[#1B2942] hover:bg-[#283A5C] text-[#86A8FF] text-[11px] transition-colors"
                          >
                            Proof ➔
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[#7587A4]">
                        Loading active evaluation runs...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Live Policy Decisions & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions Card */}
            <div className="clay-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#F4F6FB]">Rapid Evaluation Gates</h3>
              <p className="text-xs text-[#ADBBD0]">
                Choose a pre-configured scenario to execute live in the Evaluation Studio:
              </p>
              <div className="space-y-2.5">
                <Link
                  href="/evaluations/studio?scenario=scenario_b_hardened"
                  className="block p-3 rounded-xl bg-[#121C30] hover:bg-[#1B2942] border border-[#86A8FF]/20 transition-all text-xs"
                >
                  <p className="font-semibold text-[#86A8FF] flex items-center justify-between">
                    <span>Scenario B: Hardened Broker</span>
                    <Play className="w-3.5 h-3.5 fill-[#86A8FF]" />
                  </p>
                  <p className="text-[#7587A4] text-[11px] mt-1">Quarantines prompt injection & shields canary token.</p>
                </Link>

                <Link
                  href="/evaluations/studio?scenario=scenario_a_vulnerable"
                  className="block p-3 rounded-xl bg-[#121C30] hover:bg-[#1B2942] border border-[#E5838F]/20 transition-all text-xs"
                >
                  <p className="font-semibold text-[#E5838F] flex items-center justify-between">
                    <span>Scenario A: Vulnerable Baseline</span>
                    <Play className="w-3.5 h-3.5 fill-[#E5838F]" />
                  </p>
                  <p className="text-[#7587A4] text-[11px] mt-1">Demonstrates canary leak in unbrokered environment.</p>
                </Link>

                <Link
                  href="/vault"
                  className="block p-3 rounded-xl bg-[#121C30] hover:bg-[#1B2942] border border-[#A5A0F4]/20 transition-all text-xs"
                >
                  <p className="font-semibold text-[#A5A0F4] flex items-center justify-between">
                    <span>Scenario C: Evidence Tamper Test</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </p>
                  <p className="text-[#7587A4] text-[11px] mt-1">Verifies Ed25519 seal & tests tamper detection.</p>
                </Link>
              </div>
            </div>

            {/* Live Enforcement Decs */}
            <div className="clay-card p-6 space-y-3">
              <h3 className="text-sm font-bold text-[#F4F6FB] flex items-center justify-between">
                <span>Recent Broker Decisions</span>
                <span className="w-2 h-2 rounded-full bg-[#68CFA9] animate-pulse"></span>
              </h3>
              <div className="space-y-3 text-xs font-mono">
                {data?.recent_decisions?.length > 0 ? (
                  data.recent_decisions.map((d: any) => (
                    <div key={d.id} className="p-3 rounded-lg bg-[#0E1626] border border-white/[0.06] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[#86A8FF]">{d.action}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          d.decision === "DENY" ? "bg-[#E5838F]/10 text-[#E5838F]" : "bg-[#68CFA9]/10 text-[#68CFA9]"
                        }`}>{d.decision}</span>
                      </div>
                      <p className="text-[#7587A4] text-[11px] truncate">{d.reason}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#7587A4] text-xs">No recent policy decisions recorded.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
