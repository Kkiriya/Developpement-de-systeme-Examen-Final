"use client";

import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/app/data/product";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "../context/CartContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(product.price);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800">
      {/* Everything above the cart button is clickable */}
      <Link href={`/produit/${product.id}`} className="block">
        <div className="relative h-52 bg-slate-200 dark:bg-slate-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 pb-4">
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

          <div className="mt-4 text-sm font-semibold text-sky-600 dark:text-sky-400">
            {t.product.information} →
          </div>
        </div>
      </Link>

      {/* Cart button stays outside the Link */}
      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.836L5.6 6.75m0 0h13.65c.668 0 1.163.615.994 1.262l-1.35 5.25a1 1 0 0 1-.97.75H8.07a1 1 0 0 1-.97-.757L5.6 6.75Zm2.47 7.262-1 3.5a1 1 0 0 0 .963 1.275h10.434M9 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            />
          </svg>
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}
