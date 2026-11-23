"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, ShoppingBag, LayoutDashboard, RefreshCw, Sparkles, ArrowRight } from "lucide-react";
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
    <header className="sticky top-3 sm:top-5 z-50 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="pill-glass rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between text-lavender-dark shadow-glass transition-all">
        {/* Brand Logo - Floating Pill Button */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-twilight-btn group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4 text-[#26244C]" strokeWidth={2} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-lavender-dark">
                RTO-SHIELD
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-peach/30 text-peach-dark font-semibold border border-peach/50">
                AI Defense
              </span>
            </div>
          </Link>
        </div>

        {/* View Switcher Tabs - Frosted Pill Control */}
        <div className="flex items-center p-1 rounded-full bg-white/70 border border-white/80 shadow-inner">
          <Link
            href="/storefront"
            className={cn(
              "flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs transition-all duration-200 font-semibold",
              isStorefront
                ? "bg-twilight-btn text-white shadow-sm"
                : "text-lavender-muted hover:text-lavender-dark"
            )}
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.8} />
            <span className="hidden sm:inline">Storefront</span>
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs transition-all duration-200 font-semibold",
              isDashboard
                ? "bg-twilight-btn text-white shadow-sm"
                : "text-lavender-muted hover:text-lavender-dark"
            )}
          >
            <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.8} />
            <span className="hidden sm:inline">Merchant Command</span>
          </Link>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-powder/25 border border-powder/40 text-lavender-dark font-mono text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-semibold text-[#1E254A]">Engine Active</span>
          </div>

          <button
            onClick={handleQuickReset}
            title="Reset Seeded Demo Data"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-lavender-dark bg-white/80 hover:bg-white border border-white/90 shadow-sm transition-all"
          >
            <RefreshCw className="w-3 h-3 text-peach-dark" strokeWidth={2} />
            <span className="hidden md:inline">Reset Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};
