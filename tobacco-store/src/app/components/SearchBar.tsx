"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "./LanguageProvider";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.push(`/catalogue?${params.toString()}`);
  }

  return (
    <div>
      <label
        htmlFor="search"
        className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
      >
        {t.catalogue.search}
      </label>

      <input
        id="search"
        type="search"
        placeholder={t.catalogue.searchPlaceholder}
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-sky-500 dark:focus:ring-sky-950"
      />
    </div>
  );
}
