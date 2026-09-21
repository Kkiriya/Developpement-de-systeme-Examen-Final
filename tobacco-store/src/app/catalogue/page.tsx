import SearchBar from "@/app/components/SearchBar";
import ProductCard from "@/app/components/ProductCard";
import CategoryFilter from "@/app/components/CategoryFilter";
import { products } from "@/app/data/product";

type CataloguePageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function CataloguePage({
  searchParams,
}: CataloguePageProps) {
  const params = await searchParams;

  const query = params.q?.toLowerCase().trim() ?? "";
  const category = params.category?.toLowerCase().trim() ?? "";

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
    <main className="container mx-auto px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold">Catalogue</h1>

      <div className="mb-8">
        <div className="grid gap-5 md:grid-cols-[1fr_240px]">
          <SearchBar />
          <CategoryFilter />
        </div>
      </div>

      <div className="mb-5">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {filteredProducts.length} produit
          {filteredProducts.length !== 1 ? "s" : ""}
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
          <p className="text-lg font-medium">Aucun produit trouvé</p>

          {query && (
            <p className="mt-2 text-sm text-base-content/60">
              Aucun résultat pour « {query} »
            </p>
          )}
        </div>
      )}
    </main>
  );
}
