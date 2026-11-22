import { NextRequest, NextResponse } from "next/server";
import { EvaluateRiskRequestSchema } from "@/lib/validations";
import { evaluateOrderRisk } from "@/lib/risk-engine/evaluator";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = EvaluateRiskRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Invalid checkout submission data",
          details: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      customerName,
      phone,
      houseFlat,
      streetArea,
      landmark,
      city,
      state,
      pincode,
      paymentMethod,
      cartItems,
      cartValue,
    } = validated.data;

    // Optional merchant threshold passed in header or query if testing slider dynamically
    const customThresholdHeader = req.headers.get("x-risk-threshold");
    const customThreshold = customThresholdHeader ? parseInt(customThresholdHeader, 10) : undefined;

    const evaluation = await evaluateOrderRisk(
      {
        customerName,
        phone,
        houseFlat,
        streetArea,
        landmark,
        city,
        state,
        pincode,
        paymentMethod,
      },
      cartItems,
      cartValue,
      isNaN(customThreshold as number) ? undefined : customThreshold
    );

    return NextResponse.json(evaluation);
  } catch (err: any) {
    console.error("Risk evaluation error:", err);
    return NextResponse.json(
      {
        error: "Internal server error during risk evaluation",
        message: err.message || "Failed to analyze order",
      },
      { status: 500 }
    );
  }
}
