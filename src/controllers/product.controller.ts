import { prisma } from "@/lib/prisma";
import { ProductStatus } from "@prisma/client";

export async function addAdminProduct(
  name?: string,
  description?: string,
  originalPrice?: number,
  sellingPrice?: number,
  stock?: number,
  category?: string,
  tags?: string[],
  image?: string,
  status?: ProductStatus,
) {
  const product = await prisma.product.create({
    data: {
      name: name!,
      description: description!,
      originalPrice: originalPrice!,
      sellingPrice: sellingPrice!,
      stock: stock!,
      category: category!,
      tags: tags!,
      image: image!,
      status: status!,
    },
  });

  console.log("product=------------- ", product);

  if (!product) {
    return {
      success: false,
      message: "Error While Upserting Product !!",
    };
  }

  return {
    success: true,
    data: product,
    message: "Product Added Successfully !!",
  };
}

export async function getProducts() {
  const allProducts = await prisma.product.findMany();

  if (!allProducts) {
    return {
      success: false,
      message: "Error While Fetching Product !!",
    };
  }

  return {
    success: true,
    data: allProducts,
    message: "Product Fetched Successfully !!",
  };
}

export async function getProductById(id: string) {
  if (!id) {
    return {
      success: false,
      message: "Id Not Access At Edit Time !!",
    };
  }

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    return {
      success: false,
      message: "Error While Fetching Product !!",
    };
  }

  console.log(product);

  return {
    success: true,
    data: product,
    message: "Product Fetched Successfully !!",
  };
}

export async function deleteProduct(productId: string) {
  if (!productId) {
    return {
      success: false,
      message: "ProductId Not Fetched !! ",
    };
  }

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

  await prisma.product.delete({
    where: { id: productId },
  });

  return {
    success: true,
    message: "Product removed from cart",
  };
}

export async function updateAdminProduct(
  name?: string,
  description?: string,
  originalPrice?: number,
  sellingPrice?: number,
  stock?: number,
  category?: string,
  tags?: string[],
  image?: string,
  status?: ProductStatus,
  productId?: string,
) {
  const product = await prisma.product.update({
    where: { id: productId },
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
}
