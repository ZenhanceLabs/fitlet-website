import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { publicAsset } from "../lib/publicAsset";
import { sitePath } from "../lib/sitePath";

export function SiteChrome({ children, current }: { children: ReactNode; current?: string }) {
  return (
    <>
      <header className="fitlet-new-nav legal-header">
        <Link href={sitePath("/")} className="fitlet-new-logo brand-lockup" aria-label="Fitlet ホーム"><img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" /></Link>
        <nav className="legal-nav" aria-label="サイトナビゲーション">
          <Link href={sitePath("/")}>ホーム</Link><Link className={current === "privacy" ? "is-current" : ""} href={sitePath("/privacy")}>プライバシーポリシー</Link><Link className={current === "terms" ? "is-current" : ""} href={sitePath("/terms")}>利用規約</Link><Link href={sitePath("/support")}>お問い合わせ</Link><Link className="fitlet-new-nav-cta" href={sitePath("/#start")}>はじめる</Link>
        </nav>
      </header>
      {children}
      <footer className="fitlet-new-footer fitlet-new-shell legal-footer">
        <div><Link className="fitlet-new-logo" href={sitePath("/")}><img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" /></Link><p>ちょっと動くを、習慣に。</p></div>
        <nav aria-label="フッターナビゲーション"><Link href={sitePath("/")}>ホーム</Link><Link href={sitePath("/support")}>お問い合わせ</Link><Link href={sitePath("/privacy")}>プライバシーポリシー</Link><Link href={sitePath("/terms")}>利用規約</Link></nav>
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
        <Reveal><div className="legal-layout section-shell"><aside className="legal-toc" aria-label="ページ内目次">{(toc ?? [{ href: "#scope", label: "対象と基本方針" }, { href: "#data", label: "取得する情報" }, { href: "#sharing", label: "第三者提供・委託" }, { href: "#rights", label: "お問い合わせ・権利" }]).map((item) => item.href.startsWith("#") ? <a key={item.href} href={item.href}>{item.label}</a> : <Link key={item.href} href={sitePath(item.href)}>{item.label}</Link>)}</aside><article className="legal-body">{children}</article></div></Reveal>
      </SiteChrome>
    </main>
  );
}

export function LegalNote({ children }: { children: ReactNode }) { return <div className="legal-note">{children}</div>; }
