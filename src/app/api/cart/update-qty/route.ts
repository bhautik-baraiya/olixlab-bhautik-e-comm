import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { cartItemId, qty } = await req.json();
  // console.log("cart item id -----------------------------",cartItemId);

  if(!cartItemId){
      return NextResponse.json({ success: false,message:"cartItemId not Found !!" });
  }

  await prisma?.cartItem?.update({
    where: { id: cartItemId },
    data: { qty },
  });
  return NextResponse.json({ success: true });
}
