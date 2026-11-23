"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, LayoutDashboard, ArrowRight } from "lucide-react";
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-twilight-bg/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg rounded-3xl glass-lavender border border-white/80 p-6 sm:p-7 shadow-glass-lg relative font-sans text-lavender-dark"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" strokeWidth={2} />
            </div>

            <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-white text-lavender-dark border border-[#D5D3EE] mb-2 tabular-nums tracking-wider font-bold">
              ORDER CONFIRMED #{order.id.slice(0, 8)}
            </span>

            <h3 className="font-display text-xl sm:text-2xl font-black text-lavender-dark mb-1">
              Thank You, {order.customer_name}
            </h3>
            <p className="text-xs text-lavender-muted mb-5 max-w-sm font-sans leading-relaxed">
              Your test order has been registered in database telemetry and evaluated by RTO-Shield.
            </p>

            {/* Details Card */}
            <div className="w-full rounded-2xl bg-white/80 border border-[#D5D3EE] p-4 text-left space-y-2.5 mb-6 font-mono text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#D5D3EE]">
                <span className="text-lavender-muted font-sans font-medium">Payment Method:</span>
                <span
                  className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                    isPrepaidConverted
                      ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
                      : "bg-white text-lavender-dark border border-[#D5D3EE]"
                  }`}
                >
                  {order.final_payment_method}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lavender-muted font-sans font-medium">Total Paid:</span>
                <span className="text-lavender-dark font-black tabular-nums">
                  {formatCurrency(Number(order.cart_value) - (isPrepaidConverted ? 50 : 0))}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lavender-muted font-sans font-medium">Evaluated Risk Score:</span>
                <span
                  className={`font-bold tabular-nums ${
                    order.risk_score >= 75
                      ? "text-rose-600"
                      : order.risk_score >= 40
                      ? "text-[#8B4528]"
                      : "text-emerald-600"
                  }`}
                >
                  {order.risk_score} / 100 ({order.risk_level})
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lavender-muted font-sans font-medium">Delivery Node:</span>
                <span className="text-lavender-dark truncate max-w-[200px] font-bold">
                  {order.city}, {order.pincode}
                </span>
              </div>

              {isPrepaidConverted && (
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-800 font-mono font-medium">
                  <span>Merchant Telemetry: ₹180 courier loss avoided via prepaid conversion.</span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="w-full flex flex-col sm:flex-row gap-3 font-sans">
              <Link
                href="/dashboard"
                className="flex-1 py-3 px-5 rounded-full font-bold text-xs bg-peach hover:bg-peach-light text-lavender-dark transition-all flex items-center justify-center gap-2 shadow-peach-sm active:scale-[0.98]"
              >
                <LayoutDashboard className="w-4 h-4" strokeWidth={2} />
                <span>Inspect in Dashboard</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-full text-xs font-bold text-lavender-dark bg-white border border-[#D5D3EE] hover:bg-white/80 transition-colors"
              >
                Back to Storefront
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
