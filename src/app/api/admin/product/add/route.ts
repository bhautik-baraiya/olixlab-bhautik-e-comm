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
    const tags = JSON.parse(formData.get("tags") as string);
    const status = formData.get("status") as ProductStatus;
    const imageFile = formData.get("image") as File;

    const image = await uploadImage(imageFile);

    const res = await addAdminProduct(
      name,
      description,
      originalPrice,
      sellingPrice,
      stock,
      category,
      tags,
      image,
      status,
    );

    console.log("route result ------------", res);

    if (!res) {
      return NextResponse.json({
        success: false,
        message: "Add Product Controller Error",
      });
    }

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
