"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { RiskInspectionConsole } from "@/components/home/RiskInspectionConsole";
import {
  ShoppingBag,
  LayoutDashboard,
  ArrowRight,
  Cpu,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              {/* Context Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-surface text-xs font-mono text-greige mb-6 tracking-[0.08em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>KartAI × Codexcelerate 2026</span>
                <span className="text-greige/40">/</span>
                <span>Applied AI Seller Tools</span>
                <span className="text-greige/40">/</span>
                <span className="text-bone">Akshaya Mirudha M</span>
              </div>

              {/* Display Headline - Organic, Rounded, Humanist Bricolage */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-bone leading-[1.02] mb-6 lowercase">
                eliminate fake cod returns before dispatch.
              </h1>

              {/* Human Engineering Copy - Constrained Measure */}
              <p className="font-sans text-base sm:text-lg text-greige leading-relaxed max-w-[60ch] mb-8">
                rto-shield combines deterministic delivery history with Gemini AI physical address parsing. Identify high-risk buyers, enforce prepaid checkout, and prevent forward-and-reverse logistics losses in under 60 milliseconds.
              </p>

              {/* Action-Specific CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/storefront"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-bone text-canvas font-medium text-xs hover:bg-bone-hover active:scale-[0.98] transition-all shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  <span>Open Storefront Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-surface text-bone font-medium text-xs hover:bg-surface-hover hover:border-white/30 active:scale-[0.98] transition-all"
                >
                  <LayoutDashboard className="w-4 h-4 text-greige" strokeWidth={1.5} />
                  <span>Inspect Merchant Command Center</span>
                </Link>
              </div>
            </div>

            {/* Concrete Metrics Band - Strict Tabular Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden mb-16 shadow-xl">
              <div className="bg-surface p-5 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-bone tabular-nums">₹180</div>
                <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-greige mt-1">Saved per prevented return</div>
              </div>
              <div className="bg-surface p-5 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-bone tabular-nums">0 to 100</div>
                <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-greige mt-1">Hybrid risk score model</div>
              </div>
              <div className="bg-surface p-5 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-bone tabular-nums">35.4%</div>
                <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-greige mt-1">Avg Indian D2C COD return rate</div>
              </div>
              <div className="bg-surface p-5 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">&lt;60ms</div>
                <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-greige mt-1">Evaluation decision latency</div>
              </div>
            </div>

            {/* Live Interactive Inspection Console */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono uppercase tracking-[0.08em] text-greige">
                  SPEC-01 • Interactive Risk Engine Console
                </div>
                <div className="text-xs font-mono text-greige/70">
                  Try switching profiles below
                </div>
              </div>
              <RiskInspectionConsole />
            </div>
          </div>
        </section>

        {/* 60-Second Evaluation Walkthrough */}
        <section className="py-24 border-t border-white/10 bg-surface/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-greige">
                Workflow Sequence
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-bone tracking-[-0.03em] leading-[1.05] mt-1 lowercase">
                five steps to verify the complete engine
              </h2>
              <p className="text-xs sm:text-sm text-greige mt-2 max-w-[55ch] leading-relaxed">
                Follow this exact sequence in the live simulator to test deterministic rules, Gemini address parsing, and dynamic prepaid nudges:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                {
                  step: "01",
                  title: "Open Storefront",
                  desc: "Launch the D2C checkout simulator preloaded with real electronics catalog items.",
                  badge: "Catalog",
                },
                {
                  step: "02",
                  title: "Select Persona",
                  desc: "Choose 'Serial Returner' to autofill a profile with 5 prior doorstep rejections.",
                  badge: "Profile",
                },
                {
                  step: "03",
                  title: "Submit Checkout",
                  desc: "Observe real-time 3-step audit: past order logs, pincode syntax, and Gemini NLP.",
                  badge: "Engine",
                },
                {
                  step: "04",
                  title: "Prepaid Nudge",
                  desc: "Cash on delivery is restricted; buyer is offered ₹50 discount for instant UPI.",
                  badge: "Intervention",
                },
                {
                  step: "05",
                  title: "Inspect Telemetry",
                  desc: "Review recorded order telemetry, conversion classification, and ₹180 saved metric.",
                  badge: "Dashboard",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-surface p-4 flex flex-col justify-between hover:bg-surface-hover hover:border-white/20 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-greige font-semibold tracking-wider">{item.step}</span>
                      <span className="px-2 py-0.5 rounded border border-wine/40 bg-wine/20 text-[10px] text-bone font-mono uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-bone mb-1 lowercase">
                      {item.title}
                    </h3>
                    <p className="text-xs text-greige leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <Link
                href="/storefront"
                className="inline-flex items-center gap-2 text-xs font-medium text-bone hover:text-bone-hover transition-colors font-mono tracking-wide"
              >
                <span>Proceed to Step 01 in the Storefront Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>

        {/* System Architecture Pillars */}
        <section className="py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-greige">
                System Architecture
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-bone tracking-[-0.03em] leading-[1.05] mt-1 lowercase">
                engine design & scoring weights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-surface p-6 hover:bg-surface-hover transition-colors">
                <div className="text-xs font-mono text-greige mb-3 flex items-center gap-2 uppercase tracking-[0.08em]">
                  <Cpu className="w-4 h-4 text-bone" strokeWidth={1.5} />
                  <span>TIER 01 • DETERMINISTIC RULES</span>
                </div>
                <h3 className="font-display text-base font-semibold text-bone mb-2 lowercase">
                  historical & cart rules (0 to 40 pts)
                </h3>
                <p className="text-xs text-greige leading-relaxed font-sans">
                  Queries delivery network logs for repeat RTO history (+35 to +40 pts), flags high-value COD orders over ₹2,500 (+15 pts), and verifies 6-digit Indian PIN format (+20 pts).
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-surface p-6 hover:bg-surface-hover transition-colors">
                <div className="text-xs font-mono text-greige mb-3 flex items-center gap-2 uppercase tracking-[0.08em]">
                  <Sparkles className="w-4 h-4 text-bone" strokeWidth={1.5} />
                  <span>TIER 02 • GEMINI AI AUDIT</span>
                </div>
                <h3 className="font-display text-base font-semibold text-bone mb-2 lowercase">
                  address nlp deliverability (0 to 60 pts)
                </h3>
                <p className="text-xs text-greige leading-relaxed font-sans">
                  Inspects physical courier routing clarity, flags keyboard-smash gibberish, detects missing flat/premise numbers, and enforces strict demographic neutrality with zero personal bias.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-surface p-6 hover:bg-surface-hover transition-colors">
                <div className="text-xs font-mono text-greige mb-3 flex items-center gap-2 uppercase tracking-[0.08em]">
                  <RotateCcw className="w-4 h-4 text-bone" strokeWidth={1.5} />
                  <span>TIER 03 • CONVERSION ENGINE</span>
                </div>
                <h3 className="font-display text-base font-semibold text-bone mb-2 lowercase">
                  incentivized prepaid recovery
                </h3>
                <p className="text-xs text-greige leading-relaxed font-sans">
                  Rather than losing customer acquisition spend through blanket order cancellation, dynamically applies ₹50 discounts and priority dispatch to convert tentative COD buyers to digital UPI.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Studio-Grade Footer */}
      <footer className="border-t border-white/10 py-8 bg-surface text-xs text-greige font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-greige">
            <span className="font-semibold text-bone">rto-shield™</span>
            <span>•</span>
            <span>autonomous return prevention platform</span>
          </div>
          <div>
            <span>Code to Cart · KartAI × Codexcelerate 2026 • Akshaya Mirudha M</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
