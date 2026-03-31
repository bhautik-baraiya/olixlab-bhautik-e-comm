import { addAdminProduct } from "@/controllers/product.controller";
import { uploadImage } from "@/lib/cloudinary";
import { ProductStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const originalPrice = Number(formData.get("originalPrice"));
    const sellingPrice = Number(formData.get("sellingPrice"));
    const stock = Number(formData.get("stock"));
    const category = formData.get("category") as string;
    const status = formData.get("status") as ProductStatus;
    const imageFile = formData.get("image") as File;

    let tags: string[] = [];
    try {
      const rawTags = formData.get("tags") as string;
      tags = rawTags ? JSON.parse(rawTags) : [];
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid tags format" },
        { status: 400 },
      );
    }

    if (!name || !description || !category || !status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 },
      );
    }

    if (isNaN(originalPrice) || isNaN(sellingPrice) || isNaN(stock)) {
      return NextResponse.json(
        { success: false, message: "Invalid numeric values" },
        { status: 400 },
      );
    }

    const imageRes = await uploadImage(imageFile);

    if (!imageRes.success || !imageRes.url) {
      return NextResponse.json(
        { success: false, message: imageRes.message },
        { status: 400 },
      );
    }

    // ✅ Call controller
    const result = await addAdminProduct({
      name,
      description,
      originalPrice,
      sellingPrice,
      stock,
      category,
      tags,
      image: imageRes.url,
      status,
    });

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Failed to add product" },
        { status: 500 },
      );
    }

    // ✅ Success response
    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
