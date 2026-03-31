// components/admin/ProductActionMenu.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  ToggleLeft,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";

export default function ProductActionMenu({
  productId,
  onDelete,
}: {
  productId: string;
  onDelete: (id: string) => void; // ← add this
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDelete = async () => {
    const res = await api.delete("/admin/product/delete", {
      data: { productId },
    });
    console.log(res);
    if (res.data.success) {
      toast.success("Product Deleted Successfully !!");
      router.refresh();
      onDelete(productId);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white hover:bg-white/[0.08] transition-all opacity-0 group-hover:opacity-100"
      >
        <MoreHorizontal className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] w-44 bg-[#16182a] border border-white/[0.07] rounded-2xl p-1.5 z-50 shadow-xl shadow-black/40"
          style={{ animation: "fadeIn .15s ease" }}
        >
          <style>{`@keyframes fadeIn{from{opacity:0;transform:scale(.95) translateY(-4px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>

          {[
            {
              icon: Eye,
              label: "View details",
              action: () =>
                router.push(`/admin/dashboard/products/${productId}`),
            },
            {
              icon: Pencil,
              label: "Edit product",
              action: () =>
                router.push(`/admin/dashboard/products/edit/${productId}`),
            }
          ].map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              onClick={() => {
                action();
                setOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.05] text-xs font-medium transition-all"
            >
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}

          <div className="h-px bg-white/[0.05] my-1" />

          <button
            onClick={() => {
              handleDelete();
              setOpen(false);
            }}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.08] text-xs font-medium transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete product
          </button>
        </div>
      )}
    </div>
  );
}
