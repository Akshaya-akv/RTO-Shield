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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      {/* 1. Risk Distribution Chart */}
      <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-2">
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            <h3 className="text-xs font-semibold text-zinc-200">Risk Distribution</h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Order Volume</span>
        </div>

        <div className="h-52 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090B",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  color: "#EDEDEC",
                }}
              />
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-1 pt-3 border-t border-white/[0.06] text-center font-mono">
          {riskDistribution.map((item, idx) => (
            <div key={idx} className="p-1">
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name.split(" ")[0]}</span>
              </div>
              <div className="text-xs font-bold text-zinc-200 tabular-nums mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Payment Method Conversion */}
      <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            <h3 className="text-xs font-semibold text-zinc-200">Checkout Outcomes</h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Fulfillment</span>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentConversion} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "#71717A", fontSize: 10 }} interval={0} />
              <YAxis tick={{ fill: "#71717A", fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090B",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  color: "#EDEDEC",
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {paymentConversion.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-[11px] text-zinc-500 text-center pt-2 border-t border-white/[0.06]">
          Converting risky COD to digital prepaid eliminates return courier liability.
        </div>
      </div>

      {/* 3. Order Activity Timeline */}
      <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            <h3 className="text-xs font-semibold text-zinc-200">Daily Order Trajectory</h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">7-Day Run</span>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#71717A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#71717A" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="convertGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: "#71717A", fontSize: 10 }} />
              <YAxis tick={{ fill: "#71717A", fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090B",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  color: "#EDEDEC",
                }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#A1A1AA"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#orderGrad)"
                name="Total Orders"
              />
              <Area
                type="monotone"
                dataKey="conversions"
                stroke="#10B981"
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#convertGrad)"
                name="Prepaid Converted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center text-[11px] text-zinc-500 font-mono pt-2 border-t border-white/[0.06]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-zinc-400 rounded" /> Total Orders
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-500 rounded" /> Converted
          </span>
        </div>
      </div>
    </div>
  );
};
