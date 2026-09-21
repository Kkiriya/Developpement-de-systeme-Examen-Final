import ProductCatalog from "@/app/components/ProductCatalog";

export default function CataloguePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Catalogue
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
          Rechercher un produit
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Utilisez la recherche et les filtres pour parcourir les produits
          présentés dans le catalogue.
        </p>
      </div>

      <ProductCatalog />
    </div>
  );
}
