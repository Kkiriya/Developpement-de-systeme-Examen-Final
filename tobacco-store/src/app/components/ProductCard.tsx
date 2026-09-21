"use client";

import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/app/data/product";
import { useLanguage } from "./LanguageProvider";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();

  const formattedPrice = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(product.price);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800">
      <div className="relative h-52 bg-slate-200 dark:bg-slate-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
          {product.category}
        </span>

        <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
          {product.name}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {formattedPrice}
          </span>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            / {product.qty}
          </span>
        </div>

        <Link
          href={`/produit/${product.id}`}
          className="mt-5 block rounded-lg bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          {t.product.information}
        </Link>
      </div>
    </article>
  );
}
