import { getProducts } from "@/controllers/product.controller";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(searchParams.get("page"), searchParams.get("limit"));
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const category = searchParams.get("category");
    const data = searchParams.get("data");

    const res = await getProducts(page, limit, category, data);

    if (!res || !res.success) {
      return NextResponse.json({
        success: false,
        message: res?.message,
      });
    }

    // console.log(res);

    return NextResponse.json(
      {
        success: true,
        message: res.message,
        data: res.data,
        totalPages: res.totalPages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /products error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error.", data: [] },
      { status: 500 },
    );
  }
}
