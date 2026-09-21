import Link from "next/link";
import { products } from "@/app/data/product";

export default function CataloguePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Page heading */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Catalogue
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
          Rechercher un produit
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Utilisez la recherche et les filtres pour parcourir les produits
          disponibles dans le catalogue.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-5 md:grid-cols-[1fr_240px]">
          {/* Search */}
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
            >
              Rechercher
            </label>

            <input
              id="search"
              type="search"
              placeholder="Nom du produit..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-sky-500 dark:focus:ring-sky-950"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
            >
              Catégorie
            </label>

            <select
              id="category"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option>Toutes les catégories</option>
              <option>Tabac</option>
              <option>Tabac en feuille</option>
              <option>Accessoires</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {products.length} produits
        </p>
      </div>

      {/* Product grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800"
          >
            {/* Image */}
            <div className="flex h-52 items-center justify-center bg-slate-200 dark:bg-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Image du produit
              </span>
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
                className="mt-5 block rounded-lg bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Voir les détails
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
