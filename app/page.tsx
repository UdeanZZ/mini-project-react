"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    router.replace(token ? "/dashboard" : "/login");
  }, [router]);

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm dark:border-white/15 dark:bg-black">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Redirecting...
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Checking your session.
        </p>
      </main>
    </div>
  );
}
