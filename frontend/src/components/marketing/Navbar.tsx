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
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0]">
      {/* Clean white backdrop */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-10">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] group-hover:border-[#86EFAC] transition-all duration-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-lg text-[#1E293B] flex items-center gap-1.5">
            AIRLOCK{" "}
            <span className="text-[#16A34A] text-xs px-1.5 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] font-medium">
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
              className="px-3.5 py-2 text-sm font-medium text-[#64748B] hover:text-[#1E293B] rounded-lg hover:bg-[#F8FAFB] transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="text-sm font-medium text-[#64748B] hover:text-[#1E293B] px-3.5 py-2 rounded-lg hover:bg-[#F8FAFB] transition-all"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-flex text-sm font-medium text-[#475569] hover:text-[#1E293B] px-3.5 py-2 rounded-lg border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all"
          >
            Book demo
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl font-semibold bg-[#16A34A] text-white hover:bg-[#15803D] shadow-sm transition-all duration-200"
          >
            <span>Launch Console</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFB] transition-colors"
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
              className="md:hidden fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-16 left-0 right-0 z-50 bg-white border-b border-[#E2E8F0] shadow-lg p-4"
            >
              <nav className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFB] transition-colors"
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
