"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "@/store/slices/cartSlice";
import { api } from "@/lib/axios";
import Loader from "@/components/ui/loader";

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
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/product/get/${id}`);
        setProduct(res.data.data);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to fetch product");
        router.push("/shop");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const discount = (orig: number, sell: number) =>
    Math.round(((orig - sell) / orig) * 100);

  const savings = (orig: number, sell: number) => orig - sell;

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, qty }),
      });
      const data = await res.json();
      toast[data.success ? "success" : "error"](data.message);
      if (data.success) {
        dispatch(
          addToCart({
            cartItemId: data.data.id,
            productId: product.id,
            qty,
            product: {
              name: product.name,
              image: product.image,
              price: product.sellingPrice,
              stock: product.stock,
            },
          })
        );
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
      >
        <Loader />
      </main>
    );
  }

  if (!product) return null;

  const disc = discount(product.originalPrice, product.sellingPrice);
  const saved = savings(product.originalPrice, product.sellingPrice);
  const isAvailable = product.status === "ACTIVE" && product.stock > 0;
  const maxQty = Math.min(product.stock, 10);

  const stockBadge = () => {
    if (product.stock === 0 || product.status === "OUT_OF_STOCK")
      return { label: "Out of Stock", color: "text-red-400", dot: "bg-red-400" };
    if (product.stock <= 10)
      return { label: `Only ${product.stock} left`, color: "text-amber-400", dot: "bg-amber-400" };
    return { label: `${product.stock} in stock`, color: "text-emerald-400", dot: "bg-emerald-400" };
  };
  const stock = stockBadge();

  const statusPill = () => {
    if (product.status === "ACTIVE")
      return { label: "Active", cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
    if (product.status === "OUT_OF_STOCK")
      return { label: "Out of Stock", cls: "bg-red-500/20 text-red-400 border-red-500/30" };
    return { label: "Inactive", cls: "bg-amber-500/20 text-amber-400 border-amber-500/30" };
  };
  const statusInfo = statusPill();

  return (
    <main
      className="min-h-screen px-4 md:px-10 py-14"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}
    >
      {/* Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .glass-strong { background: rgba(255,255,255,0.08); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px); border: 1px solid rgba(255,255,255,0.12); }
        .glow-purple { box-shadow: 0 0 60px rgba(167,139,250,0.15), 0 0 120px rgba(167,139,250,0.08); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeSlideRight { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer { from{opacity:0;left:-60%} to{opacity:0.4;left:120%} }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .fade-up { animation: fadeSlideUp 0.6s cubic-bezier(0.34,1.1,0.64,1) both; }
        .fade-right { animation: fadeSlideRight 0.55s cubic-bezier(0.34,1.1,0.64,1) both; }
        .del1 { animation-delay: 0.05s; }
        .del2 { animation-delay: 0.12s; }
        .del3 { animation-delay: 0.2s; }
        .del4 { animation-delay: 0.28s; }
        .del5 { animation-delay: 0.36s; }
        .del6 { animation-delay: 0.44s; }
        .del7 { animation-delay: 0.52s; }
        .shimmer-btn { position:relative; overflow:hidden; }
        .shimmer-btn::after { content:''; position:absolute; top:0; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); animation: shimmer 2.5s ease-in-out infinite; }
        .qty-btn:active { transform: scale(0.9); }
      `}</style>

      {/* Back button */}
      <div className="max-w-7xl mx-auto mb-8 fade-right">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium group"
        >
          <span className="w-8 h-8 rounded-xl glass flex items-center justify-center group-hover:border-purple-500/40 transition-all duration-200">
            ←
          </span>
          Back to Shop
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* ── LEFT: Image ── */}
        <div className="fade-right del1">
          <div className="relative rounded-3xl overflow-hidden glass-strong glow-purple aspect-square">
            {/* Discount ribbon */}
            {disc > 0 && (
              <div className="absolute top-5 left-5 z-20">
                <span
                  className="text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg"
                  style={{ background: "linear-gradient(90deg,#ec4899,#f97316)" }}
                >
                  -{disc}% OFF
                </span>
              </div>
            )}

            {/* Status pill */}
            <div className="absolute top-5 right-5 z-20">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${statusInfo.cls}`}>
                {statusInfo.label}
              </span>
            </div>

            {/* Product image */}
            <div className={`w-full h-full transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover animate-float"
                onLoad={() => setImgLoaded(true)}
              />
            </div>
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-purple-500/40 border-t-purple-400 animate-spin" />
              </div>
            )}

            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(15,12,41,0.7), transparent)" }} />
          </div>

          {/* Tags row below image */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5 fade-up del5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-xl font-medium"
                  style={{
                    background: "rgba(167,139,250,0.12)",
                    color: "#c4b5fd",
                    border: "1px solid rgba(167,139,250,0.2)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Details ── */}
        <div className="flex flex-col gap-6">

          {/* Category + breadcrumb */}
          <div className="fade-up del1 flex items-center gap-2 text-xs">
            <span className="text-gray-500">Shop</span>
            <span className="text-gray-600">›</span>
            <span
              className="font-semibold uppercase tracking-widest"
              style={{ color: "#a78bfa" }}
            >
              {product.category}
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-display fade-up del2 text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            {product.name}
          </h1>

          {/* Price block */}
          <div className="fade-up del3 flex flex-wrap items-end gap-4">
            <span
              className="font-display font-black text-white"
              style={{ fontSize: "clamp(2rem,5vw,3rem)", letterSpacing: "-0.03em" }}
            >
              ₹{product.sellingPrice.toLocaleString("en-IN")}
            </span>
            {product.originalPrice !== product.sellingPrice && (
              <>
                <span className="text-gray-500 line-through text-xl mb-1">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span
                  className="text-sm font-bold px-3 py-1.5 rounded-full mb-1"
                  style={{ background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }}
                >
                  Save ₹{saved.toLocaleString("en-IN")}
                </span>
              </>
            )}
          </div>

          {/* Stock indicator */}
          <div className="fade-up del3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${stock.dot} animate-pulse`} />
            <span className={`text-sm font-medium ${stock.color}`}>{stock.label}</span>
          </div>

          {/* Divider */}
          <div className="fade-up del3 h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

          {/* Description */}
          <div className="fade-up del4">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">About this product</p>
            <p className="text-gray-300 leading-relaxed text-[15px]">{product.description}</p>
          </div>

          {/* Meta grid */}
          <div className="fade-up del4 grid grid-cols-2 gap-3">
            {[
              { label: "Category", value: product.category },
              { label: "Status", value: statusInfo.label },
              { label: "Original Price", value: `₹${product.originalPrice.toLocaleString("en-IN")}` },
              { label: "Discount", value: disc > 0 ? `${disc}% off` : "No discount" },
              {
                label: "Last Updated",
                value: new Date(product.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
              },
              {
                label: "Listed On",
                value: new Date(product.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Qty + CTA */}
          <div className="fade-up del5 flex flex-col gap-4">
            {/* Qty selector */}
            {isAvailable && (
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-400 font-medium">Quantity</p>
                <div
                  className="flex items-center rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="qty-btn w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-150 text-lg disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-white font-bold text-sm">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                    disabled={qty >= maxQty}
                    className="qty-btn w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-150 text-lg disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-600">Max {maxQty}</span>
              </div>
            )}

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable || added}
              className={`shimmer-btn w-full py-4 rounded-2xl font-display font-bold text-base tracking-wide transition-all duration-300
                ${added
                  ? "bg-emerald-500 text-white scale-[0.98]"
                  : isAvailable
                  ? "text-white hover:scale-[1.02] active:scale-95"
                  : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/10"
                }
              `}
              style={
                isAvailable && !added
                  ? { background: "linear-gradient(90deg,#7c3aed,#db2777,#ea580c)", boxShadow: "0 8px 32px rgba(167,139,250,0.3)" }
                  : {}
              }
            >
              {added ? "✓ Added to Cart!" : !isAvailable ? "Unavailable" : `Add ${qty > 1 ? `${qty} items` : ""} to Cart`}
            </button>

            {/* Secondary: Continue Shopping */}
            <button
              onClick={() => router.push("/shop")}
              className="w-full py-3.5 rounded-2xl text-sm font-semibold text-gray-400 hover:text-white transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Trust badges */}
          <div className="fade-up del6 grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: "🚚", label: "Fast Delivery" },
              { icon: "🔄", label: "Easy Returns" },
              { icon: "🔒", label: "Secure Payment" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-xl">{icon}</span>
                <span className="text-[11px] text-gray-500 font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Decorative blobs ── */}
      <div
        aria-hidden
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", transform: "translate(-50%,-50%)" }}
      />
      <div
        aria-hidden
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(219,39,119,0.07) 0%, transparent 70%)", transform: "translate(50%,50%)" }}
      />
    </main>
  );
}