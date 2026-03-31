import { getProductById, getProducts } from "@/controllers/product.controller";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    if (!id) {
      NextResponse.json({
        success: false,
        message: "Id Not Display At Params !!",
      });
    }

    const res = await getProductById(id);

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
