import { getCartItems } from "@/controllers/cart.controller";
import { getUserFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId: any = getUserFromToken(req);

    const res = await getCartItems(userId);

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
