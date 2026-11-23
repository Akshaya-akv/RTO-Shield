"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardHeader } from "@/components/dashboard/Header";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { ThresholdSlider } from "@/components/dashboard/ThresholdSlider";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { LiveRiskFeed } from "@/components/dashboard/LiveRiskFeed";
import { ResetDemoModal } from "@/components/dashboard/ResetDemoModal";
import { MerchantAnalytics, OrderRecord } from "@/types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<MerchantAnalytics | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Fetch Analytics & Orders
  const loadDashboardData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      // 1. Fetch Analytics KPI and charts
      const analyticsRes = await fetch("/api/analytics");
      if (analyticsRes.ok) {
        const analyticsData: MerchantAnalytics = await analyticsRes.json();
        setAnalytics(analyticsData);
      }

      // 2. Fetch Orders with active filter and search
      const queryParams = new URLSearchParams();
      if (activeFilter !== "ALL") queryParams.set("risk_level", activeFilter);
      if (searchQuery.trim()) queryParams.set("search", searchQuery.trim());

      const ordersRes = await fetch(`/api/orders?${queryParams.toString()}`);
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
      toast.error("Failed to load merchant telemetry");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleFilterChange = (level: string) => {
    setActiveFilter(level);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleThresholdChanged = (newThreshold: number) => {
    // Re-fetch analytics with updated threshold calculation
    loadDashboardData(true);
  };

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col font-sans">
      <Navbar onResetDemo={() => loadDashboardData(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <DashboardHeader
          onRefresh={() => loadDashboardData(true)}
          onOpenResetModal={() => setIsResetModalOpen(true)}
          isRefreshing={isRefreshing}
        />

        {isLoading && !analytics ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader2 className="w-6 h-6 text-bone animate-spin mb-3" strokeWidth={1.5} />
            <p className="text-xs font-mono text-greige uppercase tracking-[0.08em]">
              Connecting to Telemetry Engine...
            </p>
          </div>
        ) : analytics ? (
          <>
            {/* 4 Prominent KPI Cards */}
            <KpiCards kpis={analytics.kpi} />

            {/* Threshold Slider for Dynamic Policy Modulation */}
            <ThresholdSlider
              initialThreshold={analytics.active_threshold}
              onThresholdChanged={handleThresholdChanged}
            />

            {/* Recharts Analytics Charts */}
            <AnalyticsCharts
              riskDistribution={analytics.charts.risk_distribution}
              paymentConversion={analytics.charts.payment_conversion}
              activityTimeline={analytics.charts.activity_timeline}
            />

            {/* Live Risk Table */}
            <LiveRiskFeed
              orders={orders}
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
              onSearchChange={handleSearchChange}
              searchQuery={searchQuery}
            />
          </>
        ) : (
          <div className="py-12 text-center text-muted text-xs">
            Failed to connect to data service. Click Refresh to retry.
          </div>
        )}
      </main>

      {/* Reset Confirmation Modal */}
      <ResetDemoModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onResetComplete={() => loadDashboardData(true)}
      />
    </div>
  );
}
