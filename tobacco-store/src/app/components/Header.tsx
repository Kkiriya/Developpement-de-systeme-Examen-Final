import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-stone-900"
        >
          Tabac<span className="text-amber-700">+</span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700"
          >
            Accueil
          </Link>

          <Link
            href="/catalogue"
            className="text-sm font-medium text-stone-700 transition hover:text-amber-700"
          >
            Catalogue
          </Link>
        </nav>

        <Link
          href="/catalogue"
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          Rechercher
        </Link>
      </div>
    </header>
  );
}
