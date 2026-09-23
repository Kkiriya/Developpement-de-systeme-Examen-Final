"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import FontSizeToggle from "./FontSizeToggle";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

import { useCart } from "@/app/context/CartContext";
import { useRewards } from "@/app/context/RewardsContext";

export default function Header() {
  const { t } = useLanguage();
  const { totalItems } = useCart();
  const { points } = useRewards();

  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCatalogue = pathname.startsWith("/catalogue");
  const isRecompense = pathname.startsWith("/recompenses");

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Air<span className="text-sky-600 dark:text-sky-400">Smokes</span> 🌿
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {/* Home */}
          <Link
            href="/"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              isHome
                ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
            }`}
          >
            {t.header.home}
          </Link>

          {/* Catalogue */}
          <Link
            href="/catalogue"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              isCatalogue
                ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
            }`}
          >
            {t.header.catalogue}
          </Link>

          {/* Rewards */}
          <Link
            href="/recompenses"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              isRecompense
                ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400"
                : "text-slate-600 hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
            }`}
          >
            {t.header.recompense}
          </Link>
        </nav>

        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-4">
          <LanguageToggle />
          <FontSizeToggle />
          <ThemeToggle />

          {/* Rewards points */}
          <Link
            href="/recompenses"
            className="relative rounded-lg p-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
            aria-label={`${points} points de récompense`}
          >
            ⭐ {points.toLocaleString("fr-CA")} pts
          </Link>

          {/* Cart */}
          <Link
            href="/panier"
            aria-label={`Panier (${totalItems} articles)`}
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.836L5.6 6.75m0 0h13.65c.668 0 1.163.615.994 1.262l-1.35 5.25a1 1 0 0 1-.97.75H8.07a1 1 0 0 1-.97-.757L5.6 6.75Zm2.47 7.262-1 3.5a1 1 0 0 0 .963 1.275h10.434M9 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              />
            </svg>

            {/* Item count */}
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-600 px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
