import { NextRequest, NextResponse } from "next/server";
import { fetchAllOrders, getActiveRiskThreshold, updateActiveRiskThreshold } from "@/lib/supabase/server";
import { MerchantAnalytics } from "@/types";
import { UpdateSettingsRequestSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const orders = await fetchAllOrders();
    const activeThreshold = await getActiveRiskThreshold();

    // 1. Calculate KPI Metrics
    const total_orders_analyzed = orders.length;

    // Prepaid conversions: orders initially intended as COD that were converted to PREPAID_CONVERTED
    const prepaid_conversions = orders.filter(
      (o) => o.final_payment_method === "PREPAID_CONVERTED"
    ).length;

    // High risk count based on risk_score >= activeThreshold
    const high_risk_orders = orders.filter((o) => o.risk_score >= activeThreshold).length;
    const medium_risk_orders = orders.filter(
      (o) => o.risk_score >= 40 && o.risk_score < activeThreshold
    ).length;
    const low_risk_orders = orders.filter((o) => o.risk_score < 40).length;

    // Estimated Shipping Saved:
    // Prompt specification:
    // "Calculate using ₹180 per successfully prevented RTO. Clearly label this as an estimate, not actual realized revenue.
    // A converted high-risk order contributes an estimated ₹180 avoided shipping cost.
    // A blocked high-risk order contributes only when the simulation explicitly records it as a prevented shipment.
    // Do not double-count orders."
    const preventedRtoOrders = orders.filter(
      (o) =>
        (o.final_payment_method === "PREPAID_CONVERTED" && o.risk_score >= 40) ||
        (o.final_payment_method === "BLOCKED" && o.risk_score >= activeThreshold)
    );
    const estimated_shipping_saved = preventedRtoOrders.length * 180;

    const conversion_rate_pct =
      total_orders_analyzed > 0
        ? Math.round((prepaid_conversions / total_orders_analyzed) * 100)
        : 0;

    const average_risk_score =
      total_orders_analyzed > 0
        ? Math.round(
            orders.reduce((acc, curr) => acc + curr.risk_score, 0) / total_orders_analyzed
          )
        : 0;

    // 2. Risk Distribution Chart Data
    const risk_distribution = [
      { name: "Low Risk (<40)", value: low_risk_orders, color: "#22C55E" },
      { name: "Medium Risk (40-74)", value: medium_risk_orders, color: "#F59E0B" },
      { name: "High Risk (≥75)", value: high_risk_orders, color: "#EF4444" },
    ];

    // 3. Payment Method Distribution
    const codCount = orders.filter((o) => o.final_payment_method === "COD").length;
    const upiDirectCount = orders.filter((o) => o.final_payment_method === "UPI").length;
    const convertedCount = prepaid_conversions;
    const blockedCount = orders.filter((o) => o.final_payment_method === "BLOCKED").length;

    const payment_conversion = [
      { name: "Cash on Delivery", count: codCount, fill: "#00D4FF" },
      { name: "Prepaid Converted", count: convertedCount, fill: "#7667FF" },
      { name: "Direct UPI", count: upiDirectCount, fill: "#22C55E" },
      { name: "Blocked / Protected", count: blockedCount, fill: "#EF4444" },
    ];

    // 4. Timeline aggregation (grouped by day)
    const timelineMap: Record<string, { orders: number; high_risk: number; conversions: number }> = {};

    orders.forEach((o) => {
      const dateKey = new Date(o.created_at).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      });
      if (!timelineMap[dateKey]) {
        timelineMap[dateKey] = { orders: 0, high_risk: 0, conversions: 0 };
      }
      timelineMap[dateKey].orders += 1;
      if (o.risk_score >= activeThreshold) {
        timelineMap[dateKey].high_risk += 1;
      }
      if (o.final_payment_method === "PREPAID_CONVERTED") {
        timelineMap[dateKey].conversions += 1;
      }
    });

    const activity_timeline = Object.keys(timelineMap)
      .reverse()
      .slice(-7)
      .map((date) => ({
        date,
        orders: timelineMap[date].orders,
        high_risk: timelineMap[date].high_risk,
        conversions: timelineMap[date].conversions,
      }));

    const responseData: MerchantAnalytics = {
      kpi: {
        total_orders_analyzed,
        prepaid_conversions,
        high_risk_orders,
        medium_risk_orders,
        low_risk_orders,
        estimated_shipping_saved,
        conversion_rate_pct,
        average_risk_score,
      },
      charts: {
        risk_distribution,
        payment_conversion,
        activity_timeline: activity_timeline.length > 0 ? activity_timeline : [
          { date: "Today", orders: total_orders_analyzed, high_risk: high_risk_orders, conversions: prepaid_conversions }
        ],
      },
      recent_orders: orders.slice(0, 15),
      active_threshold: activeThreshold,
    };

    return NextResponse.json(responseData);
  } catch (err: any) {
    console.error("Analytics fetch error:", err);
    return NextResponse.json(
      { error: "Failed to generate analytics", message: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = UpdateSettingsRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid settings payload", details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const newThreshold = await updateActiveRiskThreshold(validated.data.highRiskThreshold);

    return NextResponse.json({
      success: true,
      high_risk_threshold: newThreshold,
      message: `Risk intervention threshold successfully adjusted to ${newThreshold}`,
    });
  } catch (err: any) {
    console.error("Update threshold error:", err);
    return NextResponse.json(
      { error: "Failed to update risk threshold", message: err.message },
      { status: 500 }
    );
  }
}
