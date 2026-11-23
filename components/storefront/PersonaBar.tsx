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
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />;
      case "medium":
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />;
      case "high":
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" strokeWidth={1.5} />;
    }
  };

  return (
    <div className="w-full mb-8 p-4 sm:p-5 rounded-xl border border-white/10 bg-surface shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.08em] text-bone flex items-center gap-2 lowercase">
            <span>test profiles & persona injection</span>
            <span className="text-[10px] font-mono text-bone bg-wine/30 px-2 py-0.5 rounded border border-wine/50 uppercase tracking-[0.08em]">
              1-CLICK AUTOFILL
            </span>
          </h3>
          <p className="font-sans text-xs text-greige mt-0.5">
            Select a customer profile to populate checkout, test AI risk detection, and trigger dynamic interventions.
          </p>
        </div>

        <div className="text-[11px] font-mono text-greige self-end md:self-auto">
          SPEC-01 • Deterministic + Gemini NLP
        </div>
      </div>

      {/* 4 Clickable Persona Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {DEMO_PERSONAS.map((persona) => {
          const isSelected = selectedPersonaId === persona.id;

          return (
            <button
              key={persona.id}
              type="button"
              suppressHydrationWarning
              onClick={() => onSelectPersona(persona)}
              className={cn(
                "group relative p-3 rounded-lg border text-left transition-colors duration-150 flex flex-col justify-between",
                isSelected
                  ? "bg-surface-hover border-bone/30 text-bone shadow-sm"
                  : "bg-canvas border-white/5 text-greige hover:text-bone hover:bg-surface-hover/50"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold text-bone flex items-center gap-1.5 font-display lowercase">
                    {getIcon(persona.badgeVariant)}
                    {persona.title}
                  </span>
                </div>

                <p className="text-[11px] text-greige line-clamp-1 mb-2 font-mono">
                  {persona.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span
                  className={cn(
                    "text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border uppercase tracking-wider",
                    persona.badgeVariant === "low" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    persona.badgeVariant === "medium" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    persona.badgeVariant === "high" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  )}
                >
                  {persona.badge}
                </span>

                <span className="text-[10px] font-mono text-greige group-hover:text-bone transition-colors">
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
