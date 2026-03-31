"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import Header from "@/components/admin/Header";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Tag,
  Package,
  BarChart2,
  Clock,
  Edit,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const statusStyle: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  INACTIVE: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  OUT_OF_STOCK: "bg-red-500/10 text-red-400 border-red-500/20",
};

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

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-white/[0.05]", className)} />
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/product/get/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const discount =
    product && product.originalPrice !== product.sellingPrice
      ? Math.round(
          ((product.originalPrice - product.sellingPrice) /
            product.originalPrice) *
            100
        )
      : 0;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen">
      <Header title="Product Details" subtitle="View full product information" />

      <div className="p-6 space-y-6">
        {/* Back + Actions bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>

          {!loading && product && (
            <div className="flex items-center gap-2">
              <Link href={`/admin/dashboard/products/edit/${product.id}`}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.08] text-xs"
                >
                  <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                </Button>
              </Link>
              <Button
                size="sm"
                className="h-9 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
              </Button>
            </div>
          )}
        </div>

        {/* ── Main Content ── */}
        {loading ? (
          /* Skeleton */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-4">
              <Skeleton className="w-full aspect-square" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="lg:col-span-3 space-y-5">
              <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-6 space-y-4">
                <Skeleton className="h-7 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-3"
                  >
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : product ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* ── Left: Image ── */}
            <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 flex flex-col gap-4">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5 border border-white/[0.06]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow">
                    -{discount}% OFF
                  </span>
                )}
                <span
                  className={cn(
                    "absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-lg border",
                    statusStyle[product.status]
                  )}
                >
                  {product.status}
                </span>
              </div>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Timestamps */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-white/30">
                    <Clock className="w-3.5 h-3.5" /> Created
                  </span>
                  <span className="text-white/50">{formatDate(product.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-white/30">
                    <Clock className="w-3.5 h-3.5" /> Updated
                  </span>
                  <span className="text-white/50">{formatDate(product.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* ── Right: Details ── */}
            <div className="lg:col-span-3 space-y-5">
              {/* Name + Description */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-6 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-violet-400">
                  {product.category}
                </span>
                <h2 className="text-white text-2xl font-bold leading-snug">
                  {product.name}
                </h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  {product.description}
                </p>
                <p className="text-white/20 text-[11px] font-mono">ID: {product.id}</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Selling Price */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-1">
                  <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <ShoppingCart className="w-3.5 h-3.5" /> Selling Price
                  </p>
                  <p className="text-white text-2xl font-black">
                    ${product.sellingPrice}
                  </p>
                  {discount > 0 && (
                    <p className="text-white/30 text-sm line-through">
                      ${product.originalPrice}
                    </p>
                  )}
                </div>

                {/* Original Price */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-1">
                  <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5" /> Original Price
                  </p>
                  <p className="text-white text-2xl font-black">
                    ${product.originalPrice}
                  </p>
                  {discount > 0 && (
                    <p className="text-emerald-400 text-xs font-semibold">
                      You save {discount}%
                    </p>
                  )}
                </div>

                {/* Stock */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-1">
                  <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" /> Stock
                  </p>
                  <p
                    className={cn(
                      "text-2xl font-black",
                      product.stock === 0
                        ? "text-red-400"
                        : product.stock < 15
                        ? "text-amber-400"
                        : "text-white"
                    )}
                  >
                    {product.stock === 0 ? "Out of Stock" : product.stock}
                  </p>
                  {product.stock > 0 && product.stock < 15 && (
                    <p className="text-amber-400/70 text-xs">Low stock warning</p>
                  )}
                </div>

                {/* Status */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-1">
                  <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest">
                    Status
                  </p>
                  <span
                    className={cn(
                      "inline-block text-sm font-bold px-3 py-1 rounded-lg border mt-1",
                      statusStyle[product.status]
                    )}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Not found */
          <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] flex flex-col items-center justify-center py-24 gap-3">
            <Package className="w-10 h-10 text-white/10" />
            <p className="text-white/30 font-semibold">Product not found</p>
            <button
              onClick={() => router.back()}
              className="text-violet-400 text-sm hover:underline"
            >
              Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}