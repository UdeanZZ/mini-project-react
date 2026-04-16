"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, Suspense } from "react";

function EditProductPageContent() {
  const sp = useSearchParams();
  const initialId = useMemo(() => sp.get("id") ?? "1", [sp]);

  const [id, setId] = useState(initialId);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedId = id.trim();
    if (!trimmedId) return;

    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/products/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: trimmedId,
          title,
          category,
          price,
          description,
        }),
      });

      const json = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(json.message || "Failed to update product");
        return;
      }

      setResult(json);
    } catch {
      setError("Network error while updating product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Edit Product
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Simulates DummyJSON{" "}
        <code className="font-mono">PUT /products/{"{id}"}</code> via{" "}
        <code className="font-mono">/api/products/update</code>.
      </p>

      <form onSubmit={onSubmit} className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Product ID
            </span>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="h-11 rounded-xl border border-black/10 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-black/30 dark:border-white/15 dark:text-zinc-50 dark:focus:border-white/30"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              New Title
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-xl border border-black/10 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-black/30 dark:border-white/15 dark:text-zinc-50 dark:focus:border-white/30"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Category
            </span>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-xl border border-black/10 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-black/30 dark:border-white/15 dark:text-zinc-50 dark:focus:border-white/30"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Price
            </span>
            <input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="h-11 rounded-xl border border-black/10 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-black/30 dark:border-white/15 dark:text-zinc-50 dark:focus:border-white/30"
              type="number"
              min={0}
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Description
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 rounded-xl border border-black/10 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none focus:border-black/30 dark:border-white/15 dark:text-zinc-50 dark:focus:border-white/30 resize-none"
              rows={3}
            />
          </label>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <button
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {result ? (
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-zinc-50 p-4 text-xs text-zinc-800 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProductPageContent />
    </Suspense>
  );
}
