"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type StoredUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const u = localStorage.getItem("auth_user");
    if (u) {
      try {
        setUser(JSON.parse(u) as StoredUser);
      } catch {
        setUser(null);
      }
    }
  }, [router]);

  const displayName = useMemo(() => {
    if (!user) return "";
    return `${user.firstName} ${user.lastName}`;
  }, [user]);

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    router.replace("/login");
  }

  const navItems = [
    { href: "/dashboard", label: "Home" },
    { href: "/dashboard/products", label: "All Products" },
    { href: "/dashboard/products-search", label: "Search Products" },
    { href: "/dashboard/products/detail", label: "Detail Product" },
    { href: "/dashboard/products/add", label: "Add Product" },
    { href: "/dashboard/products/edit", label: "Update Product" },
    { href: "/dashboard/products/delete", label: "Delete Product" },
  ];

  return (
    <div className="flex min-h-full flex-1 bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <aside className="hidden w-72 shrink-0 border-r border-black/10 bg-white p-4 dark:border-white/15 dark:bg-black md:flex md:flex-col">
        <div className="px-2 py-2">
          <div className="text-sm font-semibold tracking-tight">
            Mini Dashboard
          </div>
          <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {displayName ? `Signed in as ${displayName}` : "Loading user..."}
          </div>
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "rounded-xl px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-black/5 text-zinc-900 dark:bg-white/10 dark:text-zinc-50"
                    : "text-zinc-700 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10",
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={logout}
            className="mt-2 rounded-xl px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
            type="button"
          >
            Logout
          </button>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 px-4 py-3 backdrop-blur dark:border-white/15 dark:bg-black/60">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm font-medium">Dashboard</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {displayName ? `Welcome, ${displayName}` : ""}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
