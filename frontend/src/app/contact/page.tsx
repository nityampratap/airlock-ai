"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Loader2, Send } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    work_email: "",
    company: "",
    organization_size: "50-250",
    primary_use_case: "Release Gating for LLM Applications",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.submitContact(formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit demo request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex flex-col">
      <Navbar />

      <section className="pt-16 pb-20 border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121C30] border border-[#86A8FF]/20 text-xs font-mono text-[#86A8FF]">
            SOLUTIONS ENGINEERING & ARCHITECTURAL DEMO
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F4F6FB] tracking-tight">
            Book an Architectural Demo
          </h1>
          <p className="text-base sm:text-lg text-[#ADBBD0] max-w-xl mx-auto">
            Discuss your evaluation isolation requirements directly with our security engineering team.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
          <div className="clay-card p-8 sm:p-10 space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#68CFA9]/20 border border-[#68CFA9]/40 flex items-center justify-center text-[#68CFA9] mx-auto shadow-[0_0_30px_rgba(104,207,169,0.3)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#F4F6FB]">Demo Request Received</h3>
                <p className="text-sm text-[#ADBBD0] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#F4F6FB] font-semibold">{formData.name}</span>. An AIRLOCK AI solutions engineer will follow up at <span className="text-[#86A8FF] font-mono">{formData.work_email}</span> within 24 business hours.
                </p>
                <div className="pt-4">
                  <Link
                    href="/evaluations/studio"
                    className="clay-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                  >
                    <span>Explore Evaluation Studio In The Meantime</span>
                    <ArrowRight className="w-4 h-4 text-[#86A8FF]" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-[#E5838F]/10 border border-[#E5838F]/30 text-xs text-[#E5838F]">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#ADBBD0]">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Elena Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] placeholder-[#7587A4] focus:outline-none focus:border-[#86A8FF]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#ADBBD0]">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="elena@company.com"
                      value={formData.work_email}
                      onChange={(e) => setFormData({ ...formData, work_email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] placeholder-[#7587A4] focus:outline-none focus:border-[#86A8FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#ADBBD0]">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="Anthropic Labs"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] placeholder-[#7587A4] focus:outline-none focus:border-[#86A8FF]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[#ADBBD0]">Organization Size *</label>
                    <select
                      value={formData.organization_size}
                      onChange={(e) => setFormData({ ...formData, organization_size: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                    >
                      <option value="1-15">1-15 engineers</option>
                      <option value="15-50">15-50 engineers</option>
                      <option value="50-250">50-250 engineers</option>
                      <option value="250+">250+ engineers</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#ADBBD0]">Primary Use Case *</label>
                  <select
                    value={formData.primary_use_case}
                    onChange={(e) => setFormData({ ...formData, primary_use_case: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] focus:outline-none focus:border-[#86A8FF]"
                  >
                    <option value="Release Gating for LLM Applications">Release Gating for LLM Applications</option>
                    <option value="Adversarial Red-Team Consultancy Deliverables">Adversarial Red-Team Consultancy Deliverables</option>
                    <option value="Enterprise Model Governance & Audit">Enterprise Model Governance & Audit</option>
                    <option value="Canary Exfiltration Prevention">Canary Exfiltration Prevention</option>
                    <option value="Evaluation Isolation Infrastructure">Evaluation Isolation Infrastructure</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#ADBBD0]">Testing Objectives & Models *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="We evaluate autonomous tool-use agents and need to prevent canary exfiltration and generate signed evidence for our audit committee..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-sm text-[#F4F6FB] placeholder-[#7587A4] focus:outline-none focus:border-[#86A8FF]"
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
                      <span>Scheduling Demo...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#86A8FF]" />
                      <span>Request Architectural Demo</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#7587A4] font-mono">
                  Your information is protected under our evaluation confidentiality disclosure policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
