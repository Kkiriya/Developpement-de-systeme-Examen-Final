import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/app/data/product";

export default function Home() {
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
              Découvrez notre catalogue
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Explorez notre catalogue de produits et consultez les informations
              disponibles pour chaque produit.
            </p>

            <div className="mt-8">
              <Link
                href="/catalogue"
                className="inline-block rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
              >
                Voir le catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Catégories
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Parcourir par catégorie
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/catalogue"
            className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Tabac
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Consultez les produits de la catégorie tabac.
            </p>
          </Link>

          <Link
            href="/catalogue"
            className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Tabac en feuille
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Découvrez les produits de tabac en feuille.
            </p>
          </Link>

          <Link
            href="/catalogue"
            className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Accessoires
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Consultez les accessoires disponibles dans le catalogue.
            </p>
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-slate-100 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Produits
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                Produits présentés
              </h2>
            </div>

            <Link
              href="/catalogue"
              className="hidden text-sm font-semibold text-sky-600 hover:text-sky-700 sm:block dark:text-sky-400 dark:hover:text-sky-300"
            >
              Voir tout →
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
