"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, ShoppingBag, LayoutDashboard, RefreshCw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NavbarProps {
  onResetDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onResetDemo }) => {
  const pathname = usePathname();
  const isStorefront = pathname === "/storefront";
  const isDashboard = pathname === "/dashboard";
  const isHome = pathname === "/";

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
    <div className="w-full">
      {/* Top Announcement Bar (Matching Reference Layout) */}
      <div className="bg-[#0D0F22] border-b border-white/10 py-2 px-4 text-center">
        <Link
          href="/storefront"
          className="inline-flex items-center gap-2 text-[11px] font-sans text-lavender/90 hover:text-white transition-colors group"
        >
          <span className="px-2 py-0.5 rounded-full bg-peach text-lavender-dark font-mono font-bold text-[9px] uppercase tracking-wider">
            NEW
          </span>
          <span className="font-medium">
            Autonomous Delivery Load & Risk Protection is Live! Explore simulator
          </span>
          <ArrowRight className="w-3 h-3 text-peach group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
        </Link>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#11142B]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-16 sm:h-18 flex items-center justify-between text-lavender-dark">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-peach shadow-peach-sm flex items-center justify-center text-lavender-dark group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-4 h-4 text-lavender-dark" strokeWidth={2.2} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white">
                  rto-shield
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-powder/20 text-powder font-bold border border-powder/30">
                  AI NODE
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 font-sans">
            <Link
              href="/"
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors",
                isHome ? "text-white bg-white/10" : "text-lavender/80 hover:text-white hover:bg-white/5"
              )}
            >
              Overview
            </Link>

            <Link
              href="/storefront"
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
                isStorefront ? "text-white bg-white/10" : "text-lavender/80 hover:text-white hover:bg-white/5"
              )}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-peach" strokeWidth={1.8} />
              <span>Storefront</span>
            </Link>

            <Link
              href="/dashboard"
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
                isDashboard ? "text-white bg-white/10" : "text-lavender/80 hover:text-white hover:bg-white/5"
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-powder" strokeWidth={1.8} />
              <span>Merchant Command</span>
            </Link>

            <a
              href="#risk-console"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-lavender/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              Risk Console
            </a>

            <a
              href="#architecture"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-lavender/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              Architecture
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleQuickReset}
              title="Reset Seeded Demo Data"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-twilight-muted hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <RefreshCw className="w-3 h-3 text-peach" strokeWidth={1.8} />
              <span className="hidden sm:inline">Reset Data</span>
            </button>

            <Link
              href="/storefront"
              className="px-4 py-2 rounded-full text-xs font-bold bg-peach hover:bg-peach-light text-lavender-dark shadow-peach-sm transition-all active:scale-[0.98] flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};
