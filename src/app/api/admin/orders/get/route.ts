import { getOrders } from "@/controllers/order.controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await getOrders();

    if (!res || !res.success) {
      return NextResponse.json({
        success: false,
        message: res?.message,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: res.message,
        data: res.data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Orders Get error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error.", data: [] },
      { status: 500 },
    );
  }
}