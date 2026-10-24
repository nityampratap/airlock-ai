"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  ShieldCheck,
  UserPlus,
  Mail,
  Key,
  CheckCircle2,
  Plus
} from "lucide-react";
import { AppShell } from "@/components/dashboard/AppShell";
import { getCurrentOrg } from "@/lib/api";

const MEMBERS = [
  { id: "1", name: "Elena Vance", email: "secops@airlock.ai", role: "Owner / Head of AI Security", status: "ACTIVE" },
  { id: "2", name: "Marcus Brody", email: "m.brody@safetyresearch.org", role: "Security Engineer", status: "ACTIVE" },
  { id: "3", name: "Sophia Zhang", email: "s.zhang@auditfirm.com", role: "Independent Auditor", status: "ACTIVE" }
];

export default function OrganizationPage() {
  const org = getCurrentOrg();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Security Engineer");
  const [inviteSent, setInviteSent] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviteSent(true);
    setTimeout(() => {
      setInviteEmail("");
      setInviteSent(false);
    }, 3000);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#F4F6FB] tracking-tight">Organization & RBAC Controls</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#86A8FF]/10 text-[#86A8FF] border border-[#86A8FF]/20">
              TENANT ISOLATED
            </span>
          </div>
          <p className="text-xs text-[#ADBBD0] mt-1">
            Manage organization members, role-based access privileges, and workspace projects. Every endpoint verifies tenant membership.
          </p>
        </div>

        {/* Org Profile Card */}
        <div className="clay-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#F4F6FB]">Tenant Workspace Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#070D18] border border-white/[0.06]">
              <span className="text-[#7587A4]">Organization Name:</span>
              <p className="text-[#F4F6FB] font-semibold mt-1">{org?.name || "Airlock Security Labs"}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070D18] border border-white/[0.06]">
              <span className="text-[#7587A4]">Tenant Slug:</span>
              <p className="text-[#86A8FF] font-semibold mt-1">{org?.slug || "airlock-security-labs"}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#070D18] border border-white/[0.06]">
              <span className="text-[#7587A4]">Plan Tier:</span>
              <p className="text-[#68CFA9] font-semibold mt-1 uppercase">{org?.plan_tier || "Enterprise"}</p>
            </div>
          </div>
        </div>

        {/* Members & Invite Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Member List */}
          <div className="lg:col-span-8 clay-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-[#F4F6FB]">Active Team Members</h3>
              <span className="text-xs font-mono text-[#7587A4]">3 Members</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-[#7587A4] border-b border-white/[0.06] uppercase tracking-wider">
                  <tr>
                    <th className="pb-3">User</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {MEMBERS.map((m) => (
                    <tr key={m.id} className="hover:bg-white/[0.02]">
                      <td className="py-3">
                        <p className="font-semibold text-[#F4F6FB]">{m.name}</p>
                        <p className="text-[11px] text-[#7587A4]">{m.email}</p>
                      </td>
                      <td className="py-3 text-[#86A8FF]">{m.role}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-[#68CFA9]/10 text-[#68CFA9]">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invite Member Box */}
          <div className="lg:col-span-4 clay-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.08]">
              <UserPlus className="w-4 h-4 text-[#86A8FF]" />
              <h3 className="text-sm font-bold text-[#F4F6FB]">Invite Colleague</h3>
            </div>

            {inviteSent && (
              <div className="p-3 rounded-xl bg-[#68CFA9]/10 border border-[#68CFA9]/30 text-xs font-mono text-[#68CFA9] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Invitation link sent!</span>
              </div>
            )}

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#ADBBD0]">Colleague Email</label>
                <input
                  type="email"
                  required
                  placeholder="auditor@firm.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-xs text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#ADBBD0]">Role Assignment</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/10 text-xs text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                >
                  <option value="Security Engineer">Security Engineer</option>
                  <option value="Auditor">Auditor (Read-Only & Receipts)</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full clay-btn-primary py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Send Workspace Invitation</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
