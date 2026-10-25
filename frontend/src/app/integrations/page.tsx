"use client";

import { useState } from "react";
import {
  Layers,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Server,
  Zap,
  Lock,
  ArrowRight
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";

const INTEGRATIONS = [
  {
    id: "tinyfish",
    name: "TinyFish Web Intelligence",
    category: "Threat Research",
    status: "CONNECTED",
    desc: "Ingests public vulnerability disclosures from OWASP GenAI, NIST AI RMF, and MITRE ATLAS into quarantined buffers.",
    active: true
  },
  {
    id: "model_proxy",
    name: "Model Endpoint Gateway",
    category: "Inference Proxy",
    status: "CONNECTED",
    desc: "Secure connection to target LLM endpoints (Claude 3.5 Sonnet, Llama 3.1) with TLS boundary termination.",
    active: true
  },
  {
    id: "webhooks",
    name: "Security Webhook Dispatcher",
    category: "Notifications",
    status: "STANDBY",
    desc: "Pushes real-time alerts to Slack, Discord, or internal SIEM endpoints whenever broker policies are triggered.",
    active: false
  },
  {
    id: "siem",
    name: "SIEM & Splunk Export",
    category: "Enterprise Audit",
    status: "AVAILABLE IN ENTERPRISE",
    desc: "Streams canonical SHA-256 audit events and Ed25519 verification hashes to enterprise log management.",
    active: false
  }
];

export default function IntegrationsPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">Integrations Architecture</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
              GATEWAY MANAGED
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Connected inference proxies, intelligence streams, and notification destinations. Only active integrations are permitted inside execution brokers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTEGRATIONS.map((item) => (
            <div key={item.id} className="clay-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center text-[#16A34A]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E293B]">{item.name}</h3>
                    <p className="text-[10px] font-mono text-[#16A34A]">{item.category}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  item.active
                    ? "bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]/20"
                    : "bg-[#F8FAFB] text-[#94A3B8]"
                }`}>
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                <span>Isolation Boundary:</span>
                <span className="text-[#16A34A]">BROKER VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
