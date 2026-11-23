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
    actionClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
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
    actionClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
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
    actionClass: "text-rose-400 bg-rose-500/10 border-rose-500/20",
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
    <div className="w-full rounded-xl border border-white/10 bg-surface p-4 sm:p-6 shadow-xl">
      {/* Console Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-5">
        <div className="flex items-center gap-2 text-xs text-greige">
          <Terminal className="w-4 h-4 text-bone" strokeWidth={1.5} />
          <span className="font-mono text-bone">live-evaluator.bin</span>
          <span className="text-greige/40">/</span>
          <span className="text-greige font-mono">checkout-stream</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-wine/30 text-bone border border-wine/50 uppercase tracking-wider text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active Policy: 75/100
          </span>
          <span className="text-greige tabular-nums">latency: 42ms</span>
        </div>
      </div>

      {/* Scenario Switcher Tabs */}
      <div className="mb-5">
        <div className="text-[11px] font-mono text-greige uppercase tracking-[0.08em] mb-2">
          Select Test Stream Profile:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SCENARIOS.map((s) => {
            const isSelected = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className={`p-3 rounded-lg border text-left transition-colors duration-150 flex flex-col justify-between ${
                  isSelected
                    ? "bg-surface-hover border-bone/30 text-bone shadow-sm"
                    : "bg-canvas border-white/5 text-greige hover:text-bone hover:bg-surface-hover/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold font-display">{s.name}</span>
                  <span
                    className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded border ${
                      s.riskLevel === "LOW"
                        ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                        : s.riskLevel === "MEDIUM"
                        ? "text-amber-400 border-amber-500/20 bg-amber-500/10"
                        : "text-rose-400 border-rose-500/20 bg-rose-500/10"
                    }`}
                  >
                    {s.riskLevel} ({s.finalScore})
                  </span>
                </div>
                <span className="text-[11px] text-greige truncate font-mono">
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
        <div className="md:col-span-7 space-y-3 p-4 rounded-lg border border-white/10 bg-canvas/60">
          <div className="text-[11px] font-mono text-greige uppercase tracking-[0.08em] pb-2 border-b border-white/10 flex items-center justify-between">
            <span>Parsed Checkout Submission</span>
            <span className="text-greige/70">ID: {activeScenario.phone}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-greige block font-mono uppercase tracking-wider">Recipient</span>
              <span className="text-bone font-medium font-sans">{activeScenario.name}</span>
            </div>
            <div>
              <span className="text-[11px] text-greige block font-mono uppercase tracking-wider">Phone & Location</span>
              <span className="text-bone font-mono tabular-nums">
                +91 {activeScenario.phone} ({activeScenario.pincode})
              </span>
            </div>
          </div>

          <div className="text-xs">
            <span className="text-[11px] text-greige block mb-0.5 font-mono uppercase tracking-wider">Shipping Address</span>
            <p className="text-bone font-mono text-[11px] p-2.5 rounded bg-surface-input border border-white/10 leading-relaxed">
              {activeScenario.addressSnippet}
            </p>
          </div>

          <div className="text-xs pt-1">
            <span className="text-[11px] text-greige block font-mono uppercase tracking-wider">Historical Fulfillment Record</span>
            <span className="text-bone font-mono text-[11px]">
              {activeScenario.historySummary}
            </span>
          </div>
        </div>

        {/* Right Column: Score Breakdown & Recommendation */}
        <div className="md:col-span-5 p-4 rounded-lg border border-white/10 bg-canvas/60 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-greige uppercase tracking-[0.08em] pb-2 border-b border-white/10 flex items-center justify-between mb-3">
              <span>Risk Evaluation</span>
              <span className="font-mono text-bone tabular-nums font-semibold">
                {activeScenario.finalScore}/100
              </span>
            </div>

            {/* Score Bar Breakdown */}
            <div className="space-y-2 mb-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-greige mb-1">
                  <span>Deterministic Rules</span>
                  <span className="text-bone tabular-nums">{activeScenario.ruleScore}/40 pts</span>
                </div>
                <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-bone rounded-full transition-all duration-300"
                    style={{ width: `${(activeScenario.ruleScore / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-greige mb-1">
                  <span>Gemini Address Audit</span>
                  <span className="text-bone tabular-nums">{activeScenario.aiScore}/60 pts</span>
                </div>
                <div className="h-1.5 w-full bg-surface-hover rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-bone/80 rounded-full transition-all duration-300"
                    style={{ width: `${(activeScenario.aiScore / 60) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Diagnostic Signals */}
            <div className="space-y-1.5 mb-4 font-sans">
              <span className="text-[11px] font-mono text-greige block uppercase tracking-[0.08em]">Detected Signals:</span>
              {activeScenario.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-bone/90">
                  <span className="text-greige select-none font-mono">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] font-mono text-greige block uppercase tracking-[0.08em] mb-1">
              Automated Policy Enforcement:
            </span>
            <div
              className={`p-2.5 rounded border font-mono text-xs font-semibold text-center ${activeScenario.actionClass}`}
            >
              {activeScenario.action}
            </div>
          </div>
        </div>
      </div>

      {/* Direct Link to Live Simulator */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-greige font-sans">
          Want to test your own custom cart and delivery address?
        </span>
        <Link
          href="/storefront"
          className="inline-flex items-center gap-1.5 font-medium text-bone hover:text-bone-hover font-mono tracking-wide transition-colors"
        >
          <span>Open Full Interactive Storefront</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
};
