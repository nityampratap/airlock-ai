"use client";

import Link from "next/link";
import { ShieldCheck, Terminal, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#070D18] text-[#7587A4] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#86A8FF]/10 border border-[#86A8FF]/20 flex items-center justify-center text-[#86A8FF]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-lg text-[#F4F6FB]">
                AIRLOCK <span className="text-[#86A8FF] font-mono text-xs">AI</span>
              </span>
            </div>
            <p className="text-[#ADBBD0] text-sm max-w-sm leading-relaxed">
              AI evaluation assurance infrastructure. Secure the testing process, eliminate cross-tenant contamination, and make every model safety evaluation cryptographically accountable.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-[#7587A4]">
              <span className="w-2 h-2 rounded-full bg-[#68CFA9] animate-pulse"></span>
              Broker Node: <span className="text-[#ADBBD0]">airlock-gateway-broker-01</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F6FB] font-mono">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/platform" className="hover:text-[#F4F6FB] transition-colors">Evaluation Architecture</Link></li>
              <li><Link href="/evaluations/studio" className="hover:text-[#F4F6FB] transition-colors">Evaluation Studio</Link></li>
              <li><Link href="/threat-intel" className="hover:text-[#F4F6FB] transition-colors">Threat Intelligence</Link></li>
              <li><Link href="/policies" className="hover:text-[#F4F6FB] transition-colors">Broker Policy Engine</Link></li>
              <li><Link href="/vault" className="hover:text-[#F4F6FB] transition-colors">Evidence Vault</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F6FB] font-mono">Security & Trust</h4>
            <ul className="space-y-2">
              <li><Link href="/security" className="hover:text-[#F4F6FB] transition-colors">Security Architecture</Link></li>
              <li><Link href="/security#isolation" className="hover:text-[#F4F6FB] transition-colors">Isolation Boundary</Link></li>
              <li><Link href="/security#cryptography" className="hover:text-[#F4F6FB] transition-colors">Ed25519 & Hash Chains</Link></li>
              <li><Link href="/security#disclosure" className="hover:text-[#F4F6FB] transition-colors">Responsible Disclosure</Link></li>
              <li><Link href="/docs#limitations" className="hover:text-[#F4F6FB] transition-colors">Known Limitations</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F6FB] font-mono">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/solutions" className="hover:text-[#F4F6FB] transition-colors">Enterprise Solutions</Link></li>
              <li><Link href="/pricing" className="hover:text-[#F4F6FB] transition-colors">Commercial Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-[#F4F6FB] transition-colors">Developer Docs</Link></li>
              <li><Link href="/contact" className="hover:text-[#F4F6FB] transition-colors">Book Architectural Demo</Link></li>
              <li><span className="text-xs text-[#7587A4]">Pilot Launch Status: Active</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 AIRLOCK AI Inc. All rights reserved. Commercial evaluation infrastructure.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#7587A4]">Draft terms & privacy notice for customer pilots</span>
            <Link href="/security" className="hover:text-[#F4F6FB] transition-colors">Trust Model</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
