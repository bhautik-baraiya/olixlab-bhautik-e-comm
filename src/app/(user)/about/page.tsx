"use client";

import Link from "next/link";

const cards = [
  {
    icon: "🚀",
    title: "Our Mission",
    desc: "Deliver high-quality products with a lightning-fast experience and a UI that feels like the future — every single time.",
  },
  {
    icon: "💡",
    title: "Innovation",
    desc: "We constantly evolve with cutting-edge technologies to bring next-gen shopping experiences to everyday people.",
  },
  {
    icon: "🤝",
    title: "Customer First",
    desc: "Every decision we make is centered around one thing: making you — our customer — genuinely happy.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Listed" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Live Support" },
];

const team = [
  { name: "Alex Ray", role: "Co-Founder & CEO", initial: "A", from: "#7c3aed", to: "#a855f7" },
  { name: "John Miles", role: "Lead Engineer", initial: "J", from: "#db2777", to: "#f472b6" },
  { name: "Sara Chen", role: "Head of Design", initial: "S", from: "#ea580c", to: "#fb923c" },
];

const timeline = [
  { year: "2021", title: "The Idea", desc: "MyStore was born from a simple frustration — online shopping felt broken." },
  { year: "2022", title: "First Launch", desc: "We shipped v1 with 100 products and 200 early users who believed in us." },
  { year: "2023", title: "Rapid Growth", desc: "Crossed 10K customers and expanded to 3 new product categories." },
  { year: "2024", title: "Going Premium", desc: "Rebuilt the platform from scratch with a world-class design system." },
  { year: "2025", title: "50K & Beyond", desc: "Now serving 50,000+ customers and scaling to global markets." },
];

export default function About() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #1a0e3a 100%)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .gradient-text {
          background: linear-gradient(90deg, #a78bfa, #f472b6, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-glow:hover { box-shadow: 0 0 35px rgba(167,139,250,0.18); }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .float { animation: float 5s ease-in-out infinite; }
      `}</style>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative text-center px-6 pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />

        <div className="float inline-block mb-8 text-6xl">✦</div>

        <p className="text-xs uppercase tracking-[0.35em] text-purple-400 font-semibold mb-4">Our Story</p>
        <h1 className="font-display text-6xl md:text-7xl font-black text-white leading-tight mb-6">
          We Are <span className="gradient-text">MyStore</span>
        </h1>
        <p className="font-body text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Redefining e-commerce with modern design, seamless performance, and a team obsessed with getting every detail right.
        </p>
      </section>

      {/* ══════════════════ MISSION CARDS ══════════════════ */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title}
              className="group p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 card-glow transition-all duration-300 hover:-translate-y-2"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="text-4xl mb-5">{c.icon}</div>
              <h3 className="font-display text-white font-bold text-xl mb-3">{c.title}</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label}
              className="text-center p-7 rounded-2xl border border-white/10 card-glow transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="font-display text-4xl font-black text-white mb-1">{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ TIMELINE ══════════════════ */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-3">How We Got Here</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white">
            Our <span className="gradient-text">Journey</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 via-pink-500 to-transparent opacity-30" />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <div key={item.year}
                className={`relative flex items-start gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-purple-500 mt-1"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }} />

                {/* Spacer */}
                <div className="flex-1" />

                {/* Card */}
                <div className="flex-1 p-6 rounded-2xl border border-white/10 card-glow transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.04)" }}>
                  <span className="text-xs font-bold text-purple-400 tracking-widest uppercase">{item.year}</span>
                  <h4 className="font-display text-white font-bold text-lg mt-1 mb-2">{item.title}</h4>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TEAM ══════════════════ */}
      <section className="px-6 py-24 max-w-5xl mx-auto text-center">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-3">The People</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white">
            Meet the <span className="gradient-text">Team</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {team.map((member) => (
            <div key={member.name}
              className="group p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 card-glow transition-all duration-300 hover:-translate-y-2"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl font-black text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${member.from}, ${member.to})` }}>
                {member.initial}
              </div>
              <h4 className="font-display text-white font-bold text-lg">{member.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{member.role}</p>

              {/* Social icons */}
              <div className="flex justify-center gap-2 mt-4">
                {["𝕏", "in"].map((icon) => (
                  <button key={icon}
                    className="w-8 h-8 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-purple-500/50 transition-all duration-200 text-xs font-bold flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.04)" }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="px-6 py-8 pb-24 max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl p-12 text-center border border-white/10"
          style={{ background: "linear-gradient(135deg, #1e0a3c, #3b0764, #1e0a3c)" }}>
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-4">Ready?</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              Start Shopping <span className="gradient-text">Today</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Join 50,000+ customers already enjoying the best online shopping experience.
            </p>
            <Link href="/shop">
              <button className="px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
                style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
                Browse the Store →
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}