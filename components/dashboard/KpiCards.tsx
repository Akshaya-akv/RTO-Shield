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
      <div className="rounded-xl border border-white/10 bg-surface p-5 flex flex-col justify-between hover:bg-surface-hover transition-colors shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-greige uppercase tracking-[0.08em]">
              Total Evaluated
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-bone mt-1">
              {kpis.total_orders_analyzed}
            </div>
          </div>
          <Truck className="w-5 h-5 text-greige" strokeWidth={1.5} />
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-greige font-mono">
          <span>Avg Score: <strong className="text-bone tabular-nums">{kpis.average_risk_score}/100</strong></span>
          <span className="text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" strokeWidth={1.5} /> Active
          </span>
        </div>
      </div>

      {/* 2. Prepaid Conversions */}
      <div className="rounded-xl border border-white/10 bg-surface p-5 flex flex-col justify-between hover:bg-surface-hover transition-colors shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-greige uppercase tracking-[0.08em]">
              Prepaid Converted
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-bone mt-1">
              {kpis.prepaid_conversions}
            </div>
          </div>
          <CreditCard className="w-5 h-5 text-greige" strokeWidth={1.5} />
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-greige font-mono">
          <span>Conversion Rate:</span>
          <span className="text-bone font-bold tabular-nums">
            {kpis.conversion_rate_pct}% COD-to-UPI
          </span>
        </div>
      </div>

      {/* 3. High-Risk Orders */}
      <div className="rounded-xl border border-white/10 bg-surface p-5 flex flex-col justify-between hover:bg-surface-hover transition-colors shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-greige uppercase tracking-[0.08em]">
              High-Risk Interventions
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-rose-400 mt-1">
              {kpis.high_risk_orders}
            </div>
          </div>
          <AlertTriangle className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-greige font-mono">
          <span>Medium Risk: <strong className="text-amber-400 tabular-nums">{kpis.medium_risk_orders}</strong></span>
          <span className="text-rose-400">Restricted</span>
        </div>
      </div>

      {/* 4. Estimated Shipping Saved */}
      <div className="rounded-xl border border-white/10 bg-surface p-5 flex flex-col justify-between hover:bg-surface-hover transition-colors shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-greige uppercase tracking-[0.08em]">
              <span>Estimated Shipping Saved</span>
              <div className="group/tip relative cursor-help">
                <Info className="w-3 h-3 text-greige/70 hover:text-bone" strokeWidth={1.5} />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover/tip:block w-48 p-2 rounded-lg bg-surface border border-white/10 text-[10px] text-greige shadow-xl z-20 font-sans normal-case">
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

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-greige font-mono">
          <span className="tabular-nums">@ ₹180 / Avoided RTO</span>
          <span className="text-emerald-400">Verified Saved</span>
        </div>
      </div>
    </div>
  );
};
