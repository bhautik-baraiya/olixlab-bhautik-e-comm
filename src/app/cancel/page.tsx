"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PaymentCancel() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 overflow-hidden relative"
      style={{
        background:
          "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #1a0e3a 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        /* gradient text — red/orange flavour for cancel */
        .gradient-text-cancel {
          background: linear-gradient(90deg,#f87171,#fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        /* soft purple gradient for primary btn */
        .gradient-text {
          background: linear-gradient(90deg,#a78bfa,#f472b6,#fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* fade-up entrance */
        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.08s; }
        .delay-2 { transition-delay: 0.18s; }
        .delay-3 { transition-delay: 0.30s; }
        .delay-4 { transition-delay: 0.44s; }
        .delay-5 { transition-delay: 0.58s; }

        /* X icon ring */
        @keyframes ring-pulse-red {
          0%   { box-shadow: 0 0 0 0 rgba(248,113,113,0.5); }
          70%  { box-shadow: 0 0 0 20px rgba(248,113,113,0); }
          100% { box-shadow: 0 0 0 0 rgba(248,113,113,0); }
        }
        .ring-pulse-red { animation: ring-pulse-red 2.2s ease-out infinite; }

        /* X draw */
        @keyframes draw-x {
          from { stroke-dashoffset: 50; }
          to   { stroke-dashoffset: 0; }
        }
        .x-path {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-x 0.45s 0.25s ease-out forwards;
        }

        /* subtle horizontal shake on the icon */
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        .shake { animation: shake 0.55s 0.15s ease-out both; }

        /* floating particle dots */
        @keyframes float-dot {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50%      { transform: translateY(-18px) scale(1.15); opacity: 0.7; }
        }

        .btn-primary:hover { transform: scale(1.03); box-shadow: 0 12px 40px rgba(124,58,237,0.45); }
        .btn-primary { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .btn-ghost:hover  { border-color: rgba(167,139,250,0.35); color: #d1d5db; }
        .btn-ghost  { transition: border-color 0.2s, color 0.2s; }

        .card-faq:hover { border-color: rgba(167,139,250,0.25); }
        .card-faq { transition: border-color 0.2s; }
      `}</style>

      {/* Ambient blobs */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
          filter: "blur(50px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)",
          bottom: "-80px",
          left: "-80px",
          filter: "blur(40px)",
        }}
      />

      {/* Floating dots decoration */}
      {[
        { top: "15%", left: "8%", dur: "3.2s", delay: "0s", size: 6, color: "#f87171" },
        { top: "70%", left: "5%", dur: "4s", delay: "0.6s", size: 4, color: "#a78bfa" },
        { top: "20%", right: "7%", dur: "3.6s", delay: "0.3s", size: 5, color: "#fb923c" },
        { top: "75%", right: "9%", dur: "2.9s", delay: "1s", size: 4, color: "#f472b6" },
      ].map((d, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: d.size,
            height: d.size,
            background: d.color,
            top: d.top,
            left: (d as any).left,
            right: (d as any).right,
            animation: `float-dot ${d.dur} ${d.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 p-10 text-center"
        style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)" }}
      >
        {/* X circle */}
        <div className={`fade-up ${visible ? "show" : ""} delay-1`}>
          <div
            className="ring-pulse-red shake w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center border border-red-500/30"
            style={{ background: "rgba(239,68,68,0.1)" }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="url(#xg)" strokeWidth="2" />
              <defs>
                <linearGradient id="xg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f87171" />
                  <stop offset="1" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <line className="x-path" x1="16" y1="16" x2="32" y2="32"
                stroke="url(#xg)" strokeWidth="3" strokeLinecap="round" />
              <line className="x-path" x1="32" y1="16" x2="16" y2="32"
                stroke="url(#xg)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <div className={`fade-up ${visible ? "show" : ""} delay-2`}>
          <p className="text-xs uppercase tracking-[0.35em] text-red-400 font-semibold mb-2">
            Payment Cancelled
          </p>
          <h1 className="font-display text-4xl font-black text-white mb-3">
            Oops, <span className="gradient-text-cancel">Cancelled!</span>
          </h1>
          <p className="font-body text-gray-400 leading-relaxed text-sm">
            Your payment was not completed and no charges were made. Your cart
            is still saved — you can pick up right where you left off.
          </p>
        </div>

        {/* Cart still safe banner */}
        <div className={`fade-up ${visible ? "show" : ""} delay-3 mt-7`}>
          <div
            className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 px-5 py-4 text-left"
            style={{ background: "rgba(52,211,153,0.06)" }}
          >
            <span className="text-2xl">🛒</span>
            <div>
              <p className="font-display text-emerald-400 font-bold text-sm">
                Your cart is safe
              </p>
              <p className="font-body text-gray-500 text-xs mt-0.5">
                All items are still waiting for you in your cart.
              </p>
            </div>
          </div>
        </div>

        {/* Possible reasons */}
        <div className={`fade-up ${visible ? "show" : ""} delay-4 mt-6 space-y-3 text-left`}>
          <p className="font-body text-gray-600 text-xs uppercase tracking-widest mb-2">
            What might have happened
          </p>
          {[
            ["💳", "Card was declined or expired"],
            ["⏱️", "The session timed out"],
            ["❌", "You cancelled the checkout"],
            ["📶", "A network issue occurred"],
          ].map(([icon, reason]) => (
            <div
              key={reason as string}
              className="card-faq flex items-center gap-3 rounded-2xl border border-white/[0.07] px-4 py-3"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="text-xl">{icon}</span>
              <p className="font-body text-gray-400 text-sm">{reason}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className={`fade-up ${visible ? "show" : ""} delay-5 mt-8 space-y-3`}>
          <Link href="/cart">
            <button
              className="btn-primary w-full py-4 rounded-2xl font-display font-bold text-white text-base shadow-xl"
              style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}
            >
              Return to Cart →
            </button>
          </Link>
          <Link href="/shop">
            <button className="btn-ghost w-full py-3 rounded-2xl text-sm font-semibold text-gray-500 border border-white/10">
              ← Continue Shopping
            </button>
          </Link>
        </div>

        {/* Support nudge */}
        <div className={`fade-up ${visible ? "show" : ""} delay-5 mt-6`}>
          <p className="font-body text-gray-600 text-xs">
            Still having trouble?{" "}
            <a
              href="mailto:support@yourstore.com"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Contact support →
            </a>
          </p>
        </div>

        {/* Trust badges */}
        <div className={`fade-up ${visible ? "show" : ""} delay-5 mt-6 flex justify-center gap-6`}>
          {[["🔒", "Secure"], ["↩️", "Free Returns"], ["⚡", "Fast Ship"]].map(([icon, label]) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-lg">{icon}</span>
              <span className="text-gray-600 text-[10px]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}