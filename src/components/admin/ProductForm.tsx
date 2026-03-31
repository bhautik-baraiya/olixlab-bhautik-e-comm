"use client";

import { useState } from "react";
import { Upload, Plus, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/admin/Header";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import Loader from "../ui/loader";

const categories = [
  "Electronics",
  "Footwear",
  "Apparel",
  "Home & Living",
  "Sports",
  "Beauty",
  "Books",
];
const tagsList = [
  "New Arrival",
  "Best Seller",
  "Sale",
  "Featured",
  "Limited Edition",
];
const statusOptions = [
  { name: "Active", value: "ACTIVE" },
  { name: "Inactive", value: "INACTIVE" },
  { name: "Out Of Stock", value: "OUT_OF_STOCK" },
];

interface Product {
  id?: string;
  name: string;
  description: string;
  sellingPrice: string;
  originalPrice: string;
  stock: string;
  category: string;
  tags: string[];
  status: string;
  image?: string; // existing image URL (edit mode only)
}

interface ProductFormProps {
  initialData?: Product | null; // undefined = add mode, defined = edit mode
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const isEdit = !!initialData;
  const router = useRouter();

  const [productData, setProductData] = useState({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    sellingPrice: initialData?.sellingPrice ?? "",
    originalPrice: initialData?.originalPrice ?? "",
    stock: initialData?.stock ?? "",
    category: initialData?.category ?? "",
    tags: initialData?.tags ?? ([] as string[]),
    status: initialData?.status ?? "ACTIVE",
    images: [] as File[],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag: string) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const validateProductData = (data: typeof productData) => {
    // Check required text fields
    if (!data.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!data.description.trim()) {
      toast.error("Product description is required");
      return false;
    }

    // Check prices
    if (!data.sellingPrice || data.sellingPrice <= 0) {
      toast.error("Selling price must be greater than 0");
      return false;
    }
    if (!data.originalPrice || data.originalPrice <= 0) {
      toast.error("Original price must be greater than 0");
      return false;
    }

    if (Number(data.sellingPrice) >= Number(data.originalPrice)) {
      console.log(Number(data.sellingPrice), Number(data.originalPrice));
      console.log(data.sellingPrice >= data.originalPrice);
      toast.error("Selling price must not be greater than Original price");
      return false;
    }

    // Stock
    if (!data.stock && data.stock !== 0) {
      toast.error("Stock quantity is required");
      return false;
    }

    // Category
    if (!data.category) {
      toast.error("Please select a category");
      return false;
    }

    // Tags
    if (data.tags.length === 0) {
      toast.error("Select at least one tag");
      return false;
    }

    // Status
    if (!data.status) {
      toast.error("Please select a status");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProductData(productData)) return;

    // Image required only for add, not edit
    if (!isEdit && productData.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("originalPrice", productData.originalPrice);
      formData.append("sellingPrice", productData.sellingPrice);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);
      formData.append("tags", JSON.stringify(productData.tags));
      formData.append("status", productData.status);

      if (productData.images.length > 0) {
        formData.append("image", productData.images[0]);
      }

      if (isEdit) {
        // ← edit mode
        formData.append("productId", initialData!.id!);
        const res = await api.post("/admin/product/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          toast.success("Product updated successfully!");
          router.push("/admin/dashboard/products");
        } else {
          toast.error(res.data.message);
        }
      } else {
        // ← add mode
        const res = await api.post("/admin/product/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          toast.success("Product added successfully!");
          router.push("/admin/dashboard/products");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        title={isEdit ? "Edit Product" : "Add Product"}
        subtitle={
          isEdit ? "Update product details" : "Create a new product listing"
        }
      />

      <div className="p-6">
        <Link href="/admin/dashboard/products">
          <Button
            variant="ghost"
            size="sm"
            className="mb-5 text-white/40 hover:text-white h-8 px-3 rounded-xl hover:bg-white/[0.04] text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Products
          </Button>
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* Left: Main info */}
            <div className="xl:col-span-2 space-y-4">
              {/* Basic info card */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-4">
                <h3 className="text-white font-black text-sm">
                  Basic Information
                </h3>

                <div className="space-y-1.5">
                  <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                    Product Name
                  </Label>
                  <Input
                    value={productData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Nike Air Max 270"
                    className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                    Description
                  </Label>
                  <Textarea
                    value={productData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    placeholder="Describe the product in detail..."
                    rows={4}
                    className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                      Selling Price ($)
                    </Label>
                    <Input
                      type="number"
                      value={productData.sellingPrice}
                      onChange={(e) =>
                        handleChange("sellingPrice", e.target.value)
                      }
                      placeholder="0.00"
                      className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                      Original Price ($)
                    </Label>
                    <Input
                      type="number"
                      value={productData.originalPrice}
                      onChange={(e) =>
                        handleChange("originalPrice", e.target.value)
                      }
                      placeholder="0.00"
                      className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                      Stock Quantity
                    </Label>
                    <Input
                      type="number"
                      value={productData.stock}
                      onChange={(e) => handleChange("stock", e.target.value)}
                      placeholder="0"
                      className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
                    />
                  </div>
                </div>
              </div>

              {/* Image upload card */}
              {/* Image upload card */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-4">
                <h3 className="text-white font-black text-sm">
                  Product Images
                </h3>

                <label className="border-2 border-dashed border-white/[0.08] rounded-xl p-8 text-center hover:border-violet-500/30 transition-colors cursor-pointer group block">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleChange("images", [file]);
                    }}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-violet-500/15 transition-colors">
                    <Upload className="w-5 h-5 text-violet-400" />
                  </div>
                  <p className="text-white/50 text-sm font-medium">
                    Drop images here or click to browse
                  </p>
                  <p className="text-white/25 text-xs mt-1">
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </label>

                {/* Show existing image in edit mode */}
                {isEdit &&
                  initialData?.image &&
                  productData.images.length === 0 && (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={initialData.image}
                        alt="current"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 right-0 text-[9px] text-center bg-black/60 text-white/60 py-0.5">
                        Current
                      </span>
                    </div>
                  )}

                {/* New image preview */}
                {productData.images.length > 0 && (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={URL.createObjectURL(productData.images[0])}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleChange("images", [])}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/80 text-white text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Meta */}
            <div className="space-y-4">
              {/* Category */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-3">
                <h3 className="text-white font-black text-sm">Category</h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleChange("category", cat)}
                      className={cn(
                        "text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                        productData.category === cat
                          ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                          : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent",
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-3">
                <h3 className="text-white font-black text-sm flex items-center gap-2">
                  <Tag className="w-4 h-4 text-violet-400" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all",
                        productData.tags.includes(tag)
                          ? "bg-violet-500/15 text-violet-300 border-violet-500/30"
                          : "bg-white/[0.03] text-white/40 border-white/[0.06] hover:text-white/60 hover:border-white/10",
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="rounded-2xl border border-white/[0.06] bg-[#0C0E15] p-5 space-y-3">
                <h3 className="text-white font-black text-sm">Status</h3>
                <div className="space-y-2">
                  {statusOptions.map((s) => (
                    <label
                      key={s.name}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="status"
                        checked={productData.status === s.value}
                        onChange={() => handleChange("status", s.value)}
                        className="accent-violet-500"
                      />
                      <span className="text-white/50 text-sm group-hover:text-white/80 transition-colors">
                        {s.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader/>
                      {isEdit ? "Updating..." : "Publishing..."}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      {isEdit ? "Update Product" : "Publish Product"}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
