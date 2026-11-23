"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen text-twilight-text flex flex-col font-sans bg-[#0E1126]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Exact Pointa Layout - Image 1)           */}
        {/* ========================================================= */}
        <section className="pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Kicker Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-peach" />
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-peach font-bold">
                Fleet and Load Management
              </span>
            </div>

            {/* Split Hero Header: Left Headline & Top-Right Intro Block with Twin Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 sm:mb-14">
              <div className="lg:col-span-7">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
                  Move Every Shipment <br />
                  Forward{" "}
                  <span className="text-peach">Without Blind Spots</span>
                </h1>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-end">
                <p className="text-sm sm:text-base text-lavender/90 font-normal leading-relaxed mb-6 max-w-[48ch]">
                  Loading is messy. Manual tracking slows you down. RTO-Shield brings cargo risk, past buyer delivery history, and Gemini AI address parsing into one view.
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
            {/* HERO TRUCK VISUAL (Exact Match to Pointa Hero Template)   */}
            {/* ========================================================= */}
            <div className="relative w-full rounded-3xl glass-twilight border border-white/15 p-4 sm:p-8 shadow-glass overflow-hidden mb-16">
              
              {/* Subtle ambient lighting */}
              <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-peach/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-powder/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative w-full min-h-[300px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center">
                {/* 3D Semi-Truck Render */}
                <div className="relative w-full h-[280px] sm:h-[440px] lg:h-[500px]">
                  <Image
                    src="/images/hero-truck.jpg"
                    alt="Pointa Logistics Fleet Management Semi-Truck with Transparent Orange Cargo Container"
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-contain object-center drop-shadow-2xl"
                  />
                </div>

                {/* Floating "Section 2" Telemetry Glass Card (Exact Pointa Tag from Image 1) */}
                <div className="absolute top-6 right-4 sm:top-10 sm:right-12 glass-lavender rounded-3xl p-5 sm:p-6 shadow-glass-lg max-w-[220px] text-lavender-dark z-20 border border-white/80 transition-transform hover:scale-105">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-lavender-muted font-bold">
                    Section 2
                  </div>
                  
                  {/* Trailer Top-Down Load Diagram */}
                  <div className="my-2.5 p-2 rounded-xl bg-white border border-[#D5D3EE] flex items-center justify-center">
                    <div className="w-full h-3.5 bg-peach rounded-md flex items-center justify-center text-[8px] font-mono font-bold text-lavender-dark">
                      ACTIVE CARGO
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black font-display text-lavender-dark tabular-nums">94</span>
                    <span className="text-base font-bold text-lavender-dark">%</span>
                  </div>
                  <div className="text-xs text-lavender-muted font-medium">Loaded space</div>

                  <div className="mt-3 pt-2.5 border-t border-[#D5D3EE] space-y-1 text-[11px] font-mono text-lavender-dark">
                    <div className="flex justify-between">
                      <span className="text-lavender-muted">Payload:</span>
                      <span className="font-bold">5700 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lavender-muted">Pressure:</span>
                      <span className="font-bold">3.81 PSI</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Clearance:</span>
                      <span>24 cm →</span>
                    </div>
                  </div>
                </div>

                {/* Left Floating Vehicle Meta Pill */}
                <div className="hidden sm:flex absolute bottom-6 left-6 items-center gap-3 px-4 py-2.5 rounded-full glass-twilight border border-white/20 text-xs font-mono text-white shadow-lg backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-peach">ORION Z5</span>
                  <span className="text-twilight-muted">•</span>
                  <span>1340 x 240 x 480 mm</span>
                  <span className="text-twilight-muted">•</span>
                  <span className="text-emerald-400 font-bold">DOUBLE TRAILER</span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 2. TRUST CLIENT LOGO TICKER (Exact Match - Image 2)       */}
            {/* ========================================================= */}
            <div className="py-8 border-y border-white/10 mb-24 text-center">
              <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-70 hover:opacity-100 transition-opacity font-display font-extrabold text-base sm:text-xl text-lavender tracking-wider">
                <span className="tracking-tight lowercase text-xl font-bold">amazon</span>
                <span className="tracking-widest uppercase text-base font-bold">EQUIFAX</span>
                <span className="tracking-wider uppercase text-base font-bold">ALLEGION</span>
                <span className="tracking-widest uppercase text-base font-bold">AXON</span>
                <span className="tracking-wider uppercase text-base font-bold">HONDA</span>
                <span className="italic font-serif text-lg font-bold">Campbell&apos;s</span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3. THREE-COLUMN FEATURE CARDS (Pointa Image 1 Top-Right)  */}
            {/* ========================================================= */}
            <div id="features" className="mb-24 scroll-mt-20">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <p className="font-display text-xl sm:text-2xl font-bold text-lavender/90 tracking-tight">
                  Smarter tools for modern logistics teams with vehicle specifications, intelligent load planning, and connected fleet tracking.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Feature Card 1: Choose the Right Vehicle */}
                <div className="rounded-3xl glass-twilight border border-white/15 p-6 hover:border-powder/50 transition-all flex flex-col justify-between">
                  <div>
                    {/* Mini Browser Device Frame */}
                    <div className="rounded-2xl bg-[#080A18] border border-white/15 p-3.5 mb-5 shadow-inner">
                      <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/10 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      
                      {/* Vehicle Spec Preview */}
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-lavender space-y-2">
                        <div className="flex justify-between text-twilight-muted text-[10px]">
                          <span>ORION Z5</span>
                          <span className="text-emerald-400 font-bold">ACTIVE FLEET</span>
                        </div>
                        <div className="text-white font-bold">1340 x 240 x 480 mm • 32T</div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-powder w-[85%]" />
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      Choose the right vehicle.
                    </h3>
                    <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                      Vehicle sizes, capacity, and specs for planning any shipment across local and national distribution networks.
                    </p>
                  </div>
                </div>

                {/* Feature Card 2: See Every Cargo Section */}
                <div className="rounded-3xl glass-twilight border border-white/15 p-6 hover:border-peach/50 transition-all flex flex-col justify-between">
                  <div>
                    {/* Mini Browser Device Frame */}
                    <div className="rounded-2xl bg-[#080A18] border border-white/15 p-3.5 mb-5 shadow-inner">
                      <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/10 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>

                      {/* Cargo Cutaway Diagram */}
                      <div className="p-3 rounded-xl bg-peach/10 border border-peach/25 text-[11px] font-mono text-peach-light space-y-2">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-twilight-muted">Trailer Cross Section</span>
                          <span className="text-peach font-bold">94% FILLED</span>
                        </div>
                        <div className="flex items-center justify-between text-white font-bold">
                          <span>Section 02</span>
                          <span className="text-emerald-400">5,700 kg</span>
                        </div>
                        <div className="flex gap-1.5 text-[9px]">
                          <span className="px-2 py-0.5 rounded bg-peach/20 text-peach-light border border-peach/30 font-bold">PALLETS: 24</span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">SECURED</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      See every cargo section.
                    </h3>
                    <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                      Check how each section is loaded, from used space to weight per section, preventing transit bottlenecks.
                    </p>
                  </div>
                </div>

                {/* Feature Card 3: Balance Every Axle Load */}
                <div className="rounded-3xl glass-twilight border border-white/15 p-6 hover:border-emerald-400/50 transition-all flex flex-col justify-between">
                  <div>
                    {/* Mini Browser Device Frame */}
                    <div className="rounded-2xl bg-[#080A18] border border-white/15 p-3.5 mb-5 shadow-inner">
                      <div className="flex items-center gap-1.5 pb-2.5 border-b border-white/10 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>

                      {/* Axle Load Gauge */}
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono space-y-2">
                        <div className="flex justify-between text-twilight-muted text-[10px]">
                          <span>Double Trailer</span>
                          <span className="text-emerald-400 font-bold">BALANCED</span>
                        </div>
                        <div className="flex items-center justify-between text-white">
                          <span>Axle Load Dist:</span>
                          <span className="text-emerald-400 font-bold">48% / 52%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 w-[50%]" />
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      Balance every axle load.
                    </h3>
                    <p className="text-xs text-twilight-muted leading-relaxed font-sans">
                      Monitor axle and wheel load so every vehicle leaves properly balanced and complies with transport weight safety.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* 4. DARK / CONTRAST CRANE SECTION (Pointa Image 1 & 2)     */}
            {/* ========================================================= */}
            <div className="rounded-3xl bg-[#080A1A] border border-white/15 p-8 sm:p-12 mb-24 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Content & Bullet List */}
                <div className="lg:col-span-6 space-y-5">
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Intelligent Load Planning for Every Container
                  </h2>
                  <p className="text-xs sm:text-sm text-lavender/80 leading-relaxed font-sans">
                    Access vehicle data, cargo sections, and axle load so every load is planned with confidence.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      "Cross-section load view",
                      "Real-wheel load balance",
                      "Dimensions and pallet list",
                      "Fast optimal load planning",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs text-lavender font-sans font-medium">
                        <div className="w-4 h-4 rounded-full bg-peach/20 border border-peach/50 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-peach" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/storefront"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-peach hover:bg-peach-light text-lavender-dark font-bold text-xs transition-all shadow-peach-sm active:scale-[0.98]"
                    >
                      <span>Explore Load Simulator</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </Link>
                  </div>
                </div>

                {/* Right: Hoisted Crane Container 3D Render (Exact Match to Image 1 & 2) */}
                <div className="lg:col-span-6 flex justify-center relative">
                  <div className="relative w-full max-w-md h-[300px] sm:h-[360px] rounded-2xl overflow-hidden border border-white/15 bg-black/40">
                    <Image
                      src="/images/crane-container.jpg"
                      alt="3D Wireframe Orange Shipping Container Suspended from Industrial Crane Hook"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover object-center"
                    />

                    {/* Floating Telemetry Badge on Crane Container (Exact from Image 1) */}
                    <div className="absolute top-6 left-6 glass-lavender rounded-2xl p-3.5 shadow-glass text-lavender-dark border border-white/80 max-w-[140px]">
                      <div className="text-[9px] font-mono uppercase tracking-wider text-lavender-muted font-bold">Section 4</div>
                      <div className="text-2xl font-black font-display text-lavender-dark tabular-nums mt-0.5">72</div>
                      <div className="text-[10px] text-lavender-muted font-medium">Control Load</div>
                      <div className="mt-1.5 pt-1.5 border-t border-[#D5D3EE] text-[9px] font-mono text-lavender-dark font-bold">
                        4500 kg
                      </div>
                    </div>

                    {/* Floating Bottom Pill */}
                    <div className="absolute bottom-6 right-6 glass-twilight rounded-2xl p-3 shadow-glass text-white border border-white/20 max-w-[140px] text-right">
                      <div className="text-[9px] font-mono uppercase text-peach font-bold">Section 2</div>
                      <div className="text-xl font-bold font-mono text-white tabular-nums">94%</div>
                      <div className="text-[9px] text-twilight-muted">3.81 PSI</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* 5. SPLIT METRICS SECTION (Pointa Image 2 Middle-Left)     */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
              
              {/* Left Column: Title + 2x2 Bordered Metric Grid */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Years of logistics experience, built around one goal: giving you full visibility over every shipment.
                </h2>

                {/* 2x2 Metric Grid with hairline divider borders (Exact from Image 2) */}
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
                      12+
                    </div>
                    <div className="text-xs text-twilight-muted font-medium mt-1">
                      Country Covered
                    </div>
                  </div>

                  <div className="p-6 border-r border-white/10">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tabular-nums">
                      98%
                    </div>
                    <div className="text-xs text-twilight-muted font-medium mt-1">
                      Satisfaction Rate
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
                      450+
                    </div>
                    <div className="text-xs text-twilight-muted font-medium mt-1">
                      Branch Office
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Tilted Isometric Orange Shipping Container (Exact from Image 2) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md h-[280px] sm:h-[340px] rounded-3xl overflow-hidden border border-white/15 bg-white/5 p-4 flex items-center justify-center">
                  <Image
                    src="/images/shipping-container.jpg"
                    alt="3D Isometric Orange Corrugated Steel Shipping Container"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-contain object-center drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* 6. "ONE DASHBOARD FOR EVERY VEHICLE AND LOAD"             */}
            {/* (Pointa Image 1 & 2 Bottom Section)                       */}
            {/* ========================================================= */}
            <div id="risk-console" className="mb-24 scroll-mt-24">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-peach font-bold">
                  THE PLATFORM
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
                  One dashboard for every vehicle and load.
                </h2>
                <p className="text-xs sm:text-sm text-lavender/80 mt-2 max-w-[55ch] mx-auto leading-relaxed font-sans">
                  From fleet details to live GPS status, see every vehicle, cargo section, and shipment update in a single connected workspace.
                </p>
              </div>

              {/* Elevated Full-Width Browser Mockup Frame (Matching Image 2 Dashboard Mockup) */}
              <div className="rounded-3xl glass-twilight border border-white/15 p-4 sm:p-7 shadow-glass-lg">
                
                {/* Browser Top Navigation Bar with Window Dots & Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-mono text-twilight-muted pl-2">
                      app.pointa.com/dashboard/orion-z5
                    </span>
                  </div>

                  {/* Browser Internal Nav Pills (Matching the Image) */}
                  <div className="flex items-center gap-1 text-xs font-mono">
                    <span className="px-3 py-1 rounded-full bg-peach text-lavender-dark font-bold">
                      Vehicle & Load
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-lavender/80 hover:text-white">
                      Drivers
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-lavender/80 hover:text-white">
                      Documents
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-lavender/80 hover:text-white">
                      Schedule
                    </span>
                  </div>
                </div>

                {/* Embedded Live Interactive Risk Inspection Console */}
                <RiskInspectionConsole />
              </div>
            </div>

            {/* ========================================================= */}
            {/* 7. SYSTEM ARCHITECTURE PILLARS                            */}
            {/* ========================================================= */}
            <div id="architecture" className="pt-12 pb-8 border-t border-white/10 scroll-mt-24">
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
      <footer className="border-t border-white/10 py-8 bg-[#080A1A] text-xs font-mono text-twilight-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-bold">RTO-SHIELD DEFENSE</span>
            <span>—</span>
            <span>Autonomous fleet load & delivery fraud protection</span>
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
