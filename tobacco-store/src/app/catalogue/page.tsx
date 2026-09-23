import { Suspense } from "react";
import ProductCatalog from "./ProductCatalog";

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-slate-600 dark:text-slate-300">Chargement...</p>
          </div>
        </div>
      }
    >
      <ProductCatalog />
    </Suspense>
  );
}
