"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, ShoppingBag, LayoutDashboard, Sparkles, RefreshCw } from "lucide-react";
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
        toast.success("Demo data reset to initial state!");
        if (onResetDemo) onResetDemo();
        else window.location.reload();
      }
    } catch {
      toast.error("Failed to reset demo data");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-card-border bg-[#080D1B]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-[#00D4FF] p-[1.5px] shadow-cyan-glow transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#080D1B] rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-wider text-white">
                  RTO<span className="text-primary">-SHIELD</span>
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 tracking-wider">
                  AI DEFENSE
                </span>
              </div>
              <p className="text-[11px] text-muted hidden sm:block">Stop Fake Orders. Save Real Revenue.</p>
            </div>
          </Link>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-secondary-bg/90 border border-card-border">
          <Link
            href="/storefront"
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              isStorefront
                ? "bg-primary text-[#080D1B] font-semibold shadow-cyan-glow"
                : "text-muted hover:text-white hover:bg-white/5"
            )}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden md:inline">Storefront</span>
            <span className="md:hidden">Store</span>
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              isDashboard
                ? "bg-primary text-[#080D1B] font-semibold shadow-cyan-glow"
                : "text-muted hover:text-white hover:bg-white/5"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden md:inline">Merchant Command</span>
            <span className="md:hidden">Dashboard</span>
          </Link>
        </div>

        {/* Live Demo Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex flex-col text-right">
            <span className="text-[10px] font-mono text-primary font-semibold">CODE TO CART · KARTAI '26</span>
            <span className="text-[9px] text-muted">Builder: Akshaya Mirudha M</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live AI Engine Active</span>
          </div>

          <button
            onClick={handleQuickReset}
            title="Reset Seeded Demo Data"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-secondary-bg/80 border border-card-border hover:border-primary/50 hover:text-white transition-all hover:shadow-cyan-glow"
          >
            <RefreshCw className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
