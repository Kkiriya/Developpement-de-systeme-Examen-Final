import Image from "next/image";
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
      <Link
        href="/catalogue"
        className="text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
      >
        ← Retour au catalogue
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Product image */}
        <div className="relative min-h-[450px] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {product.category}
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {product.description}
          </p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-sky-600 dark:text-sky-400">
              {formattedPrice}
            </span>

            <span className="text-base text-slate-500 dark:text-slate-400">
              / {product.qty}
            </span>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Informations
            </h2>

            <ul className="mt-4 space-y-3">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="text-sky-600 dark:text-sky-400">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
