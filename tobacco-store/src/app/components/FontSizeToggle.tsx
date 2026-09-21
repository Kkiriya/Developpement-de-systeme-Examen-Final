"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function FontSizeToggle() {
  const { t } = useLanguage();

  const [largeText, setLargeText] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("large-text") === "true";
  });

  useEffect(() => {
    if (largeText) {
      document.documentElement.classList.add("large-text");
    } else {
      document.documentElement.classList.remove("large-text");
    }

    localStorage.setItem("large-text", String(largeText));
  }, [largeText]);

  function toggleLargeText() {
    setLargeText((current) => !current);
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {t.header.textSize}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={largeText}
        aria-label={t.header.enableLargeText}
        onClick={toggleLargeText}
        className={`relative h-[28px] w-[48px] shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          largeText ? "bg-sky-600" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute left-[4px] top-[4px] h-[20px] w-[20px] rounded-full bg-white shadow-md transition-transform duration-200 ${
            largeText ? "translate-x-[20px]" : ""
          }`}
        />
      </button>

      <span
        className="shrink-0 text-sm font-bold text-slate-600 dark:text-slate-400"
        aria-hidden="true"
      >
        {largeText ? "A+" : "A"}
      </span>
    </div>
  );
}
