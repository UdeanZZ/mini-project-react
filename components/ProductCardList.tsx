import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
};

interface ProductCardListProps {
  products: Product[];
}

export default function ProductCardList({ products }: ProductCardListProps) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <Link
          key={p.id}
          href={`/dashboard/products/${p.id}`}
          className="group rounded-2xl border border-black/10 bg-zinc-50 p-4 transition-colors hover:bg-black/5 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {p.title}
              </div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                {p.category}
              </div>
            </div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              ${p.price}
            </div>
          </div>

          <div className="mt-3 text-xs text-zinc-600 line-clamp-3 dark:text-zinc-400">
            {p.description}
          </div>

          <div className="mt-3 text-xs font-medium text-zinc-700 group-hover:underline dark:text-zinc-300">
            View details
          </div>
        </Link>
      ))}
    </div>
  );
}
