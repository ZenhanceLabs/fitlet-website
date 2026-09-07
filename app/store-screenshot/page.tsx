"use client";

import { useEffect, useState } from "react";
import { publicAsset } from "../lib/publicAsset";

const storeImageVersion = "2026-09-07-4";

const scenes = {
  home: {
    label: "ホーム",
    title: <><span className="store-shot-title-line">動くと</span><span className="store-shot-title-line store-shot-title-emphasis">マップが進む</span></>,
    detail: "1回約8分で 次の場所へ",
    src: "/app-screens/ja/real-home.png",
  },
  session: {
    label: "トレーニング中",
    title: <><span className="store-shot-title-line">カメラが</span><span className="store-shot-title-line store-shot-title-emphasis">回数を数える</span></>,
    detail: "スマホを置くだけ 自動カウント",
    src: "/app-screens/ja/real-session.png",
  },
  training: {
    label: "トレーニング",
    title: <><span className="store-shot-title-line">好きな運動から</span><span className="store-shot-title-line store-shot-title-emphasis">始められる</span></>,
    detail: "39種目から 自由に選べる",
    src: "/app-screens/ja/real-training.png",
  },
  league: {
    label: "リーグ",
    title: <><span className="store-shot-title-line">今週は何位まで</span><span className="store-shot-title-line store-shot-title-emphasis">いける？</span></>,
    detail: "毎週の運動量で 仲間と競う",
    src: "/app-screens/ja/real-league.png",
  },
  profile: {
    label: "プロフィール",
    title: <><span className="store-shot-title-line">続けるほど</span><span className="store-shot-title-line store-shot-title-emphasis">成長が見えてくる</span></>,
    detail: "レベルと記録が積み上がる",
    src: "/app-screens/ja/real-profile.png",
  },
  coach: {
    label: "Pro・コーチ",
    title: <><span className="store-shot-title-line">今日の運動を</span><span className="store-shot-title-line store-shot-title-emphasis">コーチに任せる</span></>,
    detail: "Proなら 次の運動を提案",
    src: "/app-screens/ja/real-coach.png",
    pro: true,
  },
} as const;

const englishScenes = {
  home: {
    label: "Home",
    title: <><span className="store-shot-title-line">Move</span><span className="store-shot-title-line store-shot-title-emphasis">Map moves</span></>,
    detail: "8 min per session",
    src: "/store-assets/source/screens/en/real-home.png",
  },
  session: {
    label: "Session",
    title: <><span className="store-shot-title-line">Let the camera</span><span className="store-shot-title-line store-shot-title-emphasis">count your reps</span></>,
    detail: "Just set your phone down",
    src: "/store-assets/source/screens/en/real-session.png",
  },
  training: {
    label: "Training",
    title: <><span className="store-shot-title-line">Start with any</span><span className="store-shot-title-line store-shot-title-emphasis">workout</span></>,
    detail: "29 exercises to choose from",
    src: "/store-assets/source/screens/en/real-training.png",
  },
  league: {
    label: "League",
    title: <><span className="store-shot-title-line">Climb the ranks</span><span className="store-shot-title-line store-shot-title-emphasis">every week</span></>,
    detail: "Compete with friends",
    src: "/store-assets/source/screens/en/real-league.png",
  },
  profile: {
    label: "Profile",
    title: <><span className="store-shot-title-line">Keep going</span><span className="store-shot-title-line store-shot-title-emphasis">watch yourself grow</span></>,
    detail: "Your progress adds up",
    src: "/store-assets/source/screens/en/real-profile.png",
  },
  coach: {
    label: "Coach",
    title: <><span className="store-shot-title-line">Let your coach</span><span className="store-shot-title-line store-shot-title-emphasis">plan today</span></>,
    detail: "Your next workout, planned",
    src: "/store-assets/source/screens/en/real-coach.png",
    pro: true,
  },
} as const;

type SceneKey = keyof typeof scenes;
type LocaleKey = "ja" | "en";

function isSceneKey(value: string | null): value is SceneKey {
  return value !== null && value in scenes;
}

function StoreShotCanvas({ sceneKey, locale }: { sceneKey: SceneKey; locale: LocaleKey }) {
  const scene = locale === "en" ? englishScenes[sceneKey] : scenes[sceneKey];

  return (
    <main suppressHydrationWarning className={`store-shot store-shot-${sceneKey}`} data-scene={sceneKey}>
      <div className="store-shot-brand">
        <img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" />
      </div>
      {scene.pro ? <img className="store-shot-pro-logo" src={publicAsset("/brand/fitlet-pro-logo.svg")} alt="Fitlet Pro" /> : null}
      <div className="store-shot-copy">
        <h1>{scene.title}</h1>
        <p>{scene.detail}</p>
      </div>
      <figure className="store-shot-phone">
        <span className="store-shot-side-button store-shot-side-button-left-one" aria-hidden="true" />
        <span className="store-shot-side-button store-shot-side-button-left-two" aria-hidden="true" />
        <span className="store-shot-side-button store-shot-side-button-right" aria-hidden="true" />
        <div className="store-shot-screen">
          <span className="store-shot-notch" aria-hidden="true" />
          <img src={publicAsset(scene.src)} alt="" />
        </div>
      </figure>
    </main>
  );
}

function StoreShotGallery() {
  return (
    <main className="store-shot-gallery">
      <header className="store-shot-gallery-head">
        <img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" />
        <div>
          <p>App Store screenshots</p>
          <h1>Fitletのストア用画像</h1>
          <span>6枚の画像を個別に確認できます。</span>
        </div>
      </header>
      <div className="store-shot-gallery-grid">
        {(Object.entries(scenes) as Array<[SceneKey, (typeof scenes)[SceneKey]]>).map(([key, scene]) => (
          <a className="store-shot-gallery-card" href={publicAsset(`/store-screenshot/?scene=${key}&locale=ja`)} key={key}>
            <img src={publicAsset(`/store/ja/fitlet-${key}-ja.png?v=${storeImageVersion}`)} alt={`${scene.label}のストア用画像`} />
            <div>
              <strong>{scene.label}</strong>
              <span>開く ↗</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

export default function StoreScreenshotPage() {
  const [sceneKey, setSceneKey] = useState<SceneKey | null>(null);
  const [locale, setLocale] = useState<LocaleKey>("ja");

  useEffect(() => {
    document.documentElement.classList.add("store-shot-ready");
    const timer = window.setTimeout(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const requestedScene = searchParams.get("scene");
      setLocale(searchParams.get("locale") === "en" ? "en" : "ja");
      setSceneKey(isSceneKey(requestedScene) ? requestedScene : null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return sceneKey ? <StoreShotCanvas sceneKey={sceneKey} locale={locale} /> : <StoreShotGallery />;
}
