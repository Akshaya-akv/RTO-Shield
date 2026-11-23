"use client";

import React, { useEffect, useState } from "react";
import { RiskLevel } from "@/types";

interface RiskGaugeProps {
  score: number; // 0 to 100
  riskLevel: RiskLevel;
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, riskLevel, size = 180 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // SVG parameters
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Semi-circle gauge (240 deg arc)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * (animatedScore / 100));

  const getColor = () => {
    if (animatedScore >= 75) return { stroke: "#EF4444", text: "text-rose-400", glow: "rgba(239, 68, 68, 0.45)" };
    if (animatedScore >= 40) return { stroke: "#F59E0B", text: "text-amber-400", glow: "rgba(245, 158, 11, 0.45)" };
    return { stroke: "#22C55E", text: "text-emerald-400", glow: "rgba(34, 197, 94, 0.45)" };
  };

  const theme = getColor();

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[135deg] transform overflow-visible"
      >
        {/* Track Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        {/* Animated Risk Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.15s ease-out, stroke 0.2s ease",
          }}
        />
      </svg>

      {/* Center Score Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-2 font-mono">
        <span className="text-4xl font-bold tracking-tight text-zinc-100 tabular-nums">
          {animatedScore}
        </span>
        <span className="text-[10px] uppercase text-zinc-500 tracking-wider mt-0.5">
          / 100 RISK
        </span>
        <span
          className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded border mt-1.5 ${
            riskLevel === "HIGH"
              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
              : riskLevel === "MEDIUM"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          }`}
        >
          {riskLevel}
        </span>
      </div>
    </div>
  );
};
