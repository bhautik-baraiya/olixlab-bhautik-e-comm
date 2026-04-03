import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  // console.log("body-----", body);
  const sig = req.headers.get("stripe-signature")!;
  // console.log("sig-----", sig);

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  // console.log(webhookSecret);

  if (!webhookSecret) {
    return NextResponse.json({ error: "No webhookSecret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process paid sessions
    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const { userId, items: rawItems } = session.metadata ?? {};

    if (!userId || !rawItems) {
      console.error("Missing metadata in session:", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const items: { productId: string; qty: number; price: number }[] =
      JSON.parse(rawItems);

    // console.log(items);

    try {
      const order = await prisma.order.create({
        data: {
          userId,
          stripeSessionId: session.id,
          amountTotal: session.amount_total ?? 0,
          customerEmail: session.customer_details?.email ?? "",
          status: "PAID",
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.qty,
              price: item.price,
            })),
          },
        },
      });

      // console.log("order=-=-=-=----=-=-=-=-=-=-=--=-=-", order);
      // 2️⃣ Reduce stock for each product
      await Promise.all(
        items.map((item) =>
          prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.qty } },
          }),
        ),
      );
      // 3️⃣ Clear the user's cart
      await prisma.cartItem.deleteMany({ where: { userId } });
      // console.log(`✅ Order saved for user ${userId}, session ${session.id}`);
    } catch (dbErr) {
      console.error("DB error in webhook:", dbErr);
      // Return 500 so Stripe retries the webhook
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
