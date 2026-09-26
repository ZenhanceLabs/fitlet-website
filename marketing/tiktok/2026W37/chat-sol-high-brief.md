# Chat / SOL High 用クリエイティブブリーフ

## 目的

Fitletの説明カードではなく、TikTokで最初の0.5秒に事件が起きる、自然な縦型キーアートを1本だけ作る。広告ポスターらしさ、AI生成人物の不自然さ、過剰な文字組みを避ける。

## Chat側に添付するReference

1. `/Users/berry/Dev/Fitlet/assets/store/squat-training-preview-global.png`
   - 自然な室内光、スクワット姿勢、服装、人物の距離感のReference
2. `/Users/berry/Dev/Fitlet/assets/png/characters/umiushi-lifestyle/flat/32-coach-whistle-cheer.png`
   - Fitlet公式ウミウシの色・形・帽子・笛・顔・葉模様を保持するReference

## そのまま渡すプロンプト

```text
Create one 9:16 vertical key visual for a TikTok organic post, not a polished app advertisement and not a poster.

Use the two attached images as references:
- Reference 1: preserve the natural indoor training atmosphere, camera distance, squat posture, and believable lighting of the adult athlete. Do not reproduce a recognizable real person.
- Reference 2: preserve the exact Fitlet umiushi mascot silhouette, colors, hat, whistle, face, and leaf markings. Do not redesign it as a generic monster.

Scene: an ordinary home workout is being filmed as if by a friend on a phone. The adult athlete is midway through a squat. In the immediate foreground, the exact Fitlet umiushi mascot suddenly leans out from under the exercise mat with a referee whistle, as if it has been silently judging the attempt. The athlete has just noticed it and turns their eyes toward it. This is a single caught moment, slightly awkward and funny, not a staged product shot.

Composition: the athlete and mascot must both be readable in the first thumbnail. Keep a clean, quiet area near the upper-left for one short Japanese caption added later. No centered UI, no app screen, no product mockup, no logo treatment.

Visual direction: believable phone-camera still, natural imperfections, real room texture, slightly imperfect timing, candid comedy, high contrast between ordinary exercise and an absurd mascot referee. Attractive adult character is allowed, but fully clothed, non-sexual, and not posed like a fashion ad.

Do not generate any text, Japanese characters, logo, watermark, UI, app screen, numbers, or fake social-media interface. Do not add extra characters. Do not create a horror creature. Do not make the mascot glossy, slimy, photorealistic, or anatomically different from the reference.

Output: one clean 1080x1920 PNG, no text.
```

## 後処理コピー候補（1つだけ使う）

- `この部屋、誰かに見張られてる。`
- `スクワット中、審判が増えた。`
- `今の1回、無効です。`

## Irodori音声の初稿

```text
0.00–0.45  無音。小さな床のきしみ。
0.45–2.00  「今の、見た？」（小声。友人が撮影中に気づいた温度）
2.00–3.50  笛を一度だけ鳴らす。
3.50–5.80  「スクワットの審判、そこにいる。」（淡々と、笑いを抑える）
5.80–7.20  無音。人物とウミウシの視線を残す。
7.20–9.00  「……もう一回。」（ウミウシ側の低い短い声）
9.00–10.00  2回目の笛。ここでループ。
```

## 採用ゲート

- サムネイルを縮小しても、人物・ウミウシ・異常が0.5秒で読める
- 人物の手足・顔・服・背景にAI破綻がない
- ウミウシが公式Referenceと同一キャラクターに見える
- 文字を1行足しても広告ポスターに見えず、UGCの一瞬に見える
- 「なぜ審判がいるのか」を最後まで説明せず、コメントしたくなる

1つでも落ちたら破棄し、別の生成を重ねず、Referenceまたは構図を変える。

