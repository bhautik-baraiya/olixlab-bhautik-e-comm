"use client";

import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Header from "@/components/admin/Header";
import Link from "next/link";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import ProductActionMenu from "@/components/admin/ProductActionMenu";
import { useRouter } from "next/navigation";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/product/get");
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-screen">
      <Header title="Products" subtitle="Manage your product catalog" />

      <div className="p-6 space-y-5">
        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
            <Input
              placeholder="Search products..."
              className="h-9 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl pl-9 text-sm focus:border-violet-500/50"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.08] text-xs"
          >
            <Filter className="w-3.5 h-3.5 mr-2" /> Filter
          </Button>
          <div className="flex-1" />
          <Link href="/admin/dashboard/products/add">
            <Button
              size="sm"
              className="h-9 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs shadow-lg shadow-violet-500/20"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Product
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15]">
          <table className="w-full">
            <thead className="w-full">
              <tr className="border-b border-white/[0.06]">
                {[
                  "Product",
                  "Category",
                  "Price",
                  "Stock",
                  "Status",
                  "Action",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-white/25 text-[11px] font-bold uppercase tracking-widest px-5 py-4 last:text-right"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full">
              {products.map((p) => (
                <tr
                  key={p.id}
                  onDoubleClick={() =>
                    router.push(`/admin/dashboard/products/${p.id}`)
                  }
                  className="w-full border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 border border-violet-500/15 flex items-center justify-center flex-shrink-0">
                        <img
                          src={p.image}
                          className="w-full h-full  text-violet-400"
                        />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">
                          {p.name}
                        </p>
                        <p className="text-white/30 text-xs">{p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-white/40 text-sm">{p.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-white font-bold text-sm">
                      {p.sellingPrice}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        p.stock === 0
                          ? "text-red-400"
                          : p.stock < 15
                            ? "text-amber-400"
                            : "text-white/60",
                      )}
                    >
                      {p.stock === 0 ? "—" : p.stock}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "text-[11px] font-bold px-2.5 py-1 rounded-lg border",
                        statusStyle[p.status],
                      )}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ProductActionMenu
                      onDelete={handleProductDelete}
                      productId={p.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
