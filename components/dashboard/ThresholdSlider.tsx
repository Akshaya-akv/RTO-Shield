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
    <div className="rounded-xl border border-white/10 bg-surface p-5 sm:p-6 mb-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
        <div className="flex items-center gap-2.5">
          <Sliders className="w-5 h-5 text-bone" strokeWidth={1.5} />
          <div>
            <h3 className="font-display text-sm font-semibold text-bone flex items-center gap-2 lowercase">
              merchant risk intervention threshold
              <span className="text-[10px] font-mono text-bone bg-wine/30 px-2 py-0.5 rounded border border-wine/50 uppercase tracking-[0.08em]">
                CUTOFF POLICY
              </span>
            </h3>
            <p className="font-sans text-xs text-greige mt-0.5">
              Score threshold that triggers mandatory COD restriction and ₹50 prepaid incentive.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-1.5 bg-canvas px-3 py-1.5 rounded-md border border-white/10 font-mono">
            <span className="text-xs text-greige uppercase tracking-wider">Cutoff:</span>
            <span className="text-lg font-bold text-bone tabular-nums">{threshold}</span>
            <span className="text-[11px] text-greige/70">/ 100</span>
          </div>

          <button
            onClick={handleApplyThreshold}
            disabled={isSaving}
            className="py-1.5 px-4 rounded-md text-xs font-medium bg-bone text-canvas hover:bg-bone-hover active:scale-[0.98] transition-all flex items-center gap-1.5 disabled:opacity-50 font-sans"
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
            className="w-full h-1.5 bg-surface-hover rounded-lg appearance-none cursor-pointer accent-[#F5F2E6]"
          />
          <div className="flex justify-between text-[11px] text-greige font-mono mt-2 tabular-nums">
            <span>50 (Strict Enforcement)</span>
            <span className="text-bone font-medium">75 (Recommended Standard)</span>
            <span>95 (Permissive)</span>
          </div>
        </div>

        {/* Policy Impact Note */}
        <div className="p-3 rounded-lg bg-surface-input border border-white/10 flex items-start gap-2.5 text-xs text-greige font-sans">
          <Info className="w-4 h-4 text-bone shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <span className="font-medium text-bone">Policy Impact: </span>
            <span>{getPolicyMeaning(threshold)}</span>
            <span className="block text-[11px] text-greige/70 mt-1 font-mono">
              Adjusting cutoff score immediately modifies future checkout policies without changing historical order scores.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
