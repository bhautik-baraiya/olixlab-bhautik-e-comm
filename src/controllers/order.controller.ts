import { prisma } from "@/lib/prisma";

export async function getOrders() {
  try {
    const allOrders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true, 
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: allOrders,
      message: allOrders.length
        ? "Orders fetched successfully."
        : "No orders found.",
    };
  } catch (error) {
    console.error("getOrder error:", error);
    return {
      success: false,
      data: [],
      message: "Error while fetching orders.",
    };
  }
}
