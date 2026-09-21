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

  const formattedPrice = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(product.price);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Back button */}
      <Link
        href="/catalogue"
        className="text-sm font-semibold text-slate-600 transition hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
      >
        ← Retour au catalogue
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* Product image */}
        <div className="flex min-h-[450px] items-center justify-center overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800">
          <span className="text-slate-500 dark:text-slate-400">
            Image du produit
          </span>
        </div>

        {/* Product information */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {product.category}
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-sky-600 dark:text-sky-400">
              {formattedPrice}
            </span>

            <span className="text-base text-slate-500 dark:text-slate-400">
              / {product.qty}
            </span>
          </div>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {product.description}
          </p>

          {/* Details */}
          <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Informations du produit
            </h2>

            <dl className="mt-5 divide-y divide-slate-200 dark:divide-slate-800">
              {product.details.map((detail, index) => (
                <div key={index} className="flex gap-4 py-4 text-sm">
                  <dt className="min-w-24 font-semibold text-slate-900 dark:text-white">
                    Information
                  </dt>

                  <dd className="text-slate-600 dark:text-slate-400">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Academic notice */}
          <div className="mt-8 rounded-lg border border-sky-200 bg-sky-50 p-5 dark:border-sky-900 dark:bg-sky-950">
            <p className="text-sm leading-6 text-sky-900 dark:text-sky-200">
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
