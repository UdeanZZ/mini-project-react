"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCardDetail from "@/components/ProductCardDetail";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  brand?: string;
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/products/${id}`);
        const json = (await res.json()) as Product & { message?: string };

        if (!res.ok) {
          setError(json.message || "Failed to load product");
          return;
        }

        if (!cancelled) setProduct(json);
      } catch {
        if (!cancelled) setError("Network error while loading product");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Detail Product
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Product ID: <span className="font-mono">{id}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/dashboard/products/edit?id=${id}`}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/10"
          >
            Edit
          </Link>
          <Link
            href={`/dashboard/products/delete?id=${id}`}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-red-500/30 px-4 text-sm font-medium text-red-700 transition-colors hover:bg-red-500/10 dark:text-red-300"
          >
            Delete
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          Loading...
        </div>
      ) : error ? (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : product ? (
        <ProductCardDetail product={product} />
      ) : null}
    </div>
  );
}
