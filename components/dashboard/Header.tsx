"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldAlert, ShoppingBag, RefreshCw, Calendar, Store } from "lucide-react";

interface HeaderProps {
  onRefresh: () => void;
  onOpenResetModal: () => void;
  isRefreshing: boolean;
}

export const DashboardHeader: React.FC<HeaderProps> = ({
  onRefresh,
  onOpenResetModal,
  isRefreshing,
}) => {
  const [today, setToday] = useState("Today");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-card-border mb-8">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-[11px] font-mono uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-full border border-primary/30 font-semibold tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            LIVE TELEMETRY ACTIVE
          </span>
          <div className="flex items-center gap-1 text-xs text-muted">
            <Store className="w-3.5 h-3.5 text-primary" />
            <span className="text-slate-300 font-medium">Demo D2C Store</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          RTO-SHIELD <span className="text-primary font-normal text-xl sm:text-2xl">| Merchant Command Center</span>
        </h1>
        <p className="text-xs text-muted mt-1">
          Real-time AI order risk classification, COD to prepaid interventions, and prevented shipping loss analytics.
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-secondary-bg px-3 py-1.5 rounded-lg border border-card-border">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{today}</span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary-bg border border-card-border text-slate-200 hover:text-white hover:border-primary/50 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-primary ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>

        <button
          onClick={onOpenResetModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-all"
        >
          <span>Reset Demo</span>
        </button>

        <Link
          href="/storefront"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-primary text-[#080D1B] hover:opacity-90 transition-all shadow-cyan-glow"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Launch Storefront</span>
        </Link>
      </div>
    </div>
  );
};
