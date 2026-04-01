import { verifyToken } from "@/lib/jwt";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    const userId = decoded.id;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.qty,
      })),

      metadata: {
        userId,
        items: JSON.stringify(
          items.map((i: any) => ({
            productId: i.productId,
            qty: i.qty,
            price: i.price,
          })),
        ),
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log("session----------", session);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("STRIPE ERROR:", err);

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
