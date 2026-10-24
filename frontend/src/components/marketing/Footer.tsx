"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/ui/clay";

const FOOTER_SECTIONS = [
  {
    title: "Platform",
    links: [
      { name: "Evaluation Architecture", href: "/platform" },
      { name: "Evaluation Studio", href: "/evaluations/studio" },
      { name: "Threat Intelligence", href: "/threat-intel" },
      { name: "Broker Policy Engine", href: "/policies" },
      { name: "Evidence Vault", href: "/vault" },
    ]
  },
  {
    title: "Security & Trust",
    links: [
      { name: "Security Architecture", href: "/security" },
      { name: "Isolation Boundary", href: "/security#isolation" },
      { name: "Ed25519 & Hash Chains", href: "/security#cryptography" },
      { name: "Responsible Disclosure", href: "/security#disclosure" },
      { name: "Known Limitations", href: "/docs#limitations" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "Enterprise Solutions", href: "/solutions" },
      { name: "Commercial Pricing", href: "/pricing" },
      { name: "Developer Docs", href: "/docs" },
      { name: "Book Architectural Demo", href: "/contact" },
    ]
  }
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#070D18] text-[#8191AB] text-sm">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#8CA9FF]/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8CA9FF]/10 border border-[#8CA9FF]/20 flex items-center justify-center text-[#8CA9FF]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-lg text-[#F4F6FC]">
                AIRLOCK{" "}
                <span className="text-[#8CA9FF] font-mono text-xs">AI</span>
              </span>
            </div>
            <p className="text-[#B3C0D4] text-sm max-w-sm leading-relaxed">
              AI evaluation assurance infrastructure. Secure the testing process, eliminate cross-tenant contamination, and make every model safety evaluation cryptographically accountable.
            </p>
            <div className="flex items-center gap-3">
              <StatusBadge variant="safe" dot pulseDot>
                airlock-gateway-broker-01
              </StatusBadge>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F6FC] font-mono">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#8191AB] hover:text-[#F4F6FC] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                {section.title === "Company" && (
                  <li>
                    <StatusBadge variant="info" dot>Pilot Launch: Active</StatusBadge>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8191AB]">
          <p>© 2026 AIRLOCK AI Inc. All rights reserved. Commercial evaluation infrastructure.</p>
          <div className="flex items-center gap-6">
            <span>Draft terms & privacy notice for customer pilots</span>
            <Link href="/security" className="hover:text-[#F4F6FC] transition-colors">
              Trust Model
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
