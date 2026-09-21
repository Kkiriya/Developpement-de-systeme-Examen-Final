"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("dark-mode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("dark-mode", String(darkMode));
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((current) => !current);
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={darkMode}
        aria-label="Activer le thème sombre"
        onClick={toggleTheme}
        className={`relative h-[28px] w-[48px] shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
          darkMode ? "bg-sky-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute left-[4px] top-[4px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ${
            darkMode ? "translate-x-[20px]" : "translate-x-0"
          }`}
        >
          <span className="text-[11px]" aria-hidden="true">
            {darkMode ? "🌙" : "☀️"}
          </span>
        </span>
      </button>
    </div>
  );
}
