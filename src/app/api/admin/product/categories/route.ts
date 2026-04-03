import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });

    const categories = data.map((c) => c.category);

    return NextResponse.json({
      success: true,
      data: categories,
      message: "Categories fetched successfully.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Categories fetched unsuccessful.",
    });
  }
}
