"use client";

import React, { useState } from "react";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";

interface ResetDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetComplete: () => void;
}

export const ResetDemoModal: React.FC<ResetDemoModalProps> = ({
  isOpen,
  onClose,
  onResetComplete,
}) => {
  const [isResetting, setIsResetting] = useState(false);

  if (!isOpen) return null;

  const handleConfirmReset = async () => {
    setIsResetting(true);
    try {
      const res = await fetch("/api/demo/reset", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Demo dataset restored to initial state!");
        onResetComplete();
        onClose();
      } else {
        toast.error("Failed to reset demo dataset");
      }
    } catch {
      toast.error("Network error while resetting demo");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl glass-lavender p-6 sm:p-7 shadow-glass-lg relative font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-lavender-muted hover:text-lavender-dark p-1 rounded-full hover:bg-white transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>

        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-peach/25 text-peach-dark border border-peach/50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-peach-dark" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-lavender-dark">Reset Demo Database?</h3>
            <p className="font-sans text-xs text-lavender-muted mt-1 leading-relaxed">
              This will restore the 3 seeded test customer history profiles (Rahul, Vikram, Amit) and reset the orders feed back to initial baseline data.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#D5D3EE] text-[11px] text-lavender-dark mb-6 leading-relaxed font-mono shadow-inner">
          Recommended before starting a fresh demonstration session.
        </div>

        <div className="flex justify-end gap-2.5 font-sans">
          <button
            onClick={onClose}
            disabled={isResetting}
            className="py-2.5 px-4 rounded-full text-xs font-bold text-lavender-dark bg-white border border-[#D5D3EE] hover:bg-[#F4F3FC] transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmReset}
            disabled={isResetting}
            className="py-2.5 px-5 rounded-full text-xs font-bold bg-peach hover:bg-peach-light text-lavender-dark transition-all flex items-center gap-1.5 shadow-peach-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-lavender-dark ${isResetting ? "animate-spin" : ""}`} strokeWidth={2} />
            <span>{isResetting ? "Resetting..." : "Confirm & Reset Data"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
