import { prisma } from "@/lib/prisma";
import { ProductStatus } from "@prisma/client";

type AddProductInput = {
  name: string;
  description: string;
  originalPrice: number;
  sellingPrice: number;
  stock: number;
  category: string;
  tags: string[];
  image: string;
  status: ProductStatus;
};

export async function addAdminProduct(input: AddProductInput) {
  const {
    name,
    description,
    originalPrice,
    sellingPrice,
    stock,
    category,
    tags,
    image,
    status,
  } = input;

  if (
    !name?.trim() ||
    !description?.trim() ||
    !category?.trim() ||
    !image?.trim()
  ) {
    return { success: false, message: "Missing or empty required fields." };
  }

  if (originalPrice < 0 || sellingPrice < 0 || stock < 0) {
    return {
      success: false,
      message: "Price and stock must be non-negative.",
    };
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        originalPrice,
        sellingPrice,
        stock,
        category,
        tags,
        image,
        status,
      },
    });

    return {
      success: true,
      data: product,
      message: "Product added successfully.",
    };
  } catch (error: any) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error while adding product.";
    return { success: false, message: error.message };
  }
}

export async function getProducts() {
  try {
    const allProducts = await prisma.product.findMany();

    return {
      success: true,
      data: allProducts,
      message: allProducts.length
        ? "Products fetched successfully."
        : "No products found.",
    };
  } catch (error) {
    console.error("getProducts error:", error);
    return {
      success: false,
      data: [],
      message: "Error while fetching products.",
    };
  }
}

export async function getProductById(id: string) {
  if (!id?.trim()) {
    return { success: false, message: "Product ID is required." };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return { success: false, message: "Product not found." };
    }

    return {
      success: true,
      data: product,
      message: "Product fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Product fetched by id unsuccessful.",
    };
  }
}

export async function deleteProduct(productId: string) {
  if (!productId) {
    return {
      success: false,
      message: "ProductId Not Fetched !! ",
    };
  }

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return {
      success: true,
      data: deletedProduct,
      message: "Product removed from cart",
    };
  } catch (error) {
    return {
      success: false,
      message: "Product removed from cart error",
    };
  }
}

type UpdateProductInput = {
  productId: string;
  name?: string;
  description?: string;
  originalPrice?: number;
  sellingPrice?: number;
  stock?: number;
  category?: string;
  tags?: string[];
  image?: string;
  status?: ProductStatus;
};

export async function updateAdminProduct(input: UpdateProductInput) {
  const { productId, ...fields } = input;

  if (!productId?.trim()) {
    return { success: false, message: "Product ID is required." };
  }

  const hasUpdates = Object.values(fields).some((v) => v !== undefined);
  if (!hasUpdates) {
    return { success: false, message: "No fields provided to update." };
  }

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: fields,
    });

    if (!product) {
      return {
        success: false,
        message: "Error While Upserting Product !!",
      };
    }

    return {
      success: true,
      data: product,
      message: "Product Updated Successfully !!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error While Update Product !!",
    };
  }
}
