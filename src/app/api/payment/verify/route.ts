import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // console.log("Session -------------", session);

    if (session.payment_status == "paid") {
      return NextResponse.json({
        success: session.payment_status === "paid",
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
        status: session.payment_status,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: session.payment_status,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
