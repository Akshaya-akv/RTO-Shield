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
    if (animatedScore >= 75) return { stroke: "#F43F5E", text: "text-rose-500", bg: "bg-rose-500/15 border-rose-500/30 text-rose-600" };
    if (animatedScore >= 40) return { stroke: "#F5B69E", text: "text-peach-dark", bg: "bg-peach/25 border-peach/50 text-[#8B4528]" };
    return { stroke: "#10B981", text: "text-emerald-600", bg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700" };
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
          stroke="rgba(25, 26, 54, 0.12)"
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
        <span className="text-4xl font-black tracking-tight text-lavender-dark tabular-nums font-display">
          {animatedScore}
        </span>
        <span className="text-[10px] uppercase text-lavender-muted tracking-[0.08em] font-semibold mt-0.5">
          / 100 RISK
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.08em] px-2.5 py-0.5 rounded-full border mt-1.5 ${theme.bg}`}
        >
          {riskLevel}
        </span>
      </div>
    </div>
  );
};
