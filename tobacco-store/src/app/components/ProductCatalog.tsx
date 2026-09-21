"use client";

import { useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/app/data/product";

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes les catégories");

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "Toutes les catégories" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-5 md:grid-cols-[1fr_240px]">
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
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nom du produit..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-sky-500 dark:focus:ring-sky-950"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
            >
              Catégorie
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
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

      <div className="mb-5">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "produit" : "produits"}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Aucun produit trouvé
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Essayez une autre recherche ou une autre catégorie.
          </p>
        </div>
      )}
    </>
  );
}
