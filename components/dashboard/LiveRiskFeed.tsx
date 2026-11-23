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
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {score} • LOW
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-400 tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {score} • MED
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/10 text-rose-400 tabular-nums">
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
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-white/10 bg-zinc-800 text-zinc-200">
            <CreditCard className="w-3 h-3 text-zinc-300" strokeWidth={1.5} />
            Prepaid Converted
          </span>
        );
      case "COD":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-white/[0.06] bg-zinc-900 text-zinc-400">
            <Truck className="w-3 h-3 text-zinc-400" strokeWidth={1.5} />
            Cash on Delivery
          </span>
        );
      case "UPI":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <CreditCard className="w-3 h-3 text-emerald-400" strokeWidth={1.5} />
            Direct UPI
          </span>
        );
      case "BLOCKED":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/10 text-rose-400">
            <Ban className="w-3 h-3 text-rose-400" strokeWidth={1.5} />
            Restricted / Blocked
          </span>
        );
      default:
        return <span className="text-xs text-zinc-400 font-mono">{method}</span>;
    }
  };

  return (
    <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 overflow-hidden mb-8">
      {/* Table Control Header */}
      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            Live Risk Feed & Order Telemetry
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Select any row to expand deterministic point deductions and Gemini deliverability audit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search buyer, phone, city..."
              className="bg-zinc-950 border border-white/[0.08] focus:border-white/20 rounded-md pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 w-full sm:w-52 transition-colors font-mono"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 rounded-md bg-zinc-950 border border-white/[0.08]">
            {["ALL", "LOW", "MEDIUM", "HIGH"].map((level) => (
              <button
                key={level}
                onClick={() => onFilterChange(level)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  activeFilter === level
                    ? "bg-zinc-100 text-zinc-950 font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
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
          <thead className="bg-zinc-950/60 text-zinc-400 font-mono text-[11px] border-b border-white/[0.06] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium">Cart Value</th>
              <th className="py-3 px-4 font-medium">Risk Score</th>
              <th className="py-3 px-4 font-medium">Fulfillment Status</th>
              <th className="py-3 px-4 font-medium">Intervention</th>
              <th className="py-3 px-4 font-medium">Timestamp</th>
              <th className="py-3 px-4 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-zinc-500 font-mono text-xs">
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
                      className="hover:bg-zinc-900/40 cursor-pointer transition-colors"
                    >
                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-zinc-200">{order.customer_name}</div>
                        <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1 mt-0.5 tabular-nums">
                          <Phone className="w-3 h-3 text-zinc-500" strokeWidth={1.5} />
                          <span>+91 {order.phone}</span>
                        </div>
                      </td>

                      {/* Cart Value */}
                      <td className="py-3.5 px-4 font-mono font-medium text-zinc-200 tabular-nums">
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
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {order.intervention_triggered ? (
                          <span className="text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded border border-white/[0.08]">
                            TRIGGERED
                          </span>
                        ) : (
                          <span className="text-zinc-600">NONE</span>
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px] tabular-nums">
                        {formatDate(order.created_at)}
                      </td>

                      {/* Expand Toggle */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          className="p-1 rounded text-zinc-400 hover:text-zinc-200"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-zinc-200" strokeWidth={1.5} />
                          ) : (
                            <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable AI Diagnostics Row */}
                    {isExpanded && (
                      <tr className="bg-zinc-950/80 border-b border-white/[0.08]">
                        <td colSpan={7} className="p-4 sm:p-5">
                          <div className="rounded-md border border-white/[0.06] bg-zinc-900/60 p-4 space-y-3 font-mono text-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
                              <span className="font-semibold text-zinc-200">
                                Diagnostic Telemetry Audit
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                                <MapPin className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
                                <span>{order.city}, {order.state} ({order.pincode})</span>
                              </div>
                            </div>

                            {/* Address & AI explanation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                                  Full Shipping Address
                                </span>
                                <p className="text-zinc-300 text-[11px] p-2.5 rounded bg-zinc-950/60 border border-white/[0.04]">
                                  {order.address}
                                </p>
                              </div>

                              <div>
                                <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                                  Gemini Address Deliverability Reasoning
                                </span>
                                <p className="text-zinc-300 text-[11px] p-2.5 rounded bg-zinc-950/60 border border-white/[0.04]">
                                  {order.ai_reasons?.explanation || "Address evaluated using standard postal heuristics."}
                                </p>
                              </div>
                            </div>

                            {/* Detected Risk Flags */}
                            {order.ai_reasons?.risk_flags && order.ai_reasons.risk_flags.length > 0 && (
                              <div className="pt-2 border-t border-white/[0.06]">
                                <span className="text-[10px] text-zinc-500 uppercase block mb-1.5">
                                  Detected Risk Flags
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {order.ai_reasons.risk_flags.map((flag, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[10px] px-2 py-0.5 rounded border border-white/[0.08] bg-zinc-950 text-zinc-300 font-mono"
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
