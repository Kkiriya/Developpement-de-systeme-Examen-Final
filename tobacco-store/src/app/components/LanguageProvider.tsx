"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { translations, type Language } from "@/app/i18n/translation";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "fr";
    }

    const savedLanguage = localStorage.getItem("language");

    if (
      savedLanguage === "fr" ||
      savedLanguage === "en" ||
      savedLanguage === "es"
    ) {
      return savedLanguage;
    }

    return "fr";
  });

  function setLanguage(newLanguage: Language) {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }

  return context;
}
