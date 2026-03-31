import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/jwt";
import { decreaseQty } from "@/controllers/cart.controller";

export async function POST(req: NextRequest) {
  try {
    const { cartItemId } = await req.json();

    const userId: any = getUserFromToken(req);

    const res = await decreaseQty(userId, cartItemId);

    if (!res || !res.success) {
      return NextResponse.json({
        success: false,
        message: res?.message,
      });
    }

    return NextResponse.json({
      success: true,
      message: res.message,
      data: res.data,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}
