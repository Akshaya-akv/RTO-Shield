"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, ShoppingBag, LayoutDashboard, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NavbarProps {
  onResetDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onResetDemo }) => {
  const pathname = usePathname();
  const isStorefront = pathname === "/storefront" || pathname === "/";
  const isDashboard = pathname === "/dashboard";

  const handleQuickReset = async () => {
    try {
      const res = await fetch("/api/demo/reset", { method: "POST" });
      if (res.ok) {
        toast.success("Demo data reset to initial state");
        if (onResetDemo) onResetDemo();
        else window.location.reload();
      }
    } catch {
      toast.error("Failed to reset demo data");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-100 group-hover:border-white/20 transition-colors">
              <ShieldAlert className="w-4 h-4 text-zinc-200" strokeWidth={1.5} />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-zinc-100">
                RTO-SHIELD
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-white/[0.08] bg-zinc-900 text-zinc-400">
                v1.0
              </span>
            </div>
          </Link>
        </div>

        {/* View Switcher Tabs - Clean Segmented Control */}
        <div className="flex items-center p-1 rounded-lg bg-zinc-900/60 border border-white/[0.08]">
          <Link
            href="/storefront"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-colors duration-150",
              isStorefront
                ? "bg-zinc-100 text-zinc-950 font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Storefront</span>
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-colors duration-150",
              isDashboard
                ? "bg-zinc-100 text-zinc-950 font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Merchant Command</span>
          </Link>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Engine Active</span>
          </div>

          <button
            onClick={handleQuickReset}
            title="Reset Seeded Demo Data"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-zinc-300 border border-white/[0.08] bg-zinc-900/40 hover:text-zinc-100 hover:bg-zinc-900 hover:border-white/20 transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-zinc-400" strokeWidth={1.5} />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
