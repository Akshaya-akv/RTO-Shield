import { NextRequest, NextResponse } from "next/server";
import { SaveOrderRequestSchema } from "@/lib/validations";
import { fetchAllOrders, insertOrder } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const riskLevel = searchParams.get("risk_level") || undefined;
    const search = searchParams.get("search") || undefined;

    const orders = await fetchAllOrders(riskLevel, search);
    return NextResponse.json({ orders });
  } catch (err: any) {
    console.error("Fetch orders error:", err);
    return NextResponse.json(
      { error: "Failed to retrieve orders", message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = SaveOrderRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Invalid order payload",
          details: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      customerName,
      phone,
      address,
      pincode,
      city,
      state,
      cartItems,
      cartValue,
      initialPaymentMethod,
      riskScore,
      riskLevel,
      aiReasons,
      interventionTriggered,
      finalPaymentMethod,
      orderStatus,
    } = validated.data;

    const savedOrder = await insertOrder({
      customer_name: customerName,
      phone,
      address,
      pincode,
      city,
      state,
      cart_items: cartItems,
      cart_value: cartValue,
      initial_payment_method: initialPaymentMethod,
      risk_score: riskScore,
      risk_level: riskLevel,
      ai_reasons: aiReasons as any,
      intervention_triggered: interventionTriggered,
      final_payment_method: finalPaymentMethod,
      order_status: orderStatus,
    });

    return NextResponse.json({
      success: true,
      order: savedOrder,
      message: "Order successfully persisted to database",
    });
  } catch (err: any) {
    console.error("Save order error:", err);
    return NextResponse.json(
      { error: "Failed to record order", message: err.message },
      { status: 500 }
    );
  }
}
