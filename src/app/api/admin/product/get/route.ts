import { getProducts } from "@/controllers/product.controller";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await getProducts();

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
