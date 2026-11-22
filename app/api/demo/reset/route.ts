import { NextResponse } from "next/server";
import { resetDatabaseDemo } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await resetDatabaseDemo();
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Demo reset error:", err);
    return NextResponse.json(
      { error: "Failed to reset demo state", message: err.message },
      { status: 500 }
    );
  }
}
