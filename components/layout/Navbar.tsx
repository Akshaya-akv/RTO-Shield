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
    <header className="sticky top-0 z-50 w-full surface-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo - Editorial Oxblood & Bone */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-surface border border-white/10 flex items-center justify-center text-bone group-hover:border-white/20 transition-colors">
              <ShieldAlert className="w-4 h-4 text-bone" strokeWidth={1.5} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-base tracking-tight text-bone lowercase">
                rto-shield
              </span>
              <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-greige">
                ™
              </span>
            </div>
          </Link>
        </div>

        {/* View Switcher Tabs - Tactile Segmented Control */}
        <div className="flex items-center p-1 rounded-lg bg-surface border border-white/10">
          <Link
            href="/storefront"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-colors duration-150 font-medium",
              isStorefront
                ? "bg-bone text-canvas shadow-sm"
                : "text-greige hover:text-bone"
            )}
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Storefront</span>
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-colors duration-150 font-medium",
              isDashboard
                ? "bg-bone text-canvas shadow-sm"
                : "text-greige hover:text-bone"
            )}
          >
            <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Merchant Command</span>
          </Link>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-wine/30 border border-wine/50 text-bone font-mono text-[11px] tracking-[0.04em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="uppercase text-[10px] tracking-[0.08em] text-greige">ACTIVE • SPEC-01</span>
          </div>

          <button
            onClick={handleQuickReset}
            title="Reset Seeded Demo Data"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-greige border border-white/10 bg-surface hover:text-bone hover:bg-surface-hover hover:border-white/20 transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-greige" strokeWidth={1.5} />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
