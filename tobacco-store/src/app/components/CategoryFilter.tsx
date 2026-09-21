"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCategoryChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`/catalogue?${params.toString()}`);
  }

  return (
    <div>
      <label
        htmlFor="category"
        className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
      >
        Catégorie
      </label>

      <select
        id="category"
        value={searchParams.get("category") ?? "all"}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-sky-500 dark:focus:ring-sky-950"
      >
        <option value="all">Toutes les catégories</option>
        <option value="tabac">Tabac</option>
        <option value="tabac en feuille">Tabac en feuille</option>
        <option value="accessoires">Accessoires</option>
      </select>
    </div>
  );
}
