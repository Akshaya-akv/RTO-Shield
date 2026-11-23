"use client";

import React, { useState } from "react";
import { Sliders, Check, Info } from "lucide-react";
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
        toast.success(`High-Risk threshold updated to ${threshold}`);
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
      return "Strict Enforcement: Lower tolerance. Restricts more marginal orders to digital prepaid; minimal RTO risk.";
    }
    if (t >= 85) {
      return "Permissive Mode: Only blatant serial returners and severe address failures are restricted; maximizes checkout velocity.";
    }
    return "Balanced Standard: Restricts repeat returners and delivery address failures while keeping legitimate COD checkout frictionless.";
  };

  return (
    <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 sm:p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-5">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-zinc-300" strokeWidth={1.5} />
          <div>
            <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
              Merchant Risk Intervention Threshold
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-white/[0.06]">
                CUTOFF POLICY
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Score threshold that triggers mandatory COD restriction and ₹50 prepaid incentive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-md border border-white/[0.08] font-mono">
            <span className="text-xs text-zinc-400">Cutoff:</span>
            <span className="text-lg font-bold text-zinc-100 tabular-nums">{threshold}</span>
            <span className="text-[11px] text-zinc-500">/ 100</span>
          </div>

          <button
            onClick={handleApplyThreshold}
            disabled={isSaving}
            className="py-1.5 px-3.5 rounded-md text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{isSaving ? "Saving..." : "Apply Cutoff"}</span>
          </button>
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-4">
        <div className="relative pt-1">
          <input
            type="range"
            min={50}
            max={95}
            step={1}
            value={threshold}
            onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-200"
          />
          <div className="flex justify-between text-[11px] text-zinc-500 font-mono mt-2 tabular-nums">
            <span>50 (Strict Enforcement)</span>
            <span className="text-zinc-300 font-medium">75 (Recommended Standard)</span>
            <span>95 (Permissive)</span>
          </div>
        </div>

        {/* Policy Impact Note */}
        <div className="p-3 rounded-md bg-zinc-950/60 border border-white/[0.06] flex items-start gap-2.5 text-xs text-zinc-300">
          <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <span className="font-medium text-zinc-200">Policy Impact: </span>
            <span>{getPolicyMeaning(threshold)}</span>
            <span className="block text-[11px] text-zinc-500 mt-1">
              Adjusting cutoff score immediately modifies future checkout policies without changing historical order scores.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
