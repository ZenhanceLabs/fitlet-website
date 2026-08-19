import { Reveal } from "./components/Reveal";
import { publicAsset } from "./lib/publicAsset";
import { sitePath } from "./lib/sitePath";

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
  return (
    <main className="fitlet-new-site" id="top">
      <header className="fitlet-new-nav">
        <a href="#top" className="fitlet-new-logo" aria-label="Fitlet ホーム">
          <img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" />
        </a>
        <nav aria-label="メインナビゲーション">
          <a href="#top">ホーム</a>
          <a href={sitePath("/privacy")}>プライバシーポリシー</a>
          <a href={sitePath("/terms")}>利用規約</a>
          <a href={sitePath("/support")}>お問い合わせ</a>
          <a className="fitlet-new-nav-cta" href="#start">はじめる</a>
        </nav>
      </header>

      <section className="fitlet-new-hero">
        <div className="fitlet-new-hero-copy">
          <p className="fitlet-new-label">Fitlet</p>
          <h1>ちょっと動くを、<br /><span>習慣に。</span></h1>
          <p className="fitlet-new-lead">マップを進めて、カメラで回数を数えて、仲間と競う。いつもの運動が、ちょっと続けたくなる体験に。</p>
          <a className="fitlet-new-button fitlet-new-button-dark" href="#features">Fitletの使い方を見る <span aria-hidden="true">↗</span></a>
        </div>
        <PhoneFrame className="fitlet-new-hero-device" src={publicAsset("/app-screens/ja/real-home.png")} alt="Fitletホーム。ワールドマップとトレーニング開始ボタン" />
      </section>

      <Reveal><section className="fitlet-new-feature-intro" id="features">
        <div className="fitlet-new-shell">
          <h2>続ける理由が、<br /><span>毎日の中にある。</span></h2>
          <div className="fitlet-new-pillars">
            <article><strong>01</strong><h3>マップを進む</h3><p>トレーニングを終えるたび、マップの次の場所へ進みます。</p></article>
            <article><strong>02</strong><h3>カメラで数える</h3><p>カメラが動きを捉えて、トレーニングの回数を自動でカウント。</p></article>
            <article><strong>03</strong><h3>仲間と競う</h3><p>動いた分だけFPがたまり、毎週のリーグ順位が変わります。</p></article>
            <article><strong>04</strong><h3>コーチに任せる</h3><p>Proなら、目標と記録に合わせて次のメニューを提案。</p></article>
          </div>
        </div>
      </section></Reveal>

      <Reveal><section className="fitlet-new-screens fitlet-new-shell" id="screens">
        <div className="fitlet-new-section-head">
          <div><h2>Fitletのある<br /><span>毎日。</span></h2></div>
          <p>マップを進んで、トレーニングして、記録を残す。動くことが、少しずつ続いていきます。</p>
        </div>
        <div className="fitlet-new-screen-grid">
          <ScreenCard
            className="fitlet-new-screen-home"
            label="ホーム"
            title="動くと、マップが進む。"
            body="ひとつ終えるたび、次の場所へ。毎日の小さな達成を、目に見える旅にします。"
            src={publicAsset("/app-screens/ja/real-home.png")}
            alt="Fitletホームのマップ画面"
          />
          <ScreenCard
            className="fitlet-new-screen-session"
            label="トレーニング中"
            title="カメラが、回数を数える。"
            body="スクワット中のフォームを見守り、動きに合わせてカウントします。"
            src={publicAsset("/app-screens/ja/real-session.png")}
            alt="Fitletトレーニング中。実写のスクワットと青いボーン表示"
          />
          <ScreenCard
            className="fitlet-new-screen-training"
            label="トレーニング"
            title="やりたい運動から始める。"
            body="39種目から好きな運動を選んで、自分だけのセットも作れます。"
            src={publicAsset("/app-screens/ja/real-training.png")}
            alt="Fitletトレーニング。39種目の一覧"
          />
          <ScreenCard
            className="fitlet-new-screen-league"
            label="リーグ"
            title="仲間と競う。"
            body="毎週のFPで順位が変わるから、もう一回動きたくなる。"
            src={publicAsset("/app-screens/ja/real-league.png")}
            alt="Fitletリーグ。Bronze IIIと週間ランキング"
          />
          <ScreenCard
            className="fitlet-new-screen-profile"
            label="プロフィール"
            title="続けた記録が残る。"
            body="レベルや連続日数を、ハチマキと一緒に振り返れます。"
            src={publicAsset("/app-screens/ja/real-profile.png")}
            alt="Fitletプロフィール。ハチマキと7日連続の記録"
          />
        </div>
      </section></Reveal>

      <div className="fitlet-new-dark-world">
        <section className="fitlet-new-pro" id="pro">
          <div className="fitlet-new-shell">
            <div className="fitlet-new-pro-intro fitlet-new-reveal">
              <img className="fitlet-new-pro-logo" src={publicAsset("/brand/fitlet-pro-logo.svg")} alt="Fitlet Pro" />
              <h2>続けるほど、<br /><span>自分に合っていく。</span></h2>
                <p>Proでは、目標やこれまでの記録をもとに、コーチがおすすめメニューを提案。続けた変化も詳しく振り返れます。</p>
            </div>
            <div className="fitlet-new-pro-feature fitlet-new-reveal">
              <div>
                <p className="fitlet-new-label">Pro</p>
                <h3>今日のメニューを、<br />コーチに任せる。</h3>
                <p>目標やこれまでの記録から、今日取り組むコースを提案します。</p>
              </div>
              <PhoneFrame className="fitlet-new-pro-shot" src={publicAsset("/app-screens/ja/real-coach.png")} alt="Fitlet Proのコーチ画面" />
            </div>
            <div className="fitlet-new-pro-benefits fitlet-new-reveal">
              <article><h3>おすすめメニュー</h3><p>目標に合わせたコースで、次にやることに迷いません。</p></article>
              <article><h3>運動の変化を振り返る</h3><p>続けた日数や運動量、できるようになったことを振り返れます。</p></article>
              <article><h3>広告なし</h3><p>トレーニングに集中できる、Proだけの環境です。</p></article>
            </div>
          </div>
        </section>

        <section className="fitlet-new-today fitlet-new-shell" id="start">
          <div className="fitlet-new-today-card">
            <div><p className="fitlet-new-label">Fitlet</p><h2>まずは、<br />今日のひとつから。</h2><p>今日のひとつが、明日も動くきっかけになる。</p></div>
            <a className="fitlet-new-button fitlet-new-button-dark" href={sitePath("/support")}>お問い合わせを見る <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <footer className="fitlet-new-footer fitlet-new-shell">
          <div><a href="#top" className="fitlet-new-logo"><img src={publicAsset("/brand/fitlet-logo.svg")} alt="Fitlet" /></a><p>ちょっと動くを、習慣に。</p></div>
          <nav aria-label="フッターナビゲーション"><a href="#top">ホーム</a><a href={sitePath("/support")}>お問い合わせ</a><a href={sitePath("/privacy")}>プライバシーポリシー</a><a href={sitePath("/terms")}>利用規約</a></nav>
        </footer>
      </div>
    </main>
  );
}
