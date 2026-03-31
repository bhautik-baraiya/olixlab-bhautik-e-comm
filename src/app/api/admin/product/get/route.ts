import { getProducts } from "@/controllers/product.controller";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await getProducts();

    if (!res || !res.success) {
      return NextResponse.json({
        success: false,
        message: res?.message,
      });
    }

  return NextResponse.json(
      {
        success: true,
        message: res.message,
        data: res.data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
