"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
  image?: string;
}

interface ProductFormProps {
  initialData?: Product | null;
}

interface FormValues {
  name: string;
  description: string;
  sellingPrice: string;
  originalPrice: string;
  stock: string;
  category: string;
  tags: string[];
  status: string;
  images: File[];
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const isEdit = !!initialData;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      sellingPrice: initialData?.sellingPrice ?? "",
      originalPrice: initialData?.originalPrice ?? "",
      stock: initialData?.stock ?? "",
      category: initialData?.category ?? "",
      tags: initialData?.tags ?? ([] as string[]),
      status: initialData?.status ?? "ACTIVE",
      images: [] as File[],
    },
  });

  // Watch custom field values to update UI correctly
  const selectedCategory = watch("category");
  const selectedTags = watch("tags");
  const selectedStatus = watch("status");
  const selectedImages = watch("images");

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    
    // update value and trigger validation
    setValue("tags", newTags, { shouldValidate: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("images", [file], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Custom Validations that are better handled here than via standard rules
    if (Number(data.sellingPrice) >= Number(data.originalPrice)) {
      toast.error("Selling price must not be greater than Original price");
      return;
    }

    if (!isEdit && data.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (data.tags.length === 0) {
      toast.error("Select at least one tag");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("originalPrice", data.originalPrice);
      formData.append("sellingPrice", data.sellingPrice);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("status", data.status);

      if (data.images.length > 0) {
        formData.append("image", data.images[0]);
      }

      if (isEdit) {
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

        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("name", { required: "Product name is required" })}
                    placeholder="e.g. Nike Air Max 270"
                    className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
                  />
                  {errors.name && (
                    <p className="text-red-400/80 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                    Description
                  </Label>
                  <Textarea
                    {...register("description", { required: "Product description is required" })}
                    placeholder="Describe the product in detail..."
                    rows={4}
                    className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-400/80 text-xs mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                      Selling Price ($)
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("sellingPrice", { 
                        required: "Selling price is required",
                        min: { value: 0.01, message: "Price must be > 0" }
                      })}
                      placeholder="0.00"
                      className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
                    />
                    {errors.sellingPrice && (
                      <p className="text-red-400/80 text-xs mt-1">{errors.sellingPrice.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                      Original Price ($)
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("originalPrice", { 
                        required: "Original price is required",
                        min: { value: 0.01, message: "Price must be > 0" }
                      })}
                      placeholder="0.00"
                      className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
                    />
                    {errors.originalPrice && (
                      <p className="text-red-400/80 text-xs mt-1">{errors.originalPrice.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                      Stock Quantity
                    </Label>
                    <Input
                      type="number"
                      {...register("stock", { 
                        required: "Stock quantity is required",
                        min: { value: 0, message: "Stock cannot be negative" }
                      })}
                      placeholder="0"
                      className="h-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl text-sm focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
                    />
                    {errors.stock && (
                      <p className="text-red-400/80 text-xs mt-1">{errors.stock.message}</p>
                    )}
                  </div>
                </div>
              </div>

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
                    onChange={handleImageChange}
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
                  selectedImages.length === 0 && (
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
                {selectedImages.length > 0 && (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={URL.createObjectURL(selectedImages[0])}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setValue("images", [])}
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
                {/* Hidden input to register category for validation */}
                <input type="hidden" {...register("category", { required: "Please select a category" })} />
                <div className="grid grid-cols-1 gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setValue("category", cat, { shouldValidate: true })}
                      className={cn(
                        "text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                        selectedCategory === cat
                          ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                          : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-transparent",
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-red-400/80 text-xs mt-1">{errors.category.message}</p>
                )}
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
                        selectedTags.includes(tag)
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
                        value={s.value}
                        {...register("status", { required: "Status is required" })}
                        className="accent-violet-500"
                      />
                      <span className="text-white/50 text-sm group-hover:text-white/80 transition-colors">
                        {s.name}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.status && (
                  <p className="text-red-400/80 text-xs mt-1">{errors.status.message}</p>
                )}
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