"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiskEvaluationResult, AddressData, CartItem } from "@/types";
import { RiskGauge } from "./RiskGauge";
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Info,
  MapPin,
  Lock,
  Loader2,
  CheckCircle,
  X,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface RiskEvaluationModalProps {
  isOpen: boolean;
  isEvaluating: boolean;
  evaluationStep: number;
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl rounded-xl bg-zinc-950 border border-white/10 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto relative"
        >
          {isEvaluating ? (
            /* Multi-phase loading evaluation */
            <div className="py-10 flex flex-col items-center text-center">
              <Loader2 className="w-8 h-8 text-zinc-300 animate-spin mb-4" strokeWidth={1.5} />

              <h3 className="text-base font-semibold text-zinc-100 mb-1">
                Evaluating Delivery Risk Signals
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mb-6">
                Querying recipient fulfillment history and running Gemini NLP address deliverability parsing...
              </p>

              {/* Step Sequence Checklist */}
              <div className="w-full max-w-md space-y-2 text-left font-mono text-xs">
                <div
                  className={`flex items-center gap-2.5 p-2.5 rounded-md border transition-colors ${
                    evaluationStep >= 1
                      ? "bg-zinc-900 border-white/15 text-zinc-200"
                      : "bg-zinc-950 border-white/[0.04] text-zinc-500"
                  }`}
                >
                  {evaluationStep > 1 ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                  ) : (
                    <Loader2 className="w-4 h-4 text-zinc-300 animate-spin shrink-0" strokeWidth={1.5} />
                  )}
                  <div>
                    <div className="font-medium text-[11px]">1. Querying customer history logs</div>
                    <div className="text-[10px] text-zinc-500">Checking delivery records for {formData.phone}</div>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2.5 p-2.5 rounded-md border transition-colors ${
                    evaluationStep >= 2
                      ? "bg-zinc-900 border-white/15 text-zinc-200"
                      : "bg-zinc-950 border-white/[0.04] text-zinc-500"
                  }`}
                >
                  {evaluationStep > 2 ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                  ) : evaluationStep === 2 ? (
                    <Loader2 className="w-4 h-4 text-zinc-300 animate-spin shrink-0" strokeWidth={1.5} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-[11px]">2. Parsing address syntax with Gemini NLP</div>
                    <div className="text-[10px] text-zinc-500">Evaluating premise, landmark & physical deliverability</div>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2.5 p-2.5 rounded-md border transition-colors ${
                    evaluationStep >= 3
                      ? "bg-zinc-900 border-white/15 text-zinc-200"
                      : "bg-zinc-950 border-white/[0.04] text-zinc-500"
                  }`}
                >
                  {evaluationStep === 3 ? (
                    <Loader2 className="w-4 h-4 text-zinc-300 animate-spin shrink-0" strokeWidth={1.5} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-[11px]">3. Enforcing merchant risk cutoff policy</div>
                    <div className="text-[10px] text-zinc-500">Determining COD eligibility and prepaid recovery options</div>
                  </div>
                </div>
              </div>
            </div>
          ) : result ? (
            /* Evaluation Results & Dynamic Interventions */
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-5">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">Order Risk Assessment Result</h3>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 mt-0.5">
                    <span>Evaluated {new Date(result.evaluated_at).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>Policy Cutoff: {result.threshold_used}/100</span>
                    {result.is_ai_fallback && (
                      <>
                        <span>•</span>
                        <span className="text-zinc-400">Deterministic Engine</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="text-zinc-400 hover:text-zinc-200 p-1 rounded-md hover:bg-zinc-900 transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Gauge & Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-5 p-4 rounded-lg border border-white/[0.06] bg-zinc-900/40">
                <div className="md:col-span-5 flex justify-center">
                  <RiskGauge score={result.final_score} riskLevel={result.risk_level} size={160} />
                </div>

                <div className="md:col-span-7 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Deterministic Score</span>
                      <span className="text-zinc-200 tabular-nums">{result.rule_score}/40 pts</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-zinc-300 h-full rounded-full"
                        style={{ width: `${(result.rule_score / 40) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                      <span>Gemini Address NLP</span>
                      <span className="text-zinc-200 tabular-nums">{result.ai_score}/60 pts</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-zinc-100 h-full rounded-full"
                        style={{ width: `${(result.ai_score / 60) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-white/[0.04]">
                    <span className="text-zinc-400">Address Rating:</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[11px] font-mono ${
                        result.address_quality === "GOOD"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : result.address_quality === "MODERATE"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {result.address_quality}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Explanation & Flags */}
              <div className="mb-5 space-y-2.5 text-xs">
                <div className="p-3 rounded-md bg-zinc-900/40 border border-white/[0.06] text-zinc-300">
                  <div className="flex items-center gap-1.5 font-medium text-zinc-200 mb-1">
                    <Info className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
                    <span>Deliverability Explanation</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-zinc-400">{result.ai_explanation}</p>
                </div>

                {result.detected_flags.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5">
                      Detected Telemetry Signals:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.detected_flags.map((flag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/[0.08]"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Interventions */}
              {result.risk_level === "LOW" && (
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-400">Order Profile Verified</h4>
                      <p className="text-xs text-zinc-300 mt-0.5">
                        Clean delivery history and complete address structure. Cash on Delivery is permitted.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={onProceedCod}
                      className="flex-1 py-2 px-3.5 rounded-md text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Confirm Cash on Delivery ({formatCurrency(cartValue)})</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>

                    <button
                      onClick={onOpenUpiModal}
                      className="py-2 px-3.5 rounded-md text-xs font-medium border border-white/10 bg-zinc-900/60 text-zinc-300 hover:text-white transition-colors"
                    >
                      Pay with UPI
                    </button>
                  </div>
                </div>
              )}

              {result.risk_level === "MEDIUM" && (
                <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-xs font-semibold text-amber-400">Prepaid Incentive Active: ₹50 Discount</h4>
                      <p className="text-xs text-zinc-300 mt-0.5">
                        Switch to UPI payment to receive an instant ₹50 discount and priority courier dispatch.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-zinc-900/60 border border-white/[0.04] flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Destination: {formData.pincode}, {formData.city}</span>
                    <button
                      onClick={() => setAddressConfirmed(!addressConfirmed)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                        addressConfirmed
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                      }`}
                    >
                      {addressConfirmed ? "Verified ✓" : "Confirm Address"}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={onOpenUpiModal}
                      className="flex-1 py-2 px-3.5 rounded-md text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Switch to UPI & Save ₹50 ({formatCurrency(cartValue - 50)})</span>
                    </button>

                    <button
                      onClick={onProceedCod}
                      className="py-2 px-3.5 rounded-md text-xs font-medium border border-white/10 bg-zinc-900/60 text-zinc-300 hover:text-white transition-colors"
                    >
                      Continue with COD
                    </button>
                  </div>
                </div>
              )}

              {result.risk_level === "HIGH" && (
                <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-xs font-semibold text-rose-400">COD Restricted for This Order</h4>
                      <p className="text-xs text-zinc-300 mt-0.5">
                        Cash on delivery is disabled due to past return history or physical address deliverability risk.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-zinc-900/60 border border-white/[0.04] text-[11px] text-zinc-400 flex items-start gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>
                      Order may be completed upfront via UPI with ₹50 instant discount, preventing uncollected transit returns.
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={onOpenUpiModal}
                      className="flex-1 py-2 px-3.5 rounded-md text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Complete via UPI & Save ₹50 ({formatCurrency(cartValue - 50)})</span>
                    </button>

                    <button
                      onClick={onCancelBlocked}
                      className="py-2 px-3.5 rounded-md text-xs font-medium border border-rose-500/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
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
