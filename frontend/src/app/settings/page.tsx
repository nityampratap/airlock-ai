"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  KeyRound,
  ShieldCheck,
  Server,
  Fingerprint,
  Copy,
  CheckCircle2,
  Lock,
  RefreshCw
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { api, getCurrentOrg } from "@/lib/api";

export default function SettingsPage() {
  const [health, setHealth] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const org = getCurrentOrg();

  useEffect(() => {
    async function loadHealth() {
      try {
        const data = await api.getHealth();
        setHealth(data);
      } catch (err) {
        console.error("Health fetch error:", err);
      }
    }
    loadHealth();
  }, []);

  const copyKey = () => {
    navigator.clipboard.writeText("958ae5abdeccb2afd468c6c1a84f47be75529f7f45acbc587429188e734346bb");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">Security & Broker Settings</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
              SEC-CONF-01
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Cryptographic key fingerprints, broker engine configuration, and tenant parameters.
          </p>
        </div>

        {/* Cryptographic Key Information */}
        <div className="clay-card p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <Fingerprint className="w-5 h-5 text-[#16A34A]" />
              <h2 className="text-sm font-bold text-[#1E293B]">
                Organization Ed25519 Public Verification Key
              </h2>
            </div>
            <span className="text-xs font-mono text-[#16A34A]">ACTIVE SIGNER</span>
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed">
            All evaluation receipts generated for <span className="text-[#1E293B] font-semibold">{org?.name || "Airlock Security Labs"}</span> are signed by our backend enclave using this keypair. This public key can be shared with auditors to verify receipts offline.
          </p>

          <div className="p-4 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] flex items-center justify-between gap-4 font-mono text-xs">
            <div className="min-w-0">
              <span className="text-[#94A3B8] text-[10px] block">Public Key (Hex Encoded):</span>
              <p className="text-[#16A34A] truncate">
                958ae5abdeccb2afd468c6c1a84f47be75529f7f45acbc587429188e734346bb
              </p>
            </div>
            <button
              onClick={copyKey}
              className="p-2 rounded-lg bg-[#F0FDF4] hover:bg-[#283A5C] text-[#16A34A] text-xs font-semibold shrink-0 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#E2E8F0] text-[11px] font-mono text-[#64748B] space-y-1">
            <p className="text-[#16A34A]">Key Protection & Rotation Procedure:</p>
            <p className="text-[#94A3B8]">
              Private keys are stored in encrypted hardware enclaves (<code className="text-[#64748B]">backend/keys/</code>) and never exposed over API responses. Rotation generates a new sub-key while maintaining previous public keys for backward verifiable audit trails.
            </p>
          </div>
        </div>

        {/* Broker Fleet Status */}
        <div className="clay-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <Server className="w-5 h-5 text-[#16A34A]" />
              <h2 className="text-sm font-bold text-[#1E293B]">
                Execution Broker Nodes
              </h2>
            </div>
            <span className="text-xs font-mono text-[#16A34A] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#68CFA9] animate-pulse"></span>
              CLUSTER HEALTHY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] space-y-1">
              <span className="text-[#94A3B8]">Broker Node Identifier:</span>
              <p className="text-[#1E293B] font-semibold">airlock-gateway-broker-01</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] space-y-1">
              <span className="text-[#94A3B8]">API Gateway Engine:</span>
              <p className="text-[#16A34A] font-semibold">{health?.service || "AIRLOCK AI Engine v1.0.0"}</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
