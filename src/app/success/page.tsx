"use client";

import Loader from "@/components/ui/loader";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PaymentSuccess() {
  const [orderRef, setOrderRef] = useState("");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOrderRef(`ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  }, []);

  const { items } = useSelector((state: RootState) => state.cart);
  
  useEffect(() => {

    console.log("items -------------",items)

  if (!sessionId) {
    setLoading(false);
    return;
  }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/payment/verify?session_id=${sessionId}`);
        const data = await res.json();
        if (data.success) {
          setPaymentData(data);

          // remove stock

          await Promise.all(
            ite
          )

        } else {
          console.error("Payment not completed:", data.status);
        }
      } catch (err) {
        console.error("Verification failed:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 to-pink-600" />

          <div className="p-8">
            {/* Icon + Title */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  <polyline
                    points="9,17 14,22 23,11"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Payment Successful
              </h1>
              <p className="text-gray-500 text-sm">
                Thank you! Your order is being processed.
              </p>
            </div>

            {/* Order Details Box */}
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl divide-y divide-gray-700/50 mb-6">
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-gray-400 text-sm">Order Reference</span>
                <span className="text-white font-mono font-semibold text-sm">
                  {orderRef || "—"}
                </span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-gray-400 text-sm">Email</span>
                <span className="text-white text-sm">
                  {paymentData?.customerEmail ?? "—"}
                </span>
              </div>
              <div className="flex justify-between items-center px-5 py-3.5">
                <span className="text-gray-400 text-sm">Amount Paid</span>
                <span className="text-green-400 font-semibold text-sm">
                  ₹
                  {paymentData?.amountTotal
                    ? (paymentData.amountTotal / 100).toFixed(2)
                    : "—"}
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-2 mb-8">
              {[
                {
                  icon: "⚡",
                  title: "Order Received",
                  sub: "We've got it — processing now",
                },
                {
                  icon: "📦",
                  title: "Packed & Shipped",
                  sub: "Usually within 1–2 business days",
                },
                {
                  icon: "🚪",
                  title: "Delivered to You",
                  sub: "Sit back and relax!",
                },
              ].map(({ icon, title, sub }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 bg-gray-800/40 border border-gray-700/30 rounded-xl px-4 py-3"
                >
                  <span className="text-xl w-8 text-center">{icon}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <Link
                href="/shop"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl text-sm text-center transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/orders"
                className="w-full border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 font-semibold py-3 rounded-xl text-sm text-center transition-colors"
              >
                View My Orders
              </Link>
            </div>
          </div>

          {/* Footer trust bar */}
          <div className="border-t border-gray-800 px-8 py-4 flex justify-center gap-8">
            {[
              ["🔒", "Secure Payment"],
              ["↩️", "Free Returns"],
              ["⚡", "Fast Shipping"],
            ].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-sm">{icon}</span>
                <span className="text-gray-600 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
