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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              {/* Context Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-white/[0.08] bg-zinc-900/40 text-xs font-mono text-zinc-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>KartAI × Codexcelerate 2026</span>
                <span className="text-zinc-600">/</span>
                <span>Applied AI Seller Tools</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-300">Akshaya Mirudha M</span>
              </div>

              {/* Display Headline - Sharp, Tight, High-Contrast */}
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.08] mb-6">
                Eliminate fake COD returns before dispatch.
              </h1>

              {/* Human Engineering Copy - Constrained Measure */}
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-[60ch] mb-8">
                RTO-Shield combines deterministic delivery history with Gemini AI physical address parsing. Identify high-risk buyers, enforce prepaid checkout, and prevent forward-and-reverse logistics losses in under 60 milliseconds.
              </p>

              {/* Action-Specific CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/storefront"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-zinc-200 active:scale-[0.98] transition-all"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  <span>Open Storefront Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.08] bg-zinc-900/40 text-zinc-300 font-medium text-xs hover:bg-zinc-900/80 hover:border-white/20 active:scale-[0.98] transition-all"
                >
                  <LayoutDashboard className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                  <span>Inspect Merchant Command Center</span>
                </Link>
              </div>
            </div>

            {/* Concrete Metrics Band - Strict Tabular Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.08] rounded-lg overflow-hidden mb-16">
              <div className="bg-zinc-950 p-5">
                <div className="text-2xl font-bold font-mono text-zinc-100 tabular-nums">₹180</div>
                <div className="text-xs text-zinc-400 mt-1">Saved per prevented return</div>
              </div>
              <div className="bg-zinc-950 p-5">
                <div className="text-2xl font-bold font-mono text-zinc-100 tabular-nums">0 to 100</div>
                <div className="text-xs text-zinc-400 mt-1">Two-tier hybrid risk score</div>
              </div>
              <div className="bg-zinc-950 p-5">
                <div className="text-2xl font-bold font-mono text-zinc-100 tabular-nums">35.4%</div>
                <div className="text-xs text-zinc-400 mt-1">Avg Indian D2C COD return rate</div>
              </div>
              <div className="bg-zinc-950 p-5">
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">&lt;60ms</div>
                <div className="text-xs text-zinc-400 mt-1">Evaluation decision latency</div>
              </div>
            </div>

            {/* Live Interactive Inspection Console */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Interactive Risk Engine Console
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  Try switching profiles below
                </div>
              </div>
              <RiskInspectionConsole />
            </div>
          </div>
        </section>

        {/* 60-Second Evaluation Walkthrough */}
        <section className="py-20 border-t border-white/[0.08] bg-zinc-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Evaluation Walkthrough
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight mt-1">
                Five steps to verify the complete engine
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-[55ch]">
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
                  className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-4 flex flex-col justify-between hover:bg-zinc-900/60 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-500 font-semibold">{item.step}</span>
                      <span className="px-1.5 py-0.5 rounded border border-white/[0.06] bg-zinc-950 text-[10px] text-zinc-400">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06]">
              <Link
                href="/storefront"
                className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
              >
                <span>Proceed to Step 01 in the Storefront Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>

        {/* System Architecture Pillars */}
        <section className="py-20 border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                System Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight mt-1">
                Engine Design & Scoring Weights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-6">
                <div className="text-xs font-mono text-zinc-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
                  <span>TIER 01 • DETERMINISTIC RULES</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">
                  Historical & Cart Rules (0 to 40 pts)
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Queries delivery network logs for repeat RTO history (+35 to +40 pts), flags high-value COD orders over ₹2,500 (+15 pts), and verifies 6-digit Indian PIN format (+20 pts).
                </p>
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-6">
                <div className="text-xs font-mono text-zinc-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
                  <span>TIER 02 • GEMINI AI AUDIT</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">
                  Address NLP Deliverability (0 to 60 pts)
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Inspects physical courier routing clarity, flags keyboard-smash gibberish, detects missing flat/premise numbers, and enforces strict demographic neutrality with zero personal bias.
                </p>
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-6">
                <div className="text-xs font-mono text-zinc-400 mb-3 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-zinc-300" strokeWidth={1.5} />
                  <span>TIER 03 • CONVERSION ENGINE</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">
                  Incentivized Prepaid Recovery
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Rather than losing customer acquisition spend through blanket order cancellation, dynamically applies ₹50 discounts and priority dispatch to convert tentative COD buyers to digital UPI.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Studio-Grade Footer */}
      <footer className="border-t border-white/[0.08] py-8 bg-zinc-950 text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="font-semibold text-zinc-200">RTO-SHIELD</span>
            <span>•</span>
            <span>Autonomous Return Prevention Platform</span>
          </div>
          <div>
            <span>Code to Cart · KartAI × Codexcelerate 2026 • Akshaya Mirudha M</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
