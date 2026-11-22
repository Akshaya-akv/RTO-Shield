"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiskEvaluationResult, AddressData, CartItem } from "@/types";
import { RiskGauge } from "./RiskGauge";
import {
  ShieldCheck,
  AlertTriangle,
  ShieldX,
  Sparkles,
  Zap,
  CheckCircle,
  ArrowRight,
  Info,
  MapPin,
  Lock,
  Loader2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface RiskEvaluationModalProps {
  isOpen: boolean;
  isEvaluating: boolean;
  evaluationStep: number; // 1, 2, 3
  result: RiskEvaluationResult | null;
  formData: AddressData;
  cartItems: CartItem[];
  cartValue: number;
  onProceedCod: () => void;
  onOpenUpiModal: () => void;
  onClose: () => void;
  onCancelBlocked: () => void;
}

export const RiskEvaluationModal: React.FC<RiskEvaluationModalProps> = ({
  isOpen,
  isEvaluating,
  evaluationStep,
  result,
  formData,
  cartItems,
  cartValue,
  onProceedCod,
  onOpenUpiModal,
  onClose,
  onCancelBlocked,
}) => {
  const [addressConfirmed, setAddressConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-2xl bg-secondary-bg border border-card-border shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative"
        >
          {/* Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-primary/10 blur-3xl pointer-events-none" />

        {isEvaluating ? (
          /* Multi-phase loading animation as explicitly required in Step 4 */
          <div className="py-12 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              RTO-Shield AI Security Inspection
            </h3>
            <p className="text-xs text-muted max-w-sm mb-6">
              Evaluating risk telemetry and courier delivery feasibility in real-time...
            </p>

            {/* Step Sequence Checklist */}
            <div className="w-full max-w-md space-y-3 text-left">
              <div
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  evaluationStep >= 1
                    ? "bg-primary/10 border-primary/40 text-white"
                    : "bg-[#0b1322] border-white/5 text-muted"
                }`}
              >
                {evaluationStep > 1 ? (
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                )}
                <div>
                  <div className="text-xs font-semibold">1. Analyzing customer history...</div>
                  <div className="text-[11px] text-slate-400">
                    Querying phone network delivery & RTO logs
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  evaluationStep >= 2
                    ? "bg-primary/10 border-primary/40 text-white"
                    : "bg-[#0b1322] border-white/5 text-muted"
                }`}
              >
                {evaluationStep > 2 ? (
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                ) : evaluationStep === 2 ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-semibold">2. Checking address quality...</div>
                  <div className="text-[11px] text-slate-400">
                    Gemini AI NLP parsing structure, house/flat & gibberish
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  evaluationStep >= 3
                    ? "bg-primary/10 border-primary/40 text-white"
                    : "bg-[#0b1322] border-white/5 text-muted"
                }`}
              >
                {evaluationStep === 3 ? (
                  <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-semibold">3. Running AI risk assessment...</div>
                  <div className="text-[11px] text-slate-400">
                    Synthesizing hybrid score & merchant policy intervention
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : result ? (
          /* Step 5 & 6: Evaluation Results & Dynamic Interventions */
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-card-border mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/20 text-primary border border-primary/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Order Risk Assessment</h3>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>Evaluated at {new Date(result.evaluated_at).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span className="font-mono text-primary">Threshold: {result.threshold_used}</span>
                    {result.is_ai_fallback && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400 font-mono text-[11px]">Deterministic Engine</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-muted hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Gauge & Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6 p-4 rounded-xl bg-[#0b1322] border border-white/5">
              <div className="md:col-span-5 flex justify-center">
                <RiskGauge score={result.final_score} riskLevel={result.risk_level} size={170} />
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Rule-Based Signal (0-40):</span>
                  <span className="text-xs font-mono font-bold text-white">{result.rule_score} pts</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-700"
                    style={{ width: `${(result.rule_score / 40) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Gemini Address Quality (0-60):</span>
                  <span className="text-xs font-mono font-bold text-white">{result.ai_score} pts</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-secondary h-full transition-all duration-700"
                    style={{ width: `${(result.ai_score / 60) * 100}%` }}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-muted">Address Structure Rating:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      result.address_quality === "GOOD"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : result.address_quality === "MODERATE"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {result.address_quality}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Explanation & Flags */}
            <div className="mb-6 space-y-3">
              <div className="p-3.5 rounded-xl bg-secondary-bg/90 border border-primary/20 text-xs text-slate-200">
                <div className="flex items-center gap-1.5 font-semibold text-primary mb-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>AI Risk Explanation</span>
                </div>
                <p className="leading-relaxed">{result.ai_explanation}</p>
              </div>

              {result.detected_flags.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
                    Detected Telemetry Flags
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.detected_flags.map((flag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30"
                      >
                        {flag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* DYNAMIC CHECKOUT INTERVENTIONS                                 */}
            {/* ============================================================== */}

            {/* Case 1: LOW RISK (0 - 39) */}
            {result.risk_level === "LOW" && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400">
                      Clean Order Profile Verified
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Your order looks good! Both Cash on Delivery and Instant UPI are available.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onProceedCod}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-primary text-[#080D1B] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-cyan-glow"
                  >
                    <span>Confirm Cash on Delivery ({formatCurrency(cartValue)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenUpiModal}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Pay with Instant UPI</span>
                  </button>
                </div>
              </div>
            )}

            {/* Case 2: MEDIUM RISK (40 - 74) */}
            {result.risk_level === "MEDIUM" && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-400">
                      Prepaid Incentive Unlocked: ₹50 OFF
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Switch to UPI and get <strong className="text-white">₹50 OFF</strong> + Priority Dispatch!
                    </p>
                  </div>
                </div>

                {/* One-click address confirmation toggle */}
                <div className="p-3 rounded-lg bg-[#0b1322] border border-amber-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Confirm deliverability at: <strong>{formData.pincode}, {formData.city}</strong></span>
                  </div>
                  <button
                    onClick={() => setAddressConfirmed(!addressConfirmed)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-colors ${
                      addressConfirmed
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {addressConfirmed ? "Address Verified ✓" : "Verify Address"}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onOpenUpiModal}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-[#080D1B] hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  >
                    <Zap className="w-4 h-4 text-[#080D1B]" />
                    <span>Switch to UPI & Save ₹50 ({formatCurrency(cartValue - 50)})</span>
                  </button>

                  <button
                    onClick={onProceedCod}
                    className="sm:w-auto py-2.5 px-4 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center"
                  >
                    Continue with Standard COD
                  </button>
                </div>
              </div>
            )}

            {/* Case 3: HIGH RISK (75 - 100) */}
            {result.risk_level === "HIGH" && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 shrink-0">
                    <ShieldX className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-400">
                      COD Temporarily Restricted for This Order
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Cash on Delivery is temporarily unavailable for this order due to address or delivery history verification signals.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0b1322] border border-rose-500/20 text-[11px] text-slate-300 flex items-start gap-2">
                  <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fair Security Policy:</strong> This restriction is based purely on courier delivery routing safety, not a personal judgment of the customer. Complete via UPI to unlock ₹50 instant discount.
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onOpenUpiModal}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-primary via-[#00c8f8] to-secondary text-[#080D1B] hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-cyan-glow"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Convert to UPI & Save ₹50 ({formatCurrency(cartValue - 50)})</span>
                  </button>

                  <button
                    onClick={onCancelBlocked}
                    className="sm:w-auto py-2.5 px-4 rounded-xl text-xs font-medium text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all text-center"
                  >
                    Abandon Order
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
