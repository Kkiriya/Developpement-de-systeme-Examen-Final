// app/catalogue/page.tsx

import Link from "next/link";
import { products } from "@/app/data/product";

export default function CataloguePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
          Catalogue
        </p>

        <h1 className="mt-2 text-4xl font-bold">Rechercher un produit</h1>

        <p className="mt-3 max-w-2xl text-stone-600">
          Utilisez la recherche et les filtres pour parcourir les produits
          disponibles dans la maquette.
        </p>
      </div>

      {/* Search / filters */}
      <div className="mb-10 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-[1fr_240px]">
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-semibold"
            >
              Rechercher
            </label>

            <input
              id="search"
              type="search"
              placeholder="Nom du produit..."
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold"
            >
              Catégorie
            </label>

            <select
              id="category"
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
            >
              <option>Toutes les catégories</option>
              <option>Tabac</option>
              <option>Tabac en feuille</option>
              <option>Accessoires</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-stone-600">{products.length} produits</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-52 items-center justify-center bg-stone-200">
              <span className="text-sm text-stone-500">Image du produit</span>
            </div>

            <div className="p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                {product.category}
              </span>

              <h2 className="mt-2 text-xl font-bold">{product.name}</h2>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">
                {product.description}
              </p>

              <Link
                href={`/produit/${product.id}`}
                className="mt-5 block rounded-lg bg-stone-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-stone-700"
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
