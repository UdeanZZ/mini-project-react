import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  brand?: string;
};

interface ProductCardDetailProps {
  product: Product;
}

export default function ProductCardDetail({ product }: ProductCardDetailProps) {
  return (
    <div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-zinc-50 p-4 dark:border-white/15 dark:bg-white/5">
      <div>
        <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Title
        </div>
        <div className="mt-1 text-zinc-900 dark:text-zinc-50">
          {product.title}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Category
          </div>
          <div className="mt-1 text-zinc-900 dark:text-zinc-50">
            {product.category}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Price
          </div>
          <div className="mt-1 text-zinc-900 dark:text-zinc-50">
            ${product.price}
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Description
        </div>
        <div className="mt-1 text-zinc-900 dark:text-zinc-50">
          {product.description}
        </div>
      </div>

      <div className="text-sm">
        <Link
          href="/dashboard/products"
          className="underline underline-offset-4 text-zinc-700 dark:text-zinc-300"
        >
          Back to products
        </Link>
      </div>
    </div>
  );
}
