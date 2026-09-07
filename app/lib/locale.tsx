"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { sitePath } from "./sitePath";

export type Locale = "ja" | "en";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "fitlet-locale";

const pageMetadata = {
  "/": {
    ja: { title: "Fitlet — ちょっと動くを、習慣に。", description: "Fitletは、マップを進み、カメラで回数を数え、仲間と競い、コーチと続けるトレーニングアプリです。" },
    en: { title: "Fitlet — Move a little. Make it a habit.", description: "Fitlet helps you move through a map, count reps with your camera, compete with friends, and keep going with a coach." },
  },
  "/privacy": {
    ja: { title: "プライバシーポリシー | Fitlet", description: "Fitletのプライバシーポリシー。" },
    en: { title: "Privacy Policy | Fitlet", description: "Fitlet’s Privacy Policy." },
  },
  "/terms": {
    ja: { title: "利用規約 | Fitlet", description: "Fitletの利用規約。" },
    en: { title: "Terms of Service | Fitlet", description: "Fitlet’s Terms of Service." },
  },
  "/legal": {
    ja: { title: "プライバシー・利用規約 | Fitlet", description: "Fitletのプライバシーポリシーと利用規約。" },
    en: { title: "Privacy & Terms | Fitlet", description: "Fitlet’s Privacy Policy and Terms of Service." },
  },
  "/support": {
    ja: { title: "お問い合わせ | Fitlet", description: "Fitletのよくある質問とお問い合わせ窓口。" },
    en: { title: "Support | Fitlet", description: "Fitlet FAQs and support contacts." },
  },
  "/friend": {
    ja: { title: "Fitlet フレンドリンク", description: "Fitletでフレンドを追加します。" },
    en: { title: "Fitlet friend link", description: "Add a friend in Fitlet." },
  },
} as const;

export function localizedSitePath(path: string, locale: Locale): string {
  const [pathAndHash, hash] = path.split("#", 2);
  const separator = pathAndHash.includes("?") ? "&" : "?";
  return sitePath(`${pathAndHash}${separator}lang=${locale}${hash ? `#${hash}` : ""}`);
}

function isLocale(value: string | null): value is Locale {
  return value === "ja" || value === "en";
}

function browserLocale(): Locale {
  const languages = window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language];
  return languages.some((language) => language.toLowerCase().startsWith("ja")) ? "ja" : "en";
}

function readPreferredLocale(): Locale {
  const requested = new URLSearchParams(window.location.search).get("lang");
  if (isLocale(requested)) return requested;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;

  return browserLocale();
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ja");

  useEffect(() => {
    const timer = window.setTimeout(() => setLocaleState(readPreferredLocale()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
    const pageKey = pathname.endsWith("/privacy") ? "/privacy" : pathname.endsWith("/terms") ? "/terms" : pathname.endsWith("/legal") ? "/legal" : pathname.endsWith("/support") ? "/support" : pathname.endsWith("/friend") || pathname.includes("/f/") ? "/friend" : "/";
    const metadata = pageMetadata[pageKey][locale];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
