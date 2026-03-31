import { getProductById, getProducts } from "@/controllers/product.controller";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    if(!id){
        NextResponse.json({
            success:false,
            message:"Id Not Display At Params !!"
        });
    }

    console.log(id)

    const res = await getProductById(id);

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
}
