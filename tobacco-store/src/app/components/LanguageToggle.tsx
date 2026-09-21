"use client";

import { useLanguage } from "./LanguageProvider";

const languages = [
  {
    code: "fr",
    label: "Français",
    flag: "🇫🇷",
  },
  {
    code: "en",
    label: "English",
    flag: "🇬🇧",
  },
  {
    code: "es",
    label: "Español",
    flag: "🇪🇸",
  },
] as const;

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  function handleLanguageChange(value: string) {
    if (value === "fr" || value === "en" || value === "es") {
      setLanguage(value);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="language"
        className="text-sm font-semibold text-slate-700 dark:text-slate-300"
      >
        {t.header.language}
      </label>

      <select
        id="language"
        value={language}
        onChange={(event) => handleLanguageChange(event.target.value)}
        aria-label={t.header.language}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-sky-500 dark:focus:ring-sky-950"
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
