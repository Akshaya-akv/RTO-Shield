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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* 1. Risk Distribution Chart */}
      <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-5 flex flex-col justify-between backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-2">
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Risk Distribution</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Evaluated Orders</span>
        </div>

        <div className="h-56 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0c0a14",
                  borderColor: "rgba(168, 85, 247, 0.3)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-center">
          {riskDistribution.map((item, idx) => (
            <div key={idx} className="p-1 rounded bg-[#0b1322]">
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name.split(" ")[0]}</span>
              </div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Payment Method Conversion */}
      <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-5 flex flex-col justify-between backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-pink-400" />
            <h3 className="text-sm font-bold text-white">Checkout Outcomes</h3>
          </div>
          <span className="text-[10px] font-mono text-purple-300 uppercase">Conversion Engine</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentConversion} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} interval={0} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0c0a14",
                  borderColor: "rgba(217, 70, 239, 0.3)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#fff",
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

        <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-white/5">
          High-risk COD converted to prepaid eliminates forward/reverse logistics loss.
        </div>
      </div>

      {/* 3. Order Activity Timeline */}
      <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-5 flex flex-col justify-between backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Order Telemetry Trend</h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase">7-Day Trajectory</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="convertGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D946EF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D946EF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0c0a14",
                  borderColor: "rgba(168, 85, 247, 0.3)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#A855F7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#orderGrad)"
                name="Total Orders"
              />
              <Area
                type="monotone"
                dataKey="conversions"
                stroke="#D946EF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#convertGrad)"
                name="Prepaid Converted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-400 pt-2 border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-purple-400 rounded" /> Orders
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-pink-400 rounded" /> Converted
          </span>
        </div>
      </div>
    </div>
  );
};
