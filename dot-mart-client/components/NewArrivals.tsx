"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getAllProductsPublic } from "@/modules/services/product/product.service";
import { toast } from "sonner";

export enum ProductBadge {
  HOT = "Hot Deal",
  NEW = "New",
  SALE = "Sale",
  FEATURED = "Featured",
  LIMITED = "Limited Offer",
}

export type Product = {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  category: any;
  price: number;
  originalPrice?: number;
  images: string[];
  stock: boolean;
  status: "enable" | "disable";
  badge?: ProductBadge;
  isBestDeal?: boolean;
  isNewArrivals?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Loading Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-blue-600 border-r-green-600 animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

export default function NewArrivalsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getAllProductsPublic({ page: 1, limit: 50 });

      // ✅ FIXED: correct nested array
      const list = res?.data?.data || [];

      setProducts(Array.isArray(list) ? list : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load products ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Featured products logic (enable + in stock + best deal/featured badge)
  const featuredProducts = useMemo(() => {
    return products
      .filter(
        (p) =>
          p?.status === "enable" &&
          p?.stock === true &&
          (p?.isNewArrivals === true || p?.badge === ProductBadge.NEW),
      )
      .sort(
        (a, b) =>
          new Date(b?.createdAt || "").getTime() -
          new Date(a?.createdAt || "").getTime(),
      )
      .slice(0, 8);
  }, [products]);

  // ✅ Add to cart handler
  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
    toast.success(`${product.name} added to cart ✅`);
  };

  // ✅ Full Page Loading UI
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="w-[90%] mx-auto py-10">
      <div className="mx-auto px-4">
        {/* Header */}
        <div
          className="
    flex flex-col gap-4
    sm:flex-row sm:items-center sm:justify-between
    mb-6
  "
        >
          {/* Title */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              New Arrivals
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              New products from our store
            </p>
          </div>

          {/* Button */}
          <Link
            href="/products"
            className="
      inline-flex items-center justify-center
      w-full sm:w-auto
      rounded-full
      border border-gray-300
      px-5 py-2.5
      text-sm font-medium
      hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200
      transition
    "
          >
            View All Products →
          </Link>
        </div>

        {/* Empty */}
        {featuredProducts.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-10">
            No featured products found ❌
          </p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => {
            const img = product.images?.[0] || "/placeholder.png";

            const discount =
              product.originalPrice && product.originalPrice > product.price
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100,
                  )
                : 0;

            return (
              <div
                key={product?._id}
                className="group rounded-xl border bg-white overflow-hidden
    hover:shadow-lg transition-all duration-300"
              >
                {/* ================= Image ================= */}
                <div
                  className="
      relative w-full
      h-40            /* mobile default (FIXED) */
      sm:h-40
      md:h-48
      bg-gray-50 overflow-hidden
    "
                >
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />

                  {discount > 0 && (
                    <span
                      className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-green-600
        text-white text-xs px-2 py-1 rounded-md"
                    >
                      -{discount}%
                    </span>
                  )}

                  {product?.badge && (
                    <span
                      className="absolute bottom-2 left-2 bg-black/70
        text-white text-[11px] px-2 py-1 rounded-md"
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* ================= Content ================= */}
                <div
                  className="
      p-4          /* mobile padding FIX */
      sm:p-3
      flex flex-col
    "
                >
                  <h3 className="text-sm font-semibold line-clamp-1 text-gray-800">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-blue-600">
                      ${product.price}
                    </span>

                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                  </div>

                  {/* Button */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="
        mt-4
        block w-full text-center
        text-sm font-semibold
        bg-gradient-to-r from-blue-600 to-green-600
        text-white
        py-2.5        /* taller button on mobile */
        rounded-full
        hover:from-blue-700 hover:to-green-700
        transition-all duration-300
      "
                  >
                    View Product
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
