import { updateAdminProduct } from "@/controllers/product.controller";
import { uploadImage } from "@/lib/cloudinary";
import { ProductStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const productId    = formData.get("productId") as string;
    const name         = formData.get("name") as string;
    const description  = formData.get("description") as string;
    const originalPrice = Number(formData.get("originalPrice"));
    const sellingPrice  = Number(formData.get("sellingPrice"));
    const stock         = Number(formData.get("stock"));
    const category     = formData.get("category") as string;
    const status       = formData.get("status") as ProductStatus;

    if (!productId?.trim()) {
      return NextResponse.json(
        { success: false, message: "Product ID is required." },
        { status: 400 }
      );
    }

    if (!name?.trim() || !description?.trim() || !category?.trim() || !status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (isNaN(originalPrice) || isNaN(sellingPrice) || isNaN(stock)) {
      return NextResponse.json(
        { success: false, message: "Invalid numeric values." },
        { status: 400 }
      );
    }

    let tags: string[] = [];
    try {
      const rawTags = formData.get("tags") as string;
      tags = rawTags ? JSON.parse(rawTags) : [];
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid tags format." },
        { status: 400 }
      );
    }

    let image: string | undefined;
    const imageField = formData.get("image");

    if (imageField instanceof File && imageField.size > 0) {

      const imageRes = await uploadImage(imageField);

      if (!imageRes.success) {
        return NextResponse.json(
          { success: false, message: imageRes.message },
          { status: 400 }
        );
      }

      image = imageRes.url;

    } else if (typeof imageField === "string" && imageField.startsWith("http")) {
      image = imageField;
    }

    const res = await updateAdminProduct({
      productId,
      name,
      description,
      originalPrice,
      sellingPrice,
      stock,
      category,
      tags,
      status,
      ...(image && { image }), 
    });

    if (!res.success) {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: res.message, data: res.data },
      { status: 200 }
    );

  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal Server Error.";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}