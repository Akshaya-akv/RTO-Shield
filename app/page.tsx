"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { DeviceShowcase } from "@/components/home/DeviceShowcase";
import {
  ShieldAlert,
  ShoppingBag,
  LayoutDashboard,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Lock,
  Cpu,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-purple-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
          {/* Subtle Ambient Cosmic Background Gradient */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-purple-700/15 via-fuchsia-600/10 to-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Tag / Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span className="text-white font-mono">CODE TO CART · KARTAI × CODEXCELERATE 2026</span>
              <span className="text-slate-500">•</span>
              <span className="text-purple-300">Applied AI · Seller Fraud Defense</span>
              <span className="text-slate-500">•</span>
              <span className="text-pink-400 font-mono">Builder: Akshaya Mirudha M</span>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.08] mb-5">
              Stop Fake Orders. <br />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Save Real Revenue.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              <strong>RTO-Shield</strong> combines deterministic postal intelligence and Google Gemini AI address analytics to eliminate fake COD orders, dynamically restrict high-risk shipments, and convert customers to prepaid with intelligent incentives.
            </p>

            {/* Hero Quick Action Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-8">
              <Link
                href="/storefront"
                className="w-full sm:w-auto py-3 px-6 rounded-full font-bold text-xs bg-white text-black hover:bg-slate-200 transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Open Storefront Simulator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto py-3 px-6 rounded-full font-semibold text-xs bg-white/5 border border-white/10 hover:border-purple-500/50 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                <span>Merchant Command Center</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-12 shadow-2xl">
              <div className="p-2.5">
                <div className="text-xl sm:text-2xl font-black font-mono text-purple-400">₹180</div>
                <div className="text-[11px] text-slate-400">Shipping Saved / RTO</div>
              </div>
              <div className="p-2.5">
                <div className="text-xl sm:text-2xl font-black font-mono text-white">0 to 100</div>
                <div className="text-[11px] text-slate-400">Hybrid AI Risk Score</div>
              </div>
              <div className="p-2.5">
                <div className="text-xl sm:text-2xl font-black font-mono text-pink-400">30-45%</div>
                <div className="text-[11px] text-slate-400">D2C COD RTO Average</div>
              </div>
              <div className="p-2.5">
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">&lt;60s</div>
                <div className="text-[11px] text-slate-400">Live Interactive Demo</div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* FLAGSHIP 3-DEVICE MOBILE SHOWCASE COMPONENT              */}
            {/* ======================================================== */}
            <DeviceShowcase />

          </div>
        </section>

        {/* 60-Second Walkthrough Guide */}
        <section className="py-20 border-t border-white/[0.08] bg-[#0c0a14]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                FAST-TRACK EVALUATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
                60-Second Live Demo Journey
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Follow this exact sequence to experience the complete hybrid AI risk engine in action:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "Open Storefront",
                  desc: "Launch the D2C checkout simulator with preloaded electronics.",
                  badge: "Catalog",
                },
                {
                  step: "02",
                  title: "Select Persona",
                  desc: "Autofill test profile (e.g. Serial Returner with 5 prior rejections).",
                  badge: "Persona",
                },
                {
                  step: "03",
                  title: "Simulate Order",
                  desc: "Witness real-time 3-step audit: history, address & Gemini AI scoring.",
                  badge: "AI Engine",
                },
                {
                  step: "04",
                  title: "Prepaid Nudge",
                  desc: "COD is restricted; click 'Convert to UPI' with ₹50 discount.",
                  badge: "Intervention",
                },
                {
                  step: "05",
                  title: "Inspect Telemetry",
                  desc: "See new order recorded and ₹180 saved shipping metric updated.",
                  badge: "Dashboard",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.06] hover:border-purple-500/40 transition-all flex flex-col justify-between backdrop-blur-xl group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-xs font-bold text-pink-400">{item.step}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/storefront"
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-pink-300 hover:underline transition-colors"
              >
                <span>Ready to test? Start with Step 1 in Storefront</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* System Architecture Pillars */}
        <section className="py-20 border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30">
                ENGINE ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
                How RTO-Shield Protects Merchants
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.06] hover:border-cyan-500/40 transition-all backdrop-blur-xl">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Deterministic Rules (0–40 pts)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Queries delivery network logs for repeat RTO history, enforces high-value COD caps (&gt;₹2,500), and validates Indian 6-digit postal routing standards.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.06] hover:border-purple-500/40 transition-all backdrop-blur-xl">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Gemini AI Address NLP (0–60 pts)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Evaluates physical address deliverability, flags keyboard-mash gibberish, detects missing premises, and ensures strict ethical scoring free from demographic bias.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:bg-white/[0.06] hover:border-pink-500/40 transition-all backdrop-blur-xl">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4 shadow-[0_0_15px_rgba(217,70,239,0.25)]">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Prepaid Conversion Engine</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rather than losing sales through blanket blocks, dynamically nudges tentative COD buyers with ₹50 discounts and priority dispatch to secure upfront revenue.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 bg-[#07070A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">RTO-SHIELD</span>
            <span>• Stop Fake Orders. Save Real Revenue.</span>
          </div>
          <div>
            <span>Code to Cart · KartAI × Codexcelerate 2026 • Akshaya Mirudha M</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
