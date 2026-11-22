"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Smartphone, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles } from "lucide-react";
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
      }, 1500);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="w-full max-w-md rounded-2xl bg-secondary-bg border border-primary/30 p-6 shadow-2xl relative overflow-hidden"
        >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-3xl pointer-events-none" />

        {isCompleted ? (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(34,197,94,0.4)] animate-bounce">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Prepaid Conversion Verified!</h3>
            <p className="text-xs text-muted mb-4 max-w-xs">
              Instant mock settlement complete. Zero COD risk achieved. Redirecting to order confirmation...
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
              <span>SAVED ₹180 ESTIMATED RTO SHIPPING LOSS</span>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30">
                    SIMULATED GATEWAY
                  </span>
                  <span className="text-[10px] text-muted">Test Environment</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">UPI Instant Checkout</h3>
              </div>
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="text-muted hover:text-white text-sm p-1 rounded hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            {/* Savings & Amount Card */}
            <div className="p-3.5 rounded-xl bg-[#0b1322] border border-emerald-500/30 mb-5">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-muted">Original Cart Value:</span>
                <span className="text-white line-through font-mono">{formatCurrency(cartValue)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-400 font-semibold mb-2">
                <span>RTO-Shield Prepaid Discount:</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm font-semibold text-white">Net Payable Amount:</span>
                <span className="text-lg font-bold text-primary font-mono">{formatCurrency(finalAmount)}</span>
              </div>
            </div>

            {/* Simulated UPI Apps */}
            <p className="text-xs font-medium text-slate-300 mb-2.5">Select Simulated UPI App:</p>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {[
                { id: "gpay", name: "Google Pay", color: "border-blue-500/40 hover:border-blue-400" },
                { id: "phonepe", name: "PhonePe", color: "border-purple-500/40 hover:border-purple-400" },
                { id: "paytm", name: "Paytm UPI", color: "border-cyan-500/40 hover:border-cyan-400" },
                { id: "bhim", name: "BHIM / Any UPI", color: "border-emerald-500/40 hover:border-emerald-400" },
              ].map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setSelectedApp(app.id)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs font-medium ${
                    selectedApp === app.id
                      ? "bg-primary/20 border-primary text-white shadow-cyan-glow"
                      : "bg-[#0b1322] border-card-border text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span>{app.name}</span>
                </button>
              ))}
            </div>

            {/* Test disclaimer notice as required by guidelines */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 mb-5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Simulated Payment: No real money will be charged. This completes the D2C prepaid flow.</span>
            </div>

            {/* Pay CTA */}
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-primary via-[#00c8f8] to-secondary text-[#080D1B] hover:opacity-95 transition-all shadow-cyan-glow flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Simulating Instant Settlement...</span>
                </>
              ) : (
                <>
                  <span>Authorize & Pay {formatCurrency(finalAmount)}</span>
                  <ArrowRight className="w-4 h-4" />
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
