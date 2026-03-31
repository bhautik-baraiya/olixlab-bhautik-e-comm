import { deleteProduct } from "@/controllers/product.controller";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { productId } = await req.json();

    const res = await deleteProduct(productId);

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
