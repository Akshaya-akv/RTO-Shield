"use client";

import React, { useState } from "react";
import { OrderRecord, RiskLevel } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ShieldX,
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
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {score} • LOW
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {score} • MED
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
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
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <CreditCard className="w-3 h-3 text-purple-400" />
            Prepaid Converted
          </span>
        );
      case "COD":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <Truck className="w-3 h-3 text-blue-400" />
            Cash on Delivery
          </span>
        );
      case "UPI":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CreditCard className="w-3 h-3 text-emerald-400" />
            Direct UPI
          </span>
        );
      case "BLOCKED":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <Ban className="w-3 h-3 text-rose-400" />
            Protected / Blocked
          </span>
        );
      default:
        return <span className="text-xs text-muted">{method}</span>;
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-xl shadow-xl">
      {/* Table Control Header */}
      <div className="p-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            Live Risk Feed & Evaluated Orders
          </h3>
          <p className="text-xs text-slate-400">
            Click any row to expand AI address diagnostics, detected risk flags & historical reasons.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search buyer, phone..."
              className="bg-white/[0.04] border border-white/10 focus:border-purple-400 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 w-full sm:w-48 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10">
            {["ALL", "LOW", "MEDIUM", "HIGH"].map((level) => (
              <button
                key={level}
                onClick={() => onFilterChange(level)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === level
                    ? "bg-white text-black shadow-md shadow-white/10"
                    : "text-slate-400 hover:text-white"
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
          <thead className="bg-white/[0.02] text-slate-400 font-mono text-[11px] border-b border-white/5 uppercase">
            <tr>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Cart Value</th>
              <th className="py-3 px-4">Risk Assessment</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4">Intervention</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted">
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
                      className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                    >
                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{order.customer_name}</div>
                        <div className="text-[11px] text-muted flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span className="font-mono">{order.phone}</span>
                        </div>
                      </td>

                      {/* Cart Value */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                        {formatCurrency(Number(order.cart_value))}
                      </td>

                      {/* Risk Assessment */}
                      <td className="py-3.5 px-4">
                        {getRiskBadge(order.risk_level, order.risk_score)}
                      </td>

                      {/* Payment Method */}
                      <td className="py-3.5 px-4">
                        {getPaymentBadge(order.final_payment_method)}
                      </td>

                      {/* Intervention */}
                      <td className="py-3.5 px-4">
                        {order.intervention_triggered ? (
                          <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                            TRIGGERED
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">None</span>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                        {formatDate(order.created_at)}
                      </td>

                      {/* Expand Toggle */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-primary" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable AI Diagnostics Row */}
                    {isExpanded && (
                      <tr className="bg-[#0b1322] border-b border-primary/20 animate-in fade-in duration-150">
                        <td colSpan={7} className="p-4 sm:p-5">
                          <div className="rounded-xl bg-[#080D1B] border border-white/5 p-4 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="font-bold text-white text-xs">
                                  AI Reasoning & Telemetry Audit
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[11px]">
                                <span className="text-muted">Destination:</span>
                                <span className="text-slate-300 font-medium">
                                  {order.address}, {order.city}, {order.state} - {order.pincode}
                                </span>
                              </div>
                            </div>

                            {/* AI Explanation */}
                            <div>
                              <div className="text-[11px] font-medium text-slate-400 mb-1">
                                Merchant Audit Explanation:
                              </div>
                              <p className="text-xs text-slate-200 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-white/5">
                                {order.ai_reasons?.explanation || "Address evaluated consistent with delivery standard."}
                              </p>
                            </div>

                            {/* Flags & Rule Reasons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              {order.ai_reasons?.risk_flags && order.ai_reasons.risk_flags.length > 0 && (
                                <div>
                                  <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1.5">
                                    Risk Flags Identified:
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {order.ai_reasons.risk_flags.map((flag, idx) => (
                                      <span
                                        key={idx}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20"
                                      >
                                        {flag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {order.ai_reasons?.rule_reasons && order.ai_reasons.rule_reasons.length > 0 && (
                                <div>
                                  <div className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1.5">
                                    Rule Findings:
                                  </div>
                                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4">
                                    {order.ai_reasons.rule_reasons.map((reason, idx) => (
                                      <li key={idx}>{reason}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
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
