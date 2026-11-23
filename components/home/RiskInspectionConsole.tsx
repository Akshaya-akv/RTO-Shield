"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Terminal,
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  phone: string;
  city: string;
  pincode: string;
  cartValue: number;
  paymentMethod: string;
  addressSnippet: string;
  historySummary: string;
  ruleScore: number;
  aiScore: number;
  finalScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  action: string;
  actionClass: string;
  reasons: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "clean",
    name: "Rahul Sharma",
    phone: "9876543210",
    city: "Bengaluru, KA",
    pincode: "560103",
    cartValue: 1499,
    paymentMethod: "COD",
    addressSnippet: "Flat 402, Green Glen Layout, Bellandur Outer Ring Road",
    historySummary: "12 delivered orders, 0 RTO failures",
    ruleScore: 5,
    aiScore: 10,
    finalScore: 15,
    riskLevel: "LOW",
    action: "ALLOW COD DISPATCH",
    actionClass: "text-emerald-700 bg-emerald-50 border-emerald-300",
    reasons: [
      "Verified premise & street number present",
      "Customer history: 100% successful fulfillment",
      "Cart value within low-exposure threshold",
    ],
  },
  {
    id: "moderate",
    name: "Karan Singh",
    phone: "9811122334",
    city: "Gurugram, HR",
    pincode: "122001",
    cartValue: 3798,
    paymentMethod: "COD",
    addressSnippet: "H No 78, Sector 14 Urban Estate",
    historySummary: "5 delivered, 2 prior RTO delivery refusals",
    ruleScore: 35,
    aiScore: 20,
    finalScore: 55,
    riskLevel: "MEDIUM",
    action: "OFFER ₹50 UPI DISCOUNT NUDGE",
    actionClass: "text-[#B34A29] bg-[#FDECE5] border-peach",
    reasons: [
      "Customer has 2 prior doorstep rejections (+35 pts)",
      "High-value COD cart exceeds ₹2,500 (+15 pts)",
      "Targeted for instant prepaid conversion",
    ],
  },
  {
    id: "serial",
    name: "Test Buyer 09",
    phone: "9999988888",
    city: "New Delhi, DL",
    pincode: "110001",
    cartValue: 1999,
    paymentMethod: "COD",
    addressSnippet: "near tea stall opp temple main road",
    historySummary: "2 delivered, 5 prior RTO returns",
    ruleScore: 40,
    aiScore: 48,
    finalScore: 88,
    riskLevel: "HIGH",
    action: "RESTRICT COD / MANDATORY PREPAID",
    actionClass: "text-rose-700 bg-rose-50 border-rose-300",
    reasons: [
      "Critical repeat returner: 5 prior RTOs (+40 pts)",
      "No flat, building, or premise number (+10 pts)",
      "Ambiguous landmark without courier routing cues (+38 pts)",
    ],
  },
];

export const RiskInspectionConsole: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("serial");
  const activeScenario = SCENARIOS.find((s) => s.id === activeId) || SCENARIOS[2];

  return (
    <div className="w-full rounded-3xl glass-lavender p-5 sm:p-8 shadow-glass transition-all">
      {/* Console Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-lavender-border mb-6">
        <div className="flex items-center gap-2 text-xs text-lavender-muted">
          <Terminal className="w-4 h-4 text-twilight-btn" strokeWidth={2} />
          <span className="font-mono font-semibold text-lavender-dark">live-evaluator.bin</span>
          <span className="text-lavender-muted/50">/</span>
          <span className="text-lavender-muted font-mono">checkout-stream</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder/30 text-twilight font-semibold border border-powder/50 text-[10px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Policy: 75/100
          </span>
          <span className="text-lavender-muted font-medium tabular-nums">latency: 42ms</span>
        </div>
      </div>

      {/* Scenario Switcher Tabs */}
      <div className="mb-6">
        <div className="text-[11px] font-mono text-lavender-muted uppercase tracking-[0.08em] mb-2 font-semibold">
          Select Test Stream Profile:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SCENARIOS.map((s) => {
            const isSelected = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-powder shadow-glass text-lavender-dark scale-[1.01]"
                    : "bg-white/60 border-white/80 text-lavender-muted hover:bg-white/90 hover:text-lavender-dark"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold font-display text-lavender-dark">{s.name}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      s.riskLevel === "LOW"
                        ? "text-emerald-700 border-emerald-300 bg-emerald-50"
                        : s.riskLevel === "MEDIUM"
                        ? "text-[#B34A29] border-peach bg-[#FDECE5]"
                        : "text-rose-700 border-rose-300 bg-rose-50"
                    }`}
                  >
                    {s.riskLevel} ({s.finalScore})
                  </span>
                </div>
                <span className="text-[11px] text-lavender-muted truncate font-mono">
                  {s.city} • ₹{s.cartValue.toLocaleString("en-IN")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inspection Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Parsed Order Input */}
        <div className="md:col-span-7 space-y-3.5 p-5 rounded-2xl bg-white/70 border border-white/90 shadow-sm">
          <div className="text-[11px] font-mono text-lavender-muted uppercase tracking-[0.08em] pb-2.5 border-b border-[#D8D6EE] flex items-center justify-between font-semibold">
            <span>Parsed Checkout Submission</span>
            <span className="text-powder-dark font-medium">ID: {activeScenario.phone}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-lavender-muted block font-mono uppercase tracking-wider font-semibold">Recipient</span>
              <span className="text-lavender-dark font-bold font-sans text-sm">{activeScenario.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-lavender-muted block font-mono uppercase tracking-wider font-semibold">Phone & Location</span>
              <span className="text-lavender-dark font-mono font-medium tabular-nums">
                +91 {activeScenario.phone} ({activeScenario.pincode})
              </span>
            </div>
          </div>

          <div className="text-xs">
            <span className="text-[10px] text-lavender-muted block mb-1 font-mono uppercase tracking-wider font-semibold">Shipping Address</span>
            <p className="text-lavender-dark font-mono text-[11px] p-3 rounded-xl bg-white border border-[#D5D3EE] leading-relaxed shadow-inner">
              {activeScenario.addressSnippet}
            </p>
          </div>

          <div className="text-xs pt-1">
            <span className="text-[10px] text-lavender-muted block font-mono uppercase tracking-wider font-semibold">Historical Record</span>
            <span className="text-lavender-dark font-mono text-[11px] font-medium">
              {activeScenario.historySummary}
            </span>
          </div>
        </div>

        {/* Right Column: Score Breakdown & Recommendation */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-white/70 border border-white/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-lavender-muted uppercase tracking-[0.08em] pb-2.5 border-b border-[#D8D6EE] flex items-center justify-between mb-3 font-semibold">
              <span>Risk Evaluation</span>
              <span className="font-mono text-lavender-dark font-bold text-sm tabular-nums">
                {activeScenario.finalScore}/100
              </span>
            </div>

            {/* Score Bar Breakdown */}
            <div className="space-y-3 mb-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-lavender-muted mb-1 font-medium">
                  <span>Deterministic Rules</span>
                  <span className="text-lavender-dark font-bold tabular-nums">{activeScenario.ruleScore}/40 pts</span>
                </div>
                <div className="h-2 w-full bg-[#E0DDF2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-twilight-btn rounded-full transition-all duration-300"
                    style={{ width: `${(activeScenario.ruleScore / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-lavender-muted mb-1 font-medium">
                  <span>Gemini Address Audit</span>
                  <span className="text-lavender-dark font-bold tabular-nums">{activeScenario.aiScore}/60 pts</span>
                </div>
                <div className="h-2 w-full bg-[#E0DDF2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-powder rounded-full transition-all duration-300"
                    style={{ width: `${(activeScenario.aiScore / 60) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Diagnostic Signals */}
            <div className="space-y-1.5 mb-4 font-sans">
              <span className="text-[10px] font-mono text-lavender-muted block uppercase tracking-[0.08em] font-semibold">Detected Signals:</span>
              {activeScenario.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-lavender-dark font-medium">
                  <span className="text-peach-dark font-bold font-mono">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout */}
          <div className="pt-3 border-t border-[#D8D6EE]">
            <span className="text-[10px] font-mono text-lavender-muted block uppercase tracking-[0.08em] mb-1 font-semibold">
              Policy Action:
            </span>
            <div
              className={`p-3 rounded-xl border font-mono text-xs font-bold text-center tracking-wide shadow-sm ${activeScenario.actionClass}`}
            >
              {activeScenario.action}
            </div>
          </div>
        </div>
      </div>

      {/* Direct Link to Live Simulator */}
      <div className="mt-5 pt-4 border-t border-lavender-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-lavender-muted font-medium">
          Want to test your own custom cart and delivery address?
        </span>
        <Link
          href="/storefront"
          className="inline-flex items-center gap-1.5 font-bold text-twilight-btn hover:text-black transition-colors"
        >
          <span>Open Full Storefront Simulator</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
};
