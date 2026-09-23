import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "trekvisa_lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") setLang(saved);
  }, []);

  const switchLang = useCallback((next) => {
    setLang(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations.en?.[key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang: switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) return { lang: "fr", setLang: () => {}, t: (k) => k };
  return ctx;
}