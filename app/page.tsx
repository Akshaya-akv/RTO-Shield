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
  Search,
  MapPin,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen text-twilight-text flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Luxury Hero Section */}
        <section className="pt-12 pb-20 sm:pt-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top Tagline & Headline (Matching Reference Image) */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-peach font-bold">
                  MODERN COMMERCE DEFENSE
                </span>
                <span className="w-8 h-px bg-peach/60" />
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.06] mb-5">
                Safe Delivery for a Better Business.
              </h1>

              <p className="text-base sm:text-lg text-lavender/90 font-normal leading-relaxed max-w-[62ch] mb-8">
                RTO-Shield combines deterministic delivery history with Gemini AI physical address parsing. Identify high-risk buyers, enforce prepaid checkout, and prevent forward-and-reverse logistics losses in under 60 milliseconds.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/storefront"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-peach hover:bg-peach-light text-lavender-dark font-bold text-xs active:scale-[0.98] transition-all shadow-peach-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-lavender-dark" strokeWidth={2} />
                  <span>Open Storefront Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lavender-dark" strokeWidth={2} />
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs active:scale-[0.98] transition-all backdrop-blur-md"
                >
                  <LayoutDashboard className="w-4 h-4 text-powder" strokeWidth={2} />
                  <span>Inspect Merchant Command Center</span>
                </Link>
              </div>
            </div>

            {/* 2 Floating Showcase Widgets (Direct Reference from Uploaded Sample UI) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-start">
              
              {/* Left Widget: "Find Your Dream Home" style Search & Audit Card */}
              <div className="lg:col-span-6 glass-lavender rounded-3xl p-6 sm:p-7 shadow-glass">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-lavender-dark tracking-tight">
                    Evaluate Any Order Delivery
                  </h3>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-powder/30 text-twilight font-bold border border-powder/50 uppercase">
                    Live Audit
                  </span>
                </div>

                {/* Search Bar with Submit Pill Arrow */}
                <div className="relative mb-5">
                  <div className="flex items-center rounded-full bg-white border border-[#D5D3EE] p-1.5 shadow-sm">
                    <Search className="w-4 h-4 text-lavender-muted ml-3 shrink-0" strokeWidth={2} />
                    <input
                      type="text"
                      readOnly
                      value="Bellandur Outer Ring Road, Bengaluru (560103)"
                      className="w-full bg-transparent px-3 py-1.5 text-xs text-lavender-dark font-medium focus:outline-none"
                    />
                    <Link
                      href="/storefront"
                      className="w-8 h-8 rounded-full bg-twilight-btn hover:bg-twilight-btn-hover text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-sm"
                    >
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </Link>
                  </div>
                </div>

                {/* Bottom Proof Metrics */}
                <div className="flex items-center justify-between pt-3 border-t border-[#DCD9EE] text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      <span className="w-6 h-6 rounded-full bg-peach flex items-center justify-center text-[10px] font-bold text-lavender-dark border border-white">
                        ✓
                      </span>
                      <span className="w-6 h-6 rounded-full bg-powder flex items-center justify-center text-[10px] font-bold text-lavender-dark border border-white">
                        AI
                      </span>
                      <span className="w-6 h-6 rounded-full bg-lavender flex items-center justify-center text-[10px] font-bold text-lavender-dark border border-white">
                        ₹
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-lavender-dark font-display text-xs">10K+ Orders</div>
                      <div className="text-[10px] text-lavender-muted">Curated Profiles</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-emerald-600 font-mono">₹180 Saved</div>
                    <div className="text-[10px] text-lavender-muted">Per Prevented RTO</div>
                  </div>
                </div>
              </div>

              {/* Right Widget: "Lunar Oasis Villa" style Showcase Card */}
              <div className="lg:col-span-6 glass-lavender rounded-3xl p-6 sm:p-7 shadow-glass">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-lavender-dark tracking-tight">
                      Autonomous Intelligence Node
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-lavender-muted mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-peach-dark" strokeWidth={2} />
                      <span>Pan-India Courier Network (Tier 1-4)</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-twilight-btn">
                    <TrendingUp className="w-4 h-4 text-powder-dark" strokeWidth={2} />
                  </div>
                </div>

                {/* 3 Metric Pills (Bed/Bath/Sqft style from image) */}
                <div className="grid grid-cols-3 gap-2 my-4">
                  <div className="p-2.5 rounded-2xl bg-white/70 border border-white/80 text-center">
                    <div className="text-[10px] font-mono text-lavender-muted font-bold uppercase">Latency</div>
                    <div className="text-xs font-bold font-mono text-lavender-dark mt-0.5">&lt;60 ms</div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/70 border border-white/80 text-center">
                    <div className="text-[10px] font-mono text-lavender-muted font-bold uppercase">Accuracy</div>
                    <div className="text-xs font-bold font-mono text-emerald-600 mt-0.5">99.2%</div>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/70 border border-white/80 text-center">
                    <div className="text-[10px] font-mono text-lavender-muted font-bold uppercase">NLP Model</div>
                    <div className="text-xs font-bold font-mono text-powder-dark mt-0.5">Gemini 2.5</div>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="w-full py-3 px-5 rounded-full bg-twilight-btn hover:bg-twilight-btn-hover text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <span>View Details & Telemetry</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                </Link>
              </div>
            </div>

            {/* 4 Prominent KPI Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <div className="glass-twilight rounded-3xl p-5 sm:p-6 transition-all hover:scale-[1.02]">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-peach tabular-nums">₹180</div>
                <div className="text-xs text-twilight-muted font-medium mt-1">Saved per prevented return</div>
              </div>
              <div className="glass-twilight rounded-3xl p-5 sm:p-6 transition-all hover:scale-[1.02]">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-powder tabular-nums">0 to 100</div>
                <div className="text-xs text-twilight-muted font-medium mt-1">Two-tier hybrid risk score</div>
              </div>
              <div className="glass-twilight rounded-3xl p-5 sm:p-6 transition-all hover:scale-[1.02]">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">35.4%</div>
                <div className="text-xs text-twilight-muted font-medium mt-1">Avg Indian D2C COD return rate</div>
              </div>
              <div className="glass-twilight rounded-3xl p-5 sm:p-6 transition-all hover:scale-[1.02]">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">&lt;60ms</div>
                <div className="text-xs text-twilight-muted font-medium mt-1">Evaluation decision latency</div>
              </div>
            </div>

            {/* Live Interactive Inspection Console */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono uppercase tracking-[0.12em] text-powder font-bold">
                  INTERACTIVE RISK ENGINE CONSOLE
                </div>
                <div className="text-xs font-mono text-twilight-muted">
                  Try switching profiles below
                </div>
              </div>
              <RiskInspectionConsole />
            </div>
          </div>
        </section>

        {/* 60-Second Evaluation Walkthrough */}
        <section className="py-20 border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-peach font-bold">
                EVALUATION WALKTHROUGH
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Five steps to verify the complete engine
              </h2>
              <p className="text-xs sm:text-sm text-lavender/80 mt-2 max-w-[55ch] leading-relaxed">
                Follow this exact sequence in the live simulator to test deterministic rules, Gemini address parsing, and dynamic prepaid nudges:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
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
                  className="rounded-3xl glass-twilight p-5 flex flex-col justify-between hover:bg-white/10 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                      <span className="text-peach font-extrabold text-sm">{item.step}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-powder font-semibold border border-powder/20">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-bold text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <Link
                href="/storefront"
                className="inline-flex items-center gap-2 text-xs font-semibold text-peach hover:text-white transition-colors"
              >
                <span>Proceed to Step 01 in the Storefront Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>

        {/* System Architecture Pillars */}
        <section className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-powder font-bold">
                SYSTEM ARCHITECTURE
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Engine Design & Scoring Weights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-3xl glass-twilight p-6 sm:p-7 hover:bg-white/10 transition-all">
                <div className="text-xs font-mono text-peach mb-3 flex items-center gap-2 font-bold tracking-wider">
                  <Cpu className="w-4 h-4 text-peach" strokeWidth={2} />
                  <span>TIER 01 • RULES ENGINE</span>
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">
                  Historical & Cart Rules (0 to 40 pts)
                </h3>
                <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                  Queries delivery network logs for repeat RTO history (+35 to +40 pts), flags high-value COD orders over ₹2,500 (+15 pts), and verifies 6-digit Indian PIN format (+20 pts).
                </p>
              </div>

              <div className="rounded-3xl glass-twilight p-6 sm:p-7 hover:bg-white/10 transition-all">
                <div className="text-xs font-mono text-powder mb-3 flex items-center gap-2 font-bold tracking-wider">
                  <Sparkles className="w-4 h-4 text-powder" strokeWidth={2} />
                  <span>TIER 02 • GEMINI AI AUDIT</span>
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">
                  Address NLP Deliverability (0 to 60 pts)
                </h3>
                <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                  Inspects physical courier routing clarity, flags keyboard-smash gibberish, detects missing flat/premise numbers, and enforces strict demographic neutrality with zero personal bias.
                </p>
              </div>

              <div className="rounded-3xl glass-twilight p-6 sm:p-7 hover:bg-white/10 transition-all">
                <div className="text-xs font-mono text-emerald-400 mb-3 flex items-center gap-2 font-bold tracking-wider">
                  <RotateCcw className="w-4 h-4 text-emerald-400" strokeWidth={2} />
                  <span>TIER 03 • CONVERSION ENGINE</span>
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2">
                  Incentivized Prepaid Recovery
                </h3>
                <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                  Rather than losing customer acquisition spend through blanket order cancellation, dynamically applies ₹50 discounts and priority dispatch to convert tentative COD buyers to digital UPI.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Luxury Frosted Footer */}
      <footer className="border-t border-white/10 py-8 bg-black/30 text-xs text-twilight-muted font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white">
            <span className="font-bold text-peach">RTO-SHIELD</span>
            <span>•</span>
            <span className="text-lavender">Autonomous Return Prevention Platform</span>
          </div>
          <div>
            <span>Code to Cart · KartAI × Codexcelerate 2026 • Akshaya Mirudha M</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
