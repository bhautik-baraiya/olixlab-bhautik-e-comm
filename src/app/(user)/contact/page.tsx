"use client";

import { useState } from "react";

const contactInfo = [
  { icon: "✉️", title: "Email", value: "support@mystore.com", sub: "We reply within 24 hours" },
  { icon: "📞", title: "Phone", value: "+91 98765 43210", sub: "Mon–Sat, 10am–7pm IST" },
  { icon: "📍", title: "Address", value: "Surat, Gujarat, India", sub: "Visit us anytime" },
];

const faqs = [
  { q: "How long does shipping take?", a: "Standard delivery takes 3–5 business days. Express options available at checkout." },
  { q: "Can I return a product?", a: "Yes — hassle-free 30-day returns on all orders, no questions asked." },
  { q: "How do I track my order?", a: "You'll receive a tracking link via email once your order ships." },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main
      className="min-h-screen px-4 md:px-10 py-20 overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #1a0e3a 100%)" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body   { font-family: 'DM Sans', sans-serif; }
        .gradient-text {
          background: linear-gradient(90deg,#a78bfa,#f472b6,#fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-glow:hover { box-shadow: 0 0 35px rgba(167,139,250,0.18); }
        .input-dark {
          width: 100%;
          padding: 12px 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .input-dark::placeholder { color: rgba(255,255,255,0.25); }
        .input-dark:focus { border-color: rgba(167,139,250,0.6); box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }
      `}</style>

      {/* ── Background orbs ── */}
      <div className="fixed top-20 left-0 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#db2777,transparent)" }} />

      {/* ── Hero ── */}
      <section className="text-center max-w-2xl mx-auto mb-16 relative">
        <p className="text-xs uppercase tracking-[0.35em] text-purple-400 font-semibold mb-4">Get in Touch</p>
        <h1 className="font-display text-6xl md:text-7xl font-black text-white leading-tight mb-4">
          Say <span className="gradient-text">Hello</span>
        </h1>
        <p className="font-body text-gray-400 text-lg leading-relaxed">
          Have questions or need help? We'd love to hear from you — we usually respond within 24 hours.
        </p>
      </section>

      {/* ── Main grid ── */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

        {/* Left — Info cards + FAQ */}
        <div className="flex flex-col gap-5">
          {contactInfo.map((item) => (
            <div key={item.title}
              className="flex items-start gap-5 p-6 rounded-3xl border border-white/10 hover:border-purple-500/30 card-glow transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-white/10"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-purple-400 font-semibold uppercase tracking-widest mb-0.5">{item.title}</p>
                <p className="font-display text-white font-bold text-base">{item.value}</p>
                <p className="font-body text-gray-500 text-xs mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}

          {/* Social row */}
          <div className="p-6 rounded-3xl border border-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <p className="text-xs text-purple-400 font-semibold uppercase tracking-widest mb-4">Follow Us</p>
            <div className="flex gap-3">
              {[["𝕏", "Twitter"], ["in", "LinkedIn"], ["f", "Facebook"]].map(([icon, label]) => (
                <button key={label}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-white transition-all duration-200 text-sm font-bold"
                  style={{ background: "rgba(255,255,255,0.04)" }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="p-8 rounded-3xl border border-white/10"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          <h2 className="font-display text-white font-black text-2xl mb-6">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Name</label>
                <input type="text" placeholder="Your name" className="input-dark" required />
              </div>
              <div>
                <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Phone</label>
                <input type="tel" placeholder="+91 ..." className="input-dark" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Email</label>
              <input type="email" placeholder="you@email.com" className="input-dark" required />
            </div>

            <div>
              <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Subject</label>
              <select className="input-dark" style={{ cursor: "pointer" }}>
                <option value="" className="bg-gray-900">Choose a topic…</option>
                <option className="bg-gray-900">Order Issue</option>
                <option className="bg-gray-900">Returns & Refunds</option>
                <option className="bg-gray-900">Product Question</option>
                <option className="bg-gray-900">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2">Message</label>
              <textarea
                placeholder="Tell us what's on your mind…"
                rows={4}
                className="input-dark resize-none"
                required
              />
            </div>

            <button type="submit"
              className={`w-full py-4 rounded-2xl font-display font-bold text-white text-base transition-all duration-300 shadow-xl ${
                sent
                  ? "bg-emerald-500 scale-95"
                  : "hover:scale-[1.02] active:scale-95"
              }`}
              style={sent ? {} : { background: "linear-gradient(135deg,#7c3aed,#db2777)" }}>
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto mb-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-3">Quick Answers</p>
          <h2 className="font-display text-4xl font-black text-white">
            Common <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}
              className="rounded-2xl border border-white/10 overflow-hidden transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-display text-white font-bold text-sm">{faq.q}</span>
                <span className={`text-purple-400 font-bold text-xl transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="font-body text-gray-500 text-sm px-6 pb-5 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom note ── */}
      <p className="text-center font-body text-gray-600 text-sm">
        Still need help?{" "}
        <a href="mailto:support@mystore.com" className="text-purple-400 hover:text-purple-300 transition">
          Email us directly
        </a>{" "}
        — we're always here.
      </p>
    </main>
  );
}