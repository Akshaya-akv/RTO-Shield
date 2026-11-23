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
    <div className="w-full mb-8 p-4 sm:p-5 rounded-lg border border-white/[0.08] bg-zinc-900/30">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
            <span>Test Profiles & Persona Injection</span>
            <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-white/[0.06]">
              1-CLICK AUTOFILL
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Select a customer profile to populate checkout, test AI risk detection, and trigger dynamic interventions.
          </p>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 self-end md:self-auto">
          Deterministic + Gemini NLP
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
                "group relative p-3 rounded-md border text-left transition-colors duration-150 flex flex-col justify-between",
                isSelected
                  ? "bg-zinc-800/80 border-white/25 text-zinc-100"
                  : "bg-zinc-950/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                    {getIcon(persona.badgeVariant)}
                    {persona.title}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-1 mb-2 font-mono">
                  {persona.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <span
                  className={cn(
                    "text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border uppercase",
                    persona.badgeVariant === "low" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    persona.badgeVariant === "medium" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    persona.badgeVariant === "high" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  )}
                >
                  {persona.badge}
                </span>

                <span className="text-[10px] font-mono text-zinc-300">
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
