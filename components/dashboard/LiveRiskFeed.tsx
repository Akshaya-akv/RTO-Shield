"use client";

import React, { useState } from "react";
import { OrderRecord, RiskLevel } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Search,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Truck,
  Ban,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

interface LiveRiskFeedProps {
  orders: OrderRecord[];
  onFilterChange: (level: string) => void;
  activeFilter: string;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const LiveRiskFeed: React.FC<LiveRiskFeedProps> = ({
  orders,
  onFilterChange,
  activeFilter,
  onSearchChange,
  searchQuery,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const getRiskBadge = (level: RiskLevel, score: number) => {
    switch (level) {
      case "LOW":
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {score} • LOW
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-peach/50 bg-peach/20 text-peach tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-peach" />
            {score} • MED
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-rose-500/30 bg-rose-500/15 text-rose-400 tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            {score} • HIGH
          </span>
        );
    }
  };

  const getPaymentBadge = (method: string) => {
    switch (method) {
      case "PREPAID_CONVERTED":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-powder/50 bg-powder/20 text-powder">
            <CreditCard className="w-3 h-3 text-powder" strokeWidth={2} />
            Prepaid Converted
          </span>
        );
      case "COD":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-white/15 bg-white/10 text-lavender">
            <Truck className="w-3 h-3 text-twilight-muted" strokeWidth={2} />
            Cash on Delivery
          </span>
        );
      case "UPI":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400">
            <CreditCard className="w-3 h-3 text-emerald-400" strokeWidth={2} />
            Direct UPI
          </span>
        );
      case "BLOCKED":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-rose-500/30 bg-rose-500/15 text-rose-400">
            <Ban className="w-3 h-3 text-rose-400" strokeWidth={2} />
            Restricted / Blocked
          </span>
        );
      default:
        return <span className="text-xs text-twilight-muted font-mono">{method}</span>;
    }
  };

  return (
    <div className="rounded-3xl glass-twilight overflow-hidden mb-8 shadow-glass">
      {/* Table Control Header */}
      <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-powder" strokeWidth={2} />
            Live Risk Feed & Order Telemetry
          </h3>
          <p className="font-sans text-xs text-twilight-muted mt-0.5">
            Select any row to expand deterministic point deductions and Gemini deliverability audit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-twilight-muted absolute left-3.5 top-3" strokeWidth={2} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search buyer, phone, city..."
              className="bg-white/10 border border-white/20 focus:border-powder rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-twilight-muted w-full sm:w-56 transition-all font-mono focus:outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 rounded-full bg-white/10 border border-white/15">
            {["ALL", "LOW", "MEDIUM", "HIGH"].map((level) => (
              <button
                key={level}
                onClick={() => onFilterChange(level)}
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                  activeFilter === level
                    ? "bg-powder text-lavender-dark shadow-sm"
                    : "text-twilight-muted hover:text-white"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 text-twilight-muted font-mono text-[11px] border-b border-white/10 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Customer</th>
              <th className="py-3.5 px-4 font-semibold">Cart Value</th>
              <th className="py-3.5 px-4 font-semibold">Risk Score</th>
              <th className="py-3.5 px-4 font-semibold">Fulfillment Status</th>
              <th className="py-3.5 px-4 font-semibold">Intervention</th>
              <th className="py-3.5 px-4 font-semibold">Timestamp</th>
              <th className="py-3.5 px-4 font-semibold text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-twilight-muted font-mono text-xs">
                  No orders match current filter criteria.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isExpanded = expandedOrderId === order.id;

                return (
                  <React.Fragment key={order.id}>
                    <tr
                      onClick={() => toggleExpand(order.id)}
                      className="hover:bg-white/10 cursor-pointer transition-colors"
                    >
                      {/* Customer */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white font-sans text-sm">{order.customer_name}</div>
                        <div className="text-[11px] text-twilight-muted font-mono flex items-center gap-1 mt-0.5 tabular-nums">
                          <Phone className="w-3 h-3 text-twilight-muted" strokeWidth={1.8} />
                          <span>+91 {order.phone}</span>
                        </div>
                      </td>

                      {/* Cart Value */}
                      <td className="py-4 px-4 font-mono font-extrabold text-white tabular-nums text-sm">
                        {formatCurrency(Number(order.cart_value))}
                      </td>

                      {/* Risk Assessment */}
                      <td className="py-4 px-4">
                        {getRiskBadge(order.risk_level, order.risk_score)}
                      </td>

                      {/* Payment Method */}
                      <td className="py-4 px-4">
                        {getPaymentBadge(order.final_payment_method)}
                      </td>

                      {/* Intervention */}
                      <td className="py-4 px-4 font-mono text-[11px]">
                        {order.intervention_triggered ? (
                          <span className="text-peach bg-peach/15 px-2 py-0.5 rounded-full border border-peach/40 font-bold text-[10px]">
                            TRIGGERED
                          </span>
                        ) : (
                          <span className="text-twilight-muted/60">NONE</span>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="py-4 px-4 text-twilight-muted font-mono text-[11px] tabular-nums">
                        {formatDate(order.created_at)}
                      </td>

                      {/* Expand Toggle */}
                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          className="p-1 rounded-full text-twilight-muted hover:text-white"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-white" strokeWidth={2} />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-twilight-muted" strokeWidth={2} />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable AI Diagnostics Row */}
                    {isExpanded && (
                      <tr className="bg-black/30 border-b border-white/10">
                        <td colSpan={7} className="p-4 sm:p-5">
                          <div className="rounded-2xl glass-lavender p-5 space-y-3.5 font-mono text-xs text-lavender-dark shadow-glass">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#D8D6EE]">
                              <span className="font-bold text-lavender-dark font-display text-sm">
                                Diagnostic Telemetry Audit
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] text-lavender-muted font-medium">
                                <MapPin className="w-3.5 h-3.5 text-peach-dark" strokeWidth={2} />
                                <span>{order.city}, {order.state} ({order.pincode})</span>
                              </div>
                            </div>

                            {/* Address & AI explanation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <span className="text-[10px] text-lavender-muted uppercase tracking-wider block mb-1 font-semibold">
                                  Full Shipping Address
                                </span>
                                <p className="text-lavender-dark text-[11px] p-3 rounded-xl bg-white border border-[#D5D3EE] shadow-inner font-mono">
                                  {order.address}
                                </p>
                              </div>

                              <div>
                                <span className="text-[10px] text-lavender-muted uppercase tracking-wider block mb-1 font-semibold">
                                  Gemini Deliverability Reasoning
                                </span>
                                <p className="text-lavender-dark text-[11px] p-3 rounded-xl bg-white border border-[#D5D3EE] shadow-inner font-sans leading-relaxed">
                                  {order.ai_reasons?.explanation || "Address evaluated using standard postal heuristics."}
                                </p>
                              </div>
                            </div>

                            {/* Detected Risk Flags */}
                            {order.ai_reasons?.risk_flags && order.ai_reasons.risk_flags.length > 0 && (
                              <div className="pt-2.5 border-t border-[#D8D6EE]">
                                <span className="text-[10px] text-lavender-muted uppercase tracking-wider block mb-1.5 font-semibold">
                                  Detected Risk Flags
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {order.ai_reasons.risk_flags.map((flag, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[10px] px-2.5 py-0.5 rounded-full border border-[#D5D3EE] bg-white text-lavender-dark font-mono font-medium shadow-sm"
                                    >
                                      {flag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
