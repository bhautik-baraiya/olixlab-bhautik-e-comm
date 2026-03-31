import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productId, stock } = await req.json();
  console.log({ productId, stock });

  await prisma.product.update({
    where: { id: productId },
    data: { stock },
  });
  return NextResponse.json({ success: true });
}
