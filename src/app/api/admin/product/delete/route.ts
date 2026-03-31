import { deleteProduct } from "@/controllers/product.controller";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { productId } = await req.json();

    const res = await deleteProduct(productId);

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
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
  }
}
