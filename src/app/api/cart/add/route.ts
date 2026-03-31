import { upsertProduct } from "@/controllers/cart.controller";
import { getUserFromToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productId, name, qty = 1 } = await req.json();

    const userId: any = getUserFromToken(req);

    console.log("userId------------", userId);

    const res = await upsertProduct(userId, productId, qty);

    // console.log(res);

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
