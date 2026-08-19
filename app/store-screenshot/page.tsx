"use client";

import { useEffect } from "react";
import { publicAsset } from "../lib/publicAsset";

const scenes = {
  home: {
    title: <>動くと、<br />マップが進む。</>,
    detail: "終えるたびに、次の場所へ。",
    src: "/app-screens/ja/real-home.png",
  },
  session: {
    title: <>カメラが、<br />回数を数える。</>,
    detail: "動きを捉えて、回数を自動でカウント。",
    src: "/app-screens/ja/real-session.png",
  },
  training: {
    title: <>好きな運動から、<br />始められる。</>,
    detail: "39種目から選んで、自分のセットを作れます。",
    src: "/app-screens/ja/real-training.png",
  },
  league: {
    title: <>動いた分だけ、<br />順位が変わる。</>,
    detail: "毎週のFPで、仲間と競えます。",
    src: "/app-screens/ja/real-league.png",
  },
  coach: {
    title: <>今日のメニューを、<br />コーチに任せる。</>,
    detail: "Proなら、目標や記録に合わせて提案。",
    src: "/app-screens/ja/real-coach.png",
    pro: true,
  },
  profile: {
    title: <>続けた記録が、<br />残っていく。</>,
    detail: "レベルや連続日数を、いつでも振り返れます。",
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
