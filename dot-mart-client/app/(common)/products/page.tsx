"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

import { getAllProductsPublic } from "@/modules/services/product/product.service";
import { getAllCategories } from "@/modules/services/category/category.service";

export enum ProductBadge {
  HOT = "Hot Deal",
  NEW = "New",
  SALE = "Sale",
  FEATURED = "Featured",
  LIMITED = "Limited Offer",
}

type Category = {
  _id: string;
  name: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  price: number;
  originalPrice?: number;
  images: string[];
  stock: boolean;
  status: "enable" | "disable";
  badge?: ProductBadge | string;
  createdAt?: string;
};

type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  sortOrder: "asc" | "desc";
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryCategory = searchParams.get("category") || "all";
  const querySearch = searchParams.get("search") || "";
  const queryPage = Number(searchParams.get("page") || "1");
  const queryLimit = Number(searchParams.get("limit") || "12");
  const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: queryLimit,
    total: 0,
    totalPages: 1,
    sortOrder: "desc",
  });

  const [search, setSearch] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);

  useEffect(() => {
    setSearch(querySearch);
    setSelectedCategory(queryCategory);
  }, [querySearch, queryCategory]);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      const list = res?.data?.data || res?.data || [];
      setCategories(Array.isArray(list) ? list : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load categories ❌");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProductsPublic({
        search: querySearch || undefined,
        category: querySearch
          ? undefined
          : queryCategory !== "all"
            ? queryCategory
            : undefined,
        page: queryPage,
        limit: queryLimit,
        sortOrder,
      });

      setProducts(res?.data?.data || []);
      setMeta(res?.data?.meta);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load products ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [querySearch, queryCategory, queryPage, queryLimit, sortOrder]);

  const activeProducts = useMemo(
    () => products.filter((p) => p.status === "enable"),
    [products],
  );

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    params.set("page", "1");

    router.push(`/products?${params.toString()}`);
  };

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/products?${params.toString()}`);
  };

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              All Products
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Browse & filter products from our store
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="
                  w-full h-12 pl-12 pr-4 rounded-full border border-gray-300
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                  outline-none
                "
              />
            </div>

            <button
              disabled={loading}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("search", search);
                params.delete("category");
                params.set("page", "1");
                router.push(`/products?${params.toString()}`);
                setSearch("");
              }}
              className="
                mt-3 w-full rounded-full
                bg-gradient-to-r from-blue-600 to-green-600
                text-white py-2 font-semibold
                hover:from-blue-700 hover:to-green-700
                transition
              "
            >
              Search →
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-semibold">Category:</p>
            <select
              value={selectedCategory}
              onChange={(e) => updateQuery("category", e.target.value)}
              className="h-11 rounded-full border px-4 text-sm "
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold">Sort:</p>
            <select
              value={sortOrder}
              onChange={(e) => updateQuery("sortOrder", e.target.value)}
              className="h-11 rounded-full border px-4 text-sm"
            >
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center py-16 text-gray-500">Loading products...</p>
        )}

        {/* Products */}
        {!loading && activeProducts.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center shadow-sm">
            <p className="text-lg font-semibold">No products found 😥</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeProducts.map((product) => {
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
                  key={product._id}
                  className="
                    group rounded-2xl border border-gray-100 bg-white
                    overflow-hidden transition-all duration-300
                    hover:shadow-lg hover:-translate-y-1
                  "
                >
                  <div className="relative h-52 bg-gray-50">
                    <Image
                      src={img}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />

                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-green-600 text-white text-xs px-3 py-1 rounded-full">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-1">
                      {product.category?.name}
                    </p>

                    <h3 className="text-sm font-bold line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-base font-bold text-blue-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="
                        mt-4 block w-full text-center text-sm font-semibold
                        bg-gradient-to-r from-blue-600 to-green-600
                        text-white py-2 rounded-full
                        hover:from-blue-700 hover:to-green-700
                        transition
                      "
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && meta.totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            {Array.from({ length: meta.totalPages }).map((_, i) => {
              const page = i + 1;
              const active = page === meta.page;

              return (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
