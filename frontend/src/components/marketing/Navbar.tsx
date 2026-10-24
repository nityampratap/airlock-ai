"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, Lock, Terminal } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0B1220]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#86A8FF]/20 to-[#A5A0F4]/10 border border-[#86A8FF]/30 flex items-center justify-center text-[#86A8FF] shadow-[0_0_15px_rgba(134,168,255,0.2)] group-hover:border-[#86A8FF]/60 transition-all">
            <ShieldCheck className="w-5 h-5 text-[#86A8FF]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-lg text-[#F4F6FB] flex items-center gap-1.5">
              AIRLOCK <span className="text-[#86A8FF] text-xs px-1.5 py-0.5 rounded bg-[#86A8FF]/10 border border-[#86A8FF]/20 font-mono font-medium">AI</span>
            </span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#ADBBD0]">
          <Link href="/platform" className="hover:text-[#F4F6FB] transition-colors">
            Platform
          </Link>
          <Link href="/solutions" className="hover:text-[#F4F6FB] transition-colors">
            Solutions
          </Link>
          <Link href="/security" className="hover:text-[#F4F6FB] transition-colors">
            Security
          </Link>
          <Link href="/pricing" className="hover:text-[#F4F6FB] transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="hover:text-[#F4F6FB] transition-colors">
            Documentation
          </Link>
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[#ADBBD0] hover:text-[#F4F6FB] px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-flex text-sm font-medium text-[#ADBBD0] hover:text-[#F4F6FB] px-3.5 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            Book demo
          </Link>
          <Link
            href="/login"
            className="clay-btn-primary inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium"
          >
            <span>Launch Console</span>
            <ArrowRight className="w-4 h-4 text-[#86A8FF]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
