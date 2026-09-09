"use client";

import { LegalPage } from "./SiteChrome";
import { useLocale } from "../lib/locale";
import { sitePath } from "../lib/sitePath";

const UPDATED = "2026年8月19日";
const SUPPORT_EMAIL = "fitlet-support@zenhance.dev";

type LegalMode = "hub" | "privacy" | "terms";

function JapaneseLegalHubPage({ mode = "hub" }: { mode?: LegalMode } = {}) {
  const isPrivacy = mode === "privacy";
  const isTerms = mode === "terms";
  const current = mode === "privacy" ? "privacy" : mode === "terms" ? "terms" : "legal";
  const title = isPrivacy ? "プライバシーポリシー" : isTerms ? "利用規約" : "プライバシー・利用規約";
  const intro = isPrivacy
    ? "Fitletがどんな情報を使い、何のために使い、どう管理するかを説明します。"
    : isTerms
      ? "Fitletを利用するための条件を定めています。"
      : "Fitletのデータの扱いと、サービスをご利用いただくための条件をまとめています。";
  const toc = isPrivacy
    ? [{ href: "#privacy", label: "プライバシーポリシー" }, { href: "/terms", label: "利用規約" }, { href: "#contact", label: "お問い合わせ窓口" }]
    : isTerms
      ? [{ href: "#terms", label: "条文" }, { href: "/privacy", label: "プライバシーポリシー" }, { href: "#contact", label: "お問い合わせ窓口" }]
      : [{ href: "#privacy", label: "プライバシーポリシー" }, { href: "#terms", label: "利用規約" }, { href: "#contact", label: "お問い合わせ窓口" }];

  if (mode === "hub") {
    return (
      <LegalPage
        current="legal"
        eyebrow="法務"
        title="プライバシー・利用規約"
        intro="Fitletのデータの扱いと、サービスをご利用いただくための条件をご案内します。"
        updated={UPDATED}
        toc={toc}
      >
        <section id="privacy">
          <p className="legal-kicker">プライバシー</p>
          <h2>データの扱いを知る</h2>
          <p>Fitletが取得する情報、利用目的、第三者サービスとの連携、保存・削除の方法を説明しています。</p>
          <a className="fitlet-new-button fitlet-new-button-dark" href={sitePath("/privacy")}>プライバシーポリシーを読む <span aria-hidden="true">↗</span></a>
        </section>
        <section id="terms">
          <p className="legal-kicker">利用規約</p>
          <h2>サービスの利用条件</h2>
          <p>Fitletの使い方、アカウント、Proの購入、禁止事項、サービス変更について定めています。</p>
          <a className="fitlet-new-button fitlet-new-button-dark" href={sitePath("/terms")}>利用規約を読む <span aria-hidden="true">↗</span></a>
        </section>
        <section id="contact">
          <p className="legal-kicker">お問い合わせ</p>
          <h2>不明点があるときは</h2>
          <p>個人情報の開示・削除、購入、アプリの不具合についてはお問い合わせページからご連絡ください。</p>
          <a className="fitlet-new-button fitlet-new-button-dark" href={sitePath("/support")}>お問い合わせへ <span aria-hidden="true">↗</span></a>
        </section>
      </LegalPage>
    );
  }

  return (
    <LegalPage
      current={current}
      eyebrow="法務"
      title={title}
      intro={intro}
      updated={UPDATED}
      toc={toc}
    >
      {!isTerms && (<section id="privacy">
        <p className="legal-kicker">プライバシー</p>
        <h2>プライバシーポリシー</h2>
        <p>Fitletを安心して使っていただくために、どんな情報を使い、何のために使い、誰と共有するのかを説明します。Fitlet運営者（以下「運営者」）は、個人情報の保護に関する法律その他の適用法令に従って情報を取り扱います。</p>

        <h3>1. 取得する情報</h3>
        <p>本サービスでは、機能に応じて次の情報を取得または端末内に保存します。</p>
        <ul>
          <li><strong>アプリの進捗・設定：</strong>表示名、プロフィール、ハチマキのカスタマイズ、レベル、XP、FP、マップ進捗、連続日数、実績、運動履歴、セット設定、音声・通知・運動条件など。</li>
          <li><strong>運動記録：</strong>種目、回数、時間、完了状況、カメラを使用したか、判定結果、運動後のフィードバックなど。</li>
          <li><strong>カメラ・姿勢情報：</strong>カメラを使うトレーニングでは、端末カメラの映像から姿勢を処理し、回数や判定に利用します。カメラ映像そのものは保存・送信せず、カメラを使ったかどうかや運動結果だけが履歴に残る場合があります。</li>
          <li><strong>歩数・モーション情報：</strong>許可した場合に、iOSではPedometer、AndroidではHealth Connectから歩数を読み取り、XPや活動記録に反映します。位置情報は取得しません。</li>
          <li><strong>写真ライブラリ：</strong>プロフィールカード等を端末の写真ライブラリへ保存する機能を使う場合に、OSの写真権限を利用します。写真を運営者のサーバーへアップロードするための機能ではありません。</li>
          <li><strong>アカウント情報：</strong>匿名認証の識別子、またはユーザーが選択したApple／Googleアカウントとの連携に必要な識別情報。Appleの非公開メールアドレス等、認証サービスから提供される範囲の情報を含みます。</li>
          <li><strong>フレンド・リーグ情報：</strong>フレンドコード、表示名、公開を選んだプロフィールカード、レベル・活動状況・週間サマリー、リーグ参加・順位・FPなど。</li>
          <li><strong>購入情報：</strong>Proの購入・復元・購読状態を確認するためのストアおよびRevenueCatの識別子・ entitlement情報。運営者がクレジットカード番号を取得することはありません。</li>
          <li><strong>お問い合わせ情報：</strong>メール、X、フォームを通じてユーザーが送信したメールアドレス、端末・OS、問い合わせ本文、添付情報など。</li>
          <li><strong>ウェブの利用情報：</strong>本サイトのアクセス時に、ブラウザが通常送信するIPアドレス、日時、ユーザーエージェント等がホスティング事業者のログに記録される場合があります。このサイトでは広告目的の追跡やアクセス解析SDKを使用していません。</li>
        </ul>

        <h3>2. 利用目的</h3>
        <ul>
          <li>マップ、トレーニング、カメラによる回数判定、記録、音声・図解ガイドを提供するため</li>
          <li>ユーザーが設定した目標、体力レベル、避けたい動き、これまでの記録に応じてメニューや表示を調整するため</li>
          <li>フレンド、リーグ、プロフィール、週間サマリーなど、ユーザーが選択した機能を提供するため</li>
          <li>Apple／Googleの購入状態の確認、購入の復元、Pro機能の提供、不正利用の防止のため</li>
          <li>不具合調査、問い合わせ対応、サービスの安全性・品質改善、法令対応のため</li>
          <li>ユーザーの同意や端末の権限に基づき、通知を送信するため</li>
        </ul>

        <h3>3. 権限と選択</h3>
        <p>カメラ、歩数・モーション、Health Connect、通知の権限は、各機能を利用する場合にのみ求めます。拒否または後から無効化しても、権限を必要としない範囲の機能は利用できます。権限は端末の設定から変更できます。カメラの映像やHealthKit等に由来する情報を広告・マーケティング・データブローカーのために利用しません。</p>

        <h3>4. 第三者提供・委託先</h3>
        <p>運営者は、法令に基づく場合、本人の同意がある場合、または次の委託先が本サービスを提供するために必要な場合を除き、個人情報を第三者へ提供しません。委託先には、契約・利用規約・プライバシーポリシー等に基づき、適切な安全管理を求めます。</p>
        <ul>
          <li><strong>Firebase：</strong>匿名認証、Apple／Google連携、認証済みユーザーの進捗同期、フレンド・リーグのクラウド処理、App Check。</li>
          <li><strong>RevenueCat：</strong>Proの購入・購読状態の管理。購入自体はApple App StoreまたはGoogle Playが処理します。</li>
          <li><strong>Apple／Google：</strong>アプリ配信、認証、決済、購読、端末のカメラ・歩数・通知権限に関するOS機能。</li>
          <li><strong>Google Mobile Ads：</strong>広告を表示する版では、広告配信・計測に必要な端末情報、IPアドレス、広告識別子等がSDKの仕様に従って取り扱われる場合があります。広告のパーソナライズや追跡に関するOS・SDKの設定を尊重します。</li>
          <li><strong>問い合わせサービス：</strong>Google Forms、Gmail、X。ユーザーが各ボタンから送信した場合に限り、各サービスの規約・ポリシーに従って処理されます。</li>
          <li><strong>ホスティング事業者：</strong>本サイトの配信と通常のサーバーログ管理。</li>
        </ul>
        <p>上記の事業者が日本国外で情報を取り扱う場合があります。保存場所、再委託、国外移転の詳細は、各事業者の最新の規約・プライバシー情報にも従います。</p>

        <h3>5. フレンドへの表示</h3>
        <p>フレンド機能では、公開設定に応じてプロフィールカード、レベル・XP、今日トレーニングしたか、週間サマリーを承認済みのフレンドへ表示します。公開範囲は設定から変更できます。フレンドコードや表示名には、住所、電話番号、メールアドレスなどの個人情報を入力しないでください。</p>

        <h3>6. 保存期間・削除</h3>
        <p>端末内のデータは、アプリが必要とする期間またはユーザーがリセット・削除するまで保存します。連携アカウントのクラウド進捗やフレンド情報は、機能提供に必要な期間、アカウント削除または削除依頼の処理まで保存します。法令上保存が必要な記録、バックアップ、紛争対応に必要な情報は、直ちに削除できない場合があります。</p>
        <p>連携済みアカウントは、アプリ設定からアカウント削除を行えます。匿名状態の端末内データは、アプリ内リセットまたはアプリの削除で消去されます。削除依頼はお問い合わせ窓口からも受け付けます。</p>

        <h3>7. 開示・訂正・利用停止等</h3>
        <p>本人は、適用法令に従い、利用目的の通知、保有個人データの開示、訂正・追加・削除、利用停止・消去、第三者提供の停止等を請求できます。請求時には、本人確認のため必要な情報をお願いする場合があります。法令上応じられない場合は、その理由を説明します。</p>

        <h3>8. 安全管理・子どもの利用</h3>
        <p>運営者は、アクセス制御、通信の保護、権限の限定、入力値の検証等、情報の性質に応じた合理的な安全管理措置を講じます。ただし、インターネット上の通信や端末の紛失を完全に防止できるものではありません。未成年者は保護者の同意を得て利用し、保護者は有料購入と公開情報を確認してください。</p>

        <h3>9. 改定</h3>
        <p>法令、機能、委託先または運営者の変更に応じ、本ポリシーを改定することがあります。重要な変更は、本サイトまたはアプリ内で分かりやすく告知し、必要な場合は追加の同意を取得します。</p>
      </section>)}

      {!isPrivacy && (<section id="terms">
        <p className="legal-kicker">条文</p>
        <h2>Fitletの利用条件</h2>
        <p>この利用規約（以下「本規約」）は、Fitlet運営者が提供する本サービスの利用条件を定めるものです。本サービスを利用する前に、本規約とプライバシーポリシーをお読みください。</p>

        <h3>第1条（適用・同意）</h3>
        <p>ユーザーが本サービスを利用した時点で、本規約およびプライバシーポリシーに同意したものとします。未成年者は、親権者その他の法定代理人の同意を得て利用してください。</p>

        <h3>第2条（サービスの内容）</h3>
        <p>本サービスは、短時間の運動、29種目のトレーニング、セット作成、カメラによる動作判定・回数カウント、歩数連携、マップ、XP・FP、フレンド、週間リーグ、プロフィール、Proのおすすめメニューや分析等を提供します。対応端末、地域、無料・有料の範囲、提供機能は変更または終了することがあります。</p>

        <h3>第3条（健康・安全上の注意）</h3>
        <p>Fitletは、毎日の運動を続けるためのアプリです。医療行為や診断を行うものではありません。痛み、めまい、息苦しさ、体調不良を感じた場合は運動をやめ、必要に応じて医師へ相談してください。</p>

        <h3>第4条（アカウント・端末・権限）</h3>
        <p>本サービスは匿名認証を利用する場合があり、AppleまたはGoogleアカウントと連携できます。ユーザーは自身の端末・認証情報を管理し、第三者への貸与、なりすまし、進捗・FP・順位の不正操作をしてはいけません。カメラ、歩数、Health Connect、通知などの権限を拒否した場合、一部機能が利用できないことがあります。</p>

        <h3>第5条（フレンド・表示名・禁止事項）</h3>
        <p>表示名、プロフィール、フレンドコード等は、第三者の権利を侵害しない内容にしてください。違法行為、脅迫、差別、嫌がらせ、なりすまし、第三者の個人情報の掲載、スパム、リバースエンジニアリング、過度な負荷、不正アクセス、報酬や順位の改ざん、サービスを妨げる行為を禁止します。運営者は、必要な範囲で表示の削除、機能制限、利用停止、アカウント削除を行えます。</p>

        <h3>第6条（Pro・購入・解約・返金）</h3>
        <p>Proの価格、期間、更新、無料トライアル、対象機能は、購入画面およびApple App StoreまたはGoogle Playの表示が優先します。決済、解約、返金、購入の復元は各ストアの手続と規則に従います。自動更新のサブスクリプションは、ストア所定の方法で解約しない限り更新される場合があります。</p>

        <h3>第7条（知的財産）</h3>
        <p>本サービスの名称、ロゴ、キャラクター、UI、文章、音声、プログラム、画像その他のコンテンツの権利は、運営者または正当な権利者に帰属します。第三者ライセンスの対象素材は、そのライセンス表示に従います。規約で許可された範囲を超える複製、転載、販売、配布、改変、二次利用は禁止します。</p>

        <h3>第8条（停止・変更・終了）</h3>
        <p>保守、障害、セキュリティ、法令、ストアの判断その他の運営上の必要がある場合、運営者は本サービスの全部または一部を停止、変更、終了できます。可能な範囲で事前に告知しますが、緊急時はこの限りではありません。</p>

        <h3>第9条（保証・責任）</h3>
        <p>運営者は、本サービスが特定の目的に適合すること、常に利用できること、データが失われないこと、運動結果が得られることを保証しません。運営者の故意または重過失による場合を除き、法令で認められる範囲で、本サービスに起因する損害について責任を負いません。ただし、消費者契約法その他の強行法規により無効となる責任制限は適用しません。</p>

        <h3>第10条（規約の変更）</h3>
        <p>運営者は、法令の変更、サービスの追加、ユーザーの利益その他の事情を考慮し、本規約を変更できます。変更内容と施行時期を本サイトまたはアプリ内で告知し、法令上必要な場合は同意を取得します。</p>

        <h3>第11条（準拠法・裁判管轄）</h3>
        <p>本規約は日本法に準拠します。本サービスに関する紛争については、運営者の主たる事務所所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。消費者に適用される強行法規上の権利を妨げるものではありません。</p>
      </section>)}

      <section id="contact">
        <p className="legal-kicker">お問い合わせ</p>
        <h2>お問い合わせ窓口</h2>
        <p>個人情報の開示・削除、購入に関する確認、アプリの不具合については、お問い合わせページからご連絡ください。</p>
        <div className="contact-card"><strong>Fitlet運営者</strong><p>Zenhance Labs<br /><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p></div>
      </section>
    </LegalPage>
  );
}

function EnglishLegalHubPage({ mode = "hub" }: { mode?: LegalMode } = {}) {
  const isPrivacy = mode === "privacy";
  const isTerms = mode === "terms";
  const current = isPrivacy ? "privacy" : isTerms ? "terms" : "legal";
  const title = isPrivacy ? "Privacy Policy" : isTerms ? "Terms of Service" : "Privacy & Terms";
  const intro = isPrivacy
    ? "Learn what information Fitlet uses, why we use it, and how we manage it."
    : isTerms
      ? "The terms that apply when you use Fitlet."
      : "How Fitlet handles data and the terms for using the service.";
  const toc = isPrivacy
    ? [{ href: "#privacy", label: "Privacy Policy" }, { href: "/terms", label: "Terms of Service" }, { href: "#contact", label: "Contact" }]
    : isTerms
      ? [{ href: "#terms", label: "Terms" }, { href: "/privacy", label: "Privacy Policy" }, { href: "#contact", label: "Contact" }]
      : [{ href: "#privacy", label: "Privacy Policy" }, { href: "#terms", label: "Terms of Service" }, { href: "#contact", label: "Contact" }];

  return (
    <LegalPage current={current} eyebrow="Legal" title={title} intro={intro} updated="August 19, 2026" toc={toc}>
      {!isTerms && (<section id="privacy">
        <p className="legal-kicker">Privacy</p>
        <h2>Privacy Policy</h2>
        <p>To help you use Fitlet with confidence, this policy explains what information we use, why we use it, and who we share it with. Fitlet’s operator (“we,” “us,” or “the operator”) handles information in accordance with applicable privacy laws and regulations.</p>

        <h3>1. Information we collect</h3>
        <p>Depending on the features you use, we collect or store the following information on your device or through the service.</p>
        <ul>
          <li><strong>App progress and settings:</strong> Display name, profile, headband customization, level, XP, FP, map progress, streaks, achievements, workout history, set settings, and audio, notification, and workout preferences.</li>
          <li><strong>Workout records:</strong> Exercise type, reps, duration, completion status, whether the camera was used, evaluation results, and post-workout feedback.</li>
          <li><strong>Camera and pose data:</strong> For camera-based workouts, pose information is processed from your device camera to count reps and evaluate movement. Camera footage itself is not saved or sent to our servers. Your history may include whether the camera was used and the resulting workout records.</li>
          <li><strong>Steps and motion data:</strong> If you grant permission, Fitlet reads step counts from Pedometer on iOS or Health Connect on Android and uses them for XP or activity records. We do not collect location data.</li>
          <li><strong>Photo library:</strong> When you use a feature that saves a profile card or similar image to your device’s photo library, Fitlet uses the operating system’s photo permission. This is not a feature for uploading your photos to our servers.</li>
          <li><strong>Account information:</strong> An anonymous authentication identifier, or the identifiers needed to link an Apple or Google account selected by you. This may include information provided by the authentication service, such as Apple’s private relay email address.</li>
          <li><strong>Friends and league data:</strong> Friend codes, display names, profile cards you choose to make public, level, activity status, weekly summaries, league participation, rankings, and FP.</li>
          <li><strong>Purchase information:</strong> Store and RevenueCat identifiers and entitlement information used to verify Pro purchases, restores, and subscription status. We do not receive your credit card number.</li>
          <li><strong>Contact information:</strong> Information you send through email, X, or a form, such as your email address, device and operating system details, message, and attachments.</li>
          <li><strong>Website usage information:</strong> When you visit this website, the hosting provider’s logs may record information normally sent by a browser, such as your IP address, timestamp, and user agent. This website does not use advertising trackers or an analytics SDK.</li>
        </ul>

        <h3>2. How we use information</h3>
        <ul>
          <li>To provide the map, workouts, camera-based rep counting, records, audio, and illustrated guidance</li>
          <li>To adjust menus and displays based on your goals, fitness level, movements you want to avoid, and past records</li>
          <li>To provide features you choose, such as friends, leagues, profiles, and weekly summaries</li>
          <li>To verify Apple or Google purchases, restore purchases, provide Pro features, and prevent misuse</li>
          <li>To investigate bugs, respond to questions, improve safety and quality, and comply with laws</li>
          <li>To send notifications when you have given consent or device permission</li>
        </ul>

        <h3>3. Permissions and your choices</h3>
        <p>We request camera, steps and motion, Health Connect, and notification permissions only when you use a feature that needs them. If you deny or later disable a permission, features that do not require it remain available. You can change permissions in your device settings. We do not use camera footage or information derived from HealthKit and similar services for advertising, marketing, or data-broker purposes.</p>

        <h3>4. Sharing and service providers</h3>
        <p>Unless required by law, authorized by you, or necessary for the following providers to deliver the service, we do not disclose personal information to third parties. We require providers to apply appropriate security measures under their contracts, terms, privacy policies, or other applicable arrangements.</p>
        <ul>
          <li><strong>Firebase:</strong> Anonymous authentication, Apple and Google account linking, cloud synchronization of authenticated users’ progress, cloud processing for friends and leagues, and App Check.</li>
          <li><strong>RevenueCat:</strong> Management of Pro purchase and subscription status. Apple App Store or Google Play processes the purchase itself.</li>
          <li><strong>Apple and Google:</strong> App distribution, authentication, payments, subscriptions, and operating-system functions for camera, steps, motion, and notifications.</li>
          <li><strong>Google Mobile Ads:</strong> In versions that display ads, device information, IP address, advertising identifiers, and other information needed for ad delivery or measurement may be handled according to the SDK’s specifications. We respect operating-system and SDK settings for personalized advertising and tracking.</li>
          <li><strong>Contact services:</strong> Google Forms, Gmail, and X. They process information under their own terms and policies only when you choose to submit information through those services.</li>
          <li><strong>Hosting provider:</strong> Website delivery and ordinary server log management.</li>
        </ul>
        <p>Some of these providers may process information outside Japan. Their latest terms and privacy information also apply to storage locations, subcontractors, and international transfers.</p>

        <h3>5. What friends can see</h3>
        <p>For friend features, your profile card, level and XP, whether you trained today, and your weekly summary may be shown to approved friends depending on your sharing settings. You can change the sharing range in Settings. Do not enter personal information such as your address, phone number, or email address in a friend code or display name.</p>

        <h3>6. Retention and deletion</h3>
        <p>Device data is stored for as long as the app needs it or until you reset or delete it. Cloud progress and friend information associated with a linked account are stored for as long as needed to provide the feature, until account deletion, or until we process a deletion request. Records that must be retained by law, backups, and information needed for dispute handling may not be deleted immediately.</p>
        <p>You can delete a linked account from Account deletion in the app settings. Anonymous, device-only data is removed by resetting the app or deleting it. You can also submit a deletion request through the contact channels below.</p>

        <h3>7. Access, correction, and other rights</h3>
        <p>Subject to applicable law, you may request notice of the purposes of use, access to personal data we hold, correction, addition, deletion, restriction of use, erasure, or cessation of provision to third parties. We may ask for information needed to verify your identity. If we cannot comply because of a legal exception, we will explain the reason.</p>

        <h3>8. Security and children</h3>
        <p>We take reasonable security measures appropriate to the nature of the information, including access controls, protected communications, limited permissions, and input validation. However, no internet communication or device can be made completely secure. Minors should use Fitlet with a parent or guardian’s consent, and guardians should review paid purchases and shared information.</p>

        <h3>9. Changes</h3>
        <p>We may update this policy in response to changes in law, features, providers, or our operations. We will clearly announce important changes on this website or in the app and obtain additional consent when required.</p>
      </section>)}

      {!isPrivacy && (<section id="terms">
        <p className="legal-kicker">Terms</p>
        <h2>Fitlet Terms of Service</h2>
        <p>These Terms of Service (“Terms”) set out the conditions for using the service provided by Fitlet’s operator. Please read these Terms and the Privacy Policy before using the service.</p>

        <h3>Article 1. Application and consent</h3>
        <p>By using the service, you agree to these Terms and the Privacy Policy. Minors must use the service with the consent of a parent or other legal guardian.</p>

        <h3>Article 2. Service description</h3>
        <p>The service provides short workouts, 29 exercises, set creation, camera-based movement evaluation and rep counting, step integration, maps, XP and FP, friends, weekly leagues, profiles, and Pro recommendations and analysis. Supported devices, regions, free and paid features, and available functions may change or end.</p>

        <h3>Article 3. Health and safety</h3>
        <p>Fitlet is an app intended to help you keep up a daily movement routine. It does not provide medical treatment or diagnosis. Stop exercising and consult a doctor as appropriate if you feel pain, dizziness, shortness of breath, or otherwise unwell.</p>

        <h3>Article 4. Accounts, devices, and permissions</h3>
        <p>The service may use anonymous authentication and can be linked to an Apple or Google account. You are responsible for managing your device and authentication information. You must not lend them to others, impersonate another person, or manipulate progress, FP, or rankings unfairly. If you deny permissions for the camera, steps, Health Connect, notifications, or other features, some functions may be unavailable.</p>

        <h3>Article 5. Friends, display names, and prohibited conduct</h3>
        <p>Display names, profiles, and friend codes must not infringe another person’s rights. You may not engage in illegal acts, threats, discrimination, harassment, impersonation, posting another person’s personal information, spam, reverse engineering, excessive load, unauthorized access, tampering with rewards or rankings, or other conduct that interferes with the service. We may remove content, restrict features, suspend use, or delete an account to the extent reasonably necessary.</p>

        <h3>Article 6. Pro, purchases, cancellation, and refunds</h3>
        <p>The price, term, renewal, free trial, and eligible features for Pro are governed by the purchase screen and the information shown by Apple App Store or Google Play. Payments, cancellation, refunds, and purchase restores follow each store’s procedures and rules. Auto-renewing subscriptions may renew unless you cancel them through the method specified by the applicable store.</p>

        <h3>Article 7. Intellectual property</h3>
        <p>Rights in the service name, logo, characters, UI, text, audio, programs, images, and other content belong to the operator or the relevant rights holder. Materials subject to third-party licenses are governed by their license notices. You may not copy, republish, sell, distribute, modify, or reuse content beyond what these Terms allow.</p>

        <h3>Article 8. Suspension, changes, and termination</h3>
        <p>We may suspend, change, or terminate all or part of the service when reasonably necessary for maintenance, outages, security, legal requirements, store decisions, or other operational reasons. We will give advance notice when reasonably possible, but this may not be possible in an emergency.</p>

        <h3>Article 9. Disclaimers and liability</h3>
        <p>We do not warrant that the service will meet a particular purpose, remain continuously available, preserve all data, or produce a particular exercise result. Except in cases caused by our willful misconduct or gross negligence, we are not liable for damages arising from the service to the extent permitted by law. Limitations that would be invalid under the Consumer Contract Act or other mandatory law do not apply.</p>

        <h3>Article 10. Changes to these Terms</h3>
        <p>We may change these Terms in light of changes in law, additions to the service, user interests, or other circumstances. We will announce the changes and their effective date on this website or in the app and obtain consent when required by law.</p>

        <h3>Article 11. Governing law and jurisdiction</h3>
        <p>These Terms are governed by the laws of Japan. Any dispute concerning the service will be submitted to the court with jurisdiction over the operator’s principal office as the court of first instance by exclusive agreement. This does not limit mandatory rights available to consumers.</p>
      </section>)}

      <section id="contact">
        <p className="legal-kicker">Contact</p>
        <h2>Contact us</h2>
        <p>For requests to access or delete personal information, purchase questions, or app issues, please contact us through the support page.</p>
        <div className="contact-card"><strong>Fitlet operator</strong><p>Zenhance Labs<br /><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p></div>
      </section>
    </LegalPage>
  );
}

export function LegalHubPage({ mode = "hub" }: { mode?: LegalMode } = {}) {
  const { locale } = useLocale();
  return locale === "en" ? <EnglishLegalHubPage mode={mode} /> : <JapaneseLegalHubPage mode={mode} />;
}

export function PrivacyPolicyPage() {
  return <LegalHubPage mode="privacy" />;
}

export function TermsPage() {
  return <LegalHubPage mode="terms" />;
}
