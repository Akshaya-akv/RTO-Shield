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
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-powder/25 text-white border border-powder/50 text-[10px] uppercase tracking-wider font-bold">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            LIVE TELEMETRY
          </span>
          <div className="flex items-center gap-1.5 text-lavender px-3 py-1 rounded-full border border-white/15 bg-white/10 font-mono text-[11px]">
            <Store className="w-3.5 h-3.5 text-peach" strokeWidth={2} />
            <span>demo-store.d2c</span>
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Merchant Command Center
        </h1>
        <p className="font-sans text-xs sm:text-sm text-twilight-muted mt-1 max-w-[65ch]">
          Real-time order risk evaluation, COD-to-prepaid conversion telemetry, and avoided courier loss analytics.
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-2.5 font-mono">
        <div className="flex items-center gap-1.5 text-xs text-lavender bg-white/10 px-3.5 py-2 rounded-full border border-white/15 tabular-nums">
          <Calendar className="w-3.5 h-3.5 text-powder" strokeWidth={2} />
          <span>{today}</span>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-powder ${isRefreshing ? "animate-spin" : ""}`} strokeWidth={2} />
          <span>Sync</span>
        </button>

        <button
          onClick={onOpenResetModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-peach/50 bg-peach/15 text-peach hover:bg-peach/25 transition-all"
        >
          <span>Reset Demo</span>
        </button>

        <Link
          href="/storefront"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-peach hover:bg-peach-light text-lavender-dark transition-all font-sans shadow-peach-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-lavender-dark" strokeWidth={2} />
          <span>Open Storefront</span>
        </Link>
      </div>
    </div>
  );
};
