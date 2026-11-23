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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-twilight-bg/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-3xl glass-lavender border border-white/80 p-6 sm:p-7 shadow-glass-lg relative font-sans text-lavender-dark"
        >
          {isCompleted ? (
            <div className="py-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg font-bold text-lavender-dark mb-1">
                Prepaid Conversion Complete
              </h3>
              <p className="text-xs text-lavender-muted mb-4 max-w-xs font-sans">
                Simulated settlement authorized. Forward-and-reverse courier loss avoided.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-500/15 px-3.5 py-1.5 rounded-full border border-emerald-500/30 tabular-nums">
                <span>SAVED ₹180 ESTIMATED RTO SHIPPING LOSS</span>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between mb-5 pb-3.5 border-b border-[#D5D3EE]">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="uppercase bg-powder/20 text-lavender-dark px-2.5 py-0.5 rounded-full border border-powder/40 tracking-wider font-bold">
                      SIMULATED GATEWAY
                    </span>
                    <span className="text-lavender-muted">Test Harness</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-lavender-dark mt-1">
                    UPI Instant Checkout
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="text-lavender-muted hover:text-lavender-dark p-1.5 rounded-full hover:bg-white/60 transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              {/* Savings & Amount Card */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#D5D3EE] mb-4 text-xs font-mono">
                <div className="flex justify-between items-center mb-1 text-lavender-muted">
                  <span>Cart Value:</span>
                  <span className="line-through tabular-nums">{formatCurrency(cartValue)}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-600 font-bold mb-2">
                  <span>Prepaid Incentive:</span>
                  <span className="tabular-nums">-{formatCurrency(discount)}</span>
                </div>
                <div className="pt-2.5 border-t border-[#D5D3EE] flex justify-between items-center text-lavender-dark">
                  <span className="font-sans font-bold text-xs">Net Payable:</span>
                  <span className="text-lg font-black tabular-nums">{formatCurrency(finalAmount)}</span>
                </div>
              </div>

              {/* Simulated Apps */}
              <p className="text-xs font-bold text-lavender-dark mb-2.5 font-sans">Select Simulated UPI Handle:</p>
              <div className="grid grid-cols-2 gap-2.5 mb-4">
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
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all text-xs font-mono ${
                      selectedApp === app.id
                        ? "bg-white border-powder text-lavender-dark shadow-sm ring-1 ring-powder/40 font-bold"
                        : "bg-white/50 border-[#D5D3EE] text-lavender-muted hover:bg-white/80 hover:text-lavender-dark"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-powder" strokeWidth={2} />
                    <span>{app.name}</span>
                  </button>
                ))}
              </div>

              {/* Test Notice */}
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/60 border border-[#D5D3EE] text-[11px] text-lavender-muted mb-5 font-mono">
                <ShieldCheck className="w-4 h-4 shrink-0 text-powder" strokeWidth={2} />
                <span>Simulation environment: No real transaction will occur.</span>
              </div>

              {/* Pay CTA */}
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-full font-bold text-xs bg-peach hover:bg-peach-light text-lavender-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-sans shadow-peach-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                    <span>Authorizing Mock Settlement...</span>
                  </>
                ) : (
                  <>
                    <span>Authorize & Pay {formatCurrency(finalAmount)}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
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
