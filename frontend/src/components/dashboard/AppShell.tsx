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
  RefreshCw,
} from "lucide-react";
import { getCurrentOrg } from "@/lib/api";
import { GlassPanel, StatusBadge } from "@/components/ui/clay";

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
      localStorage.setItem(
        "airlock_current_org",
        JSON.stringify({
          id: "org_airlock_labs_01",
          name: "Airlock Security Labs",
          slug: "airlock-security-labs",
          role: "owner",
          plan_tier: "enterprise",
        })
      );
      localStorage.setItem(
        "airlock_user",
        JSON.stringify({
          id: "usr_airlock_secops_01",
          email: "secops@airlock.ai",
          full_name: "Elena Vance",
        })
      );
    }
    setOrg(
      getCurrentOrg() || {
        id: "org_airlock_labs_01",
        name: "Airlock Security Labs",
        plan_tier: "enterprise",
      }
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("airlock_token");
    localStorage.removeItem("airlock_user");
    localStorage.removeItem("airlock_current_org");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex text-[#F4F6FC]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-40 border-r border-white/[0.08] bg-[#0E1626]/85 backdrop-blur-2xl shadow-[4px_0_30px_rgba(0,0,0,0.5),inset_-1px_0_0_rgba(255,255,255,0.04)]">
        {/* Brand Section */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.08] relative overflow-hidden">
          {/* Subtle gradient orb behind logo */}
          <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#8CA9FF]/20 via-[#ADA4F5]/10 to-transparent blur-xl pointer-events-none" />

          <Link href="/dashboard" className="flex items-center gap-3 relative z-10 group">
            {/* ShieldCheck logo in larger clay pill with inner glow */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#263754] to-[#1B2940] border border-[#8CA9FF]/30 shadow-[0_2px_10px_rgba(140,169,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#8CA9FF] transition-transform duration-200 group-hover:scale-105">
              <ShieldCheck className="w-5 h-5 text-[#8CA9FF] filter drop-shadow-[0_0_8px_rgba(140,169,255,0.5)]" />
            </div>
            <span className="font-bold tracking-tight text-base text-[#F4F6FC] flex items-center gap-1.5">
              AIRLOCK{" "}
              <span className="text-[#8CA9FF] font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-[#8CA9FF]/15 border border-[#8CA9FF]/25 font-semibold">
                AI
              </span>
            </span>
          </Link>
        </div>

        {/* Tenant Organization Switcher with clay-surface styling */}
        <div className="p-3 border-b border-white/[0.06]">
          <div className="clay-surface p-2.5 rounded-xl border border-white/[0.08] hover:border-[#8CA9FF]/30 transition-all duration-200 flex items-center justify-between cursor-pointer group shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-[#334766] to-[#263754] border border-[#8CA9FF]/20 flex items-center justify-center text-xs font-bold text-[#8CA9FF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] shrink-0">
                AL
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#F4F6FC] truncate group-hover:text-white transition-colors">
                  {org?.name || "Airlock Security Labs"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#75D6B1] shadow-[0_0_6px_rgba(117,214,177,0.7)]" />
                  <span className="text-[10px] uppercase font-mono text-[#B3C0D4] tracking-wider">
                    {org?.plan_tier || "Enterprise"}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#8191AB] group-hover:text-[#8CA9FF] group-hover:translate-x-0.5 transition-all duration-150 shrink-0" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const isFirstAdminItem = item.name === "Organization";

            return (
              <div key={item.href}>
                {/* Spatial divider before admin/org group */}
                {isFirstAdminItem && (
                  <div className="pt-3 pb-1.5 px-1">
                    <div className="divider-spatial mb-2" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8191AB]/70 px-2 select-none">
                      Management
                    </span>
                  </div>
                )}
                <Link
                  href={item.href}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 overflow-hidden ${
                    isActive
                      ? "bg-[#1B2940] text-[#F4F6FC] border border-[#8CA9FF]/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.35)]"
                      : "text-[#B3C0D4] hover:text-[#F4F6FC] hover:bg-white/[0.05] border border-transparent"
                  }`}
                >
                  {/* Subtle left accent bar (2px wide, #8CA9FF) on active items */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[#8CA9FF] rounded-r shadow-[0_0_8px_#8CA9FF]" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        isActive
                          ? "text-[#8CA9FF] filter drop-shadow-[0_0_6px_rgba(140,169,255,0.4)]"
                          : "text-[#8191AB] group-hover:text-[#B3C0D4]"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge && (
                    item.badge === "TINYFISH" ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#85D8E7]/20 text-[#85D8E7] border border-[#85D8E7]/40 shadow-[0_0_10px_rgba(133,216,231,0.2)]">
                        🐟 TINYFISH
                      </span>
                    ) : (
                      <span
                        className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-md transition-colors ${
                          isActive
                            ? "bg-[#8CA9FF]/20 text-[#8CA9FF] border border-[#8CA9FF]/30"
                            : "bg-white/[0.06] text-[#8191AB] border border-white/[0.08] group-hover:border-white/15 group-hover:text-[#B3C0D4]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Broker Liveness Status Card */}
        <div className="p-3 border-t border-white/[0.06] bg-[#0A101C]/60 backdrop-blur-sm">
          <GlassPanel
            intensity="subtle"
            padding="none"
            className="p-3 rounded-xl bg-[#111B2E]/90 border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_12px_rgba(0,0,0,0.3)] space-y-2.5"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8191AB] font-medium">Broker Gate</span>
              <StatusBadge variant="safe" dot pulseDot className="text-[10px] py-0.5 px-2">
                AIRGAPPED
              </StatusBadge>
            </div>
            <div className="text-[11px] text-[#B3C0D4] flex items-center justify-between font-mono pt-1.5 border-t border-white/[0.04]">
              <span className="text-[#8191AB]">Canary Guard:</span>
              <span className="text-[#8CA9FF] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8CA9FF] shadow-[0_0_6px_rgba(140,169,255,0.6)]" />
                ENFORCED
              </span>
            </div>
          </GlassPanel>

          <div className="mt-2.5 flex items-center justify-between pt-1 text-xs text-[#8191AB]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-[#263754] border border-[#8CA9FF]/20 flex items-center justify-center text-[10px] font-bold text-[#8CA9FF] shrink-0">
                EV
              </div>
              <span className="truncate max-w-[125px] font-mono text-[11px] text-[#B3C0D4]">
                secops@airlock.ai
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#8191AB] hover:text-[#EC8995] hover:bg-[#EC8995]/10 rounded-lg transition-all duration-150"
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
        <header className="sticky top-0 z-30 h-16 border-b border-white/[0.08] bg-[#0E1626]/85 backdrop-blur-2xl px-4 sm:px-6 lg:px-8 flex items-center justify-between relative shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          {/* Shimmer line animation along bottom border */}
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#8CA9FF]/40 to-transparent animate-shimmer pointer-events-none" />

          {/* Left section: mobile hamburger & breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#B3C0D4] hover:text-[#F4F6FC] hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Breadcrumb with larger font & muted separator */}
            <div className="flex items-center gap-2.5 text-sm font-mono">
              <span className="text-[#B3C0D4] font-medium tracking-tight">
                {org?.name || "Airlock Security Labs"}
              </span>
              <span className="text-[#8191AB]/50 select-none">/</span>
              <span className="text-[#F4F6FC] font-semibold capitalize tracking-tight">
                {pathname.split("/")[1]?.replace(/-/g, " ") || "Overview"}
              </span>
            </div>
          </div>

          {/* Right section: external link & CTA button */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#B3C0D4] hover:text-[#F4F6FC] px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-150"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8191AB]" />
            </Link>

            <Link
              href="/evaluations/studio"
              className="clay-btn-primary inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl shadow-[0_4px_16px_-2px_rgba(140,169,255,0.35),0_2px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_22px_-2px_rgba(140,169,255,0.5),0_3px_8px_rgba(0,0,0,0.4)] transition-all duration-200"
            >
              <Play className="w-3.5 h-3.5 text-[#8CA9FF] fill-[#8CA9FF]" />
              <span>Launch Evaluation</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex">
            <div className="w-72 max-w-[85vw] bg-[#0E1626]/95 backdrop-blur-2xl border-r border-white/10 p-5 flex flex-col justify-between shadow-2xl relative">
              {/* Subtle ambient orb in mobile drawer */}
              <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#8CA9FF]/15 via-[#ADA4F5]/10 to-transparent blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#263754] to-[#1B2940] border border-[#8CA9FF]/30 shadow-[0_2px_8px_rgba(140,169,255,0.25)] flex items-center justify-center text-[#8CA9FF]">
                      <ShieldCheck className="w-4 h-4 text-[#8CA9FF]" />
                    </div>
                    <span className="font-bold text-base text-[#F4F6FC] flex items-center gap-1.5">
                      AIRLOCK{" "}
                      <span className="text-[#8CA9FF] font-mono text-[10px] px-1 py-0.5 rounded bg-[#8CA9FF]/15 border border-[#8CA9FF]/25">
                        AI
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg text-[#B3C0D4] hover:text-[#F4F6FC] hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const isFirstAdminItem = item.name === "Organization";

                    return (
                      <div key={item.href}>
                        {isFirstAdminItem && (
                          <div className="pt-2 pb-1">
                            <div className="divider-spatial mb-2" />
                          </div>
                        )}
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                              ? "bg-[#1B2940] text-[#F4F6FC] border border-[#8CA9FF]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                              : "text-[#B3C0D4] hover:text-[#F4F6FC] hover:bg-white/[0.04]"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-[#8CA9FF] rounded-r shadow-[0_0_8px_#8CA9FF]" />
                          )}
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`w-4 h-4 ${
                                isActive ? "text-[#8CA9FF]" : "text-[#8191AB]"
                              }`}
                            />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                                isActive
                                  ? "bg-[#8CA9FF]/20 text-[#8CA9FF] border border-[#8CA9FF]/30"
                                  : "bg-white/[0.06] text-[#8191AB] border border-white/[0.08]"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[#EC8995] hover:text-white p-2.5 bg-[#EC8995]/10 hover:bg-[#EC8995]/20 border border-[#EC8995]/20 rounded-xl transition-all duration-150"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        {/* Page Children */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
