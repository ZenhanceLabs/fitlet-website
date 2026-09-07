# Fitlet ストア素材

既存の Fitlet 素材だけを使い、明るい配色・太い輪郭・フラットな面でまとめた日本語・英語のストア素材です。フィーチャーグラフィックはロゴと既存キャラクターだけでシンプルに、最初の2枚は1枚のホームマップ画面を大きく斜めに横たわせて左右2枚にまたがせています。ストア表示時の隙間を見越して、編集元の連結キャンバスには中央32pxの想定ガターを設け、右側の書き出し範囲をずらしています。編集元は `source/` にあります。PNG は `node scripts/export-store-assets.mjs` で再出力できます。

## 納品ファイル

### Apple App Store

- アイコンは新規作成していません。既存の `public/brand/fitlet-ios-icon.png` をそのまま使ってください。
- `apple/screenshots/fitlet-cover-ja.png` — 1290 × 2796。マップスプレッドの左側・ストア1枚目。
- `apple/screenshots/fitlet-home-ja.png` — 1290 × 2796。マップスプレッドの右側・ストア2枚目。
- `apple/screenshots/fitlet-map-spread-with-gutter.png` — 上記2枚をストア表示時の32pxガター付きで横につないだ確認用プレビュー。
- `apple/screenshots/fitlet-*-ja.png` — 1・2枚目以外の既存日本語ストア画像 5 点。

### Apple App Store（English）

- `apple/screenshots/en/fitlet-cover-en.png` — 1290 × 2796。マップスプレッドの左側・ストア1枚目。
- `apple/screenshots/en/fitlet-home-en.png` — 1290 × 2796。マップスプレッドの右側・ストア2枚目。
- `apple/screenshots/en/fitlet-map-spread-with-gutter.png` — 上記2枚をストア表示時の32pxガター付きで横につないだ確認用プレビュー。
- `apple/screenshots/en/fitlet-*-en.png` — 1・2枚目以外の既存英語ストア画像 5 点。

### Google Play

- `google-play/app-icon-512x512.png` — 既存の `public/brand/fitlet-ios-icon.png` を 512px へ縮小した RGBA PNG。新しい絵柄・角丸・外側のドロップシャドウは追加していません。
- `google-play/feature-graphic-1024x500.png` — 1024 × 500、透過なしの PNG。ロゴと日本語コピーはベクターソースから正確に合成しています。
- `google-play/screenshots/fitlet-cover-ja-1280x2560.png` — ストア1枚目の Google Play 用 1:2 版。元の縦長画面を切らずに収めています。
- `google-play/screenshots/fitlet-home-ja-1280x2560.png` — ストア2枚目の Google Play 用 1:2 版。元の縦長画面を切らずに収めています。
- `google-play/screenshots/fitlet-*-ja-1280x2560.png` — 1・2枚目以外の既存ストア画像 5 点。いずれも下端をクロップせず、背景色の余白で1:2に収めています。

### Google Play（English）

- `google-play/screenshots/en/fitlet-cover-en-1280x2560.png` — ストア1枚目の Google Play 用 1:2 版。
- `google-play/screenshots/en/fitlet-home-en-1280x2560.png` — ストア2枚目の Google Play 用 1:2 版。
- `google-play/screenshots/en/fitlet-*-en-1280x2560.png` — 1・2枚目以外の既存英語ストア画像 5 点。いずれも下端をクロップせず、背景色の余白で1:2に収めています。
- アイコンとフィーチャーグラフィックは文字を含まないため、日本語版と共通の `google-play/app-icon-512x512.png` / `google-play/feature-graphic-1024x500.png` を使えます。

## サイズ要件を確認した根拠

- Apple の iOS / iPadOS / macOS アイコンのレイアウトサイズは 1024 × 1024 px。角丸はシステムが処理します。
  <https://developer.apple.com/design/human-interface-guidelines/app-icons>
- Apple の iPhone 6.9 インチ縦スクリーンショットは端末によって 1260 × 2736 / 1290 × 2796 / 1320 × 2868 px が受け付けられます。スクリーンショットは透過不可です。
  <https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/>
- Google Play の掲載アイコンは 512 × 512、32-bit PNG、sRGB、1 MB 以下。完全な正方形で、角丸と外側の影は Play 側が処理します。
  <https://developer.android.com/distribute/google-play/resources/icon-design-specifications>
- Google Play のフィーチャーグラフィックは JPEG または透過なし 24-bit PNG、1024 × 500 px。重要な要素は中央寄りに置き、端のカット領域を避けるのが推奨されています。
  <https://support.google.com/googleplay/android-developer/answer/9866151?hl=ja>

## 入稿時の注意

- Apple のアイコンは既存の `public/brand/fitlet-ios-icon.png` を使い、通常は Xcode の App Icon / Icon Composer 経由でアプリバイナリに含めて App Store Connect へ渡します。
- Google Play には `google-play/app-icon-512x512.png` と `google-play/feature-graphic-1024x500.png` をそのまま入稿できます。
- Apple と Google Play の掲載対象デバイスやタブレット対応を追加する場合は、各ストアの最新仕様に合わせて追加サイズを用意してください。
