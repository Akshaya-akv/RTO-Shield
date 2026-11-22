"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, LayoutDashboard, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { OrderRecord } from "@/types";

interface OrderSuccessModalProps {
  isOpen: boolean;
  order: OrderRecord | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  order,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const isPrepaidConverted = order.final_payment_method === "PREPAID_CONVERTED";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="w-full max-w-lg rounded-2xl bg-secondary-bg border border-primary/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
          </div>

          <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-semibold mb-2">
            ORDER CONFIRMED #{order.id.slice(0, 8)}
          </span>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
            Thank You, {order.customer_name}!
          </h3>
          <p className="text-xs text-muted mb-6">
            Your simulated order has been registered in the database and verified by RTO-Shield.
          </p>

          {/* Details Card */}
          <div className="w-full rounded-xl bg-[#0b1322] border border-white/5 p-4 text-left space-y-3 mb-6">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
              <span className="text-muted">Payment Outcome:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  isPrepaidConverted
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                }`}
              >
                {order.final_payment_method}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-muted">Total Paid:</span>
              <span className="text-white font-mono font-bold">
                {formatCurrency(Number(order.cart_value) - (isPrepaidConverted ? 50 : 0))}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-muted">Risk Score Recorded:</span>
              <span
                className={`font-mono font-bold ${
                  order.risk_score >= 75
                    ? "text-rose-400"
                    : order.risk_score >= 40
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {order.risk_score} / 100 ({order.risk_level})
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-muted">Delivery To:</span>
              <span className="text-slate-300 truncate max-w-[200px]">
                {order.city}, {order.pincode}
              </span>
            </div>

            {isPrepaidConverted && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-[11px] text-emerald-300">
                <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  <strong>Merchant Impact:</strong> ₹180 RTO return transit cost successfully protected!
                </span>
              </div>
            )}
          </div>

          {/* Quick CTA to Merchant Dashboard */}
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-primary text-[#080D1B] hover:opacity-90 transition-all shadow-cyan-glow flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Inspect in Merchant Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              Back to Store
            </button>
          </div>
        </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
