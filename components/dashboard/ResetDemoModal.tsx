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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-lg bg-zinc-950 border border-white/10 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-900 transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Reset Demo Database?</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              This will restore the 3 seeded test customer history profiles (Rahul, Vikram, Amit) and reset the orders feed back to initial baseline data.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-md bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-400 mb-6 leading-relaxed">
          Recommended before starting a fresh demonstration session.
        </div>

        <div className="flex justify-end gap-2.5">
          <button
            onClick={onClose}
            disabled={isResetting}
            className="py-2 px-3.5 rounded-md text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmReset}
            disabled={isResetting}
            className="py-2 px-4 rounded-md text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResetting ? "animate-spin" : ""}`} strokeWidth={1.5} />
            <span>{isResetting ? "Resetting..." : "Confirm & Reset Data"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
