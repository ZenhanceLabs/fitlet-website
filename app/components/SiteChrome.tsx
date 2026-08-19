import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { publicAsset } from "../lib/publicAsset";
import { sitePath } from "../lib/sitePath";

export function SiteChrome({ children, current }: { children: ReactNode; current?: string }) {
  return (
    <>
      <header className="fitlet-new-nav legal-header">
        <a href={sitePath("/")} className="fitlet-new-logo brand-lockup" aria-label="Fitlet ホーム"><img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" /></a>
        <nav className="legal-nav" aria-label="サイトナビゲーション">
          <a href={sitePath("/")}>ホーム</a><a className={current === "privacy" ? "is-current" : ""} href={sitePath("/privacy")}>プライバシーポリシー</a><a className={current === "terms" ? "is-current" : ""} href={sitePath("/terms")}>利用規約</a><a href={sitePath("/support")}>お問い合わせ</a><a className="fitlet-new-nav-cta" href={sitePath("/#start")}>はじめる</a>
        </nav>
      </header>
      {children}
      <footer className="fitlet-new-footer fitlet-new-shell legal-footer">
        <div><a className="fitlet-new-logo" href={sitePath("/")}><img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" /></a><p>ちょっと動くを、習慣に。</p></div>
        <nav aria-label="フッターナビゲーション"><a href={sitePath("/")}>ホーム</a><a href={sitePath("/support")}>お問い合わせ</a><a href={sitePath("/privacy")}>プライバシーポリシー</a><a href={sitePath("/terms")}>利用規約</a></nav>
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
  return (
    <main className="legal-document">
      <SiteChrome current={current}>
        <Reveal><section className="legal-hero section-shell"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p><span className="legal-updated">最終更新日：{updated}</span></section></Reveal>
        <Reveal><div className="legal-layout section-shell"><aside className="legal-toc" aria-label="ページ内目次">{(toc ?? [{ href: "#scope", label: "対象と基本方針" }, { href: "#data", label: "取得する情報" }, { href: "#sharing", label: "第三者提供・委託" }, { href: "#rights", label: "お問い合わせ・権利" }]).map((item) => <a key={item.href} href={item.href.startsWith("#") ? item.href : sitePath(item.href)}>{item.label}</a>)}</aside><article className="legal-body">{children}</article></div></Reveal>
      </SiteChrome>
    </main>
  );
}

export function LegalNote({ children }: { children: ReactNode }) { return <div className="legal-note">{children}</div>; }
