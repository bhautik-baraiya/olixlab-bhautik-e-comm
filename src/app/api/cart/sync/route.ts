import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    await prisma.$transaction(
      items.map((item: { cartItemId: string; qty: number }) =>
        prisma.cartItem.update({
          where: { id: item.cartItemId },
          data: { qty: item.qty, product: { update: { stock: item.qty } } },
        }),
      ),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
