"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
          {/* Background Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary/15 via-secondary/15 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Tag / Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-secondary-bg border border-primary/30 text-primary text-xs font-semibold mb-6 shadow-cyan-glow">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>CODE TO CART · KARTAI × CODEXCELERATE 2026</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Applied AI · Seller Tools & Fraud Prevention</span>
              <span className="text-slate-500">•</span>
              <span className="text-secondary font-mono">Builder: Akshaya Mirudha M</span>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight mb-4">
              Stop Fake Orders. <br />
              <span className="bg-gradient-to-r from-primary via-[#00e5ff] to-secondary bg-clip-text text-transparent">
                Save Real Revenue.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              <strong>RTO-Shield</strong> combines deterministic postal rules and Google Gemini AI address analytics to identify fake COD orders, dynamically restrict high-risk shipments, and convert customers to prepaid with intelligent incentives.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
              <Link
                href="/storefront"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-sm bg-primary text-[#080D1B] hover:opacity-90 transition-all shadow-cyan-glow flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Open Storefront Simulator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-semibold text-sm bg-secondary-bg border border-card-border hover:border-secondary/50 text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-secondary" />
                <span>Merchant Command Center</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto p-4 rounded-2xl bg-secondary-bg/60 border border-card-border backdrop-blur-sm">
              <div className="p-3">
                <div className="text-2xl font-bold font-mono text-primary">₹180</div>
                <div className="text-xs text-muted">Shipping Saved per RTO</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-bold font-mono text-white">0 to 100</div>
                <div className="text-xs text-muted">Hybrid AI Risk Score</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-bold font-mono text-secondary">30-45%</div>
                <div className="text-xs text-muted">D2C Industry COD RTO Rate</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-bold font-mono text-emerald-400">&lt;60s</div>
                <div className="text-xs text-muted">Live Demo Walkthrough</div>
              </div>
            </div>
          </div>
        </section>

        {/* 60-Second Hackathon Judge Walkthrough Guide */}
        <section className="py-16 bg-[#0b1322]/60 border-y border-card-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-mono text-primary uppercase tracking-widest font-bold">
                FAST-TRACK EVALUATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                60-Second Live Demo Journey
              </h2>
              <p className="text-xs text-muted mt-2">
                Follow this exact sequence to witness the complete hybrid AI risk engine in action:
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
                  title: "Click 'Serial Returner'",
                  desc: "Autofill test profile with 5 prior delivery rejections.",
                  badge: "Persona",
                },
                {
                  step: "03",
                  title: "Click 'Place Order'",
                  desc: "Watch 3-step live analysis: history, address & AI scoring.",
                  badge: "AI Engine",
                },
                {
                  step: "04",
                  title: "Prepaid Conversion",
                  desc: "COD is restricted; click 'Convert to UPI' with ₹50 discount.",
                  badge: "Intervention",
                },
                {
                  step: "05",
                  title: "Inspect Dashboard",
                  desc: "See new order recorded and ₹180 saved shipping metric updated.",
                  badge: "Command Center",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-secondary-bg/90 border border-card-border p-4 hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs font-bold text-primary">{item.step}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/storefront"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
              >
                <span>Ready to test? Start with Step 1 now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* System Architecture Pillars */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] font-mono text-secondary uppercase tracking-widest font-bold">
                ENGINE ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                How RTO-Shield Protects Merchants
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-secondary-bg/80 border border-card-border p-6 hover:border-primary/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Deterministic Rules (0-40)</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Queries delivery network logs for repeat RTO history, enforces high-value COD caps (&gt;₹2,500), and validates Indian 6-digit postal routing standards.
                </p>
              </div>

              <div className="rounded-2xl bg-secondary-bg/80 border border-card-border p-6 hover:border-secondary/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Gemini AI NLP (0-60)</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Evaluates address structure, detects keyboard-smash gibberish, flags missing house numbers, and ensures ethical scoring free from demographic bias.
                </p>
              </div>

              <div className="rounded-2xl bg-secondary-bg/80 border border-card-border p-6 hover:border-emerald-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Prepaid Conversion Engine</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Instead of losing sales by hard-blocking, offers dynamic ₹50 discounts and priority dispatch to convert questionable COD into guaranteed prepaid revenue.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-card-border py-8 bg-[#080D1B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">RTO-SHIELD</span>
            <span>• Stop Fake Orders. Save Real Revenue.</span>
          </div>
          <div>
            <span>Built for 48-Hour Hackathon • Next.js 15, Supabase, Gemini AI, Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
