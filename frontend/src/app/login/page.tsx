"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowRight, Loader2, KeyRound } from "lucide-react";
import { api, setAuthSession } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("secops@airlock.ai");
  const [password, setPassword] = useState("AirlockSec2026!");
  const [fullName, setFullName] = useState("Elena Vance");
  const [orgName, setOrgName] = useState("Airlock Security Labs");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let data;
      if (isRegister) {
        data = await api.register(email, password, fullName, orgName);
      } else {
        data = await api.login(email, password);
      }
      setAuthSession(data.access_token, data.user, data.organizations);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setEmail("secops@airlock.ai");
    setPassword("AirlockSec2026!");
    setLoading(true);
    try {
      const data = await api.login("secops@airlock.ai", "AirlockSec2026!");
      setAuthSession(data.access_token, data.user, data.organizations);
      router.push("/dashboard");
    } catch {
      // Fallback mock session for local exploration
      setAuthSession(
        "demo_token_secops",
        { id: "usr_airlock_secops_01", email: "secops@airlock.ai", full_name: "Elena Vance" },
        [{ id: "org_airlock_labs_01", name: "Airlock Security Labs", slug: "airlock-security-labs", role: "owner", plan_tier: "enterprise" }]
      );
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight text-xl text-[#1E293B]">
              Airlock <span className="text-[#16A34A] text-xs px-1.5 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] font-medium">AI</span>
            </span>
          </Link>
          <p className="text-sm text-[#94A3B8]">
            Evaluation Assurance & Audit Console
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-semibold text-[#1E293B]">
              {isRegister ? "Create Account" : "Sign in"}
            </h2>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-[#16A34A] hover:underline"
            >
              {isRegister ? "Have an account? Sign in" : "New here? Register"}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#DC2626]">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegister && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#64748B]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#64748B]">Organization Name</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
                  />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#64748B]">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#64748B]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFB] border border-[#E2E8F0] text-sm text-[#1E293B] focus:outline-none focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-colors shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{isRegister ? "Create Account" : "Sign in"}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Preload Button */}
          <div className="pt-2 border-t border-[#E2E8F0] text-center space-y-2">
            <button
              type="button"
              onClick={handleQuickDemo}
              disabled={loading}
              className="w-full py-2.5 px-3 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0] text-xs text-[#16A34A] font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Quick Demo: Elena Vance (Head of AI Security)</span>
            </button>
            <p className="text-[11px] text-[#94A3B8]">
              Pre-seeded with realistic audit history & cryptographic receipts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
