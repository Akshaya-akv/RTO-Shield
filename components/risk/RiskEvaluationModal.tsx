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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-twilight-bg/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl rounded-3xl glass-lavender border border-white/80 shadow-glass-lg p-6 sm:p-7 max-h-[90vh] overflow-y-auto relative font-sans text-lavender-dark"
        >
          {isEvaluating ? (
            /* Multi-phase loading evaluation */
            <div className="py-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-powder/20 border border-powder/40 flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 text-powder animate-spin" strokeWidth={2} />
              </div>

              <h3 className="font-display text-lg font-bold text-lavender-dark mb-1">
                Evaluating Delivery Risk Signals
              </h3>
              <p className="text-xs text-lavender-muted max-w-sm mb-6 font-sans">
                Querying recipient fulfillment history and running Gemini NLP address deliverability parsing...
              </p>

              {/* Step Sequence Checklist */}
              <div className="w-full max-w-md space-y-2.5 text-left font-mono text-xs">
                <div
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors ${
                    evaluationStep >= 1
                      ? "bg-white border-[#D5D3EE] text-lavender-dark shadow-sm"
                      : "bg-white/40 border-[#D5D3EE]/50 text-lavender-muted/60"
                  }`}
                >
                  {evaluationStep > 1 ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
                  ) : (
                    <Loader2 className="w-4 h-4 text-powder animate-spin shrink-0" strokeWidth={2} />
                  )}
                  <div>
                    <div className="font-bold text-[11px]">1. Querying customer history logs</div>
                    <div className="text-[10px] text-lavender-muted font-sans">Checking delivery records for {formData.phone}</div>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors ${
                    evaluationStep >= 2
                      ? "bg-white border-[#D5D3EE] text-lavender-dark shadow-sm"
                      : "bg-white/40 border-[#D5D3EE]/50 text-lavender-muted/60"
                  }`}
                >
                  {evaluationStep > 2 ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={2} />
                  ) : evaluationStep === 2 ? (
                    <Loader2 className="w-4 h-4 text-powder animate-spin shrink-0" strokeWidth={2} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-lavender-muted/30 shrink-0" />
                  )}
                  <div>
                    <div className="font-bold text-[11px]">2. Parsing address syntax with Gemini NLP</div>
                    <div className="text-[10px] text-lavender-muted font-sans">Evaluating premise, landmark & physical deliverability</div>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-colors ${
                    evaluationStep >= 3
                      ? "bg-white border-[#D5D3EE] text-lavender-dark shadow-sm"
                      : "bg-white/40 border-[#D5D3EE]/50 text-lavender-muted/60"
                  }`}
                >
                  {evaluationStep === 3 ? (
                    <Loader2 className="w-4 h-4 text-powder animate-spin shrink-0" strokeWidth={2} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-lavender-muted/30 shrink-0" />
                  )}
                  <div>
                    <div className="font-bold text-[11px]">3. Enforcing merchant risk cutoff policy</div>
                    <div className="text-[10px] text-lavender-muted font-sans">Determining COD eligibility and prepaid recovery options</div>
                  </div>
                </div>
              </div>
            </div>
          ) : result ? (
            /* Evaluation Results & Dynamic Interventions */
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D5D3EE] mb-5">
                <div>
                  <h3 className="font-display text-base font-bold text-lavender-dark">Order Risk Assessment Result</h3>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-lavender-muted mt-0.5">
                    <span>Evaluated {new Date(result.evaluated_at).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>Cutoff: {result.threshold_used}/100</span>
                    {result.is_ai_fallback && (
                      <>
                        <span>•</span>
                        <span className="text-lavender-muted">Deterministic Fallback</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="text-lavender-muted hover:text-lavender-dark p-1.5 rounded-full hover:bg-white/60 transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>

              {/* Gauge & Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-5 p-5 rounded-2xl border border-[#D5D3EE] bg-white/70">
                <div className="md:col-span-5 flex justify-center">
                  <RiskGauge score={result.final_score} riskLevel={result.risk_level} size={160} />
                </div>

                <div className="md:col-span-7 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-lavender-muted mb-1">
                      <span>Deterministic Score</span>
                      <span className="text-lavender-dark font-bold tabular-nums">{result.rule_score}/40 pts</span>
                    </div>
                    <div className="w-full bg-[#E0DEF2] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-powder h-full rounded-full"
                        style={{ width: `${(result.rule_score / 40) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-lavender-muted mb-1">
                      <span>Gemini Address NLP</span>
                      <span className="text-lavender-dark font-bold tabular-nums">{result.ai_score}/60 pts</span>
                    </div>
                    <div className="w-full bg-[#E0DEF2] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-peach h-full rounded-full"
                        style={{ width: `${(result.ai_score / 60) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-[#D5D3EE]">
                    <span className="text-lavender-muted font-sans font-medium">Address Rating:</span>
                    <span
                      className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider ${
                        result.address_quality === "GOOD"
                          ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
                          : result.address_quality === "MODERATE"
                          ? "bg-peach/30 text-[#8B4528] border border-peach/50"
                          : "bg-rose-500/15 text-rose-600 border border-rose-500/30"
                      }`}
                    >
                      {result.address_quality}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Explanation & Flags */}
              <div className="mb-5 space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-white/85 border border-[#D5D3EE] text-lavender-dark">
                  <div className="flex items-center gap-2 font-bold text-lavender-dark mb-1 font-display">
                    <Info className="w-4 h-4 text-powder" strokeWidth={2} />
                    <span>Deliverability Explanation</span>
                  </div>
                  <p className="leading-relaxed text-xs text-lavender-muted font-sans">{result.ai_explanation}</p>
                </div>

                {result.detected_flags.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-lavender-muted mb-1.5 font-bold">
                      Detected Telemetry Signals:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.detected_flags.map((flag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white text-lavender-dark border border-[#D5D3EE]"
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
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-3 font-sans">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <h4 className="text-xs font-bold text-emerald-800">Order Profile Verified</h4>
                      <p className="text-xs text-lavender-muted mt-0.5">
                        Clean delivery history and complete address structure. Cash on Delivery is permitted.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      onClick={onProceedCod}
                      className="flex-1 py-3 px-5 rounded-full text-xs font-bold bg-peach hover:bg-peach-light text-lavender-dark transition-all flex items-center justify-center gap-2 shadow-peach-sm active:scale-[0.98]"
                    >
                      <span>Confirm Cash on Delivery ({formatCurrency(cartValue)})</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </button>

                    <button
                      onClick={onOpenUpiModal}
                      className="py-3 px-5 rounded-full text-xs font-bold border border-[#D5D3EE] bg-white text-lavender-dark hover:bg-white/80 transition-colors"
                    >
                      Pay with UPI
                    </button>
                  </div>
                </div>
              )}

              {result.risk_level === "MEDIUM" && (
                <div className="p-5 rounded-2xl bg-peach/15 border border-peach/35 space-y-3 font-sans">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-[#C06030] shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <h4 className="text-xs font-bold text-[#8B4528]">Prepaid Incentive Active: ₹50 Discount</h4>
                      <p className="text-xs text-lavender-muted mt-0.5">
                        Switch to UPI payment to receive an instant ₹50 discount and priority courier dispatch.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/70 border border-[#D5D3EE] flex items-center justify-between text-xs">
                    <span className="text-lavender-muted font-mono">Destination: {formData.pincode}, {formData.city}</span>
                    <button
                      onClick={() => setAddressConfirmed(!addressConfirmed)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full transition-colors font-bold ${
                        addressConfirmed
                          ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
                          : "bg-twilight-btn text-white hover:bg-twilight-btn/90"
                      }`}
                    >
                      {addressConfirmed ? "Verified ✓" : "Confirm Address"}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      onClick={onOpenUpiModal}
                      className="flex-1 py-3 px-5 rounded-full text-xs font-bold bg-peach hover:bg-peach-light text-lavender-dark transition-all flex items-center justify-center gap-2 shadow-peach-sm active:scale-[0.98]"
                    >
                      <span>Switch to UPI & Save ₹50 ({formatCurrency(cartValue - 50)})</span>
                    </button>

                    <button
                      onClick={onProceedCod}
                      className="py-3 px-5 rounded-full text-xs font-bold border border-[#D5D3EE] bg-white text-lavender-dark hover:bg-white/80 transition-colors"
                    >
                      Continue with COD
                    </button>
                  </div>
                </div>
              )}

              {result.risk_level === "HIGH" && (
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-3 font-sans">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <h4 className="text-xs font-bold text-rose-700">COD Restricted for This Order</h4>
                      <p className="text-xs text-lavender-muted mt-0.5">
                        Cash on delivery is disabled due to past return history or physical address deliverability risk.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/70 border border-[#D5D3EE] text-[11px] text-lavender-dark flex items-start gap-2 font-mono">
                    <Lock className="w-4 h-4 text-lavender-muted shrink-0 mt-0.5" strokeWidth={2} />
                    <span>
                      Order may be completed upfront via UPI with ₹50 instant discount, preventing uncollected transit returns.
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      onClick={onOpenUpiModal}
                      className="flex-1 py-3 px-5 rounded-full text-xs font-bold bg-peach hover:bg-peach-light text-lavender-dark transition-all flex items-center justify-center gap-2 shadow-peach-sm active:scale-[0.98]"
                    >
                      <span>Complete via UPI & Save ₹50 ({formatCurrency(cartValue - 50)})</span>
                    </button>

                    <button
                      onClick={onCancelBlocked}
                      className="py-3 px-5 rounded-full text-xs font-bold border border-rose-300 bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
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
