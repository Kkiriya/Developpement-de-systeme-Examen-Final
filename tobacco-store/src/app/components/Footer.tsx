import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold text-white">
            Tabac<span className="text-amber-500">+</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-stone-400">
            Projet scolaire réalisé à des fins de démonstration et
            d&apos;apprentissage.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Navigation</h3>

          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-white">Acceuil</Link>

            <Link href="/catalogue" className="hover:text-white">
              Catalogue
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Information</h3>

          <p className="mt-3 text-sm leading-6 text-stone-400">
            Cette interface est une maquette académique. Les produits présentés
            sont fictifs et aucune transaction n&apos;est effectuée.
          </p>
        </div>
      </div>

      <div className="border-t border-stone-800 px-6 py-5 text-center text-xs text-stone-500">
        © 2026 Tabac+ — Projet scolaire
      </div>
    </footer>
  );
}
