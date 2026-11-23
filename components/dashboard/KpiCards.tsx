"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import {
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Truck,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  Info,
} from "lucide-react";

interface KpiCardsProps {
  kpis: {
    total_orders_analyzed: number;
    prepaid_conversions: number;
    high_risk_orders: number;
    medium_risk_orders: number;
    low_risk_orders: number;
    estimated_shipping_saved: number;
    conversion_rate_pct: number;
    average_risk_score: number;
  };
}

export const KpiCards: React.FC<KpiCardsProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Total Orders Analyzed */}
      <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all backdrop-blur-xl shadow-xl relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Total Orders Analyzed</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              {kpis.total_orders_analyzed}
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Avg Risk: <strong className="text-white font-mono">{kpis.average_risk_score}/100</strong></span>
          <span className="text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 100% Live Telemetry
          </span>
        </div>
      </div>

      {/* 2. Prepaid Conversions */}
      <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.06] hover:border-purple-500/30 transition-all backdrop-blur-xl shadow-xl relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Prepaid Conversions</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              {kpis.prepaid_conversions}
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Conversion Rate:</span>
          <span className="text-purple-300 font-bold font-mono">
            {kpis.conversion_rate_pct}% COD-to-UPI
          </span>
        </div>
      </div>

      {/* 3. High-Risk Orders */}
      <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.06] hover:border-rose-500/30 transition-all backdrop-blur-xl shadow-xl relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">High-Risk Orders</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 text-rose-400">
              {kpis.high_risk_orders}
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Medium Risk: <strong className="text-amber-400 font-mono">{kpis.medium_risk_orders}</strong></span>
          <span className="text-rose-400">Protected / Restricted</span>
        </div>
      </div>

      {/* 4. Estimated Shipping Saved */}
      <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all backdrop-blur-xl shadow-xl relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <span>Estimated Shipping Saved</span>
              <div className="group/tip relative cursor-help">
                <Info className="w-3 h-3 text-slate-400 hover:text-white" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover/tip:block w-48 p-2 rounded-xl bg-[#0c0a14] border border-white/10 text-[10px] text-slate-300 shadow-xl z-20">
                  Calculated using ₹180 per prevented RTO (reverse courier logistics + packaging overhead). Estimate only.
                </div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
              {formatCurrency(kpis.estimated_shipping_saved)}
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(34,197,94,0.25)]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
            @ ₹180 / Prevented RTO
          </span>
          <span className="text-emerald-400 font-medium">Estimated Saved</span>
        </div>
      </div>
    </div>
  );
};
