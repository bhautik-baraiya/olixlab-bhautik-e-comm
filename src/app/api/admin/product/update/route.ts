import { updateAdminProduct } from "@/controllers/product.controller";
import { uploadImage } from "@/lib/cloudinary";
import { ProductStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const productId = formData.get("productId") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const originalPrice = Number(formData.get("originalPrice"));
    const sellingPrice = Number(formData.get("sellingPrice"));
    const stock = Number(formData.get("stock"));
    const category = formData.get("category") as string;
    const tags = JSON.parse(formData.get("tags") as string);
    const status = formData.get("status") as ProductStatus;
    const imageFile = formData.get("image") as File;

    const imageField = formData.get("image");

    let image: string | undefined;

    if (imageField instanceof File && imageField.size > 0) {
      image = await uploadImage(imageFile);
    } else if (
      typeof imageField === "string" &&
      imageField.startsWith("http")
    ) {
      image = imageField;
    }

    const res = await updateAdminProduct(
      name,
      description,
      originalPrice,
      sellingPrice,
      stock,
      category,
      tags,
      image,
      status,
      productId,
    );

    if (!res.success) {
      return NextResponse.json({
        success: false,
        message: "Update Product Controller Error",
      });
    }

    console.log(res)

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
