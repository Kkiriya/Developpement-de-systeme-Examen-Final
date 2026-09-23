"use client";

import SearchBar from "@/app/components/SearchBar";
import ProductCard from "@/app/components/ProductCard";
import CategoryFilter from "@/app/components/CategoryFilter";
import { useLanguage } from "@/app/components/LanguageProvider";
import { products } from "@/app/data/product";

export default function ProductCatalog() {
  const { t } = useLanguage();

  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );

  const query = params.get("q")?.toLowerCase().trim() ?? "";
  const category = params.get("category")?.toLowerCase().trim() ?? "";

  const filteredProducts = products.filter((product) => {
    const searchText = `
      ${product.name}
      ${product.description}
      ${product.category}
    `.toLowerCase();

    const matchesSearch = searchText.includes(query);

    const matchesCategory =
      !category ||
      category === "all" ||
      product.category.toLowerCase() === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
        {t.catalogue.title}
      </h1>

      <div className="mb-8">
        <div className="grid gap-5 md:grid-cols-[1fr_240px]">
          <SearchBar />
          <CategoryFilter />
        </div>
      </div>

      <div className="mb-5">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? t.catalogue.product
            : t.catalogue.products}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            {t.catalogue.noProducts}
          </p>

          {query && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t.catalogue.noResultsFor} « {query} »
            </p>
          )}

          {!query && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t.catalogue.tryAgain}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
