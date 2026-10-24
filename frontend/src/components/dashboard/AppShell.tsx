"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  Radar,
  ShieldAlert,
  Archive,
  Layers,
  Building2,
  CreditCard,
  Settings,
  ShieldCheck,
  Play,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { getCurrentOrg } from "@/lib/api";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "ThreatLoop", href: "/threatloop", icon: RefreshCw, badge: "TINYFISH" },
  { name: "Evaluation Studio", href: "/evaluations/studio", icon: Cpu, badge: "SPATIAL" },
  { name: "Threat Intelligence", href: "/threat-intel", icon: Radar },
  { name: "Policy Center", href: "/policies", icon: ShieldAlert },
  { name: "Evidence Vault", href: "/vault", icon: Archive, badge: "SEALED" },
  { name: "Integrations", href: "/integrations", icon: Layers },
  { name: "Organization", href: "/organization", icon: Building2 },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [org, setOrg] = useState<any>(null);

  useEffect(() => {
    // Check if token exists, otherwise set demo fallback
    const token = localStorage.getItem("airlock_token");
    if (!token) {
      // In development / demo, seed credentials so user can explore seamlessly
      localStorage.setItem("airlock_token", "demo_jwt_token_airlock_secops_2026");
      localStorage.setItem("airlock_current_org", JSON.stringify({
        id: "org_airlock_labs_01",
        name: "Airlock Security Labs",
        slug: "airlock-security-labs",
        role: "owner",
        plan_tier: "enterprise"
      }));
      localStorage.setItem("airlock_user", JSON.stringify({
        id: "usr_airlock_secops_01",
        email: "secops@airlock.ai",
        full_name: "Elena Vance"
      }));
    }
    setOrg(getCurrentOrg() || {
      id: "org_airlock_labs_01",
      name: "Airlock Security Labs",
      plan_tier: "enterprise"
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("airlock_token");
    localStorage.removeItem("airlock_user");
    localStorage.removeItem("airlock_current_org");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-40 border-r border-white/[0.08] bg-[#0E1626]/90 backdrop-blur-xl">
        {/* Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/[0.08]">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#86A8FF]/20 to-[#A5A0F4]/10 border border-[#86A8FF]/30 flex items-center justify-center text-[#86A8FF]">
              <ShieldCheck className="w-4 h-4 text-[#86A8FF]" />
            </div>
            <span className="font-bold tracking-tight text-base text-[#F4F6FB] flex items-center gap-1.5">
              AIRLOCK <span className="text-[#86A8FF] font-mono text-xs px-1 py-0.5 rounded bg-[#86A8FF]/10">AI</span>
            </span>
          </Link>
        </div>

        {/* Tenant Organization Switcher */}
        <div className="p-4 border-b border-white/[0.06]">
          <div className="p-2.5 rounded-xl bg-[#121C30] border border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#283A5C] flex items-center justify-center text-xs font-bold text-[#86A8FF] shrink-0">
                AL
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#F4F6FB] truncate">
                  {org?.name || "Airlock Security Labs"}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#68CFA9]"></span>
                  <span className="text-[10px] uppercase font-mono text-[#ADBBD0] tracking-wider">
                    {org?.plan_tier || "Enterprise"}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#7587A4]" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1B2942] text-[#F4F6FB] border border-[#86A8FF]/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]"
                    : "text-[#ADBBD0] hover:text-[#F4F6FB] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#86A8FF]" : "text-[#7587A4]"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? "bg-[#86A8FF]/20 text-[#86A8FF]" : "bg-white/[0.06] text-[#7587A4]"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Broker Liveness Status Card */}
        <div className="p-4 border-t border-white/[0.06] bg-[#0A101C]/50">
          <div className="p-3 rounded-xl bg-[#121C30]/80 border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#7587A4] font-medium">Broker Gate</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#68CFA9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#68CFA9] animate-pulse"></span>
                AIRGAPPED
              </span>
            </div>
            <div className="text-[11px] text-[#ADBBD0] flex items-center justify-between font-mono">
              <span>Canary Guard:</span>
              <span className="text-[#86A8FF]">ENFORCED</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 text-xs text-[#7587A4]">
            <span className="truncate max-w-[140px]">secops@airlock.ai</span>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#7587A4] hover:text-[#E5838F] hover:bg-white/[0.06] rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-white/[0.08] bg-[#0B1220]/80 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#ADBBD0] hover:bg-white/[0.06]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-[#7587A4]">
              <span className="text-[#ADBBD0]">{org?.name || "Airlock Security Labs"}</span>
              <span>/</span>
              <span className="text-[#F4F6FB] capitalize">{pathname.split("/")[1] || "Overview"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#ADBBD0] hover:text-[#F4F6FB] px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#7587A4]" />
            </Link>

            <Link
              href="/evaluations/studio"
              className="clay-btn-primary inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg"
            >
              <Play className="w-3.5 h-3.5 text-[#86A8FF] fill-[#86A8FF]" />
              <span>Launch Evaluation</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
            <div className="w-64 bg-[#0E1626] border-r border-white/10 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="font-bold text-base text-[#F4F6FB]">AIRLOCK AI</span>
                  <button onClick={() => setMobileOpen(false)} className="text-[#ADBBD0]">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="mt-4 space-y-1">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                        pathname === item.href ? "bg-[#1B2942] text-[#F4F6FB]" : "text-[#ADBBD0]"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-[#E5838F] p-2 hover:bg-white/5 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        {/* Page Children */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
