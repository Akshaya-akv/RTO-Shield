"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import {
  TrendingUp,
  CreditCard,
  Truck,
  CheckCircle2,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {/* 1. Total Orders Analyzed */}
      <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Total Evaluated
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-zinc-100 mt-1">
              {kpis.total_orders_analyzed}
            </div>
          </div>
          <Truck className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span>Avg Score: <strong className="text-zinc-200 tabular-nums">{kpis.average_risk_score}/100</strong></span>
          <span className="text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" strokeWidth={1.5} /> Active
          </span>
        </div>
      </div>

      {/* 2. Prepaid Conversions */}
      <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Prepaid Converted
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-zinc-100 mt-1">
              {kpis.prepaid_conversions}
            </div>
          </div>
          <CreditCard className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span>Conversion Rate:</span>
          <span className="text-zinc-200 font-bold tabular-nums">
            {kpis.conversion_rate_pct}% COD-to-UPI
          </span>
        </div>
      </div>

      {/* 3. High-Risk Orders */}
      <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              High-Risk Interventions
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-rose-400 mt-1">
              {kpis.high_risk_orders}
            </div>
          </div>
          <AlertTriangle className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span>Medium Risk: <strong className="text-amber-400 tabular-nums">{kpis.medium_risk_orders}</strong></span>
          <span className="text-rose-400">Restricted</span>
        </div>
      </div>

      {/* 4. Estimated Shipping Saved */}
      <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <span>Estimated Shipping Saved</span>
              <div className="group/tip relative cursor-help">
                <Info className="w-3 h-3 text-zinc-500 hover:text-zinc-300" strokeWidth={1.5} />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover/tip:block w-48 p-2 rounded-lg bg-zinc-900 border border-white/10 text-[10px] text-zinc-300 shadow-xl z-20 font-sans normal-case">
                  Calculated using ₹180 per prevented RTO (reverse courier logistics + packaging overhead). Estimate only.
                </div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-emerald-400 mt-1">
              {formatCurrency(kpis.estimated_shipping_saved)}
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span className="tabular-nums">@ ₹180 / Avoided RTO</span>
          <span className="text-emerald-400">Verified Saved</span>
        </div>
      </div>
    </div>
  );
};
