"use client";

import Link from "next/link";

import ProductCard from "@/app/components/ProductCard";
import { useLanguage } from "@/app/components/LanguageProvider";
import { products } from "@/app/data/product";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
              AirSmokes
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.home.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              {t.home.heroDescription}
            </p>

            <div className="mt-8">
              <Link
                href="/catalogue"
                className="inline-block rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
              >
                {t.home.viewCatalogue}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
              {t.home.categories}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {t.home.browseCategories}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/catalogue?category=tabac"
              className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.home.tobacco}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {t.home.tobaccoDescription}
              </p>
            </Link>

            <Link
              href="/catalogue?category=tabac%20en%20feuille"
              className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.home.leafTobacco}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {t.home.leafTobaccoDescription}
              </p>
            </Link>

            <Link
              href="/catalogue?category=accessoires"
              className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.home.accessories}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {t.home.accessoriesDescription}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-slate-100 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                {t.home.products}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {t.home.featuredProducts}
              </h2>
            </div>

            <Link
              href="/catalogue"
              className="hidden text-sm font-semibold text-sky-600 hover:text-sky-700 sm:block dark:text-sky-400 dark:hover:text-sky-300"
            >
              {t.home.viewAll}
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
