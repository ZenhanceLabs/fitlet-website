# Fitlet Web

Fitletのアプリ概要、法務ページ、お問い合わせ、フレンド招待リンクの受け口をまとめた公開サイトです。

## ページ

- `/`：アプリ概要（ホーム）
- `/privacy`：プライバシーポリシー
- `/terms`：利用規約
- `/support`：よくある質問とお問い合わせ窓口
- `/friend?code=ABC123`：共有されたフレンドリンクの受け口。FitletアプリのカスタムURLスキームへつなぐ
- `/pose-calibration`：画像から姿勢データを確認するWeb用ツール（検索対象外）

アプリ内のオンボーディングと設定画面からも、`/privacy` と `/terms` へ遷移します。プロフィールカードの共有文には `/friend?code=...` が入り、カードのQRコードはインストール済みアプリを直接開く `fitlet://friend/...` を使います。

## 開発

```bash
npm install
npm run dev
npm run build
npm run build:pages
```

`npm run build:pages` はGitHub Pages向けに静的HTMLを生成します。GitHub Actionsは `main` へのpushで自動デプロイします。
