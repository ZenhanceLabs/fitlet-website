# Fitlet Web

Fitletのアプリ概要、法務ページ、お問い合わせ、フレンド招待リンクの受け口をまとめた公開サイトです。

ブラウザの表示言語が日本語なら日本語、それ以外なら英語で表示します。ヘッダーの言語切り替えから変更でき、選択は端末に保存されます。

## ページ

- `/`：アプリ概要（ホーム）
- `/privacy`：プライバシーポリシー
- `/terms`：利用規約
- `/support`：よくある質問とお問い合わせ窓口
- `/friend?code=ABC123` / `/f/ABC123`：共有されたフレンドリンクの受け口。FitletアプリのカスタムURLスキームへ自動でつなぐ
- `/pose-calibration`：画像から姿勢データを確認するWeb用ツール（検索対象外）

アプリ内のオンボーディングと設定画面からも、`/privacy` と `/terms` へ遷移します。プロフィールカードの共有文とQRコードには `/f/...` が入り、Webページからインストール済みアプリの `fitlet://friend/...` へ自動でつなぎます。従来の `/friend?code=...` も引き続き利用できます。

## 開発

```bash
npm install
npm run dev
npm run build
npm run build:pages
```

`npm run build:pages` はGitHub Pages向けに静的HTMLを生成します。GitHub Actionsは `main` へのpushで自動デプロイします。
