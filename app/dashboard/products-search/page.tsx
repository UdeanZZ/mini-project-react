"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";
import ProductCardList from "@/components/ProductCardList";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
};

type SearchResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export default function ProductsSearchPage() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!q.trim()) {
        setData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/products/search?q=${encodeURIComponent(q)}`,
        );
        const json = (await res.json()) as SearchResponse & {
          message?: string;
        };

        if (!res.ok) {
          setError(json.message || "Search failed");
          return;
        }

        if (!cancelled) setData(json as SearchResponse);
      } catch {
        if (!cancelled) setError("Network error while searching");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQ(value);

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced search
    debounceTimeoutRef.current = setTimeout(() => {
      // The useEffect will handle the actual search
    }, 500); // 500ms delay
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const products = useMemo(() => data?.products ?? [], [data]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        List Product & Search
      </h1>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={handleInputChange}
          className="h-11 w-full rounded-xl border border-black/10 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-black/30 dark:border-white/15 dark:text-zinc-50 dark:focus:border-white/30"
          placeholder="Search products..."
          type="text"
        />
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {loading ? "Searching..." : data ? `${data.total} results` : ""}
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <ProductCardList products={products} />
    </div>
  );
}
