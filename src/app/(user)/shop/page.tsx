"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { api } from "@/lib/axios";
import { addToCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  sellingPrice: number;
  stock: number;
  category: string;
  tags: string[];
  image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ShopPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/product/get");
      console.log(res)
      setProducts(res.data.data);
    } catch (error:any) {
      toast.error(error?.response?.data?.message || "Failed to fetch products");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (item: Product) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: item.id,
          qty: 1,
        }),
      });
      // console.log(res)
      const data = await res.json();
      console.log("response -------", item);
      dispatch(
        addToCart({
          productId: item.id,
          qty: 1,
          product: {
            name: item.name,
            image: item.image,
            price: item.sellingPrice
          },
        }),
      );
      setAddedIds((prev) => new Set(prev).add(item.id));
      setTimeout(() => {
        setAddedIds((prev) => {
          const next = new Set(prev);
          next.delete(item.id);
          return next;
        });
      }, 1800);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All Categories" || p.category === category;
    return matchSearch && matchCat;
  });

  const discount = (orig: number, sell: number) =>
    Math.round(((orig - sell) / orig) * 100);

  return (
    <main
      className="min-h-screen px-4 md:px-10 py-14"
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      {/* ── Header ── */}
      <section className="mb-14 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-3 font-semibold">
          Curated Collection
        </p>
        <h1
          className="text-5xl md:text-6xl font-black text-white leading-tight"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-1px" }}
        >
          Our{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg,#a78bfa,#f472b6,#fb923c)",
            }}
          >
            Store
          </span>
        </h1>
        <p className="text-gray-400 mt-3 text-base">
          Discover premium products at unbeatable prices
        </p>
      </section>

      {loading ? (
        <div className="w-full h-full ">
          <Loader />
        </div>
      ) : (
        <>
          <section>
            {/* ── Filters ── */}
            <section className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 max-w-4xl mx-auto">
              <div className="relative w-full md:w-1/2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  🔍
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm transition"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm appearance-none cursor-pointer transition"
              >
                <option className="bg-gray-900">All Categories</option>
                <option className="bg-gray-900">Electronics</option>
                <option className="bg-gray-900">Fashion</option>
                <option className="bg-gray-900">Accessories</option>
              </select>
            </section>

            {/* ── Product Grid ── */}
          </section>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="text-center mt-24 text-gray-500">
              <p className="text-5xl mb-4">🛍️</p>
              <p className="text-lg font-semibold text-gray-400">
                No products found
              </p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 max-w-7xl mx-auto">
                {filtered.map((p) => {
                  const disc = discount(p.originalPrice, p.sellingPrice);
                  const isAdded = addedIds.has(p.id);

                  return (
                    <div
                      key={p.id}
                      className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(167,139,250,0.25)] transition-all duration-300"
                    >
                      {/* Discount badge */}
                      {disc > 0 && (
                        <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                          -{disc}% OFF
                        </span>
                      )}

                      {/* Tag badge */}
                      {p.tags?.length > 0 && (
                        <span className="absolute top-3 right-3 z-10 bg-purple-600/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {p.tags[0]}
                        </span>
                      )}

                      {/* Image */}
                      <div className="relative w-full h-52 overflow-hidden bg-white/5">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                        {/* Shimmer overlay on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                      </div>

                      {/* Body */}
                      <div className="flex flex-col flex-1 p-5 gap-3">
                        {/* Category pill */}
                        <span className="text-[11px] text-purple-400 font-semibold uppercase tracking-widest">
                          {p.category}
                        </span>

                        <h3
                          className="text-white font-bold text-base leading-snug line-clamp-1"
                          style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                          {p.name}
                        </h3>

                        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>

                        {/* Price row */}
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="text-white font-black text-lg">
                            ₹{p.sellingPrice}
                          </span>
                          {p.originalPrice !== p.sellingPrice && (
                            <span className="text-gray-500 line-through text-sm">
                              ₹{p.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Stock */}
                        <p className="text-xs text-gray-500">
                          {p.stock > 0 ? (
                            <span className="text-emerald-400">
                              ✓ {p.stock} in stock
                            </span>
                          ) : (
                            <span className="text-red-400">Out of stock</span>
                          )}
                        </p>

                        {/* CTA */}
                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={p.stock === 0}
                          className={`mt-1 w-full py-2.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 ${
                            isAdded
                              ? "bg-emerald-500 text-white scale-95"
                              : "bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white hover:scale-[1.03] active:scale-95"
                          } disabled:opacity-40 disabled:cursor-not-allowed shadow-lg`}
                        >
                          {isAdded ? "✓ Added!" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </section>

              {/* ── Pagination ── */}
              <div className="flex justify-center mt-20 gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    className="w-10 h-10 rounded-xl border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:scale-110 transition-all duration-200 font-semibold text-sm"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </main>
  );
}
