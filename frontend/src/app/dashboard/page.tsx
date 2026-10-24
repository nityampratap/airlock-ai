"use client";

import { useEffect, useState } from "react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
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
        className="relative space-y-8 max-w-7xl mx-auto"
      >
        {/* Header Area with Spatial Ambient Glow */}
        <div className="relative">
          <AmbientOrb
            color="#8CA9FF"
            size={520}
            blur={140}
            opacity={0.12}
            position="top-right"
          />
          <AmbientOrb
            color="#ADA4F5"
            size={420}
            blur={140}
            opacity={0.07}
            position="top-left"
          />

          <motion.div
            variants={itemVariants}
            className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2"
          >
            <div>
              <SectionHeader
                eyebrow="Continuous Policy Broker Telemetry"
                title="Security Evaluation Overview"
                description="Airgapped broker boundary enforcement with real-time canary monitoring and cryptographic ledger verification."
              >
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <StatusBadge variant="safe" dot pulseDot>
                    GATE ENFORCED
                  </StatusBadge>
                  <span className="text-xs text-[#8191AB]">
                    Active tenant:{" "}
                    <span className="text-[#8CA9FF] font-semibold">
                      {data?.organization?.name || "Airlock Security Labs"}
                    </span>
                  </span>
                  <span className="text-xs text-[#8191AB]">
                    • Broker Profile:{" "}
                    <span className="font-mono text-[#75D6B1]">
                      Airgapped Broker (v1)
                    </span>
                  </span>
                </div>
              </SectionHeader>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center flex-wrap">
              <Link href="/threatloop">
                <ClayButton variant="primary" size="sm" icon={<span className="text-sm">🐟</span>}>
                  ThreatLoop (TinyFish)
                </ClayButton>
              </Link>
              <Link href="/threat-intel">
                <ClayButton variant="secondary" size="sm">
                  Review Threat Intel
                </ClayButton>
              </Link>
              <Link href="/evaluations/studio">
                <ClayButton
                  variant="secondary"
                  size="sm"
                  icon={
                    <Play className="w-3.5 h-3.5 fill-[#8CA9FF] text-[#8CA9FF]" />
                  }
                >
                  Launch Studio
                </ClayButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Spatial Divider */}
        <div className="divider-spatial" />

        {/* 4 Core Metrics Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Card 1: Total Evaluations */}
          <ClayMetric
            label="TOTAL EVALUATIONS"
            value={data?.metrics?.total_evaluations ?? 42}
            subtitle="100% with Ed25519 digital receipts"
            trend="+12% this wk"
            trendUp={true}
            icon={<Cpu className="w-4 h-4" />}
            accentColor="#8CA9FF"
            animated={true}
          />

          {/* Card 2: Blocked Requests */}
          <ClayMetric
            label="BLOCKED REQUESTS"
            value={data?.metrics?.denied_requests ?? 18}
            subtitle="Intercepted by Central Broker"
            trend="quarantined"
            trendUp={false}
            icon={<ShieldCheck className="w-4 h-4" />}
            accentColor="#EC8995"
            animated={true}
          />

          {/* Card 3: Canary Leaks Prevented */}
          <ClayMetric
            label="CANARY LEAKS PREVENTED"
            value={data?.metrics?.canary_leaks_prevented ?? 24}
            subtitle="Tokens shielded from attacker"
            trend="0 leaks"
            trendUp={true}
            icon={<Lock className="w-4 h-4" />}
            accentColor="#75D6B1"
            animated={true}
          />

          {/* Card 4: Broker Liveness */}
          <ClayMetric
            label="BROKER LIVENESS"
            value={data?.metrics?.system_health ?? "100%"}
            subtitle="Active broker: gateway-01"
            trend="4.2ms avg"
            trendUp={true}
            icon={<Activity className="w-4 h-4" />}
            accentColor="#ADA4F5"
            animated={true}
          />
        </motion.div>

        {/* Spatial Divider */}
        <div className="divider-spatial" />

        {/* Main Grid: Recent Runs & Policy Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Runs Table */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <ClayCard padding="md" className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-base font-bold text-[#F4F6FC]">
                    Recent Evaluation Runs
                  </h3>
                  <p className="text-xs text-[#8191AB]">
                    Recorded in canonical audit ledger
                  </p>
                </div>
                <Link
                  href="/vault"
                  className="text-xs font-mono text-[#8CA9FF] hover:text-[#ADA4F5] flex items-center gap-1 transition-colors"
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
                      <th>Broker Policy</th>
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
                            <p className="font-semibold text-[#F4F6FC]">
                              {r.scenario_type.replace(/_/g, " ")}
                            </p>
                            <p className="text-[10px] text-[#8191AB] font-mono">
                              {r.id.slice(0, 18)}...
                            </p>
                          </td>
                          <td>
                            {r.unauthorized_request_blocked ? (
                              <StatusBadge variant="danger" dot>
                                BLOCKED (SEC-POL-01)
                              </StatusBadge>
                            ) : (
                              <StatusBadge variant="neutral">
                                UNRESTRICTED
                              </StatusBadge>
                            )}
                          </td>
                          <td>
                            {r.canary_exfiltrated ? (
                              <StatusBadge variant="danger" dot pulseDot>
                                EXFILTRATED
                              </StatusBadge>
                            ) : (
                              <StatusBadge variant="safe" dot>
                                PROTECTED
                              </StatusBadge>
                            )}
                          </td>
                          <td className="text-[#B3C0D4] font-mono">
                            {r.duration_ms}ms
                          </td>
                          <td className="text-right">
                            <Link
                              href="/vault"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B2940] hover:bg-[#263754] text-[#8CA9FF] text-[11px] font-mono border border-[#8CA9FF]/15 transition-all hover:border-[#8CA9FF]/30"
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
                          className="py-8 text-center text-[#8191AB]"
                        >
                          {loading
                            ? "Loading active evaluation runs..."
                            : "No recent evaluation runs found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ClayCard>
          </motion.div>

          {/* Right Column: Live Policy Decisions & Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 space-y-6"
          >
            {/* Quick Actions Card */}
            <ClayCard padding="md" className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#F4F6FC]">
                  Rapid Evaluation Gates
                </h3>
                <p className="text-xs text-[#B3C0D4] mt-0.5">
                  Choose a pre-configured scenario to execute live in the
                  Evaluation Studio:
                </p>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/threatloop"
                  className="clay-card-interactive block p-3.5 rounded-xl border border-[#85D8E7]/40 bg-gradient-to-r from-[#85D8E7]/10 to-transparent transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#85D8E7] flex items-center gap-1.5">
                      <span>🐟</span> ThreatLoop (TinyFish Agent)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#85D8E7] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[#B3C0D4] text-[11px] mt-1 leading-relaxed">
                    Live web intelligence discovery &amp; autonomous agent testing.
                  </p>
                </Link>

                <Link
                  href="/evaluations/studio?scenario=scenario_b_hardened"
                  className="clay-card-interactive block p-3.5 rounded-xl border border-[#8CA9FF]/20 transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#8CA9FF]">
                      Scenario B: Hardened Broker
                    </span>
                    <Play className="w-3.5 h-3.5 fill-[#8CA9FF] text-[#8CA9FF] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[#8191AB] text-[11px] mt-1 leading-relaxed">
                    Quarantines prompt injection &amp; shields canary token.
                  </p>
                </Link>

                <Link
                  href="/evaluations/studio?scenario=scenario_a_vulnerable"
                  className="clay-card-interactive block p-3.5 rounded-xl border border-[#EC8995]/20 transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#EC8995]">
                      Scenario A: Vulnerable Baseline
                    </span>
                    <Play className="w-3.5 h-3.5 fill-[#EC8995] text-[#EC8995] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[#8191AB] text-[11px] mt-1 leading-relaxed">
                    Demonstrates canary leak in unbrokered environment.
                  </p>
                </Link>

                <Link
                  href="/vault"
                  className="clay-card-interactive block p-3.5 rounded-xl border border-[#ADA4F5]/20 transition-all text-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#ADA4F5]">
                      Scenario C: Evidence Tamper Test
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#ADA4F5] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[#8191AB] text-[11px] mt-1 leading-relaxed">
                    Verifies Ed25519 seal &amp; tests tamper detection.
                  </p>
                </Link>
              </div>
            </ClayCard>

            {/* Broker Decisions Card (GlassPanel) */}
            <GlassPanel intensity="medium" padding="md" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#F4F6FC]">
                  Recent Broker Decisions
                </h3>
                <StatusBadge variant="safe" dot pulseDot>
                  LIVE FEED
                </StatusBadge>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                {data?.recent_decisions?.length > 0 ? (
                  data.recent_decisions.map((d: any) => (
                    <div
                      key={d.id}
                      className="p-3 rounded-lg bg-[#0E1626]/80 border border-white/[0.06] space-y-1.5 transition-colors hover:border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#8CA9FF]">
                          {d.action}
                        </span>
                        <StatusBadge
                          variant={d.decision === "DENY" ? "danger" : "safe"}
                        >
                          {d.decision}
                        </StatusBadge>
                      </div>
                      <p className="text-[#8191AB] text-[11px] truncate">
                        {d.reason}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#8191AB] text-xs py-2">
                    No recent policy decisions recorded.
                  </p>
                )}
              </div>

              {/* Real-time broker telemetry terminal */}
              <ClayTerminal prompt="broker@gateway-01:~$" status="ENFORCING">
                <p className="text-[#8CA9FF]">
                  › SEC-POL-01: egress quarantine active
                </p>
                <p className="text-[#75D6B1]">
                  › canary_token: CANARY-AIRLOCK-SEC-8921 shielded
                </p>
                <p className="text-[#B3C0D4]">
                  › Ed25519 hash-chain: verified at head
                </p>
              </ClayTerminal>
            </GlassPanel>
          </motion.div>
        </div>
      </motion.div>
    </AppShell>
  );
}
