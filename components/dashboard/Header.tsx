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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[11px] font-mono uppercase bg-purple-500/10 text-purple-300 px-3 py-0.5 rounded-full border border-purple-500/30 font-semibold tracking-wider flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            LIVE TELEMETRY ACTIVE
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/5">
            <Store className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-slate-300 font-medium">Demo D2C Store</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          RTO-SHIELD <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent font-normal text-xl sm:text-2xl">| Merchant Command Center</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time AI order risk classification, COD to prepaid interventions, and prevented shipping loss analytics.
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/10">
          <Calendar className="w-3.5 h-3.5 text-purple-400" />
          <span>{today}</span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/10 text-slate-200 hover:text-white hover:border-purple-500/50 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-purple-400 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Sync</span>
        </button>

        <button
          onClick={onOpenResetModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-all"
        >
          <span>Reset Demo</span>
        </button>

        <Link
          href="/storefront"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-slate-200 transition-all shadow-lg shadow-white/10"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Launch Simulator</span>
        </Link>
      </div>
    </div>
  );
};
