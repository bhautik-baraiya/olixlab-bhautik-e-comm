import { prisma } from "@/lib/prisma";

type ProductInput = {
  userId: string;
  productId: string;
  qty: number;
};

export async function upsertProduct(input: ProductInput) {
  const { userId, productId, qty } = input;

  if (!userId?.trim() || !productId?.trim()) {
    return { success: false, message: "User ID and Product ID are required." };
  }

  if (!Number.isInteger(qty) || qty < 1) {
    return { success: false, message: "Quantity must be a positive integer." };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Product Not Found");
      }

      if (product.stock < qty) {
        throw new Error("Out of stock");
      }

      const existing = await tx.cartItem.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      // console.log(" existing cart item", existing);

      let cartItem;

      if (existing) {
        cartItem = await tx.cartItem.update({
          where: { id: existing.id },
          data: {
            qty: {
              increment: qty,
            },
          },
        });
      } else {
        cartItem = await tx.cartItem.create({
          data: {
            userId,
            productId,
            qty,
          },
        });
      }

      return cartItem;
    });

    return {
      success: true,
      data: result,
      message: "Item Added to Cart",
    };
  } catch (error: any) {
    console.error("Add to Cart Error:", error);

    return {
      success: false,
      message: error.message || "Error adding to cart",
    };
  }
}

export async function decreaseQty(userId: string, cartItemId: string) {
  if (!userId?.trim() || !cartItemId?.trim()) {
    return {
      success: false,
      message: "User ID and Cart Item ID are required.",
    };
  }

  try {
    const decreaseData = await prisma.$transaction(async (tx) => {
      let item = await tx.cartItem.findFirst({
        where: { id: cartItemId, userId },
      });

      if (!item) throw new Error("Cart Item not found");

      if (item.qty === 1) {
        await tx.cartItem.delete({
          where: { id: cartItemId },
        });
      } else {
        await tx.cartItem.update({
          where: { id: cartItemId },
          data: {
            qty: {
              decrement: 1,
            },
          },
        });
      }

      return item;
    });

    if (!decreaseData) {
      return {
        success: false,
        message: "Data Decrease Error",
      };
    }

    return {
      success: true,
      data: decreaseData,
      message: "Quantity updated",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getCartItems(userId: string) {
  if (!userId?.trim()) {
    return { success: false, message: "Unauthorized." };
  }

  try {
    const cart = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    return {
      success: true,
      data: cart,
      message: cart.length ? "Cart fetched successfully." : "Cart is empty.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function removeCartItems(cartItemId: string, userId: string) {
  if (!cartItemId?.trim() || !userId?.trim()) {
    return {
      success: false,
      message: "Cart Item ID and User ID are required.",
    };
  }

  try {
    const removeData = await prisma.$transaction(async (tx) => {
      let item = await tx.cartItem.findFirst({
        where: { id: cartItemId, userId },
      });

      if (!item) throw new Error("Item not found");

      await tx.cartItem.delete({
        where: { id: cartItemId },
      });
      return item;
    });
    return {
      success: true,
      data: removeData,
      message: "Item removed from cart",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
