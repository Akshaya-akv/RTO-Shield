"use client";

import React, { useState } from "react";
import { Sliders, ShieldAlert, Sparkles, Check, Info } from "lucide-react";
import { toast } from "sonner";

interface ThresholdSliderProps {
  initialThreshold: number;
  onThresholdChanged?: (newThreshold: number) => void;
}

export const ThresholdSlider: React.FC<ThresholdSliderProps> = ({
  initialThreshold,
  onThresholdChanged,
}) => {
  const [threshold, setThreshold] = useState<number>(initialThreshold || 75);
  const [isSaving, setIsSaving] = useState(false);

  const handleSliderChange = async (val: number) => {
    setThreshold(val);
  };

  const handleApplyThreshold = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/analytics", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ highRiskThreshold: threshold }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`High-Risk threshold successfully updated to ${threshold}`);
        if (onThresholdChanged) {
          onThresholdChanged(threshold);
        }
      } else {
        toast.error("Failed to update threshold");
      }
    } catch {
      toast.error("Network error while updating threshold");
    } finally {
      setIsSaving(false);
    }
  };

  const getPolicyMeaning = (t: number) => {
    if (t <= 65) {
      return "Aggressive Protection: Strictest policy. More orders will require UPI prepayment; minimal RTO risk.";
    }
    if (t >= 85) {
      return "Permissive Policy: Only blatant fraudsters and serial returners are restricted; maximum checkout fluidity.";
    }
    return "Balanced D2C Mode (Standard): Restricts serial returners and severe address failures while maximizing sales.";
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-6 backdrop-blur-xl shadow-xl mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Merchant Risk Intervention Threshold
              <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                DYNAMIC POLICY
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Configure cutoff score for triggering mandatory COD restriction & ₹50 UPI conversion incentive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-1.5 bg-white/[0.04] px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-xs text-slate-400">Active:</span>
            <span className="text-xl font-black text-pink-400 font-mono">{threshold}</span>
            <span className="text-[10px] text-slate-500">/ 100</span>
          </div>

          <button
            onClick={handleApplyThreshold}
            disabled={isSaving}
            className="py-2 px-5 rounded-full text-xs font-bold bg-white text-black hover:bg-slate-200 transition-all shadow-lg shadow-white/10 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Apply Policy"}</span>
          </button>
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-3">
        <div className="relative pt-1">
          <input
            type="range"
            min={50}
            max={95}
            step={1}
            value={threshold}
            onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-[#1b172a] rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
            <span>50 (Aggressive Protection)</span>
            <span className="text-purple-300 font-bold">75 (Recommended Standard)</span>
            <span>95 (Permissive / Relaxed)</span>
          </div>
        </div>

        {/* Dynamic Explanation Box */}
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Current Impact: </span>
            <span>{getPolicyMeaning(threshold)}</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">
              Note: Changing threshold adjusts future checkout intervention policies instantly without altering historical raw scores.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
