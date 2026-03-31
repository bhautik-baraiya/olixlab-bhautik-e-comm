"use client";

import Link from "next/link";

const features = [
  {
    icon: "⚡",
    title: "Ultra Fast",
    desc: "Optimized for blazing speed with edge-cached delivery and instant page transitions.",
  },
  {
    icon: "🔒",
    title: "Bank-Grade Security",
    desc: "Enterprise-level encryption and fraud protection on every single transaction.",
  },
  {
    icon: "✦",
    title: "Modern UX",
    desc: "Crafted with cutting-edge UI principles for a seamless, intuitive experience.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Same-day and next-day shipping options available across 50+ cities.",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    desc: "Hassle-free 30-day returns with no questions asked and instant refunds.",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    desc: "Round-the-clock customer support ready to help whenever you need it.",
  },
];

const categories = [
  { name: "Electronics", emoji: "💻", count: "240+ items" },
  { name: "Fashion", emoji: "👗", count: "180+ items" },
  { name: "Accessories", emoji: "⌚", count: "95+ items" },
  { name: "Home & Living", emoji: "🏠", count: "130+ items" },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "4.9★", label: "Average Rating" },
];

export default function Home() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #1a0e3a 100%)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .float { animation: float 5s ease-in-out infinite; }
        .float-delay { animation: float 5s ease-in-out infinite 1.5s; }
        .spin-slow { animation: spin-slow 18s linear infinite; }
        .gradient-text {
          background: linear-gradient(90deg, #a78bfa, #f472b6, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-glow:hover {
          box-shadow: 0 0 35px rgba(167,139,250,0.18);
        }
      `}</style>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">

        {/* Background orbs */}
        <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5 spin-slow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

        {/* Floating product cards (decorative) */}
        <div className="hidden lg:block absolute left-12 top-1/3 float">
          <div className="w-28 h-28 rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center text-4xl shadow-xl"
            style={{ background: "rgba(255,255,255,0.05)" }}>💻</div>
        </div>
        <div className="hidden lg:block absolute right-12 top-1/4 float-delay">
          <div className="w-24 h-24 rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center text-3xl shadow-xl"
            style={{ background: "rgba(255,255,255,0.05)" }}>⌚</div>
        </div>
        <div className="hidden lg:block absolute right-24 bottom-1/3 float">
          <div className="w-20 h-20 rounded-2xl border border-white/10 backdrop-blur-md flex items-center justify-center text-2xl shadow-xl"
            style={{ background: "rgba(255,255,255,0.05)" }}>👟</div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 text-purple-300 text-xs font-semibold mb-8 backdrop-blur-sm"
          style={{ background: "rgba(124,58,237,0.12)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          New arrivals dropping every week
        </div>

        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-6 max-w-5xl">
          Shop the{" "}
          <span className="gradient-text">Future</span>
          <br />of Style
        </h1>

        <p className="font-body text-gray-400 max-w-xl mb-10 text-lg leading-relaxed">
          Curated collections, unbeatable prices, and a checkout so smooth you'll forget it happened.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/shop">
            <button className="font-display px-8 py-4 rounded-2xl text-base font-bold text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl"
              style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
              Start Shopping →
            </button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-4 rounded-2xl text-base font-semibold text-gray-300 border border-white/15 hover:border-purple-500/50 hover:text-white hover:scale-105 transition-all duration-200 backdrop-blur-sm">
              Learn More
            </button>
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-purple-400 to-transparent" />
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label}
              className="text-center p-6 rounded-2xl border border-white/10 card-glow transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="font-display text-3xl font-black text-white mb-1">{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CATEGORIES ══════════════════ */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-3">Browse By</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white">
            Top <span className="gradient-text">Categories</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link href="/shop" key={cat.name}>
              <div className="group relative p-8 rounded-3xl border border-white/10 hover:border-purple-500/40 card-glow cursor-pointer transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(219,39,119,0.08))" }} />
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <p className="font-display text-white font-bold text-base">{cat.name}</p>
                <p className="text-gray-500 text-xs mt-1">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════ PROMO BANNER ══════════════════ */}
      <section className="px-6 py-8 max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center border border-white/10"
          style={{ background: "linear-gradient(135deg, #1e0a3c, #3b0764, #1e0a3c)" }}>
          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />

          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold text-orange-300 border border-orange-500/30 mb-5 uppercase tracking-widest"
              style={{ background: "rgba(251,146,60,0.1)" }}>
              ⚡ Limited Time
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              Up to <span className="gradient-text">60% Off</span>
              <br />This Weekend Only
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Don't miss out — exclusive deals on top-rated products across every category.
            </p>
            <Link href="/shop">
              <button className="px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
                style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
                Claim Deals Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURES ══════════════════ */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-3">Why Choose Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white">
            Built for <span className="gradient-text">You</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title}
              className="group p-7 rounded-3xl border border-white/10 hover:border-purple-500/30 card-glow transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-display text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ TESTIMONIAL ══════════════════ */}
      <section className="px-6 py-16 max-w-3xl mx-auto text-center">
        <div className="p-10 rounded-3xl border border-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="text-4xl mb-5">❝</div>
          <p className="font-body text-gray-300 text-xl leading-relaxed mb-6 italic">
            MyStore completely changed how I shop online. The experience is incredibly fast, the products are top-notch, and checkout takes under 10 seconds.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
              A
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Arjun Mehta</p>
              <p className="text-gray-500 text-xs">Verified Buyer ✓</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ NEWSLETTER ══════════════════ */}
      <section className="px-6 py-24 max-w-2xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-3">Stay Updated</p>
        <h2 className="font-display text-4xl font-black text-white mb-3">
          Join the <span className="gradient-text">Inner Circle</span>
        </h2>
        <p className="text-gray-500 mb-8">Early access, exclusive drops & deals — right to your inbox.</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition backdrop-blur-sm"
          />
          <button className="px-6 py-4 rounded-2xl font-bold text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg whitespace-nowrap"
            style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
            Subscribe
          </button>
        </div>
        <p className="text-gray-600 text-xs mt-3">No spam. Unsubscribe anytime.</p>
      </section>

    </main>
  );
}