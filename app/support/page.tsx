"use client";

import { Reveal } from "../components/Reveal";
import { SiteChrome } from "../components/SiteChrome";
import { useLocale } from "../lib/locale";

const questions = {
  ja: [
    ["カメラを使わずにトレーニングできますか？", "できます。カメラによる自動カウントは任意の補助機能です。カメラを使わない場合も、図解・音声ガイドと手動カウントでトレーニングできます。"],
    ["カメラの映像や姿勢データは保存されますか？", "カメラ映像そのものを保存したり、サーバーへ送信したりすることはありません。端末上で動きを判定し、回数やカメラを使ったことなどの運動記録だけが履歴に残る場合があります。詳しくはプライバシー・利用規約をご確認ください。"],
    ["歩数の連携をやめたいです。", "設定から歩数連携をオフにできます。端末の設定でモーションとフィットネス、またはHealth Connectの歩数権限を変更することもできます。歩数を使わない場合も、トレーニングは利用できます。"],
    ["フレンドに何が表示されますか？", "公開設定に応じて、プロフィールカード、レベル・XP、今日トレーニングしたか、週間サマリーが承認済みのフレンドに表示されます。設定から項目ごとに公開範囲を変更できます。"],
    ["Proの購入を復元したいです。", "購入に使ったApple IDまたはGoogleアカウントと同じストアアカウントで、アプリ内の「購入を復元」を実行してください。解決しない場合は、購入日時や注文番号を本文に書かず、ストアの確認画面を添えてお問い合わせください。"],
    ["アカウントやデータを削除できますか？", "AppleまたはGoogleアカウントを連携済みの場合は、アプリ設定のアカウント削除から削除できます。匿名状態の端末内データは、アプリ内リセットまたはアプリの削除で消去できます。削除に関する相談はメールでも受け付けています。"],
  ],
  en: [
    ["Can I work out without using the camera?", "Yes. Automatic camera counting is optional. You can still work out with illustrated and voice guidance, together with manual counting."],
    ["Is camera footage or pose data saved?", "No. Camera footage is not saved or sent to our servers. Movement is analyzed on your device; only workout records, such as your reps or whether you used the camera, may remain in your history. See our Privacy Policy and Terms for details."],
    ["I want to stop syncing my steps.", "Turn off step syncing in Settings. You can also change Motion & Fitness or Health Connect permissions in your device settings. Workouts remain available without step data."],
    ["What do my friends see?", "Depending on your sharing settings, approved friends may see your profile card, level and XP, whether you trained today, and your weekly summary. You can change the visibility of each item in Settings."],
    ["How do I restore my Pro purchase?", "Use the same App Store or Google Play account you used to make the purchase, then select “Restore Purchases” in the app. If the issue continues, contact us with a screenshot of the store confirmation screen. Please do not include your purchase date or order number in the message body."],
    ["Can I delete my account or data?", "If you linked an Apple or Google account, you can delete it from Account deletion in the app settings. Anonymous, device-only data can be cleared by resetting the app or deleting it. You can also contact us by email if you need help with deletion."],
  ],
} as const;

const contactLinks = {
  ja: [
    { label: "メール", description: "個別の相談・削除依頼", href: "mailto:fitlet-support@zenhance.dev?subject=Fitletへのお問い合わせ", external: false },
    { label: "X", description: "お知らせ・短い相談", href: "https://x.com/ZenhanceLabs", external: true },
    { label: "フォーム", description: "不具合・アイデアの報告", href: "https://forms.gle/A6AuxEZ4otXFmGQ28", external: true },
  ],
  en: [
    { label: "Email", description: "Questions and deletion requests", href: "mailto:fitlet-support@zenhance.dev?subject=Fitlet%20support", external: false },
    { label: "X", description: "News and short questions", href: "https://x.com/ZenhanceLabs", external: true },
    { label: "Form", description: "Bug reports and ideas", href: "https://forms.gle/A6AuxEZ4otXFmGQ28", external: true },
  ],
} as const;

export default function SupportPage() {
  const { locale } = useLocale();
  const isEnglish = locale === "en";

  return (
    <main className="fitlet-new-subsite fitlet-new-contact-page">
      <SiteChrome current="support">
        <Reveal><section className="fitlet-new-subsite-hero fitlet-new-shell">
          <p className="fitlet-new-label">{isEnglish ? "Support" : "お問い合わせ"}</p>
          <h1>{isEnglish ? <>Need a hand?<br /><span>Take the next step.</span></> : <>困ったときも、<br /><span>次の一歩へ。</span></>}</h1>
          <p>{isEnglish ? "If the FAQs don’t answer your question, reach out through the same channels as the app." : "よくある質問を確認しても解決しないときは、アプリと同じ窓口からご連絡ください。"}</p>
        </section></Reveal>

        <Reveal><section className="fitlet-new-faq fitlet-new-shell" aria-labelledby="faq-title">
          <div className="fitlet-new-subsite-heading"><p className="fitlet-new-label">{isEnglish ? "FAQ" : "よくある質問"}</p><h2 id="faq-title">{isEnglish ? <>How Fitlet works,<br /><span>and what to know.</span></> : <>使い方と、<br /><span>気になること。</span></>}</h2></div>
          <div className="fitlet-new-faq-list">
            {questions[locale].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><div className="fitlet-new-faq-answer"><p>{answer}</p></div></details>)}
          </div>
        </section></Reveal>

        <Reveal><section className="fitlet-new-contact-block fitlet-new-shell" aria-labelledby="contact-title">
          <div><p className="fitlet-new-label">{isEnglish ? "Contact" : "お問い合わせ"}</p><h2 id="contact-title">{isEnglish ? <>Still stuck?<br /><span>Tell us what happened.</span></> : <>解決しないときは、<br /><span>教えてください。</span></>}</h2><p>{isEnglish ? "These are the same three channels available from the in-app support menu." : "アプリの設定にあるお問い合わせと同じ3つの窓口です。"}</p></div>
          <div className="fitlet-new-contact-actions">
            {contactLinks[locale].map((link) => <a key={link.label} className="fitlet-new-contact-action" href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}><span>{link.label}</span><small>{link.description}</small><b aria-hidden="true">↗</b></a>)}
          </div>
        </section></Reveal>
      </SiteChrome>
    </main>
  );
}
