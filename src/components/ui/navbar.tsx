"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const quantity = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        .nav-logo { font-family: 'Syne', sans-serif; }
      `}</style>

      <header
        className="w-full sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl"
        style={{ background: "rgba(15,12,41,0.85)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="nav-logo text-2xl font-black text-white tracking-tight"
          >
            My
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg,#a78bfa,#f472b6)",
              }}
            >
              Store
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="relative px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                {label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-4/5 h-px bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="hidden md:inline-flex px-4 py-2 text-sm font-semibold text-gray-300 border border-white/15 rounded-xl hover:border-purple-500/50 hover:text-white transition-all duration-200 backdrop-blur-sm">
                Login
              </button>
            </Link>

            <Link href="/cart">
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#db2777)",
                }}
              >
                <ShoppingCart size={16} />
                <span>Cart</span>
                {quantity > 0 && (
                  <span className="bg-white text-purple-700 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {quantity}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-gray-400 hover:text-white transition p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div
            className="px-6 pb-5 pt-2 flex flex-col gap-1 border-t border-white/10"
            style={{ background: "rgba(15,12,41,0.97)" }}
          >
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-150"
              >
                {label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <button className="mt-2 w-full py-2.5 text-sm font-semibold text-gray-300 border border-white/15 rounded-xl hover:border-purple-500/50 hover:text-white transition-all duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
