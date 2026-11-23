"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, RefreshCw, Calendar, Store } from "lucide-react";

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
        <div className="flex items-center gap-2 mb-2 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            LIVE TELEMETRY
          </span>
          <div className="flex items-center gap-1 text-zinc-400 px-2 py-0.5 rounded border border-white/[0.06] bg-zinc-900/40">
            <Store className="w-3 h-3 text-zinc-400" strokeWidth={1.5} />
            <span>Demo Store</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
          Merchant Command Center
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-[65ch]">
          Real-time order risk evaluation, COD-to-prepaid conversion telemetry, and avoided courier loss analytics.
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/40 px-3 py-1.5 rounded-lg border border-white/[0.08] font-mono tabular-nums">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
          <span>{today}</span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900/40 border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-white/20 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-zinc-400 ${isRefreshing ? "animate-spin" : ""}`} strokeWidth={1.5} />
          <span>Sync</span>
        </button>

        <button
          onClick={onOpenResetModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-rose-500/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
        >
          <span>Reset Demo</span>
        </button>

        <Link
          href="/storefront"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Open Storefront</span>
        </Link>
      </div>
    </div>
  );
};
