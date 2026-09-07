"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { publicAsset } from "../lib/publicAsset";
import { localizedSitePath, useLocale, type Locale } from "../lib/locale";

const chromeCopy = {
  ja: {
    home: "ホーム",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    support: "お問い合わせ",
    start: "はじめる",
    tagline: "ちょっと動くを、習慣に。",
    language: "English",
    languageLabel: "Englishに切り替える",
    mainNav: "サイトナビゲーション",
    footerNav: "フッターナビゲーション",
    homeAria: "Fitlet ホーム",
    updated: "最終更新日：",
  },
  en: {
    home: "Home",
    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
    start: "Get started",
    tagline: "Move a little. Make it a habit.",
    language: "日本語",
    languageLabel: "Switch to Japanese",
    mainNav: "Site navigation",
    footerNav: "Footer navigation",
    homeAria: "Fitlet home",
    updated: "Last updated: ",
  },
} as const;

export function LanguageSwitch() {
  const { locale, setLocale } = useLocale();
  const nextLocale: Locale = locale === "ja" ? "en" : "ja";
  const copy = chromeCopy[locale];

  return (
    <button className="fitlet-new-language-toggle" type="button" onClick={() => setLocale(nextLocale)} aria-label={copy.languageLabel}>
      {copy.language}
    </button>
  );
}

export function SiteChrome({ children, current }: { children: ReactNode; current?: string }) {
  const { locale } = useLocale();
  const copy = chromeCopy[locale];

  return (
    <>
      <header className="fitlet-new-nav legal-header">
        <a href={localizedSitePath("/", locale)} className="fitlet-new-logo brand-lockup" aria-label={copy.homeAria}><img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" /></a>
        <nav className="legal-nav" aria-label={copy.mainNav}>
          <a href={localizedSitePath("/", locale)}>{copy.home}</a><a className={current === "privacy" ? "is-current" : ""} href={localizedSitePath("/privacy", locale)}>{copy.privacy}</a><a className={current === "terms" ? "is-current" : ""} href={localizedSitePath("/terms", locale)}>{copy.terms}</a><a href={localizedSitePath("/support", locale)}>{copy.support}</a><LanguageSwitch /><a className="fitlet-new-nav-cta" href={localizedSitePath("/#start", locale)}>{copy.start}</a>
        </nav>
      </header>
      {children}
      <footer className="fitlet-new-footer fitlet-new-shell legal-footer">
        <div><a className="fitlet-new-logo" href={localizedSitePath("/", locale)}><img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" /></a><p>{copy.tagline}</p></div>
        <nav aria-label={copy.footerNav}><a href={localizedSitePath("/", locale)}>{copy.home}</a><a href={localizedSitePath("/support", locale)}>{copy.support}</a><a href={localizedSitePath("/privacy", locale)}>{copy.privacy}</a><a href={localizedSitePath("/terms", locale)}>{copy.terms}</a></nav>
      </footer>
    </>
  );
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
  current,
  toc,
}: { eyebrow: string; title: string; intro: string; updated: string; children: ReactNode; current: string; toc?: Array<{ href: string; label: string }> }) {
  const { locale } = useLocale();

  return (
    <main className="legal-document">
      <SiteChrome current={current}>
        <Reveal><section className="legal-hero section-shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p><span className="legal-updated">{locale === "en" ? "Last updated: " : "最終更新日："}{updated}</span></section></Reveal>
        <Reveal><div className="legal-layout section-shell"><aside className="legal-toc" aria-label={locale === "en" ? "On this page" : "ページ内目次"}>{(toc ?? [{ href: "#scope", label: "対象と基本方針" }, { href: "#data", label: "取得する情報" }, { href: "#sharing", label: "第三者提供・委託" }, { href: "#rights", label: "お問い合わせ・権利" }]).map((item) => <a key={item.href} href={item.href.startsWith("#") ? item.href : localizedSitePath(item.href, locale)}>{item.label}</a>)}</aside><article className="legal-body">{children}</article></div></Reveal>
      </SiteChrome>
    </main>
  );
}

export function LegalNote({ children }: { children: ReactNode }) { return <div className="legal-note">{children}</div>; }
