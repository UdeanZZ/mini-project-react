"use client";

import { useEffect, useState } from "react";

type StoredUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const u = localStorage.getItem("auth_user");
    if (u) {
      try {
        setUser(JSON.parse(u) as StoredUser);
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-black">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Home
      </h1>

      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Welcome user:{" "}
        <span className="font-medium text-zinc-900 dark:text-zinc-50">
          {user ? `${user.firstName} ${user.lastName}` : "(loading...)"}
        </span>
      </p>
    </div>
  );
}
