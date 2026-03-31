"use client";

import Link from "next/link";

const links = {
  Shop: ["All Products", "Categories", "New Arrivals"],
  Company: ["About Us", "Careers", "Contact"],
  Support: ["Help Center", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0f0c29 0%, #1a1040 100%)" }}>

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-black text-white mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            My
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg,#a78bfa,#f472b6)" }}>
              Store
            </span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Building the future of online shopping with modern design and seamless experience.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mt-6">
            {["𝕏", "in", "f"].map((icon) => (
              <button key={icon}
                className="w-9 h-9 rounded-xl border border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-white hover:scale-110 transition-all duration-200 text-sm font-bold flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              {title}
            </h3>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item}>
                  <Link href="#"
                    className="text-gray-500 text-sm hover:text-purple-400 transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-pink-500 text-xs">→</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter strip */}
      <div className="relative max-w-7xl mx-auto px-8 pb-10">
        <div className="rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ background: "rgba(255,255,255,0.03)" }}>
          <div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
              Stay in the loop
            </p>
            <p className="text-gray-500 text-xs mt-0.5">Get deals and new arrivals straight to your inbox.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 md:w-56 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <button className="px-4 py-2 text-sm font-bold text-white rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg whitespace-nowrap"
              style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5 py-5 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()}{" "}
        <span className="text-gray-400 font-semibold">MyStore</span>. All rights reserved.
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </footer>
  );
}