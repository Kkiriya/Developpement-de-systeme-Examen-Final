"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { products } from "@/app/data/product";
import { useLanguage } from "@/app/components/LanguageProvider";
import { useCart } from "@/app/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const id = params.id as string;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t.catalogue.noProducts}
        </h1>

        <Link
          href="/catalogue"
          className="mt-6 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
        >
          {t.product.back}
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(product.price);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/catalogue"
        className="text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
      >
        ← {t.product.back}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="relative min-h-[450px] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {product.category}
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {product.description}
          </p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-sky-600 dark:text-sky-400">
              {formattedPrice}
            </span>

            <span className="text-base text-slate-500 dark:text-slate-400">
              / {product.qty}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
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

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.product.information}
            </h2>

            <ul className="mt-4 space-y-3">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="text-sky-600 dark:text-sky-400">•</span>

                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
