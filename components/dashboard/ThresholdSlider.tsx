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
    <div className="rounded-3xl glass-twilight p-6 sm:p-7 mb-8 shadow-glass">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-peach/15 flex items-center justify-center text-peach">
            <Sliders className="w-5 h-5 text-peach" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              Merchant Risk Intervention Threshold
              <span className="text-[10px] font-mono text-powder bg-powder/20 px-2.5 py-0.5 rounded-full border border-powder/40 uppercase font-bold tracking-wider">
                CUTOFF POLICY
              </span>
            </h3>
            <p className="font-sans text-xs text-twilight-muted mt-0.5">
              Score threshold that triggers mandatory COD restriction and ₹50 prepaid incentive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-1.5 bg-white/10 px-4 py-2 rounded-full border border-white/20 font-mono">
            <span className="text-xs text-twilight-muted uppercase tracking-wider font-semibold">Cutoff:</span>
            <span className="text-lg font-extrabold text-peach tabular-nums">{threshold}</span>
            <span className="text-[11px] text-twilight-muted">/ 100</span>
          </div>

          <button
            onClick={handleApplyThreshold}
            disabled={isSaving}
            className="py-2.5 px-5 rounded-full text-xs font-bold bg-peach hover:bg-peach-light text-lavender-dark active:scale-[0.98] transition-all flex items-center gap-1.5 disabled:opacity-50 font-sans shadow-peach-sm"
          >
            <Check className="w-4 h-4" strokeWidth={2} />
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
            className="w-full h-2.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#F5B69E]"
          />
          <div className="flex justify-between text-[11px] text-twilight-muted font-mono mt-2.5 tabular-nums font-semibold">
            <span>50 (Strict Enforcement)</span>
            <span className="text-peach font-bold">75 (Recommended Standard)</span>
            <span>95 (Permissive)</span>
          </div>
        </div>

        {/* Policy Impact Note */}
        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3 text-xs text-lavender font-sans leading-relaxed">
          <Info className="w-4 h-4 text-powder shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <span className="font-bold text-white">Policy Impact: </span>
            <span>{getPolicyMeaning(threshold)}</span>
            <span className="block text-[11px] text-twilight-muted mt-1 font-mono">
              Adjusting cutoff score immediately modifies future checkout policies without changing historical order scores.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
