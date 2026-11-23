"use client";

import React from "react";
import { DEMO_PERSONAS } from "./catalogData";
import { TestPersona } from "@/types";
import { Zap, ShieldCheck, AlertTriangle, ShieldX, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonaBarProps {
  selectedPersonaId: string | null;
  onSelectPersona: (persona: TestPersona) => void;
}

export const PersonaBar: React.FC<PersonaBarProps> = ({
  selectedPersonaId,
  onSelectPersona,
}) => {
  const getIcon = (variant: "low" | "medium" | "high") => {
    switch (variant) {
      case "low":
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "high":
        return <ShieldX className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="w-full mb-8 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 shadow-[0_0_35px_rgba(168,85,247,0.15)] backdrop-blur-xl relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-br from-purple-600/15 via-pink-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
              ⚡ TRY LIVE DEMO SCENARIOS
              <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                1-CLICK AUTOFILL
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Select a persona to populate checkout, test AI risk detection, and trigger dynamic interventions.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5 self-end md:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Judges fast-track test panel</span>
        </div>
      </div>

      {/* 4 Clickable Persona Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DEMO_PERSONAS.map((persona) => {
          const isSelected = selectedPersonaId === persona.id;

          return (
            <button
              key={persona.id}
              type="button"
              suppressHydrationWarning
              onClick={() => onSelectPersona(persona)}
              className={cn(
                "group relative p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between",
                isSelected
                  ? "bg-white/[0.08] border-pink-400/80 shadow-[0_0_25px_rgba(217,70,239,0.35)] ring-1 ring-pink-400"
                  : "bg-white/[0.02] border-white/10 hover:border-purple-400/50 hover:bg-white/[0.05]"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {getIcon(persona.badgeVariant)}
                    {persona.title}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 line-clamp-1 mb-2">
                  {persona.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span
                  className={cn(
                    "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                    persona.badgeVariant === "low" && "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
                    persona.badgeVariant === "medium" && "bg-amber-500/20 text-amber-300 border border-amber-500/30",
                    persona.badgeVariant === "high" && "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  )}
                >
                  {persona.badge}
                </span>

                <span className="text-[10px] text-primary group-hover:underline font-medium">
                  {isSelected ? "Active ✓" : "Test Persona →"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
