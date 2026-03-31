"use client";

import ProductForm from "@/components/admin/ProductForm";
import { api } from "@/lib/axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Edit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/admin/product/get/${id}`).then((res) => {
      console.log(res.data.data);
      setProduct(res.data.data);
    });
  }, [id]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );

  return <ProductForm initialData={product} />;
}
