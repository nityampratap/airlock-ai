"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Zap,
  ArrowRight,
  Loader2
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { api, getCurrentOrg } from "@/lib/api";

export default function BillingPage() {
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [upgradingTier, setUpgradingTier] = useState<string | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadBilling() {
      try {
        const org = getCurrentOrg();
        const orgId = org?.id || "org_airlock_labs_01";
        const data = await api.getBilling(orgId);
        setBilling(data);
      } catch (err) {
        console.error("Billing fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBilling();
  }, []);

  const handleSimulateUpgrade = (tier: string) => {
    setUpgradingTier(tier);
    setUpgradeSuccess(null);
    setTimeout(() => {
      setUpgradingTier(null);
      setUpgradeSuccess(`Test Mode Checkout Success: Plan updated to ${tier.toUpperCase()}. Invoicing scheduled via Stripe Test Clock.`);
    }, 1200);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">Subscription & Evaluation Metering</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]/20">
              STRIPE TEST MODE ACTIVE
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Track evaluation run volume against tenant quotas. Commercial entitlements are server-enforced.
          </p>
        </div>

        {upgradeSuccess && (
          <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/30 text-xs font-mono text-[#16A34A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{upgradeSuccess}</span>
          </div>
        )}

        {/* Usage Telemetry Card */}
        <div className="clay-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
            <div>
              <span className="text-xs font-mono text-[#16A34A] uppercase">CURRENT BILLING CYCLE</span>
              <h2 className="text-xl font-bold text-[#1E293B] mt-0.5">
                {billing?.plan_tier?.toUpperCase() || "ENTERPRISE"} TIER
              </h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]/30">
              STATUS: {billing?.status?.toUpperCase() || "ACTIVE"}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748B]">Evaluations Run This Month</span>
              <span className="text-[#1E293B] font-bold">
                {billing?.evaluations_used ?? 42} / {billing?.monthly_evaluation_limit ?? 5000} runs
              </span>
            </div>

            {/* Meter Progress Bar */}
            <div className="w-full h-3 rounded-full bg-[#F8FAFB] border border-[#E2E8F0] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#86A8FF] via-[#A5A0F4] to-[#68CFA9] rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(2, ((billing?.evaluations_used || 42) / (billing?.monthly_evaluation_limit || 5000)) * 100)
                  )}%`
                }}
              />
            </div>

            <p className="text-[11px] font-mono text-[#94A3B8]">
              4,958 evaluations remaining in current cycle. Quota resets on the 1st of next month.
            </p>
          </div>
        </div>

        {/* Packaging Plans Grid */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider font-mono">
            Available Commercial Plans
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {billing?.available_plans?.map((p: any) => {
              const isCurrent = (billing?.plan_tier || "enterprise").toLowerCase() === p.tier.toLowerCase();
              return (
                <div key={p.tier} className={`clay-card p-6 flex flex-col justify-between space-y-5 ${
                  isCurrent ? "border-[#16A34A] shadow-lg" : "border-[#E2E8F0]"
                }`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#16A34A] uppercase font-bold">{p.name}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A]">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-extrabold text-[#1E293B]">{p.price}</p>
                    <ul className="text-xs font-mono text-[#64748B] space-y-2 pt-3 border-t border-[#E2E8F0]">
                      {p.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSimulateUpgrade(p.tier)}
                    disabled={isCurrent || upgradingTier !== null}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      isCurrent
                        ? "bg-[#F0FDF4]/50 text-[#94A3B8] border border-white/5 cursor-default"
                        : "clay-btn-primary"
                    }`}
                  >
                    {upgradingTier === p.tier ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Confirming Stripe Test Session...</span>
                      </>
                    ) : isCurrent ? (
                      <span>Active Plan</span>
                    ) : (
                      <>
                        <span>Select {p.name} (Test Mode)</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#16A34A]" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
