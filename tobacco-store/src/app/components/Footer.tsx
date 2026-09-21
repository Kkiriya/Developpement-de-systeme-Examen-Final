"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Air<span className="text-sky-600 dark:text-sky-400">Smokes</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {t.footer.description}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {t.footer.navigation}
          </h3>

          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link
              href="/"
              className="text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
            >
              {t.header.home}
            </Link>

            <Link
              href="/catalogue"
              className="text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
            >
              {t.header.catalogue}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {t.footer.information}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {t.footer.academic}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-5 text-center text-xs text-slate-400 dark:border-slate-800">
        {t.footer.copyright}
      </div>
    </footer>
  );
}
