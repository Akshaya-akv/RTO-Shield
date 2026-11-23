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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Total Orders Analyzed */}
      <div className="rounded-3xl glass-twilight p-6 flex flex-col justify-between transition-all hover:scale-[1.02]">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-powder uppercase tracking-wider font-semibold">
              Total Evaluated
            </span>
            <div className="text-3xl font-extrabold font-mono tabular-nums text-white mt-1.5">
              {kpis.total_orders_analyzed}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-powder">
            <Truck className="w-5 h-5 text-powder" strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-twilight-muted font-mono">
          <span>Avg Score: <strong className="text-white tabular-nums">{kpis.average_risk_score}/100</strong></span>
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} /> Active
          </span>
        </div>
      </div>

      {/* 2. Prepaid Conversions */}
      <div className="rounded-3xl glass-twilight p-6 flex flex-col justify-between transition-all hover:scale-[1.02]">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-powder uppercase tracking-wider font-semibold">
              Prepaid Converted
            </span>
            <div className="text-3xl font-extrabold font-mono tabular-nums text-powder mt-1.5">
              {kpis.prepaid_conversions}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-powder">
            <CreditCard className="w-5 h-5 text-powder" strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-twilight-muted font-mono">
          <span>Conversion Rate:</span>
          <span className="text-powder font-bold tabular-nums">
            {kpis.conversion_rate_pct}% COD-to-UPI
          </span>
        </div>
      </div>

      {/* 3. High-Risk Orders */}
      <div className="rounded-3xl glass-twilight p-6 flex flex-col justify-between transition-all hover:scale-[1.02]">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono text-peach uppercase tracking-wider font-semibold">
              High-Risk Interventions
            </span>
            <div className="text-3xl font-extrabold font-mono tabular-nums text-peach mt-1.5">
              {kpis.high_risk_orders}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-peach/15 flex items-center justify-center text-peach">
            <AlertTriangle className="w-5 h-5 text-peach" strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-twilight-muted font-mono">
          <span>Breakdown:</span>
          <span className="text-white tabular-nums">
            {kpis.medium_risk_orders} Med • {kpis.low_risk_orders} Low
          </span>
        </div>
      </div>

      {/* 4. Estimated Shipping Saved */}
      <div className="rounded-3xl glass-twilight p-6 flex flex-col justify-between transition-all hover:scale-[1.02]">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              <span>Logistics Savings</span>
              <div className="group/tip relative cursor-help">
                <Info className="w-3.5 h-3.5 text-white/50 hover:text-white" strokeWidth={1.8} />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tip:block w-48 p-3 rounded-2xl glass-lavender text-[10px] text-lavender-dark shadow-xl z-20 font-sans normal-case">
                  Calculated using ₹180 per prevented RTO (reverse courier logistics + packaging overhead).
                </div>
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-400 mt-1.5">
              {formatCurrency(kpis.estimated_shipping_saved)}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-twilight-muted font-mono">
          <span className="tabular-nums">@ ₹180 / Avoided RTO</span>
          <span className="text-emerald-400 font-bold">Verified Saved</span>
        </div>
      </div>
    </div>
  );
};
