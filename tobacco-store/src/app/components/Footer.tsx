import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Air<span className="text-sky-600 dark:text-sky-400">Smokes</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Projet scolaire réalisé à des fins de démonstration et
            d&apos;apprentissage.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Navigation
          </h3>

          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link
              href="/"
              className="text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
            >
              Accueil
            </Link>

            <Link
              href="/catalogue"
              className="text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
            >
              Catalogue
            </Link>
          </div>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Information
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Cette interface est une maquette académique. Les produits présentés
            sont fictifs et aucune transaction n&apos;est effectuée.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-5 text-center text-xs text-slate-400 dark:border-slate-800">
        © 2026 AirSmokes — Projet scolaire
      </div>
    </footer>
  );
}
