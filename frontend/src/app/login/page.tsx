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
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#86A8FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#86A8FF]/20 to-[#A5A0F4]/10 border border-[#86A8FF]/30 flex items-center justify-center text-[#86A8FF] shadow-[0_0_20px_rgba(134,168,255,0.2)]">
              <ShieldCheck className="w-5 h-5 text-[#86A8FF]" />
            </div>
            <span className="font-bold tracking-tight text-xl text-[#F4F6FB]">
              AIRLOCK <span className="text-[#86A8FF] font-mono text-xs">AI</span>
            </span>
          </Link>
          <p className="text-xs text-[#ADBBD0] font-mono">
            EVALUATION ASSURANCE & AUDIT CONSOLE
          </p>
        </div>

        <div className="clay-card p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <h2 className="text-lg font-bold text-[#F4F6FB]">
              {isRegister ? "Create Organization Account" : "Authenticate Session"}
            </h2>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-mono text-[#86A8FF] hover:underline"
            >
              {isRegister ? "Existing account? Sign in" : "New organization? Register"}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-[#E5838F]/10 border border-[#E5838F]/30 text-xs text-[#E5838F]">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegister && (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#ADBBD0]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#ADBBD0]">Organization Name</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                  />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#ADBBD0]">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#ADBBD0]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full clay-btn-primary py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#86A8FF]" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#86A8FF]" />
                  <span>{isRegister ? "Create Organization" : "Enter Console"}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Preload Button */}
          <div className="pt-2 border-t border-white/[0.06] text-center space-y-2">
            <button
              type="button"
              onClick={handleQuickDemo}
              disabled={loading}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1B2942]/70 hover:bg-[#1B2942] border border-white/10 text-xs font-mono text-[#86A8FF] flex items-center justify-center gap-2 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#68CFA9]" />
              <span>One-Click Preload: Elena Vance (Head of AI Security)</span>
            </button>
            <p className="text-[10px] text-[#7587A4] font-mono">
              Pre-seeded with realistic audit history & cryptographic receipts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
