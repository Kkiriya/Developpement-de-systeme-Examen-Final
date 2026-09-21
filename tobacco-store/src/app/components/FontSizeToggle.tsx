"use client";

import { useEffect, useState } from "react";

export default function FontSizeToggle() {
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
        Taille du texte
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={largeText}
        aria-label="Activer le texte plus grand"
        onClick={toggleLargeText}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          largeText ? "bg-sky-600" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
            largeText ? "translate-x-5" : ""
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
