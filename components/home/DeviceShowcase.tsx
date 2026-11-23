"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Zap,
  Wallet,
  Grid,
  Home,
  BarChart2,
  Plus,
  CreditCard,
  User,
  Mic,
  MicOff,
  Keyboard,
  X,
  Volume2,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  CheckCircle2,
} from "lucide-react";

export const DeviceShowcase: React.FC = () => {
  // Interactive state for Device 3 (AI Voice Assistant)
  const [isListening, setIsListening] = useState(true);
  const [activeSpeechIdx, setActiveSpeechIdx] = useState(0);

  const aiSpeechPrompts = [
    {
      status: "Listening...",
      transcript: "Evaluating address deliverability... High landmark ambiguity detected with missing house number.",
      verdict: "High Risk (82) • Restrict COD",
      verdictColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
    {
      status: "Verified...",
      transcript: "Address syntax clean. Complete residential layout detected with valid PIN 560103. Clean buyer history.",
      verdict: "Low Risk (15) • Allow COD",
      verdictColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      status: "Nudge Applied...",
      transcript: "High-value COD (₹3,798) with 2 prior returns. Automatically applying ₹50 discount for instant UPI conversion.",
      verdict: "Medium Risk (55) • Prepaid Nudge",
      verdictColor: "text-purple-300 border-purple-500/30 bg-purple-500/10",
    },
  ];

  const handleNextPrompt = () => {
    setActiveSpeechIdx((prev) => (prev + 1) % aiSpeechPrompts.length);
  };

  return (
    <div className="relative w-full py-8 overflow-hidden">
      {/* Background Ambient Cosmic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-purple-900/20 via-fuchsia-800/15 to-cyan-900/15 blur-[120px] pointer-events-none rounded-full" />

      {/* 3 Mobile Devices Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-center">

          {/* ======================================================== */}
          {/* DEVICE 1 (LEFT): ONBOARDING / YOUR ORDERS UNDER CONTROL */}
          {/* ======================================================== */}
          <div className="w-full max-w-[340px] mx-auto rounded-[48px] p-3 bg-gradient-to-b from-[#2a2538] via-[#141220] to-[#0a0812] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(168,85,247,0.15)] transition-transform duration-500 hover:-translate-y-1">
            <div className="w-full h-[620px] rounded-[40px] bg-[#0c0a14] border border-white/5 relative overflow-hidden flex flex-col justify-between p-6">
              
              {/* Dynamic Island & Status Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                <span>9:41</span>
                <div className="w-20 h-5 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 border border-slate-400 rounded-sm" />
                </div>
              </div>

              {/* Brand Header */}
              <div className="flex items-center gap-2 pt-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 p-[1px]">
                  <div className="w-full h-full bg-[#0c0a14] rounded-[7px] flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-pink-400" />
                  </div>
                </div>
                <span className="font-bold text-sm tracking-wide text-white">RTO-Shield</span>
              </div>

              {/* Glowing Orbital Crescent in Background */}
              <div className="absolute right-[-45px] top-[32%] w-64 h-64 rounded-full border-[1.5px] border-purple-500/25 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-transparent blur-[1px] pointer-events-none" />
              <div className="absolute right-[-30px] top-[35%] w-56 h-56 rounded-full border border-pink-500/20 pointer-events-none" />

              {/* Typography Hero */}
              <div className="relative z-10 my-auto">
                <h2 className="text-3xl font-black tracking-tight text-white leading-[1.15] mb-4">
                  Your <br />
                  <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                    Orders
                  </span> <br />
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Under
                  </span> <br />
                  Control
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[220px] mb-6">
                  Stop fake COD returns and recover shipping revenue with real-time AI in just a couple of clicks.
                </p>

                {/* Persona Preview Badges */}
                <div className="space-y-2 mb-2">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[11px] text-slate-200">Rahul (Legit Buyer)</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Score: 15
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span className="text-[11px] text-slate-200">Serial Returner (5 RTO)</span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      Blocked: 88
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Pagination & Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                {/* Pagination Indicator */}
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-sm" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>

                <Link
                  href="/storefront"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-[11px] font-semibold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
                >
                  <span>Launch Demo</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* DEVICE 2 (CENTER): COMMAND CENTER / LIVE WALLET & ORDERS */}
          {/* ======================================================== */}
          <div className="w-full max-w-[340px] mx-auto rounded-[48px] p-3 bg-gradient-to-b from-[#2e2642] via-[#161226] to-[#0a0812] border border-purple-500/25 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_45px_rgba(217,70,239,0.2)] transition-transform duration-500 lg:-translate-y-3">
            <div className="w-full h-[620px] rounded-[40px] bg-[#0d0b17] border border-white/5 relative overflow-hidden flex flex-col justify-between p-5">
              
              {/* Dynamic Island & Header */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 mb-3">
                  <span>9:41</span>
                  <div className="w-20 h-5 bg-black rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 border border-slate-400 rounded-sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-purple-300" />
                    </div>
                    <span className="text-xs font-semibold text-slate-300">Merchant HQ</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Live Active
                  </span>
                </div>

                {/* Total Balance / Avoided Loss Card */}
                <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-4 mb-4 backdrop-blur-xl shadow-lg overflow-hidden">
                  {/* Peeking Shield Credit Card from right */}
                  <div className="absolute -right-6 -top-3 w-28 h-20 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-2 shadow-2xl rotate-12 pointer-events-none opacity-85">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-bold text-white tracking-widest">SHIELD</span>
                      <CreditCard className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="mt-4 text-[8px] font-mono text-slate-400 tracking-wider">
                      •••• 4076
                    </div>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[11px] text-slate-400 block mb-1">Prevented Shipping Loss</span>
                    <div className="text-2xl font-black font-mono text-white tracking-tight mb-1">
                      ₹84,640<span className="text-sm text-slate-400 font-normal">.00</span>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <TrendingUp className="w-3 h-3" />
                      <span>+₹18,250 (18.4%) avoided</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Circular Buttons */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                      <Zap className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">Rules</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center font-bold shadow-lg shadow-white/15">
                      <ShieldCheck className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-[10px] text-white font-semibold">Shield</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                      <Wallet className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">Prepaid</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                      <Grid className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">More</span>
                  </div>
                </div>

                {/* Recent Risk Transactions List */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Recent Stream</span>
                    <Link href="/dashboard" className="text-[10px] text-purple-400 hover:underline">
                      See All &gt;
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Rahul Sharma</div>
                          <div className="text-[10px] text-slate-400">Bengaluru • Earbuds</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-white">₹1,499</div>
                        <span className="text-[9px] font-mono text-emerald-400">LOW (15)</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                          <Wallet className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Karan Singh</div>
                          <div className="text-[10px] text-slate-400">Gurugram • Smart Watch</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-purple-300">₹3,798</div>
                        <span className="text-[9px] font-mono text-purple-400">CONVERTED (55)</span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">Test Buyer 09</div>
                          <div className="text-[10px] text-slate-400">Delhi • Vague Addr</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-rose-400">₹1,999</div>
                        <span className="text-[9px] font-mono text-rose-400">BLOCKED (82)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Dock */}
              <div className="p-1 rounded-full bg-[#131022]/90 border border-white/10 backdrop-blur-xl flex items-center justify-around shadow-2xl">
                <button className="p-2 text-white hover:text-purple-400 transition-colors">
                  <Home className="w-4 h-4" />
                </button>
                <Link href="/dashboard" className="p-2 text-slate-400 hover:text-white transition-colors">
                  <BarChart2 className="w-4 h-4" />
                </Link>
                {/* Center glowing + action button */}
                <button
                  onClick={handleNextPrompt}
                  title="Simulate AI Audit"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <CreditCard className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* DEVICE 3 (RIGHT): AI VOICE & SMART RISK ASSISTANT        */}
          {/* ======================================================== */}
          <div className="w-full max-w-[340px] mx-auto rounded-[48px] p-3 bg-gradient-to-b from-[#2a2538] via-[#141220] to-[#0a0812] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(168,85,247,0.15)] transition-transform duration-500 hover:-translate-y-1">
            <div className="w-full h-[620px] rounded-[40px] bg-[#0c0a14] border border-white/5 relative overflow-hidden flex flex-col justify-between p-6">
              
              {/* Dynamic Island & Status Bar */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 mb-4">
                  <span>9:41</span>
                  <div className="w-20 h-5 bg-black rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-2 border border-slate-400 rounded-sm" />
                  </div>
                </div>

                {/* Navigation Header */}
                <div className="flex items-center justify-between mb-3">
                  <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Assistant Titles */}
                <h3 className="text-xl font-black text-white tracking-tight leading-snug">
                  AI Smart Risk <br />
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                    Assistant
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 mb-4">
                  Neural physical deliverability & fake order detector powered by Gemini AI.
                </p>
              </div>

              {/* Status Listening pill */}
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                <span className="text-xs font-mono text-purple-300 font-medium">
                  {aiSpeechPrompts[activeSpeechIdx].status}
                </span>
              </div>

              {/* ======================================================== */}
              {/* 3D IRIDESCENT LIQUID METALLIC AI ORB                     */}
              {/* ======================================================== */}
              <div className="relative my-auto flex items-center justify-center py-2">
                {/* Ambient backlighting aura */}
                <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-purple-600/30 via-pink-600/30 to-cyan-500/20 blur-2xl pointer-events-none animate-pulse-slow" />
                
                {/* Concentric subtle soundwave rings */}
                <div className="absolute w-48 h-48 rounded-full border border-purple-500/20 animate-ping pointer-events-none opacity-40" />
                <div className="absolute w-40 h-40 rounded-full border border-pink-500/30 pointer-events-none" />

                {/* The 3D Liquid Orb */}
                <div className="relative w-32 h-32 rounded-full iridescent-orb flex items-center justify-center shadow-orb-glow cursor-pointer hover:scale-105 transition-transform"
                     onClick={handleNextPrompt}
                     title="Tap to trigger live AI evaluation"
                >
                  {/* Iridescent spinning chrome sheen overlay */}
                  <div className="iridescent-sheen pointer-events-none" />

                  {/* Specular fluid light highlight */}
                  <div className="absolute top-3 left-4 w-10 h-7 rounded-full bg-white/70 blur-[3px] rotate-[-30deg] pointer-events-none" />
                  <div className="absolute top-5 left-7 w-4 h-3 rounded-full bg-white blur-[1px] pointer-events-none" />

                  {/* Inner neural icon */}
                  <Sparkles className="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10 animate-pulse" />
                </div>
              </div>

              {/* Real-time AI Transcript Speech Bubble */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 backdrop-blur-md mb-2">
                <p className="text-[11px] text-slate-300 leading-relaxed italic mb-2">
                  &ldquo;{aiSpeechPrompts[activeSpeechIdx].transcript}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${aiSpeechPrompts[activeSpeechIdx].verdictColor}`}>
                    {aiSpeechPrompts[activeSpeechIdx].verdict}
                  </span>
                  <span className="text-[9px] text-slate-500">Tap mic to switch</span>
                </div>
              </div>

              {/* Bottom Interactive Voice / Audit Controls */}
              <div className="flex items-center justify-around pt-2">
                {/* Keyboard icon button */}
                <button
                  onClick={handleNextPrompt}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Keyboard className="w-4 h-4" />
                </button>

                {/* Microphone Glowing Center Button */}
                <button
                  onClick={handleNextPrompt}
                  title="Simulate Voice & Address Audit"
                  className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#1a1429] to-[#251838] border-2 border-pink-500/60 flex items-center justify-center text-white shadow-[0_0_25px_rgba(217,70,239,0.5)] hover:scale-105 active:scale-95 transition-all group"
                >
                  {/* Glowing pulse ring around mic */}
                  <span className="absolute inset-0 rounded-full border border-pink-400 animate-ping opacity-60 pointer-events-none" />
                  <Mic className="w-5 h-5 text-pink-300 group-hover:text-white transition-colors" />
                </button>

                {/* Dismiss button */}
                <button
                  onClick={() => setIsListening(!isListening)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
