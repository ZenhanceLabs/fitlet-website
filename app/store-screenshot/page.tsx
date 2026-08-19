"use client";

import { useEffect } from "react";
import { publicAsset } from "../lib/publicAsset";

const scenes = {
  home: {
    title: <>動くと、<br /><span>マップが進む。</span></>,
    detail: "終えるたび、次の場所へ。",
    src: "/app-screens/ja/real-home.png",
  },
  session: {
    title: <>カメラが、<br /><span>回数を数える。</span></>,
    detail: "動きを捉えて、自動でカウント。",
    src: "/app-screens/ja/real-session.png",
  },
  training: {
    title: <><span>好きな運動から、</span><br />始められる。</>,
    detail: "39種目から、自由に選べる。",
    src: "/app-screens/ja/real-training.png",
  },
  league: {
    title: <>動いた分だけ、<br /><span>順位が変わる。</span></>,
    detail: "毎週のFPで、仲間と競える。",
    src: "/app-screens/ja/real-league.png",
  },
  coach: {
    title: <>今日のメニューを、<br /><span>コーチに任せる。</span></>,
    detail: "Proなら、次の運動を提案。",
    src: "/app-screens/ja/real-coach.png",
    pro: true,
  },
  profile: {
    title: <><span>続けた記録</span>が、<br />残っていく。</>,
    detail: "続けた日数やレベルを記録。",
    src: "/app-screens/ja/real-profile.png",
  },
} as const;

type SceneKey = keyof typeof scenes;

function isSceneKey(value: string | null): value is SceneKey {
  return value !== null && value in scenes;
}

export default function StoreScreenshotPage() {
  const requestedScene = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("scene");
  const sceneKey: SceneKey = isSceneKey(requestedScene) ? requestedScene : "home";

  useEffect(() => {
    document.documentElement.classList.add("store-shot-ready");
  }, []);

  const scene = scenes[sceneKey];

  return (
    <main suppressHydrationWarning className={`store-shot store-shot-${sceneKey}`} data-scene={sceneKey}>
      <div className="store-shot-brand">
        <img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" />
      </div>
      {scene.pro ? <div className="store-shot-pro-badge">PRO</div> : null}
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
