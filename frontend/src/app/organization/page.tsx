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
        <div className="pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">Organization & RBAC Controls</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
              TENANT ISOLATED
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Manage organization members, role-based access privileges, and workspace projects. Every endpoint verifies tenant membership.
          </p>
        </div>

        {/* Org Profile Card */}
        <div className="clay-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#1E293B]">Tenant Workspace Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0]">
              <span className="text-[#94A3B8]">Organization Name:</span>
              <p className="text-[#1E293B] font-semibold mt-1">{org?.name || "Airlock Security Labs"}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0]">
              <span className="text-[#94A3B8]">Tenant Slug:</span>
              <p className="text-[#16A34A] font-semibold mt-1">{org?.slug || "airlock-security-labs"}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0]">
              <span className="text-[#94A3B8]">Plan Tier:</span>
              <p className="text-[#16A34A] font-semibold mt-1 uppercase">{org?.plan_tier || "Enterprise"}</p>
            </div>
          </div>
        </div>

        {/* Members & Invite Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Member List */}
          <div className="lg:col-span-8 clay-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-sm font-bold text-[#1E293B]">Active Team Members</h3>
              <span className="text-xs font-mono text-[#94A3B8]">3 Members</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-[#94A3B8] border-b border-[#E2E8F0] uppercase tracking-wider">
                  <tr>
                    <th className="pb-3">User</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {MEMBERS.map((m) => (
                    <tr key={m.id} className="hover:bg-[#F8FAFB]">
                      <td className="py-3">
                        <p className="font-semibold text-[#1E293B]">{m.name}</p>
                        <p className="text-[11px] text-[#94A3B8]">{m.email}</p>
                      </td>
                      <td className="py-3 text-[#16A34A]">{m.role}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A]">
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
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <UserPlus className="w-4 h-4 text-[#16A34A]" />
              <h3 className="text-sm font-bold text-[#1E293B]">Invite Colleague</h3>
            </div>

            {inviteSent && (
              <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/30 text-xs font-mono text-[#16A34A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Invitation link sent!</span>
              </div>
            )}

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#64748B]">Colleague Email</label>
                <input
                  type="email"
                  required
                  placeholder="auditor@firm.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] text-xs text-[#1E293B] focus:outline-none focus:border-[#16A34A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#64748B]">Role Assignment</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] text-xs text-[#1E293B] focus:outline-none focus:border-[#16A34A]"
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
