// app/page.tsx

import Link from "next/link";
import { products } from "@/app/data/product";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-400">
              Catalogue
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Découvrez notre catalogue de produits
            </h1>

            <p className="mt-6 text-lg leading-8 text-stone-300">
              Consultez les différentes catégories et fiches descriptives
              disponibles dans notre catalogue.
            </p>

            <Link
              href="/catalogue"
              className="mt-8 inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-500"
            >
              Consulter le catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Catégories</h2>
          <p className="mt-2 text-stone-600">
            Parcourez les différentes catégories du catalogue.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Tabac",
            "Tabac en feuille",
            "Accessoires",
          ].map((category) => (
            <Link
              key={category}
              href={`/catalogue?categorie=${encodeURIComponent(category)}`}
              className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-bold">{category}</h3>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Consulter les produits de cette catégorie.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-amber-700">
                Voir la catégorie →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Produits présentés</h2>
              <p className="mt-2 text-stone-600">
                Quelques exemples du catalogue.
              </p>
            </div>

            <Link
              href="/catalogue"
              className="hidden text-sm font-semibold text-amber-700 md:block"
            >
              Voir tout →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
              >
                <div className="flex h-48 items-center justify-center bg-stone-200">
                  <span className="text-sm text-stone-500">
                    Image du produit
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {product.description}
                  </p>

                  <Link
                    href={`/produit/${product.id}`}
                    className="mt-5 inline-block text-sm font-semibold text-stone-900 hover:text-amber-700"
                  >
                    Voir les détails →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
