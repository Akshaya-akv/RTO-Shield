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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-2 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-wine/30 text-bone border border-wine/50 text-[10px] uppercase tracking-[0.08em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            LIVE TELEMETRY
          </span>
          <div className="flex items-center gap-1.5 text-greige px-2.5 py-0.5 rounded border border-white/10 bg-surface font-mono text-[11px]">
            <Store className="w-3 h-3 text-greige" strokeWidth={1.5} />
            <span>demo-store.d2c</span>
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl font-bold text-bone tracking-[-0.03em] leading-[1.05] lowercase">
          merchant command center
        </h1>
        <p className="font-sans text-xs sm:text-sm text-greige mt-1 max-w-[65ch]">
          Real-time order risk evaluation, COD-to-prepaid conversion telemetry, and avoided courier loss analytics.
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-2.5 font-mono">
        <div className="flex items-center gap-1.5 text-xs text-greige bg-surface px-3 py-1.5 rounded-lg border border-white/10 tabular-nums">
          <Calendar className="w-3.5 h-3.5 text-greige" strokeWidth={1.5} />
          <span>{today}</span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-white/10 text-bone hover:bg-surface-hover hover:border-white/20 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-greige ${isRefreshing ? "animate-spin" : ""}`} strokeWidth={1.5} />
          <span>Sync</span>
        </button>

        <button
          onClick={onOpenResetModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-wine/50 bg-wine/25 text-bone hover:bg-wine/40 transition-colors"
        >
          <span>Reset Demo</span>
        </button>

        <Link
          href="/storefront"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-bone text-canvas hover:bg-bone-hover transition-colors font-sans"
        >
          <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Open Storefront</span>
        </Link>
      </div>
    </div>
  );
};
