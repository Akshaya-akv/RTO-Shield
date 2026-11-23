"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { RiskInspectionConsole } from "@/components/home/RiskInspectionConsole";
import {
  ShoppingBag,
  LayoutDashboard,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Search,
  Truck,
  Box,
  MapPin,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen text-twilight-text flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Matching Pointa Layout - Image 1)       */}
        {/* ========================================================= */}
        <section className="pt-10 sm:pt-14 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Kicker Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-peach animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-peach font-bold">
                Fleet and Delivery Risk Management
              </span>
            </div>

            {/* Split Header: Big Left Headline & Top-Right Intro Block with Twin Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
              <div className="lg:col-span-7">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                  Move Every Shipment Forward{" "}
                  <span className="text-peach">Without Blind Spots</span>
                </h1>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-end">
                <p className="text-sm sm:text-base text-lavender/90 font-normal leading-relaxed mb-6">
                  Loading is messy. Manual address verification slows you down. RTO-Shield brings cargo delivery risk, past buyer history, and Gemini NLP address deliverability into one view.
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    href="/storefront"
                    className="px-6 py-3 rounded-full bg-peach hover:bg-peach-light text-lavender-dark font-bold text-xs active:scale-[0.98] transition-all shadow-peach-sm flex items-center gap-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>

                  <a
                    href="#features"
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs active:scale-[0.98] transition-all backdrop-blur-md"
                  >
                    See Features
                  </a>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* HERO CENTERPIECE: Isometric Cargo Container Showcase      */}
            {/* (Matching the orange open-trailer truck in Image 1)       */}
            {/* ========================================================= */}
            <div className="relative rounded-3xl glass-twilight border border-white/15 p-6 sm:p-10 shadow-glass overflow-hidden mb-16">
              
              {/* Subtle Ambient Background Glows */}
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-powder/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-peach/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Truck / Logistics Cutaway Simulation Illustration */}
                <div className="lg:col-span-8 relative">
                  
                  {/* Container & Truck Body Diagram */}
                  <div className="relative rounded-2xl bg-[#0D0F22]/90 border border-white/15 p-6 sm:p-8 shadow-inner overflow-hidden">
                    
                    {/* Top Container Rail Meta */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 text-xs font-mono">
                      <div className="flex items-center gap-2 text-lavender">
                        <Truck className="w-4 h-4 text-peach" strokeWidth={2} />
                        <span className="font-bold text-white uppercase tracking-wider">ORION Z5 • D2C CONSIGNMENT 402</span>
                      </div>
                      <div className="flex items-center gap-3 text-twilight-muted">
                        <span>Pincode: 560103</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">STATUS: AUDITED</span>
                      </div>
                    </div>

                    {/* Cargo Container Cutaway Visual (Orange corrugated chassis with internal cargo boxes) */}
                    <div className="relative border-2 border-dashed border-peach/50 rounded-2xl bg-peach/5 p-4 sm:p-6 min-h-[220px] flex flex-col justify-between">
                      
                      {/* Internal Cargo Grid (Representing Packages & Deliveries) */}
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 mb-6">
                        {[
                          { label: "PKG-01", weight: "1.2kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                          { label: "PKG-02", weight: "0.8kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                          { label: "PKG-03", weight: "2.4kg", risk: "MED", color: "bg-peach/25 border-peach/50 text-peach-light" },
                          { label: "PKG-04", weight: "0.5kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                          { label: "PKG-05", weight: "3.1kg", risk: "HIGH", color: "bg-rose-500/20 border-rose-500/40 text-rose-300" },
                          { label: "PKG-06", weight: "1.5kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                          { label: "PKG-07", weight: "1.9kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                          { label: "PKG-08", weight: "0.4kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                          { label: "PKG-09", weight: "4.2kg", risk: "MED", color: "bg-peach/25 border-peach/50 text-peach-light" },
                          { label: "PKG-10", weight: "1.1kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                          { label: "PKG-11", weight: "0.7kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                          { label: "PKG-12", weight: "2.0kg", risk: "LOW", color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" },
                        ].map((pkg, i) => (
                          <div
                            key={i}
                            className={`p-2 rounded-xl border ${pkg.color} flex flex-col justify-between text-left transition-transform hover:scale-105`}
                          >
                            <div className="font-mono text-[9px] font-bold">{pkg.label}</div>
                            <div className="font-mono text-[10px] tabular-nums mt-1">{pkg.weight}</div>
                            <div className="text-[8px] font-mono uppercase mt-0.5 font-bold tracking-wider">{pkg.risk}</div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Truck Chassis & Axle Indicators */}
                      <div className="flex items-center justify-between pt-3 border-t border-peach/30 text-[11px] font-mono text-twilight-muted">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>Double Trailer Axle Balance: 48% / 52%</span>
                        </div>
                        <div className="text-peach font-bold">5,700 kg Total PayLoad</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Telemetry Tag (Matching "Section 2" white card from Image 1) */}
                  <div className="absolute -top-3 -right-3 sm:top-4 sm:right-4 glass-lavender rounded-3xl p-4 sm:p-5 shadow-glass-lg max-w-[210px] text-lavender-dark z-20 border border-white/80">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-lavender-muted font-bold">
                      Section 2
                    </div>
                    
                    {/* Mini Cargo Diagram in Floating Card */}
                    <div className="my-2 p-1.5 rounded-lg bg-peach/20 border border-peach/40 flex items-center justify-center">
                      <div className="w-full h-3 bg-peach/60 rounded flex items-center justify-center text-[8px] font-mono font-bold text-lavender-dark">
                        94% LOADED SPACE
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black font-display text-lavender-dark tabular-nums">94</span>
                      <span className="text-sm font-bold text-lavender-dark">%</span>
                    </div>
                    <div className="text-[11px] text-lavender-muted font-medium">Deliverability Confidence</div>

                    <div className="mt-2.5 pt-2 border-t border-[#D5D3EE] flex justify-between text-[10px] font-mono text-lavender-dark">
                      <span>5,700 kg</span>
                      <span className="font-bold text-emerald-600">24 ms</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Quick Action & Real-Time Audit */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-5">
                  <div className="glass-lavender rounded-3xl p-6 shadow-glass text-lavender-dark border border-white/80">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-powder/30 text-twilight font-bold border border-powder/50">
                        Live Pincode Query
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">SSL 256-Bit</span>
                    </div>

                    <h3 className="font-display text-base font-bold text-lavender-dark mb-1">
                      Evaluate Any Order Delivery
                    </h3>
                    <p className="text-xs text-lavender-muted mb-4 leading-relaxed font-sans">
                      Test instant doorstep refusal prediction and Gemini physical deliverability syntax:
                    </p>

                    {/* Search Input Bar with Submit Pill */}
                    <div className="relative mb-4">
                      <div className="flex items-center rounded-full bg-white border border-[#D5D3EE] p-1.5 shadow-sm">
                        <Search className="w-4 h-4 text-lavender-muted ml-3 shrink-0" strokeWidth={2} />
                        <input
                          type="text"
                          readOnly
                          value="Bellandur, Bengaluru (560103)"
                          className="w-full bg-transparent px-2.5 py-1 text-xs text-lavender-dark font-medium focus:outline-none"
                        />
                        <Link
                          href="/storefront"
                          className="w-8 h-8 rounded-full bg-twilight-btn hover:bg-twilight-btn/90 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-sm"
                        >
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#D5D3EE] text-xs font-mono">
                      <span className="text-lavender-muted">Estimated Loss Avoided:</span>
                      <span className="text-emerald-700 font-bold tabular-nums">₹180 / Order</span>
                    </div>
                  </div>

                  {/* Persona Quick Link */}
                  <div className="glass-twilight rounded-3xl p-5 border border-white/12">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-powder font-mono font-bold uppercase tracking-wider text-[10px]">
                        Test Personas
                      </span>
                      <span className="text-twilight-muted text-[10px]">4 Scenarios Ready</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Serial Returner", "Clean Buyer", "Vague Address", "Rural COD"].map((p, idx) => (
                        <Link
                          key={idx}
                          href="/storefront"
                          className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                        >
                          {p}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. TRUST / CARRIER NETWORK TICKER (Image 2)               */}
            {/* ========================================================= */}
            <div className="py-6 border-y border-white/10 mb-20 text-center">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-twilight-muted mb-4 font-semibold">
                Trusted by high-volume D2C merchants & integrated across logistics networks
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all font-display font-extrabold text-sm sm:text-base text-lavender tracking-wider">
                <span>DELHIVERY</span>
                <span>BLUEDART</span>
                <span>SHADOWFAX</span>
                <span>XPRESSBEES</span>
                <span>EQUIFAX</span>
                <span>RAZORPAY</span>
                <span>AMAZON SPN</span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. THREE-COLUMN FEATURE CARDS (Image 1 Top-Right)         */}
            {/* ========================================================= */}
            <div id="features" className="mb-24">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-peach font-bold">
                  CORE DEFENSE CAPABILITIES
                </span>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Smarter tools for modern commerce teams with address verification, intelligent order planning, and connected courier defense.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Feature Card 1: Choose the Right Vehicle / Address Validation */}
                <div className="rounded-3xl glass-twilight border border-white/15 p-6 hover:border-powder/40 transition-all flex flex-col justify-between">
                  <div>
                    {/* Mini Browser Device Frame */}
                    <div className="rounded-2xl bg-[#0D0F22] border border-white/10 p-3 mb-5">
                      <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-lavender space-y-1.5">
                        <div className="flex justify-between text-twilight-muted text-[10px]">
                          <span>Pincode Audit</span>
                          <span className="text-emerald-400 font-bold">99.2% MATCH</span>
                        </div>
                        <div className="text-white truncate">Bellandur ORR, BLR</div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-powder w-[92%]" />
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      Validate delivery address.
                    </h3>
                    <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                      Deterministic Indian postal code syntax validation combined with Gemini AI physical landmark and premise verification.
                    </p>
                  </div>
                </div>

                {/* Feature Card 2: See Every Cargo Section / Buyer History */}
                <div className="rounded-3xl glass-twilight border border-white/15 p-6 hover:border-peach/40 transition-all flex flex-col justify-between">
                  <div>
                    {/* Mini Browser Device Frame */}
                    <div className="rounded-2xl bg-[#0D0F22] border border-white/10 p-3 mb-5">
                      <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="p-2.5 rounded-xl bg-peach/10 border border-peach/25 text-[11px] font-mono text-peach-light space-y-1.5">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-twilight-muted">Recipient Logs</span>
                          <span className="text-rose-400 font-bold">5 REJECTIONS</span>
                        </div>
                        <div className="text-white font-bold">Phone: 9876543210</div>
                        <div className="flex gap-1 text-[9px]">
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">HIGH RTO RISK</span>
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white">SERIAL REFUSAL</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      See every buyer history.
                    </h3>
                    <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                      Inspect doorstep fulfillment rates, past delivery acceptances, and multi-merchant phone records before assigning couriers.
                    </p>
                  </div>
                </div>

                {/* Feature Card 3: Balance Every Axle Load / Dynamic COD Cutoff */}
                <div className="rounded-3xl glass-twilight border border-white/15 p-6 hover:border-emerald-400/40 transition-all flex flex-col justify-between">
                  <div>
                    {/* Mini Browser Device Frame */}
                    <div className="rounded-2xl bg-[#0D0F22] border border-white/10 p-3 mb-5">
                      <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono space-y-1.5">
                        <div className="flex justify-between text-twilight-muted text-[10px]">
                          <span>Cutoff Threshold</span>
                          <span className="text-peach font-bold">65 / 100</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">COD Restricted</span>
                          <span className="text-emerald-400 font-bold">₹50 UPI SAVE</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-peach w-[65%]" />
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      Balance every order risk.
                    </h3>
                    <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                      Autonomous cutoff slider enforces upfront UPI prepayment for high-risk orders, completely avoiding transit return costs.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* 4. DARK / CONTRAST SECTION (Image 1 Middle-Right)         */}
            {/* ========================================================= */}
            <div className="rounded-3xl bg-[#0A0C1C] border border-white/15 p-8 sm:p-12 mb-24 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Section Details */}
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-peach font-bold">
                    THE PLATFORM
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Intelligent Risk Planning for Every Consignment
                  </h2>
                  <p className="text-xs sm:text-sm text-lavender/80 leading-relaxed font-sans">
                    Cross-carrier delivery history, physical address deliverability, and automated UPI recovery ensure every shipment is planned with confidence.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {[
                      "Cross-carrier address syntax audit and deliverability classification",
                      "Sub-60ms hybrid deterministic and Gemini NLP decision latency",
                      "Dynamic ₹50 UPI prepaid discount intervention for border-line orders",
                      "Configurable merchant risk tolerance threshold with instant telemetry",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-lavender font-sans">
                        <CheckCircle2 className="w-4 h-4 text-peach shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-twilight-btn hover:bg-twilight-btn/90 text-white font-bold text-xs transition-colors border border-white/15"
                    >
                      <span>Open Merchant Command</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </Link>
                  </div>
                </div>

                {/* Right: Wireframe Cargo Container Hologram */}
                <div className="lg:col-span-6 flex justify-center relative">
                  <div className="relative w-full max-w-md rounded-2xl border-2 border-dashed border-peach/40 bg-peach/5 p-6 flex flex-col justify-between">
                    
                    {/* Floating Telemetry Badge 1 */}
                    <div className="flex justify-between items-center pb-3 border-b border-peach/20 mb-4 text-xs font-mono">
                      <span className="text-peach font-bold">CONTAINER SPEC 04</span>
                      <span className="text-emerald-400 font-bold">CONTROL: 99.2%</span>
                    </div>

                    {/* Central Graphic */}
                    <div className="py-8 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-full bg-peach/15 border border-peach/30 flex items-center justify-center mb-3">
                        <Box className="w-10 h-10 text-peach" strokeWidth={1.8} />
                      </div>
                      <div className="font-display font-extrabold text-white text-base">
                        Autonomous Security Node
                      </div>
                      <div className="text-xs text-twilight-muted font-mono mt-1">
                        Continuous Delivery Protection
                      </div>
                    </div>

                    {/* Floating Pill Stats */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-peach/20 text-[11px] font-mono text-lavender">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-center">
                        <div className="text-[9px] text-twilight-muted uppercase">Risk Score</div>
                        <div className="text-peach font-bold text-xs mt-0.5">72 / 100</div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/10 text-center">
                        <div className="text-[9px] text-twilight-muted uppercase">Action Taken</div>
                        <div className="text-emerald-400 font-bold text-xs mt-0.5">UPI Nudge</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* 5. SPLIT METRICS SECTION (Image 2 Middle-Left)            */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
              
              {/* Left Column: Heading + 2x2 Grid of Big KPI Metrics */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Years of logistics experience, built around one goal: giving you full visibility over every shipment.
                </h2>

                {/* 2x2 Big KPI Metric Grid with hairline divider borders */}
                <div className="grid grid-cols-2 border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                  <div className="p-6 border-r border-b border-white/10">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-peach tabular-nums">
                      68K+
                    </div>
                    <div className="text-xs text-twilight-muted font-medium mt-1">
                      Shipments Delivered
                    </div>
                  </div>

                  <div className="p-6 border-b border-white/10">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-powder tabular-nums">
                      19K+
                    </div>
                    <div className="text-xs text-twilight-muted font-medium mt-1">
                      Indian Pincodes Covered
                    </div>
                  </div>

                  <div className="p-6 border-r border-white/10">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tabular-nums">
                      99.2%
                    </div>
                    <div className="text-xs text-twilight-muted font-medium mt-1">
                      Address Deliverability Accuracy
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
                      ₹180
                    </div>
                    <div className="text-xs text-twilight-muted font-medium mt-1">
                      Average Saved per Avoided RTO
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Isometric Orange Shipping Container Cutaway */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-3xl bg-peach/10 border-2 border-peach/30 p-6 flex flex-col justify-between shadow-glass relative">
                  <div className="flex items-center justify-between pb-3 border-b border-peach/25 mb-4 text-xs font-mono">
                    <span className="text-peach font-bold uppercase tracking-wider">SECURE ISO CONTAINER</span>
                    <span className="text-emerald-400 font-bold">LOCKED</span>
                  </div>

                  {/* Corrugated Steel Container Illustration */}
                  <div className="rounded-2xl bg-peach/20 border border-peach/40 p-6 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-peach/30 flex items-center justify-center text-lavender-dark">
                      <Truck className="w-8 h-8 text-peach" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="font-display font-black text-white text-lg">Pan-India Transit Node</div>
                      <div className="text-xs text-lavender/80 font-mono mt-0.5">Tier 1 to Tier 4 Deliverability</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-peach/25 flex items-center justify-between text-xs font-mono text-lavender">
                    <span>Forward & Reverse Protection</span>
                    <span className="text-peach font-bold">100% Active</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* 6. "ONE DASHBOARD FOR EVERY VEHICLE AND LOAD"             */}
            {/* (Image 1 & 2 Bottom Section - Hosting Risk Console)       */}
            {/* ========================================================= */}
            <div id="risk-console" className="mb-24 scroll-mt-20">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-peach font-bold">
                  THE PLATFORM
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                  One dashboard for every vehicle and load.
                </h2>
                <p className="text-xs sm:text-sm text-lavender/80 mt-2 max-w-[55ch] mx-auto leading-relaxed font-sans">
                  From live order telemetry to risk scores, see every consignment, courier dispatch, and prevented loss in a single connected workspace.
                </p>
              </div>

              {/* Elevated Full-Width Browser Mockup Frame */}
              <div className="rounded-3xl glass-twilight border border-white/15 p-4 sm:p-7 shadow-glass-lg">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-twilight-muted">
                      rto-shield.live/command-console
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-emerald-400 font-bold">● LIVE TELEMETRY</span>
                  </div>
                </div>

                {/* Embedded Interactive Risk Engine Console */}
                <RiskInspectionConsole />
              </div>
            </div>

            {/* ========================================================= */}
            {/* 7. FIVE-STEP EVALUATION WALKTHROUGH                       */}
            {/* ========================================================= */}
            <div className="mb-20 pt-12 border-t border-white/10">
              <div className="max-w-2xl mb-10">
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-powder font-bold">
                  EVALUATION WORKFLOW
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Five steps to verify the complete defense engine
                </h2>
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
                    className="rounded-3xl glass-twilight p-5 flex flex-col justify-between hover:bg-white/10 transition-all border border-white/10"
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
            </div>

            {/* ========================================================= */}
            {/* 8. ARCHITECTURE PILLARS                                   */}
            {/* ========================================================= */}
            <div id="architecture" className="pt-12 pb-8 border-t border-white/10 scroll-mt-20">
              <div className="max-w-2xl mb-10">
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-peach font-bold">
                  SYSTEM ARCHITECTURE
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Engine Design & Scoring Weights
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-3xl glass-twilight border border-white/15 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-powder font-bold">Pillar 01</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-powder/20 text-powder font-bold">40% Weight</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white">
                    Deterministic Scoring
                  </h3>
                  <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                    Fast SQL query evaluating recipient telephone fulfillment records, prior doorstep rejection frequency, and 6-digit postal code syntax validity.
                  </p>
                </div>

                <div className="rounded-3xl glass-twilight border border-white/15 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-peach font-bold">Pillar 02</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-peach/20 text-peach font-bold">60% Weight</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white">
                    Gemini Address NLP
                  </h3>
                  <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                    Physical premise deliverability evaluation via Google Gemini 2.5 Flash, identifying vague colony markers and gibberish delivery addresses.
                  </p>
                </div>

                <div className="rounded-3xl glass-twilight border border-white/15 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Pillar 03</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">Action</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white">
                    Dynamic Interventions
                  </h3>
                  <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                    Dynamic COD restriction and instant ₹50 UPI prepaid conversion discount that prevents forward-and-reverse courier transit losses.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-[#0D0F22] text-xs font-mono text-twilight-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-bold">RTO-SHIELD DEFENSE</span>
            <span>—</span>
            <span>Production-grade D2C return prevention</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/storefront" className="hover:text-white transition-colors">Storefront Simulator</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Merchant Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
