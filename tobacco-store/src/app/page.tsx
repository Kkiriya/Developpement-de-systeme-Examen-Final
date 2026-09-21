import Link from "next/link";
import { products } from "@/app/data/product";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sky-600 dark:bg-sky-800">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-sky-100">
              AirSmokes
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Découvrez notre catalogue
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-50">
              Consultez les différentes catégories et fiches descriptives
              disponibles dans notre catalogue.
            </p>

            <Link
              href="/catalogue"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-sky-700 transition hover:bg-sky-50"
            >
              Consulter le catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Explorer
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Catégories
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Parcourez les différentes catégories du catalogue.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {["Tabac", "Tabac en feuille", "Accessoires"].map((category) => (
            <Link
              key={category}
              href={`/catalogue?categorie=${encodeURIComponent(category)}`}
              className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                <span className="text-xl">◆</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {category}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Consulter les produits de cette catégorie.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-sky-600 dark:text-sky-400">
                Voir la catégorie →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                Catalogue
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                Produits présentés
              </h2>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Quelques exemples du catalogue.
              </p>
            </div>

            <Link
              href="/catalogue"
              className="hidden text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 md:block"
            >
              Voir tout →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
              >
                {/* Image */}
                <div className="flex h-48 items-center justify-center bg-slate-200 dark:bg-slate-800">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Image du produit
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {new Intl.NumberFormat("fr-CA", {
                        style: "currency",
                        currency: "CAD",
                      }).format(product.price)}
                    </span>

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      / {product.qty}
                    </span>
                  </div>

                  <Link
                    href={`/produit/${product.id}`}
                    className="mt-5 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400"
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
