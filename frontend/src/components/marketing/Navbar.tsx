"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "ThreatLoop (TinyFish)", href: "/threatloop" },
  { name: "Platform", href: "/platform" },
  { name: "Solutions", href: "/solutions" },
  { name: "Security", href: "/security" },
  { name: "Pricing", href: "/pricing" },
  { name: "Documentation", href: "/docs" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06]">
      {/* Glass backdrop */}
      <div className="absolute inset-0 bg-[#0B1220]/70 backdrop-blur-2xl" />
      {/* Bottom highlight line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8CA9FF]/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-10">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8CA9FF]/20 to-[#ADA4F5]/10 border border-[#8CA9FF]/25 flex items-center justify-center text-[#8CA9FF] shadow-[0_0_20px_rgba(140,169,255,0.15)] group-hover:border-[#8CA9FF]/50 group-hover:shadow-[0_0_28px_rgba(140,169,255,0.25)] transition-all duration-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-lg text-[#F4F6FC] flex items-center gap-1.5">
            AIRLOCK{" "}
            <span className="text-[#8CA9FF] text-xs px-1.5 py-0.5 rounded-md bg-[#8CA9FF]/10 border border-[#8CA9FF]/20 font-mono font-medium">
              AI
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-[#B3C0D4] hover:text-[#F4F6FC] rounded-lg hover:bg-white/[0.04] transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="text-sm font-medium text-[#B3C0D4] hover:text-[#F4F6FC] px-3.5 py-2 rounded-lg hover:bg-white/[0.04] transition-all"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-flex text-sm font-medium text-[#B3C0D4] hover:text-[#F4F6FC] px-3.5 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            Book demo
          </Link>
          <Link
            href="/login"
            className="clay-btn-primary inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl font-semibold"
          >
            <span>Launch Console</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8CA9FF]" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#B3C0D4] hover:text-[#F4F6FC] hover:bg-white/[0.06] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-16 left-0 right-0 z-50 bg-[#0E1626]/95 backdrop-blur-2xl border-b border-white/[0.08] p-4"
            >
              <nav className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-[#B3C0D4] hover:text-[#F4F6FC] hover:bg-white/[0.04] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
