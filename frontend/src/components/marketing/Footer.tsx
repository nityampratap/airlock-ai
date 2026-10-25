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
      { name: "Policy Engine", href: "/policies" },
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
    <footer className="w-full border-t border-[#E2E8F0] bg-[#F8FAFB] text-[#64748B] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] border border-[#C8E6C9] flex items-center justify-center text-[#16A34A]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-lg text-[#1E293B]">
                Airlock{" "}
                <span className="text-[#16A34A] text-xs font-semibold">AI</span>
              </span>
            </div>
            <p className="text-[#64748B] text-sm max-w-sm leading-relaxed">
              AI evaluation assurance infrastructure. Secure the testing process, eliminate cross-tenant contamination, and make every model safety evaluation cryptographically accountable.
            </p>
            <div className="flex items-center gap-3">
              <StatusBadge variant="safe" dot pulseDot>
                All systems operational
              </StatusBadge>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E293B]">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#64748B] hover:text-[#1E293B] transition-colors duration-200"
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
        <div className="mt-12 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© 2026 Airlock AI Inc. All rights reserved. Commercial evaluation infrastructure.</p>
          <div className="flex items-center gap-6">
            <span>Draft terms & privacy notice for customer pilots</span>
            <Link href="/security" className="hover:text-[#1E293B] transition-colors">
              Trust Model
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
