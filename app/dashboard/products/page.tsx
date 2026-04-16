"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductCardList from "@/components/ProductCardList";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export default function ProductsPage() {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products");
        const json = (await res.json()) as ProductsResponse & {
          message?: string;
        };

        if (!res.ok) {
          setError(json.message || "Failed to load products");
          return;
        }

        if (!cancelled) setData(json as ProductsResponse);
      } catch {
        if (!cancelled) setError("Network error while loading products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const products = useMemo(() => data?.products ?? [], [data]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            List Products
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Loaded from <code className="font-mono">/api/products</code>
          </p>
        </div>

        <Link
          href="/dashboard/products/add"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Add Product
        </Link>
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          Loading...
        </div>
      ) : error ? (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : (
        <ProductCardList products={products} />
      )}
    </div>
  );
}
