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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg rounded-xl bg-surface border border-white/15 p-6 sm:p-7 shadow-2xl relative font-sans"
        >
          <div className="flex flex-col items-center text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-3" strokeWidth={1.5} />

            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-canvas text-greige border border-white/10 mb-2 tabular-nums tracking-wider">
              ORDER CONFIRMED #{order.id.slice(0, 8)}
            </span>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-bone mb-1 lowercase">
              thank you, {order.customer_name}
            </h3>
            <p className="text-xs text-greige mb-5 max-w-sm font-sans leading-relaxed">
              Your test order has been registered in database telemetry and evaluated by rto-shield.
            </p>

            {/* Details Card */}
            <div className="w-full rounded-lg bg-canvas/80 border border-white/10 p-4 text-left space-y-2.5 mb-5 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-greige font-sans">Payment Method:</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                    isPrepaidConverted
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-surface text-bone border border-white/10"
                  }`}
                >
                  {order.final_payment_method}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-greige font-sans">Total Paid:</span>
                <span className="text-bone font-bold tabular-nums">
                  {formatCurrency(Number(order.cart_value) - (isPrepaidConverted ? 50 : 0))}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-greige font-sans">Evaluated Risk Score:</span>
                <span
                  className={`font-bold tabular-nums ${
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

              <div className="flex justify-between items-center">
                <span className="text-greige font-sans">Delivery Node:</span>
                <span className="text-bone truncate max-w-[200px]">
                  {order.city}, {order.pincode}
                </span>
              </div>

              {isPrepaidConverted && (
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
                  <span>Merchant Telemetry: ₹180 courier loss avoided via prepaid conversion.</span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="w-full flex flex-col sm:flex-row gap-2.5 font-sans">
              <Link
                href="/dashboard"
                className="flex-1 py-2.5 px-4 rounded-full font-medium text-xs bg-bone text-canvas hover:bg-bone-hover transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Inspect in Merchant Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>

              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-full text-xs font-medium text-bone hover:text-white bg-surface border border-white/15 hover:bg-surface-hover hover:border-white/30 transition-colors"
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
