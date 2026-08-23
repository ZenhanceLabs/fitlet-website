"use client";

import { useEffect } from "react";
import { publicAsset } from "../lib/publicAsset";

const storeImageVersion = "2026-08-23-3";

const scenes = {
  home: {
    label: "ホーム",
    title: <><span className="store-shot-title-line">動くと、</span><span className="store-shot-title-line store-shot-title-emphasis">マップが進む。</span></>,
    detail: "終えるたび、次の場所へ。",
    src: "/app-screens/ja/real-home.png",
  },
  session: {
    label: "トレーニング中",
    title: <><span className="store-shot-title-line">カメラが、</span><span className="store-shot-title-line store-shot-title-emphasis">回数を数える。</span></>,
    detail: "動きを捉えて、自動で数える。",
    src: "/app-screens/ja/real-session.png",
  },
  training: {
    label: "トレーニング",
    title: <><span className="store-shot-title-line store-shot-title-emphasis">好きな運動から、</span><span className="store-shot-title-line">始められる。</span></>,
    detail: "39種目から、自由に選べる。",
    src: "/app-screens/ja/real-training.png",
  },
  league: {
    label: "リーグ",
    title: <><span className="store-shot-title-line">動いた分だけ、</span><span className="store-shot-title-line store-shot-title-emphasis">順位が変わる。</span></>,
    detail: "毎週のFPで、仲間と競える。",
    src: "/app-screens/ja/real-league.png",
  },
  coach: {
    label: "Pro・コーチ",
    title: <><span className="store-shot-title-line">今日の運動を、</span><span className="store-shot-title-line store-shot-title-emphasis">コーチに任せる。</span></>,
    detail: "Proなら、次の運動を提案。",
    src: "/app-screens/ja/real-coach.png",
    pro: true,
  },
  profile: {
    label: "プロフィール",
    title: <><span className="store-shot-title-line store-shot-title-emphasis">続けた記録が、</span><span className="store-shot-title-line">残っていく。</span></>,
    detail: "続けた日数やレベルを記録。",
    src: "/app-screens/ja/real-profile.png",
  },
} as const;

type SceneKey = keyof typeof scenes;

function isSceneKey(value: string | null): value is SceneKey {
  return value !== null && value in scenes;
}

function StoreShotCanvas({ sceneKey }: { sceneKey: SceneKey }) {
  const scene = scenes[sceneKey];

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
        <span className="store-shot-side-button store-shot-side-button-left-three" aria-hidden="true" />
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
  const requestedScene = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("scene");
  const sceneKey: SceneKey | null = isSceneKey(requestedScene) ? requestedScene : null;

  useEffect(() => {
    document.documentElement.classList.add("store-shot-ready");
  }, []);

  return sceneKey ? <StoreShotCanvas sceneKey={sceneKey} /> : <StoreShotGallery />;
}
