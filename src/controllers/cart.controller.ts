import { prisma } from "@/lib/prisma";

export async function upsertProduct(
  userId: string,
  productId: string,
  qty: number,
) {
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

      console.log(" existing cart item", existing);

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
  try {
    return await prisma.$transaction(async (tx) => {
      const item = await tx.cartItem.findFirst({
        where: { id: cartItemId, userId },
      });

      if (!item) throw new Error("Item not found");

      // 🔥 Restore stock
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: 1,
          },
        },
      });

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

      return {
        success: true,
        message: "Quantity updated",
      };
    });
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getCartItems(userId: string) {
  if (!userId) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const cart = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: true,
    },
  });

  // console.log("cart", cart);

  return {
    success: true,
    cart,
    message: "Cart Data Fetched Successfully !!",
  };
}

export async function removeCartItems(cartItemId: string, userId: string) {
  try {
    return await prisma.$transaction(async (tx) => {
      const item = await tx.cartItem.findFirst({
        where: { id: cartItemId, userId },
      });

      if (!item) throw new Error("Item not found");

      // 🔥 Restore stock
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.qty,
          },
        },
      });

      await tx.cartItem.delete({
        where: { id: cartItemId },
      });

      return {
        success: true,
        message: "Item removed from cart",
      };
    });
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
