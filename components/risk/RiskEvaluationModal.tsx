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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl rounded-xl bg-surface border border-white/15 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto relative font-sans"
        >
          {isEvaluating ? (
            /* Multi-phase loading evaluation */
            <div className="py-10 flex flex-col items-center text-center">
              <Loader2 className="w-8 h-8 text-bone animate-spin mb-4" strokeWidth={1.5} />

              <h3 className="font-display text-base font-semibold text-bone mb-1 lowercase">
                evaluating delivery risk signals
              </h3>
              <p className="text-xs text-greige max-w-sm mb-6 font-sans">
                Querying recipient fulfillment history and running Gemini NLP address deliverability parsing...
              </p>

              {/* Step Sequence Checklist */}
              <div className="w-full max-w-md space-y-2 text-left font-mono text-xs">
                <div
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors ${
                    evaluationStep >= 1
                      ? "bg-surface-hover border-white/15 text-bone"
                      : "bg-canvas border-white/5 text-greige/50"
                  }`}
                >
                  {evaluationStep > 1 ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                  ) : (
                    <Loader2 className="w-4 h-4 text-bone animate-spin shrink-0" strokeWidth={1.5} />
                  )}
                  <div>
                    <div className="font-medium text-[11px]">1. Querying customer history logs</div>
                    <div className="text-[10px] text-greige">Checking delivery records for {formData.phone}</div>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors ${
                    evaluationStep >= 2
                      ? "bg-surface-hover border-white/15 text-bone"
                      : "bg-canvas border-white/5 text-greige/50"
                  }`}
                >
                  {evaluationStep > 2 ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                  ) : evaluationStep === 2 ? (
                    <Loader2 className="w-4 h-4 text-bone animate-spin shrink-0" strokeWidth={1.5} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-[11px]">2. Parsing address syntax with Gemini NLP</div>
                    <div className="text-[10px] text-greige">Evaluating premise, landmark & physical deliverability</div>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors ${
                    evaluationStep >= 3
                      ? "bg-surface-hover border-white/15 text-bone"
                      : "bg-canvas border-white/5 text-greige/50"
                  }`}
                >
                  {evaluationStep === 3 ? (
                    <Loader2 className="w-4 h-4 text-bone animate-spin shrink-0" strokeWidth={1.5} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-[11px]">3. Enforcing merchant risk cutoff policy</div>
                    <div className="text-[10px] text-greige">Determining COD eligibility and prepaid recovery options</div>
                  </div>
                </div>
              </div>
            </div>
          ) : result ? (
            /* Evaluation Results & Dynamic Interventions */
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
                <div>
                  <h3 className="font-display text-sm font-semibold text-bone lowercase">order risk assessment result</h3>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-greige mt-0.5">
                    <span>Evaluated {new Date(result.evaluated_at).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>Cutoff: {result.threshold_used}/100</span>
                    {result.is_ai_fallback && (
                      <>
                        <span>•</span>
                        <span className="text-greige">Deterministic Fallback</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="text-greige hover:text-bone p-1 rounded-md hover:bg-surface-hover transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Gauge & Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-5 p-4 rounded-xl border border-white/10 bg-canvas/60">
                <div className="md:col-span-5 flex justify-center">
                  <RiskGauge score={result.final_score} riskLevel={result.risk_level} size={160} />
                </div>

                <div className="md:col-span-7 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-greige mb-1">
                      <span>Deterministic Score</span>
                      <span className="text-bone tabular-nums">{result.rule_score}/40 pts</span>
                    </div>
                    <div className="w-full bg-surface-hover h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="bg-bone h-full rounded-full"
                        style={{ width: `${(result.rule_score / 40) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-greige mb-1">
                      <span>Gemini Address NLP</span>
                      <span className="text-bone tabular-nums">{result.ai_score}/60 pts</span>
                    </div>
                    <div className="w-full bg-surface-hover h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="bg-bone/80 h-full rounded-full"
                        style={{ width: `${(result.ai_score / 60) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10">
                    <span className="text-greige font-sans">Address Rating:</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider ${
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
                <div className="p-3 rounded-lg bg-surface-input border border-white/10 text-bone">
                  <div className="flex items-center gap-1.5 font-medium text-bone mb-1 font-display lowercase">
                    <Info className="w-3.5 h-3.5 text-greige" strokeWidth={1.5} />
                    <span>deliverability explanation</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-greige font-sans">{result.ai_explanation}</p>
                </div>

                {result.detected_flags.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-greige mb-1.5">
                      Detected Telemetry Signals:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.detected_flags.map((flag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas text-greige border border-white/10"
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
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3 font-sans">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-400">Order Profile Verified</h4>
                      <p className="text-xs text-greige mt-0.5">
                        Clean delivery history and complete address structure. Cash on Delivery is permitted.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={onProceedCod}
                      className="flex-1 py-2.5 px-4 rounded-full text-xs font-medium bg-bone text-canvas hover:bg-bone-hover transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Confirm Cash on Delivery ({formatCurrency(cartValue)})</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>

                    <button
                      onClick={onOpenUpiModal}
                      className="py-2.5 px-4 rounded-full text-xs font-medium border border-white/15 bg-surface text-bone hover:bg-surface-hover hover:border-white/30 transition-colors"
                    >
                      Pay with UPI
                    </button>
                  </div>
                </div>
              )}

              {result.risk_level === "MEDIUM" && (
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3 font-sans">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-xs font-semibold text-amber-400">Prepaid Incentive Active: ₹50 Discount</h4>
                      <p className="text-xs text-greige mt-0.5">
                        Switch to UPI payment to receive an instant ₹50 discount and priority courier dispatch.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-canvas/60 border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-greige font-mono">Destination: {formData.pincode}, {formData.city}</span>
                    <button
                      onClick={() => setAddressConfirmed(!addressConfirmed)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                        addressConfirmed
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-surface text-bone hover:bg-surface-hover border border-white/10"
                      }`}
                    >
                      {addressConfirmed ? "Verified ✓" : "Confirm Address"}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={onOpenUpiModal}
                      className="flex-1 py-2.5 px-4 rounded-full text-xs font-medium bg-bone text-canvas hover:bg-bone-hover transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Switch to UPI & Save ₹50 ({formatCurrency(cartValue - 50)})</span>
                    </button>

                    <button
                      onClick={onProceedCod}
                      className="py-2.5 px-4 rounded-full text-xs font-medium border border-white/15 bg-surface text-bone hover:bg-surface-hover hover:border-white/30 transition-colors"
                    >
                      Continue with COD
                    </button>
                  </div>
                </div>
              )}

              {result.risk_level === "HIGH" && (
                <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-3 font-sans">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h4 className="text-xs font-semibold text-rose-400">COD Restricted for This Order</h4>
                      <p className="text-xs text-greige mt-0.5">
                        Cash on delivery is disabled due to past return history or physical address deliverability risk.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-canvas/60 border border-white/10 text-[11px] text-greige flex items-start gap-1.5 font-mono">
                    <Lock className="w-3.5 h-3.5 text-greige shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>
                      Order may be completed upfront via UPI with ₹50 instant discount, preventing uncollected transit returns.
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={onOpenUpiModal}
                      className="flex-1 py-2.5 px-4 rounded-full text-xs font-medium bg-bone text-canvas hover:bg-bone-hover transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Complete via UPI & Save ₹50 ({formatCurrency(cartValue - 50)})</span>
                    </button>

                    <button
                      onClick={onCancelBlocked}
                      className="py-2.5 px-4 rounded-full text-xs font-medium border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
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
