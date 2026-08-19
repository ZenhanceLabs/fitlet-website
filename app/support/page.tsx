import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = { title: "お問い合わせ | Fitlet", description: "Fitletのよくある質問とお問い合わせ窓口。" };

const questions = [
  ["カメラを使わずにトレーニングできますか？", "できます。カメラによる自動カウントは任意の補助機能です。カメラを使わない場合も、図解・音声ガイドと手動カウントでトレーニングできます。"],
  ["カメラの映像や姿勢データは保存されますか？", "カメラ映像そのものを保存したり、サーバーへ送信したりすることはありません。端末上で動きを判定し、回数やカメラを使ったことなどの運動記録だけが履歴に残る場合があります。詳しくはプライバシー・利用規約をご確認ください。"],
  ["歩数の連携をやめたいです。", "設定から歩数連携をオフにできます。端末の設定でモーションとフィットネス、またはHealth Connectの歩数権限を変更することもできます。歩数を使わない場合も、トレーニングは利用できます。"],
  ["フレンドに何が表示されますか？", "公開設定に応じて、プロフィールカード、レベル・XP、今日トレーニングしたか、週間サマリーが承認済みのフレンドに表示されます。設定から項目ごとに公開範囲を変更できます。"],
  ["Proの購入を復元したいです。", "購入に使ったApple IDまたはGoogleアカウントと同じストアアカウントで、アプリ内の「購入を復元」を実行してください。解決しない場合は、購入日時や注文番号を本文に書かず、ストアの確認画面を添えてお問い合わせください。"],
  ["アカウントやデータを削除できますか？", "AppleまたはGoogleアカウントを連携済みの場合は、アプリ設定のアカウント削除から削除できます。匿名状態の端末内データは、アプリ内リセットまたはアプリの削除で消去できます。削除に関する相談はメールでも受け付けています。"],
];

const contactLinks = [
  { label: "メール", description: "個別の相談・削除依頼", href: "mailto:zenhancelabs@gmail.com?subject=Fitletへのお問い合わせ", external: false },
  { label: "X", description: "お知らせ・短い相談", href: "https://x.com/ZenhanceLabs", external: true },
  { label: "フォーム", description: "不具合・アイデアの報告", href: "https://forms.gle/A6AuxEZ4otXFmGQ28", external: true },
];

export default function SupportPage() {
  return (
    <main className="fitlet-new-subsite fitlet-new-contact-page">
      <SiteChrome current="support">
        <Reveal><section className="fitlet-new-subsite-hero fitlet-new-shell">
          <p className="fitlet-new-label">お問い合わせ</p>
          <h1>困ったときも、<br /><span>次の一歩へ。</span></h1>
          <p>よくある質問を確認しても解決しないときは、アプリと同じ窓口からご連絡ください。</p>
        </section></Reveal>

        <Reveal><section className="fitlet-new-faq fitlet-new-shell" aria-labelledby="faq-title">
          <div className="fitlet-new-subsite-heading"><p className="fitlet-new-label">よくある質問</p><h2 id="faq-title">使い方と、<br /><span>気になること。</span></h2></div>
          <div className="fitlet-new-faq-list">
            {questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><div className="fitlet-new-faq-answer"><p>{answer}</p></div></details>)}
          </div>
        </section></Reveal>

        <Reveal><section className="fitlet-new-contact-block fitlet-new-shell" aria-labelledby="contact-title">
          <div><p className="fitlet-new-label">お問い合わせ</p><h2 id="contact-title">解決しないときは、<br /><span>教えてください。</span></h2><p>アプリの設定にあるお問い合わせと同じ3つの窓口です。</p></div>
          <div className="fitlet-new-contact-actions">
            {contactLinks.map((link) => <a key={link.label} className="fitlet-new-contact-action" href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}><span>{link.label}</span><small>{link.description}</small><b aria-hidden="true">↗</b></a>)}
          </div>
        </section></Reveal>
      </SiteChrome>
    </main>
  );
}
