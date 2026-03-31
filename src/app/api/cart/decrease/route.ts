import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/jwt";
import { decreaseQty } from "@/controllers/cart.controller";

export async function POST(req: NextRequest) {
  try {
    const { cartItemId } = await req.json();

    const userId: any = getUserFromToken(req);
    console.log(userId)

    const res = await decreaseQty(userId,cartItemId)

    return NextResponse.json(res);

   
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}
