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
import { StatusBadge } from "@/components/ui/clay";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "ThreatLoop", href: "/threatloop", icon: RefreshCw, badge: "TINYFISH" },
  { name: "Evaluation Studio", href: "/evaluations/studio", icon: Cpu },
  { name: "Threat Intelligence", href: "/threat-intel", icon: Radar },
  { name: "Policy Center", href: "/policies", icon: ShieldAlert },
  { name: "Evidence Vault", href: "/vault", icon: Archive },
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
    <div className="min-h-screen bg-[#F8FAFB] flex text-[#1E293B]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-40 border-r border-[#E2E8F0] bg-white">
        {/* Brand Section */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-[#E2E8F0]">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] transition-transform duration-200 group-hover:scale-105">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold tracking-tight text-base text-[#1E293B] flex items-center gap-1.5">
              Airlock{" "}
              <span className="text-[#16A34A] text-[11px] px-1.5 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] font-medium">
                AI
              </span>
            </span>
          </Link>
        </div>

        {/* Tenant Organization Switcher */}
        <div className="p-3 border-b border-[#E2E8F0]">
          <div className="bg-[#F8FAFB] p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all duration-200 flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-xs font-bold text-[#16A34A] shrink-0">
                AL
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#1E293B] truncate group-hover:text-[#16A34A] transition-colors">
                  {org?.name || "Airlock Security Labs"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  <span className="text-[10px] uppercase text-[#94A3B8] tracking-wider">
                    {org?.plan_tier || "Enterprise"}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#16A34A] group-hover:translate-x-0.5 transition-all duration-150 shrink-0" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const isFirstAdminItem = item.name === "Organization";

            return (
              <div key={item.href}>
                {/* Divider before admin/org group */}
                {isFirstAdminItem && (
                  <div className="pt-3 pb-1.5 px-1">
                    <div className="h-px bg-[#E2E8F0] mb-2" />
                    <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] px-2 select-none">
                      Management
                    </span>
                  </div>
                )}
                <Link
                  href={item.href}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]"
                      : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFB] border border-transparent"
                  }`}
                >
                  {/* Left accent bar on active items */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-[2.5px] bg-[#16A34A] rounded-r" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors duration-150 ${
                        isActive
                          ? "text-[#16A34A]"
                          : "text-[#94A3B8] group-hover:text-[#64748B]"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge && (
                    item.badge === "TINYFISH" ? (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]">
                        🐟 TinyFish
                      </span>
                    ) : (
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                          isActive
                            ? "bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]"
                            : "bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] group-hover:text-[#64748B]"
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

        {/* System Status Card */}
        <div className="p-3 border-t border-[#E2E8F0]">
          <div className="p-3 rounded-xl bg-[#F8FAFB] border border-[#E2E8F0] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8] font-medium">System Status</span>
              <StatusBadge variant="safe" dot pulseDot className="text-[10px] py-0.5 px-2">
                Operational
              </StatusBadge>
            </div>
            <div className="text-[11px] text-[#64748B] flex items-center justify-between pt-1.5 border-t border-[#E2E8F0]">
              <span className="text-[#94A3B8]">Policy Engine:</span>
              <span className="text-[#16A34A] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Active
              </span>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between pt-1 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[10px] font-bold text-[#16A34A] shrink-0">
                EV
              </div>
              <span className="truncate max-w-[125px] text-[11px] text-[#64748B]">
                secops@airlock.ai
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-all duration-150"
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
        <header className="sticky top-0 z-30 h-14 border-b border-[#E2E8F0] bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFB] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#64748B] font-medium">
                {org?.name || "Airlock Security Labs"}
              </span>
              <span className="text-[#CBD5E1]">/</span>
              <span className="text-[#1E293B] font-semibold capitalize">
                {pathname.split("/")[1]?.replace(/-/g, " ") || "Overview"}
              </span>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#1E293B] px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white hover:bg-[#F8FAFB] transition-all duration-150"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8]" />
            </Link>

            <Link
              href="/evaluations/studio"
              className="bg-[#16A34A] hover:bg-[#15803D] text-white inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-150"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Launch Evaluation</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/20 flex">
            <div className="w-72 max-w-[85vw] bg-white border-r border-[#E2E8F0] p-5 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-base text-[#1E293B] flex items-center gap-1.5">
                      Airlock{" "}
                      <span className="text-[#16A34A] text-[10px] px-1 py-0.5 rounded bg-[#F0FDF4] border border-[#BBF7D0]">
                        AI
                      </span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFB] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-4 space-y-0.5 overflow-y-auto max-h-[calc(100vh-200px)]">
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
                            <div className="h-px bg-[#E2E8F0] mb-2" />
                          </div>
                        )}
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`relative flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                            isActive
                              ? "bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]"
                              : "text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFB]"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-2 bottom-2 w-[2.5px] bg-[#16A34A] rounded-r" />
                          )}
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`w-4 h-4 ${
                                isActive ? "text-[#16A34A]" : "text-[#94A3B8]"
                              }`}
                            />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${
                                isActive
                                  ? "bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]"
                                  : "bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]"
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

              <div className="pt-4 border-t border-[#E2E8F0]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[#DC2626] hover:text-white p-2.5 bg-[#FEF2F2] hover:bg-[#DC2626] border border-[#FECACA] rounded-lg transition-all duration-150"
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
