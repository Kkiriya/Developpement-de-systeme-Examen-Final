"use client";

import Link from "next/link";

import FontSizeToggle from "./FontSizeToggle";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Air<span className="text-sky-600 dark:text-sky-400">Smokes</span>{" "}
          🌿
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
          >
            {t.header.home}
          </Link>

          <Link
            href="/catalogue"
            className="text-sm font-medium text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
          >
            {t.header.catalogue}
          </Link>
        </nav>

        {/* Accessibility and language controls */}
        <div className="flex items-center gap-6">
          <LanguageToggle />
          <FontSizeToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
