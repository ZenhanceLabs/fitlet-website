"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteChrome } from "../components/SiteChrome";
import { Reveal } from "../components/Reveal";
import { sitePath } from "../lib/sitePath";

const FRIEND_CODE_PATTERN = /^[A-Z0-9]{6}$/;

export default function FriendLinkPage() {
  const [friendCode, setFriendCode] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code")?.trim().toUpperCase() ?? "";
    const timer = window.setTimeout(() => setFriendCode(FRIEND_CODE_PATTERN.test(code) ? code : ""), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const appLink = friendCode ? `fitlet://friend/${encodeURIComponent(friendCode)}` : "fitlet://";

  return (
    <main className="fitlet-new-site fitlet-new-friend-page">
      <SiteChrome current="friend">
        <Reveal>
          <section className="fitlet-new-friend-hero fitlet-new-shell">
            <p className="fitlet-new-label">Fitlet</p>
            <h1>{friendCode ? "フレンド申請が届いています。" : "Fitletでフレンドを追加。"}</h1>
            <p>{friendCode ? "Fitletアプリでプロフィールを確認して、フレンド申請を送れます。" : "共有されたプロフィールカードのリンクから、Fitletアプリでフレンドを追加できます。"}</p>
            {friendCode && <div className="fitlet-new-friend-code" aria-label={`フレンドコード ${friendCode}`}><span>フレンドコード</span><strong>{friendCode}</strong></div>}
            <div className="fitlet-new-friend-actions">
              <a className="fitlet-new-button fitlet-new-button-dark" href={appLink}>Fitletでフレンドになる <span aria-hidden="true">↗</span></a>
              <Link className="fitlet-new-button fitlet-new-button-light" href={sitePath("/")}>Fitletの紹介を見る <span aria-hidden="true">↗</span></Link>
            </div>
            <p className="fitlet-new-friend-note">アプリが開かない場合は、Fitletをインストールしてからこのリンクをもう一度開いてください。</p>
          </section>
        </Reveal>
      </SiteChrome>
    </main>
  );
}
