"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, CheckCircle2, ShieldCheck, ArrowRight, Loader2, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SimulatedUpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cartValue: number;
  discount: number;
  customerName: string;
}

export const SimulatedUpiModal: React.FC<SimulatedUpiModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  cartValue,
  discount,
  customerName,
}) => {
  const [selectedApp, setSelectedApp] = useState<string>("gpay");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const finalAmount = Math.max(0, cartValue - discount);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setTimeout(() => {
        onSuccess();
      }, 1200);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-lg bg-zinc-950 border border-white/10 p-6 shadow-2xl relative"
        >
          {isCompleted ? (
            <div className="py-8 flex flex-col items-center text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-3" strokeWidth={1.5} />
              <h3 className="text-base font-semibold text-zinc-100 mb-1">Prepaid Conversion Complete</h3>
              <p className="text-xs text-zinc-400 mb-4 max-w-xs">
                Simulated settlement authorized. Forward-and-reverse courier loss avoided.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20 tabular-nums">
                <span>SAVED ₹180 ESTIMATED RTO SHIPPING LOSS</span>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between mb-4 pb-3 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="uppercase bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-white/[0.06]">
                      SIMULATED GATEWAY
                    </span>
                    <span className="text-zinc-500">Test Harness</span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-100 mt-1">UPI Instant Checkout</h3>
                </div>
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="text-zinc-400 hover:text-zinc-200 p-1 rounded hover:bg-zinc-900 transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Savings & Amount Card */}
              <div className="p-3.5 rounded-md bg-zinc-900/60 border border-white/[0.06] mb-4 text-xs font-mono">
                <div className="flex justify-between items-center mb-1 text-zinc-400">
                  <span>Cart Value:</span>
                  <span className="line-through tabular-nums">{formatCurrency(cartValue)}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 mb-2">
                  <span>Prepaid Incentive:</span>
                  <span className="tabular-nums">-{formatCurrency(discount)}</span>
                </div>
                <div className="pt-2 border-t border-white/[0.06] flex justify-between items-center text-zinc-100">
                  <span className="font-sans font-medium text-xs">Net Payable:</span>
                  <span className="text-base font-bold tabular-nums">{formatCurrency(finalAmount)}</span>
                </div>
              </div>

              {/* Simulated Apps */}
              <p className="text-xs text-zinc-300 mb-2">Select Simulated UPI Handle:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { id: "gpay", name: "Google Pay" },
                  { id: "phonepe", name: "PhonePe" },
                  { id: "paytm", name: "Paytm UPI" },
                  { id: "bhim", name: "BHIM / UPI" },
                ].map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setSelectedApp(app.id)}
                    className={`p-2.5 rounded-md border text-left flex items-center gap-2 transition-colors text-xs font-mono ${
                      selectedApp === app.id
                        ? "bg-zinc-800 border-white/20 text-zinc-100"
                        : "bg-zinc-900/30 border-white/[0.06] text-zinc-400 hover:bg-zinc-900"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
                    <span>{app.name}</span>
                  </button>
                ))}
              </div>

              {/* Test Notice */}
              <div className="flex items-center gap-2 p-2.5 rounded bg-zinc-900/50 border border-white/[0.06] text-[11px] text-zinc-400 mb-4">
                <ShieldCheck className="w-4 h-4 shrink-0 text-zinc-400" strokeWidth={1.5} />
                <span>Simulation environment: No real transaction will occur.</span>
              </div>

              {/* Pay CTA */}
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-2.5 px-4 rounded-md font-medium text-xs bg-zinc-100 text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={1.5} />
                    <span>Authorizing Mock Settlement...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize & Pay {formatCurrency(finalAmount)}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </>
                )}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
