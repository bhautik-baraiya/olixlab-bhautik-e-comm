import { getCartItems } from "@/controllers/cart.controller";
import { getUserFromToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId: any = getUserFromToken(req);

    const res = await getCartItems(userId);

    console.log("cart ---------",res)

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}
