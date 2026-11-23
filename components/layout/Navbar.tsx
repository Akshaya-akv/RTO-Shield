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
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07070A]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-[#00D4FF] p-[1.5px] shadow-[0_0_20px_rgba(217,70,239,0.35)] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0c0a14] rounded-[14px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-wider text-white">
                  RTO<span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">-SHIELD</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 tracking-wider">
                  AI DEFENSE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Stop Fake Orders. Save Real Revenue.</p>
            </div>
          </Link>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <Link
            href="/storefront"
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
              isStorefront
                ? "bg-white text-black font-bold shadow-lg shadow-white/10"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Storefront</span>
            <span className="md:hidden">Store</span>
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
              isDashboard
                ? "bg-white text-black font-bold shadow-lg shadow-white/10"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Merchant Command</span>
            <span className="md:hidden">Dashboard</span>
          </Link>
        </div>

        {/* Live Demo Status & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex flex-col text-right">
            <span className="text-[10px] font-mono text-purple-400 font-semibold">CODE TO CART · KARTAI '26</span>
            <span className="text-[9px] text-slate-400">Builder: Akshaya Mirudha M</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live AI Engine Active</span>
          </div>

          <button
            onClick={handleQuickReset}
            title="Reset Seeded Demo Data"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 bg-white/5 border border-white/10 hover:border-pink-500/50 hover:text-white transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
