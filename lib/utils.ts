import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RiskLevel } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getRiskColor(level: RiskLevel): {
  text: string;
  bg: string;
  border: string;
  glow: string;
  badge: string;
} {
  switch (level) {
    case "LOW":
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      };
    case "MEDIUM":
      return {
        text: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
        badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      };
    case "HIGH":
      return {
        text: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        glow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
        badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      };
  }
}
