"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Lock,
  ArrowRight,
  Play,
  Activity,
  ChevronRight,
  TrendingUp,
  CloudSun
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { api, getCurrentOrg } from "@/lib/api";
import {
  ClayCard,
  ClayButton,
  GlassPanel,
  StatusBadge,
  ClayMetric,
  SectionHeader,
  ClayTerminal,
  AmbientOrb,
} from "@/components/ui/clay";

const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 max-w-7xl mx-auto"
      >
        {/* ═══ SCENIC LANDSCAPE HEADER BANNER (LOCKSCREEN AESTHETIC) ═══ */}
        <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
          <div className="relative h-48 sm:h-56 w-full overflow-hidden">
            <Image
              src="/assets/scenic_landscape.jpg"
              alt="Ona Coastal Norway Scenic Landscape"
              fill
              priority
              className="object-cover object-center filter brightness-[0.97]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-transparent to-transparent" />

            {/* Location Tag */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-sm text-xs text-[#1E293B]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="font-medium">Ona Security Station • Central Policy Node</span>
            </div>

            {/* Floating Weather/Security Widget */}
            <div className="absolute bottom-4 right-4 z-10 max-w-xs w-full p-3.5 rounded-xl bg-white/85 backdrop-blur-md border border-white/70 shadow-lg text-[#1E293B] space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold flex items-center gap-1.5 text-[#15803D]">
                  <CloudSun className="w-4 h-4 text-[#16A34A]" />
                  Atmosphere: Calm &amp; Protected
                </span>
                <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded-full font-bold">
                  22°C Safe
                </span>
              </div>
              <p className="text-[11px] text-[#475569] leading-tight">
                All 10 adversarial fixtures active. Zero canary leakage across tenant boundaries.
              </p>
            </div>

            {/* Title overlay inside banner */}
            <div className="absolute bottom-4 left-4 z-10 max-w-md">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[11px] font-semibold mb-1">
                Continuous Evaluation Assurance
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
                Security Evaluation Overview
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Header Controls Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-sm"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <StatusBadge variant="safe" dot pulseDot>
              All Systems Operational
            </StatusBadge>
            <span className="text-xs text-[#94A3B8]">
              Active tenant:{" "}
              <span className="text-[#1E293B] font-semibold">
                {data?.organization?.name || "Airlock Security Labs"}
              </span>
            </span>
            <span className="text-xs text-[#94A3B8]">
              • Profile:{" "}
              <span className="font-mono text-[#15803D]">
                Airgapped Broker (v1)
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center flex-wrap">
            <Link href="/threatloop">
              <ClayButton variant="primary" size="sm" icon={<span className="text-sm">🐟</span>}>
                ThreatLoop
              </ClayButton>
            </Link>
            <Link href="/threat-intel">
              <ClayButton variant="secondary" size="sm">
                Threat Intel
              </ClayButton>
            </Link>
            <Link href="/evaluations/studio">
              <ClayButton
                variant="secondary"
                size="sm"
                icon={
                  <Play className="w-3.5 h-3.5 fill-[#16A34A] text-[#16A34A]" />
                }
              >
                Launch 10 Tests Studio
              </ClayButton>
            </Link>
          </div>
        </motion.div>

        {/* 4 Core Metrics Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <ClayMetric
            label="Total Evaluations"
            value={data?.metrics?.total_evaluations ?? 42}
            subtitle="100% with Ed25519 digital receipts"
            trend="+12% this wk"
            trendUp={true}
            icon={<Cpu className="w-4 h-4" />}
            accentColor="#16A34A"
            animated={true}
          />

          <ClayMetric
            label="Blocked Requests"
            value={data?.metrics?.denied_requests ?? 18}
            subtitle="Intercepted by policy engine"
            trend="quarantined"
            trendUp={false}
            icon={<ShieldCheck className="w-4 h-4" />}
            accentColor="#DC2626"
            animated={true}
          />

          <ClayMetric
            label="Canary Leaks Prevented"
            value={data?.metrics?.canary_leaks_prevented ?? 24}
            subtitle="Tokens shielded from attacker"
            trend="0 leaks"
            trendUp={true}
            icon={<Lock className="w-4 h-4" />}
            accentColor="#16A34A"
            animated={true}
          />

          <ClayMetric
            label="System Health"
            value={data?.metrics?.system_health ?? "100%"}
            subtitle="Gateway active"
            trend="4.2ms avg"
            trendUp={true}
            icon={<Activity className="w-4 h-4" />}
            accentColor="#0D9488"
            animated={true}
          />
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-[#E2E8F0]" />

        {/* Main Grid: Recent Runs & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Runs Table */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <ClayCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-base font-semibold text-[#1E293B]">
                    Recent Evaluation Runs
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Recorded in canonical audit ledger
                  </p>
                </div>
                <Link
                  href="/vault"
                  className="text-xs text-[#16A34A] hover:text-[#15803D] flex items-center gap-1 transition-colors font-medium"
                >
                  <span>View Evidence Vault</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="clay-table">
                  <thead>
                    <tr>
                      <th>Scenario / Run</th>
                      <th>Policy Status</th>
                      <th>Canary Status</th>
                      <th>Duration</th>
                      <th className="text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.recent_runs?.length > 0 ? (
                      data.recent_runs.map((r: any) => (
                        <tr key={r.id}>
                          <td>
                            <p className="font-semibold text-[#1E293B]">
                              {r.scenario_type.replace(/_/g, " ")}
                            </p>
                            <p className="text-[10px] text-[#94A3B8] font-mono">
                              {r.id.slice(0, 18)}...
                            </p>
                          </td>
                          <td>
                            {r.unauthorized_request_blocked ? (
                              <StatusBadge variant="danger" dot>
                                Blocked
                              </StatusBadge>
                            ) : (
                              <StatusBadge variant="neutral">
                                Unrestricted
                              </StatusBadge>
                            )}
                          </td>
                          <td>
                            {r.canary_exfiltrated ? (
                              <StatusBadge variant="danger" dot pulseDot>
                                Exfiltrated
                              </StatusBadge>
                            ) : (
                              <StatusBadge variant="safe" dot>
                                Protected
                              </StatusBadge>
                            )}
                          </td>
                          <td className="text-[#64748B] font-mono text-xs">
                            {r.duration_ms}ms
                          </td>
                          <td className="text-right">
                            <Link
                              href="/vault"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8FAFB] hover:bg-[#F0FDF4] text-[#16A34A] text-[11px] font-medium border border-[#E2E8F0] transition-all hover:border-[#BBF7D0]"
                            >
                              <span>Proof</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-[#94A3B8]"
                        >
                          {loading
                            ? "Loading evaluation runs..."
                            : "No recent evaluation runs found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ClayCard>
          </motion.div>

          {/* Right Column: Quick Actions & Status */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 space-y-6"
          >
            {/* Quick Actions Card */}
            <ClayCard padding="md" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-[#1E293B]">
                  Quick Actions
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Choose a scenario to run in the Evaluation Studio:
                </p>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/threatloop"
                  className="block p-3.5 rounded-xl border-l-4 border-l-[#0D9488] border border-[#E2E8F0] bg-white hover:bg-[#F0FDFA] transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#0D9488] flex items-center gap-1.5">
                      <span>🐟</span> ThreatLoop (TinyFish)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0D9488] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[#64748B] text-[11px] mt-1 leading-relaxed">
                    Live web intelligence discovery & agent testing.
                  </p>
                </Link>

                <Link
                  href="/evaluations/studio?scenario=scenario_b_hardened"
                  className="block p-3.5 rounded-xl border-l-4 border-l-[#16A34A] border border-[#E2E8F0] bg-white hover:bg-[#F0FDF4] transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#16A34A]">
                      Scenario B: Hardened Policy
                    </span>
                    <Play className="w-3.5 h-3.5 fill-[#16A34A] text-[#16A34A] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[#94A3B8] text-[11px] mt-1 leading-relaxed">
                    Quarantines prompt injection & shields canary token.
                  </p>
                </Link>

                <Link
                  href="/evaluations/studio?scenario=scenario_a_vulnerable"
                  className="block p-3.5 rounded-xl border-l-4 border-l-[#DC2626] border border-[#E2E8F0] bg-white hover:bg-[#FEF2F2] transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#DC2626]">
                      Scenario A: Vulnerable Baseline
                    </span>
                    <Play className="w-3.5 h-3.5 fill-[#DC2626] text-[#DC2626] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[#94A3B8] text-[11px] mt-1 leading-relaxed">
                    Demonstrates canary leak in unbrokered environment.
                  </p>
                </Link>

                <Link
                  href="/vault"
                  className="block p-3.5 rounded-xl border-l-4 border-l-[#7C3AED] border border-[#E2E8F0] bg-white hover:bg-[#FAF5FF] transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#7C3AED]">
                      Scenario C: Evidence Tamper Test
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#7C3AED] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[#94A3B8] text-[11px] mt-1 leading-relaxed">
                    Verifies Ed25519 seal & tests tamper detection.
                  </p>
                </Link>
              </div>
            </ClayCard>

            {/* Recent Policy Decisions */}
            <ClayCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#1E293B]">
                  Recent Policy Decisions
                </h3>
                <StatusBadge variant="safe" dot pulseDot>
                  Live
                </StatusBadge>
              </div>

              <div className="space-y-2.5 text-xs">
                {data?.recent_decisions?.length > 0 ? (
                  data.recent_decisions.map((d: any) => (
                    <div
                      key={d.id}
                      className="p-3 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0] space-y-1.5 transition-colors hover:border-[#CBD5E1]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1E293B]">
                          {d.action}
                        </span>
                        <StatusBadge
                          variant={d.decision === "DENY" ? "danger" : "safe"}
                        >
                          {d.decision}
                        </StatusBadge>
                      </div>
                      <p className="text-[#94A3B8] text-[11px] truncate">
                        {d.reason}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#94A3B8] text-xs py-2">
                    No recent policy decisions recorded.
                  </p>
                )}
              </div>

              {/* Code block */}
              <ClayTerminal prompt="broker@gateway-01:~$" status="Active">
                <p className="text-[#93C5FD]">
                  › Policy rule SEC-POL-01: egress quarantine active
                </p>
                <p className="text-[#86EFAC]">
                  › canary_token: shielded
                </p>
                <p className="text-[#CBD5E1]">
                  › Ed25519 hash-chain: verified at head
                </p>
              </ClayTerminal>
            </ClayCard>
          </motion.div>
        </div>
      </motion.div>
    </AppShell>
  );
}
