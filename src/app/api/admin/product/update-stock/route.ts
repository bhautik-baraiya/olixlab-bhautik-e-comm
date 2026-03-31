import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productId, qty } = await req.json();
  console.log({ productId, qty });

  await prisma.product.update({
    where: { id: productId },
    data: { stock: { decrement: qty } },
  });
  return NextResponse.json({ success: true });
}
