"use client";

import { useEffect, useState } from "react";
import { SiteChrome } from "../components/SiteChrome";
import { Reveal } from "../components/Reveal";
import { localizedSitePath, useLocale } from "../lib/locale";

const FRIEND_CODE_PATTERN = /^[A-Z0-9]{6}$/;

export default function FriendLinkPage() {
  const { locale } = useLocale();
  const isEnglish = locale === "en";
  const [friendCode, setFriendCode] = useState("");
  const [launchState, setLaunchState] = useState<"idle" | "launching" | "fallback">("idle");

  useEffect(() => {
    const queryCode = new URLSearchParams(window.location.search).get("code") ?? "";
    const pathCode = window.location.pathname.match(/\/f\/([^/]+)\/?$/)?.[1] ?? "";
    const code = (queryCode || pathCode).trim().toUpperCase();
    const timer = window.setTimeout(() => setFriendCode(FRIEND_CODE_PATTERN.test(code) ? code : ""), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const appLink = friendCode ? `fitlet://friend/${encodeURIComponent(friendCode)}` : "fitlet://";

  useEffect(() => {
    if (!friendCode) return undefined;

    let active = true;
    const launchTimer = window.setTimeout(() => {
      if (!active) return;
      setLaunchState("launching");
      window.location.href = appLink;
    }, 180);
    const fallbackTimer = window.setTimeout(() => {
      if (!active || document.visibilityState !== "visible") return;
      setLaunchState("fallback");
      window.location.replace(localizedSitePath("/", locale));
    }, 1400);

    return () => {
      active = false;
      window.clearTimeout(launchTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [appLink, friendCode, locale]);

  return (
    <main className="fitlet-new-site fitlet-new-friend-page">
      <SiteChrome current="friend">
        <Reveal>
          <section className="fitlet-new-friend-hero fitlet-new-shell">
            <p className="fitlet-new-label">Fitlet</p>
            <h1>{isEnglish ? (friendCode ? "You have a friend request." : "Add a friend in Fitlet.") : (friendCode ? "フレンド申請が届いています。" : "Fitletでフレンドを追加。")}</h1>
            <p>{isEnglish ? (friendCode ? "Open the Fitlet app to send a friend request." : "Open a shared profile card link to add a friend in the Fitlet app.") : (friendCode ? "Fitletアプリを開いて、フレンド申請を送れます。" : "共有されたプロフィールカードのリンクから、Fitletアプリでフレンドを追加できます。")}</p>
            {friendCode && <div className="fitlet-new-friend-code" aria-label={`${isEnglish ? "Friend code" : "フレンドコード"} ${friendCode}`}><span>{isEnglish ? "Friend code" : "フレンドコード"}</span><strong>{friendCode}</strong></div>}
            <div className="fitlet-new-friend-actions">
              <a className="fitlet-new-button fitlet-new-button-dark" href={appLink}>{isEnglish ? "Become friends in Fitlet" : "Fitletでフレンドになる"} <span aria-hidden="true">↗</span></a>
              <a className="fitlet-new-button fitlet-new-button-light" href={localizedSitePath("/", locale)}>{isEnglish ? "See how Fitlet works" : "Fitletの紹介を見る"} <span aria-hidden="true">↗</span></a>
            </div>
            {friendCode && <p className="fitlet-new-friend-launch" role="status">{isEnglish ? (launchState === "launching" ? "Opening the Fitlet app…" : launchState === "fallback" ? "Taking you to the Fitlet homepage…" : "Preparing the Fitlet app…") : (launchState === "launching" ? "Fitletアプリを開いています…" : launchState === "fallback" ? "Fitletホームページへ移動します…" : "Fitletアプリを準備しています…")}</p>}
            <p className="fitlet-new-friend-note">{isEnglish ? "If the app does not open, visit the Fitlet homepage. Once the app is published, this link will guide you to the app store." : "アプリが開かない場合は、Fitletホームページをご覧ください。アプリ公開後はアプリストアへ案内します。"}</p>
          </section>
        </Reveal>
      </SiteChrome>
    </main>
  );
}
