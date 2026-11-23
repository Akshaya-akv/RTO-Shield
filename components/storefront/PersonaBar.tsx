"use client";

import React from "react";
import { DEMO_PERSONAS } from "./catalogData";
import { TestPersona } from "@/types";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
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
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2} />;
      case "medium":
        return <AlertTriangle className="w-3.5 h-3.5 text-peach" strokeWidth={2} />;
      case "high":
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" strokeWidth={2} />;
    }
  };

  return (
    <div className="w-full mb-8 p-5 sm:p-7 rounded-3xl glass-twilight shadow-glass">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="font-display text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span>Test Profiles & Persona Injection</span>
            <span className="text-[10px] font-mono text-peach bg-peach/20 px-2.5 py-0.5 rounded-full border border-peach/40 uppercase font-bold tracking-wider">
              1-CLICK AUTOFILL
            </span>
          </h3>
          <p className="font-sans text-xs text-twilight-muted mt-0.5">
            Select a customer profile to populate checkout, test AI risk detection, and trigger dynamic interventions.
          </p>
        </div>

        <div className="text-[11px] font-mono text-powder font-semibold self-end md:self-auto">
          Deterministic + Gemini NLP
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
                "group relative p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between",
                isSelected
                  ? "bg-white border-powder shadow-glass text-lavender-dark scale-[1.01]"
                  : "bg-white/10 border-white/15 text-twilight-muted hover:bg-white/15 hover:text-white"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={cn(
                    "text-xs font-bold flex items-center gap-1.5 font-display",
                    isSelected ? "text-lavender-dark" : "text-white"
                  )}>
                    {getIcon(persona.badgeVariant)}
                    {persona.title}
                  </span>
                </div>

                <p className={cn(
                  "text-[11px] line-clamp-1 mb-3 font-mono",
                  isSelected ? "text-lavender-muted" : "text-twilight-muted"
                )}>
                  {persona.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
                <span
                  className={cn(
                    "text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider",
                    persona.badgeVariant === "low" && "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
                    persona.badgeVariant === "medium" && "bg-peach/25 text-[#B34A29] border-peach/50",
                    persona.badgeVariant === "high" && "bg-rose-500/15 text-rose-600 border-rose-500/30"
                  )}
                >
                  {persona.badge}
                </span>

                <span className={cn(
                  "text-[10px] font-mono font-bold transition-colors",
                  isSelected ? "text-twilight-btn" : "text-twilight-muted group-hover:text-white"
                )}>
                  {isSelected ? "Active ✓" : "Select →"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
