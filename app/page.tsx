"use client";

import { Reveal } from "./components/Reveal";
import { LanguageSwitch } from "./components/SiteChrome";
import { useLocale } from "./lib/locale";
import { localizedSitePath } from "./lib/locale";
import { publicAsset } from "./lib/publicAsset";

type ScreenCardProps = {
  className: string;
  label: string;
  title: string;
  body: string;
  src: string;
  alt: string;
};

function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`fitlet-new-device ${className}`}>
      <span className="fitlet-new-device-side-button fitlet-new-device-side-button-top" aria-hidden="true" />
      <span className="fitlet-new-device-side-button fitlet-new-device-side-button-middle" aria-hidden="true" />
      <div className="fitlet-new-device-screen">
        <span className="fitlet-new-device-notch" aria-hidden="true" />
        <img src={src} alt={alt} />
      </div>
    </figure>
  );
}

function ScreenCard({ className, label, title, body, src, alt }: ScreenCardProps) {
  return (
    <article className={`fitlet-new-screen-card ${className}`}>
      <div className="fitlet-new-screen-copy">
        <p className="fitlet-new-label">{label}</p>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <PhoneFrame className="fitlet-new-screen-device" src={src} alt={alt} />
    </article>
  );
}

export default function Home() {
  const { locale } = useLocale();
  const isEnglish = locale === "en";
  const screen = (name: string) => publicAsset(isEnglish ? `/store-assets/source/screens/en/real-${name}.png` : `/app-screens/ja/real-${name}.png`);

  const copy = isEnglish ? {
    navHome: "Home",
    navPrivacy: "Privacy",
    navTerms: "Terms",
    navSupport: "Support",
    navStart: "Get started",
    navLabel: "Main navigation",
    homeAria: "Fitlet home",
    heroLabel: "Fitlet",
    heroTitle: <>Move a little.<br /><span>Make it a habit.</span></>,
    heroLead: "Move through the map, let the camera count your reps, and compete with friends. Turn everyday movement into something you’ll want to keep doing.",
    heroButton: "See how Fitlet works",
    heroAlt: "Fitlet home map and Start training button",
    featureTitle: <>A reason to keep going,<br /><span>built into every day.</span></>,
    pillars: [
      ["Move through the map", "Finish a workout and advance to the next place on the map."],
      ["Let the camera count", "The camera follows your movement and counts your reps automatically."],
      ["Compete with friends", "Earn FP as you move and climb the weekly league."],
      ["Let your coach plan", "Pro suggests your next workout based on your goals and progress."],
    ],
    screensTitle: <>Fitlet in<br /><span>your everyday.</span></>,
    screensLead: "Move through the map, work out, and keep a record. Little by little, movement becomes part of your routine.",
    screens: [
      { className: "fitlet-new-screen-home", label: "Home", title: "Move and the map moves.", body: "Finish one and move to the next place. Turn each small daily win into a journey you can see.", name: "home", alt: "Fitlet home map screen" },
      { className: "fitlet-new-screen-session", label: "Session", title: "Let the camera count.", body: "The camera tracks your movement and counts your reps automatically.", name: "session", alt: "Fitlet workout session showing a squat and pose tracking" },
      { className: "fitlet-new-screen-training", label: "Training", title: "Start with the movement you want.", body: "Choose from 29 exercises and build your own sets.", name: "training", alt: "Fitlet training screen with 29 exercises" },
      { className: "fitlet-new-screen-league", label: "League", title: "Compete with friends.", body: "Weekly FP rankings give you one more reason to move.", name: "league", alt: "Fitlet league screen with weekly rankings" },
      { className: "fitlet-new-screen-profile", label: "Profile", title: "Keep the progress you make.", body: "Look back on your level and streak with your headband.", name: "profile", alt: "Fitlet profile screen showing a headband and streak" },
    ],
    proLabel: "Pro",
    proTitle: <>The more you continue,<br /><span>the more it fits you.</span></>,
    proIntro: "With Pro, your coach suggests workouts based on your goals and past records. Look back on your progress in more detail.",
    proFeatureTitle: <>Let your coach<br />plan today.</>,
    proFeatureBody: "Your goals and past records shape today’s recommended workout.",
    proAlt: "Fitlet Pro coach screen",
    benefits: [
      ["Recommended workouts", "A course shaped around your goals, so you always know what to do next."],
      ["Look back on your progress", "Review your streak, activity, and the changes you have made over time."],
      ["No ads", "A focused Pro experience that keeps you in the workout."],
    ],
    todayLabel: "Fitlet",
    todayTitle: <>Start with one<br />thing today.</>,
    todayBody: "One thing today can be the reason you move tomorrow.",
    todayButton: "Get in touch",
    footerTagline: "Move a little. Make it a habit.",
    footerLabel: "Footer navigation",
  } : {
    navHome: "ホーム",
    navPrivacy: "プライバシーポリシー",
    navTerms: "利用規約",
    navSupport: "お問い合わせ",
    navStart: "はじめる",
    navLabel: "メインナビゲーション",
    homeAria: "Fitlet ホーム",
    heroLabel: "Fitlet",
    heroTitle: <>ちょっと動くを、<br /><span>習慣に。</span></>,
    heroLead: "マップを進めて、カメラで回数を数えて、仲間と競う。いつもの運動が、ちょっと続けたくなる体験に。",
    heroButton: "Fitletの使い方を見る",
    heroAlt: "Fitletホーム。ワールドマップとトレーニング開始ボタン",
    featureTitle: <>続ける理由が、<br /><span>毎日の中にある。</span></>,
    pillars: [
      ["マップを進む", "トレーニングを終えるたび、マップの次の場所へ進みます。"],
      ["カメラで数える", "カメラが動きを捉えて、トレーニングの回数を自動でカウント。"],
      ["仲間と競う", "動いた分だけFPがたまり、毎週のリーグ順位が変わります。"],
      ["コーチに任せる", "Proなら、目標と記録に合わせて次のメニューを提案。"],
    ],
    screensTitle: <>Fitletのある<br /><span>毎日。</span></>,
    screensLead: "マップを進んで、トレーニングして、記録を残す。動くことが、少しずつ続いていきます。",
    screens: [
      { className: "fitlet-new-screen-home", label: "ホーム", title: "動くと、マップが進む。", body: "ひとつ終えるたび、次の場所へ。毎日の小さな達成を、目に見える旅にします。", name: "home", alt: "Fitletホームのマップ画面" },
      { className: "fitlet-new-screen-session", label: "トレーニング中", title: "カメラが、回数を数える。", body: "カメラが動きを捉えて、回数を自動で数えます。", name: "session", alt: "Fitletトレーニング中。実写のスクワットと青いボーン表示" },
      { className: "fitlet-new-screen-training", label: "トレーニング", title: "やりたい運動から始める。", body: "39種目から好きな運動を選んで、自分だけのセットも作れます。", name: "training", alt: "Fitletトレーニング。39種目の一覧" },
      { className: "fitlet-new-screen-league", label: "リーグ", title: "仲間と競う。", body: "毎週のFPで順位が変わるから、もう一回動きたくなる。", name: "league", alt: "Fitletリーグ。Bronze IIIと週間ランキング" },
      { className: "fitlet-new-screen-profile", label: "プロフィール", title: "続けた記録が残る。", body: "レベルや連続日数を、ハチマキと一緒に振り返れます。", name: "profile", alt: "Fitletプロフィール。ハチマキと7日連続の記録" },
    ],
    proLabel: "Pro",
    proTitle: <>続けるほど、<br /><span>自分に合っていく。</span></>,
    proIntro: "Proでは、目標やこれまでの記録をもとに、コーチがおすすめメニューを提案。続けた変化も詳しく振り返れます。",
    proFeatureTitle: <>今日のメニューを、<br />コーチに任せる。</>,
    proFeatureBody: "目標やこれまでの記録から、今日取り組むコースを提案します。",
    proAlt: "Fitlet Proのコーチ画面",
    benefits: [
      ["おすすめメニュー", "目標に合わせたコースで、次にやることに迷いません。"],
      ["運動の変化を振り返る", "続けた日数や運動量、できるようになったことを振り返れます。"],
      ["広告なし", "トレーニングに集中できる、Proだけの環境です。"],
    ],
    todayLabel: "Fitlet",
    todayTitle: <>まずは、<br />今日のひとつから。</>,
    todayBody: "今日のひとつが、明日も動くきっかけになる。",
    todayButton: "お問い合わせを見る",
    footerTagline: "ちょっと動くを、習慣に。",
    footerLabel: "フッターナビゲーション",
  };

  return (
    <main className="fitlet-new-site" id="top">
      <header className="fitlet-new-nav">
        <a href="#top" className="fitlet-new-logo" aria-label={copy.homeAria}>
          <img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" />
        </a>
        <nav aria-label={copy.navLabel}>
          <a href="#top">{copy.navHome}</a>
          <a href={localizedSitePath("/privacy", locale)}>{copy.navPrivacy}</a>
          <a href={localizedSitePath("/terms", locale)}>{copy.navTerms}</a>
          <a href={localizedSitePath("/support", locale)}>{copy.navSupport}</a>
          <LanguageSwitch />
          <a className="fitlet-new-nav-cta" href="#start">{copy.navStart}</a>
        </nav>
      </header>

      <section className="fitlet-new-hero">
        <div className="fitlet-new-hero-copy">
          <p className="fitlet-new-label">{copy.heroLabel}</p>
          <h1>{copy.heroTitle}</h1>
          <p className="fitlet-new-lead">{copy.heroLead}</p>
          <a className="fitlet-new-button fitlet-new-button-dark" href="#features">{copy.heroButton} <span aria-hidden="true">↗</span></a>
        </div>
        <PhoneFrame className="fitlet-new-hero-device" src={screen("home")} alt={copy.heroAlt} />
      </section>

      <Reveal><section className="fitlet-new-feature-intro" id="features">
        <div className="fitlet-new-shell">
          <h2>{copy.featureTitle}</h2>
          <div className="fitlet-new-pillars">
            {copy.pillars.map(([title, body], index) => <article key={title}><strong>{String(index + 1).padStart(2, "0")}</strong><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section></Reveal>

      <Reveal><section className="fitlet-new-screens fitlet-new-shell" id="screens">
        <div className="fitlet-new-section-head">
          <div><h2>{copy.screensTitle}</h2></div>
          <p>{copy.screensLead}</p>
        </div>
        <div className="fitlet-new-screen-grid">
          {copy.screens.map((item) => <ScreenCard key={item.name} className={item.className} label={item.label} title={item.title} body={item.body} src={screen(item.name)} alt={item.alt} />)}
        </div>
      </section></Reveal>

      <div className="fitlet-new-dark-world">
        <section className="fitlet-new-pro" id="pro">
          <div className="fitlet-new-shell">
            <div className="fitlet-new-pro-intro fitlet-new-reveal">
              <img className="fitlet-new-pro-logo" src={publicAsset("/brand/fitlet-pro-logo.svg")} alt="Fitlet Pro" />
              <h2>{copy.proTitle}</h2>
              <p>{copy.proIntro}</p>
            </div>
            <div className="fitlet-new-pro-feature fitlet-new-reveal">
              <div>
                <p className="fitlet-new-label">{copy.proLabel}</p>
                <h3>{copy.proFeatureTitle}</h3>
                <p>{copy.proFeatureBody}</p>
              </div>
              <PhoneFrame className="fitlet-new-pro-shot" src={screen("coach")} alt={copy.proAlt} />
            </div>
            <div className="fitlet-new-pro-benefits fitlet-new-reveal">
              {copy.benefits.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="fitlet-new-today fitlet-new-shell" id="start">
          <div className="fitlet-new-today-card">
            <div><p className="fitlet-new-label">{copy.todayLabel}</p><h2>{copy.todayTitle}</h2><p>{copy.todayBody}</p></div>
            <a className="fitlet-new-button fitlet-new-button-dark" href={localizedSitePath("/support", locale)}>{copy.todayButton} <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <footer className="fitlet-new-footer fitlet-new-shell">
          <div><a href="#top" className="fitlet-new-logo"><img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" /></a><p>{copy.footerTagline}</p></div>
          <nav aria-label={copy.footerLabel}><a href="#top">{copy.navHome}</a><a href={localizedSitePath("/support", locale)}>{copy.navSupport}</a><a href={localizedSitePath("/privacy", locale)}>{copy.navPrivacy}</a><a href={localizedSitePath("/terms", locale)}>{copy.navTerms}</a></nav>
        </footer>
      </div>
    </main>
  );
}
