"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const initialId = useMemo(() => sp.get("id") ?? "1", [sp]);
  const [id, setId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);

  function backToList() {
    router.push("/dashboard/products");
  }

  async function onDelete() {
    const trimmedId = id.trim();
    if (!trimmedId) return;

    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: trimmedId,
        }),
      });

      const json = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(json.message || "Failed to delete product");
        return;
      }

      setResult(json);
    } catch {
      setError("Network error while deleting product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-red-500/30 bg-white p-6 shadow-sm dark:border-red-500/30 dark:bg-black">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Delete Product
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Simulates DummyJSON{" "}
        <code className="font-mono">DELETE /products/{"{id}"}</code> via{" "}
        <code className="font-mono">/api/products/delete</code>.
      </p>

      <label className="mt-6 flex flex-col gap-2">
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

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onDelete}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60"
          type="button"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {result ? (
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-zinc-50 p-4 text-xs text-zinc-800 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200">
          {JSON.stringify(result, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
