"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot() {
  return false;
}

function getClientSnapshot() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    return true;
  }

  if (savedTheme === "light") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const darkMode = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  function toggleTheme() {
    const newDarkMode = !darkMode;

    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDarkMode);

    window.dispatchEvent(new Event("storage"));
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={darkMode}
      aria-label={
        darkMode ? "Activer le thème clair" : "Activer le thème sombre"
      }
      onClick={toggleTheme}
      className={`relative h-[28px] w-[48px] shrink-0 rounded-full transition-colors duration-200 ${
        darkMode ? "bg-sky-600" : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-[4px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 ${
          darkMode ? "left-[24px]" : "left-[4px]"
        }`}
      >
        <span className="text-[11px]" aria-hidden="true">
          {darkMode ? "🌙" : "☀️"}
        </span>
      </span>
    </button>
  );
}
