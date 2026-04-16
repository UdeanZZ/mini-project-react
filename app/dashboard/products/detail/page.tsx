"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetailProductEntryPage() {
  const router = useRouter();
  const [id, setId] = useState("1");

  function go() {
    const trimmed = id.trim();
    if (!trimmed) return;
    router.push(`/dashboard/products/${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Detail Product
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Enter a product ID to view details.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="h-11 w-full rounded-xl border border-black/10 bg-transparent px-3 text-sm text-zinc-900 outline-none focus:border-black/30 dark:border-white/15 dark:text-zinc-50 dark:focus:border-white/30"
          type="text"
        />
        <button
          onClick={go}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          type="button"
        >
          View
        </button>
      </div>
    </div>
  );
}
