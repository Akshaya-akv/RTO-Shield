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
      <div className="rounded-2xl bg-secondary-bg/90 border border-card-border p-5 hover:border-primary/40 transition-all hover:shadow-cyan-glow relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Total Orders Analyzed</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
              {kpis.total_orders_analyzed}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Truck className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-muted">
          <span>Avg Risk: <strong className="text-white font-mono">{kpis.average_risk_score}/100</strong></span>
          <span className="text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 100% Live Telemetry
          </span>
        </div>
      </div>

      {/* 2. Prepaid Conversions */}
      <div className="rounded-2xl bg-secondary-bg/90 border border-card-border p-5 hover:border-secondary/40 transition-all hover:shadow-purple-glow relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">Prepaid Conversions</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
              {kpis.prepaid_conversions}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-muted">
          <span>Conversion Rate:</span>
          <span className="text-secondary font-bold font-mono">
            {kpis.conversion_rate_pct}% COD-to-UPI
          </span>
        </div>
      </div>

      {/* 3. High-Risk Orders */}
      <div className="rounded-2xl bg-secondary-bg/90 border border-card-border p-5 hover:border-rose-500/40 transition-all hover:shadow-danger-glow relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400">High-Risk Orders</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1 text-rose-400">
              {kpis.high_risk_orders}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-muted">
          <span>Medium Risk: <strong className="text-amber-400 font-mono">{kpis.medium_risk_orders}</strong></span>
          <span className="text-rose-400">Protected / Restricted</span>
        </div>
      </div>

      {/* 4. Estimated Shipping Saved */}
      <div className="rounded-2xl bg-secondary-bg/90 border border-card-border p-5 hover:border-emerald-500/40 transition-all hover:shadow-success-glow relative overflow-hidden group">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <span>Estimated Shipping Saved</span>
              <div className="group/tip relative cursor-help">
                <Info className="w-3 h-3 text-muted hover:text-white" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover/tip:block w-48 p-2 rounded-lg bg-[#080D1B] border border-card-border text-[10px] text-slate-300 shadow-xl z-20">
                  Calculated using ₹180 per prevented RTO (reverse courier logistics + packaging overhead). Estimate only.
                </div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1">
              {formatCurrency(kpis.estimated_shipping_saved)}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-muted">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
            @ ₹180 / Prevented RTO
          </span>
          <span className="text-emerald-400 font-medium">Estimated Saved</span>
        </div>
      </div>
    </div>
  );
};
