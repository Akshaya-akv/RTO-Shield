"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { PieChart as PieIcon, BarChart3, TrendingUp } from "lucide-react";

interface AnalyticsChartsProps {
  riskDistribution: { name: string; value: number; color: string }[];
  paymentConversion: { name: string; count: number; fill: string }[];
  activityTimeline: { date: string; orders: number; high_risk: number; conversions: number }[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  riskDistribution,
  paymentConversion,
  activityTimeline,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
      {/* 1. Risk Distribution Chart */}
      <div className="rounded-3xl glass-twilight p-6 flex flex-col justify-between shadow-glass">
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-2">
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-powder" strokeWidth={2} />
            <h3 className="font-display text-sm font-bold text-white">Risk Distribution</h3>
          </div>
          <span className="text-[10px] font-mono text-twilight-muted uppercase tracking-wider font-semibold">Volume</span>
        </div>

        <div className="h-52 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#191D3C",
                  borderColor: "rgba(141, 185, 240, 0.3)",
                  borderRadius: "16px",
                  fontSize: "11px",
                  color: "#F3F4FD",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              />
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-1 pt-3.5 border-t border-white/10 text-center font-mono">
          {riskDistribution.map((item, idx) => (
            <div key={idx} className="p-1">
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-twilight-muted">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name.split(" ")[0]}</span>
              </div>
              <div className="text-xs font-extrabold text-white tabular-nums mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Payment Method Conversion */}
      <div className="rounded-3xl glass-twilight p-6 flex flex-col justify-between shadow-glass">
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-peach" strokeWidth={2} />
            <h3 className="font-display text-sm font-bold text-white">Checkout Outcomes</h3>
          </div>
          <span className="text-[10px] font-mono text-twilight-muted uppercase tracking-wider font-semibold">Fulfillment</span>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentConversion} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: "#8C92B5", fontSize: 10 }} interval={0} />
              <YAxis tick={{ fill: "#8C92B5", fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#191D3C",
                  borderColor: "rgba(141, 185, 240, 0.3)",
                  borderRadius: "16px",
                  fontSize: "11px",
                  color: "#F3F4FD",
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {paymentConversion.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-[11px] text-twilight-muted text-center pt-2.5 border-t border-white/10 font-sans">
          Converting risky COD to digital prepaid eliminates return courier liability.
        </div>
      </div>

      {/* 3. Order Activity Timeline */}
      <div className="rounded-3xl glass-twilight p-6 flex flex-col justify-between shadow-glass">
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" strokeWidth={2} />
            <h3 className="font-display text-sm font-bold text-white">Daily Trajectory</h3>
          </div>
          <span className="text-[10px] font-mono text-twilight-muted uppercase tracking-wider font-semibold">7-Day Run</span>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8DB9F0" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#8DB9F0" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="convertGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5B69E" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F5B69E" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" tick={{ fill: "#8C92B5", fontSize: 10 }} />
              <YAxis tick={{ fill: "#8C92B5", fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#191D3C",
                  borderColor: "rgba(141, 185, 240, 0.3)",
                  borderRadius: "16px",
                  fontSize: "11px",
                  color: "#F3F4FD",
                }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#8DB9F0"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#orderGrad)"
                name="Total Orders"
              />
              <Area
                type="monotone"
                dataKey="conversions"
                stroke="#F5B69E"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#convertGrad)"
                name="Prepaid Converted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center text-[11px] text-twilight-muted font-mono pt-2.5 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-powder rounded-full" /> Total Orders
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-peach rounded-full" /> Converted
          </span>
        </div>
      </div>
    </div>
  );
};
