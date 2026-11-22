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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-secondary-bg border border-rose-500/30 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white p-1 rounded hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5 mb-4">
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Reset Demo Database?</h3>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              This will restore the 3 seeded test customer history profiles (Rahul, Vikram, Amit) and reset the orders feed back to initial baseline data.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#080D1B] border border-white/5 text-[11px] text-slate-300 mb-6">
          Recommended before starting a fresh 60-second hackathon demonstration for judges.
        </div>

        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            disabled={isResetting}
            className="py-2 px-3.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmReset}
            disabled={isResetting}
            className="py-2 px-4 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? "animate-spin" : ""}`} />
            <span>{isResetting ? "Resetting..." : "Confirm & Reset Data"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
