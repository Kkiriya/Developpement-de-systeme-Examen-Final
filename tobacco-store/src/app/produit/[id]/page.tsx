// app/produit/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/app/data/product";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find((product) => product.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Link
        href="/catalogue"
        className="text-sm font-semibold text-stone-600 hover:text-amber-700"
      >
        ← Retour au catalogue
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="flex min-h-[450px] items-center justify-center rounded-2xl bg-stone-200">
          <span className="text-stone-500">Image du produit</span>
        </div>

        {/* Information */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-700">
            {product.category}
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-stone-600">
            {product.description}
          </p>

          <div className="mt-10 border-t border-stone-200 pt-8">
            <h2 className="text-xl font-bold">Informations du produit</h2>

            <dl className="mt-5 divide-y divide-stone-200">
              {product.details.map((detail, index) => (
                <div key={index} className="flex gap-4 py-4 text-sm">
                  <dt className="font-semibold text-stone-900">Information</dt>

                  <dd className="text-stone-600">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm leading-6 text-amber-900">
              Cette fiche est présentée dans le cadre d&apos;une maquette
              académique. Aucun achat ou commande n&apos;est effectué depuis
              cette interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
