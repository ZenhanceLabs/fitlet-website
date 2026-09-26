# Fitlet TikTok Experimental Creative: AI Oddity Carousel

作成日: 2026-09-10  
用途: TikTokカルーセル／カード型クリエイティブの初期フック検証  
サイズ: 1080 x 1920 px / PNG / 4枚

## ねらい

アプリの機能説明から始めず、最初の0.5秒で意味が崩れる「事件」を置く。カードをめくるほど、通知・やる気・順位・時間が同じ世界の異常としてつながる設計です。Fitletは主役にせず、最後の小さな `fitlet / creative test` だけを認知の手がかりにしています。

## 納品物

- [card-01-notification-monster.png](./card-01-notification-monster.png)
- [card-02-motivation-eater.png](./card-02-motivation-eater.png)
- [card-03-lowest-rank.png](./card-03-lowest-rank.png)
- [card-04-five-more-minutes.png](./card-04-five-more-minutes.png)
- [irodori-scripts.md](./irodori-scripts.md)
- [compose_cards.swift](./compose_cards.swift) — 生成済みベース画像に日本語コピーを合成する再現用スクリプト
- `base/` — ImageGenのベース画像（後処理前）

### ファイル一覧（確定版）

| 種別 | ファイル |
|---|---|
| 最終カード | `card-01-notification-monster.png` |
| 最終カード | `card-02-motivation-eater.png` |
| 最終カード | `card-03-lowest-rank.png` |
| 最終カード | `card-04-five-more-minutes.png` |
| 生成ソース | `base/notification-monster-source.png` |
| 生成ソース | `base/motivation-eater-source.png` |
| 生成ソース | `base/lowest-rank-source.png` |
| 生成ソース | `base/five-more-minutes-source.png` |
| 音声台本 | `irodori-scripts.md` |
| 合成スクリプト | `compose_cards.swift` |
| 設計・権利・検証 | `README.md` |

## カード設計

| # | Primary Hook | 意外性／意味の反転 | 次カードへの未完了ループ |
|---:|---|---|---|
| 01 | 「今日の敵は、腹筋ではなく通知。」 | 通知を“邪魔なUI”ではなく、部屋を占領する生物として見せる | 「やる気を食べる生物」の正体を次へ送る |
| 02 | 「あなたのやる気を食べる生物は、部屋の隅で待っている。」 | 海底都市の隅で、謎の生物が付箋を吐く | 生物のいる世界で、なぜ最下位が帰還できるのかを次へ送る |
| 03 | 「最下位だけが帰還できる。」 | 上位者が勝者ではなく、透明な檻に閉じ込められている | 帰還条件を明かさず、「あと5分」の時間異常へ送る |
| 04 | 「『あと5分』が部屋を占領した。」 | 先に待ちくたびれたのは人ではなく時計 | 「本日の敵は通知」へ戻し、ループ再視聴を誘う |

## 生成プロンプト

すべて内蔵 `image_gen` の新規生成で作成。日本語コピー、カード番号、ブランド手がかりは画像生成後に `compose_cards.swift` で合成しています。

### Card 01 — notification monster

```text
Use case: ads-marketing
Asset type: TikTok carousel card background, portrait 9:16
Primary request: a scroll-stopping surreal graphic for an experimental fitness-adjacent carousel. The “enemy” is not exercise but an abstract notification monster.
Scene/backdrop: a dark midnight-teal bedroom corner seen at a slight low angle, with a tiny desk and a single abandoned exercise mat implied in the distance
Subject: one impossible, non-human notification creature built from glossy black organic mass, tangled charging cables, glowing red notification dots, tiny floating message bubbles with no readable text, and too many alert lights; it should feel like the creature is quietly waiting for the viewer
Style/medium: high-end surreal 3D editorial illustration, tactile materials, cinematic art direction, graphic poster quality, not a photograph, not a real person
Composition/framing: portrait composition; creature dominates the middle and lower-right area; strong silhouette; generous clean dark negative space across the top quarter for later typography; a subtle clear area near the bottom for a small card marker; layered depth and immediate visual anomaly
Lighting/mood: hard crimson rim light against deep teal shadows, eerie but funny, tense and mischievous, high contrast
Color palette: midnight teal, charcoal black, signal red, small electric cyan accents
Materials/textures: wet glossy rubber, glass notification beads, frayed cable fibers, faint dust in the air
Constraints: no humans, no faces, no existing characters, no logos, no brand marks, no watermark, no readable text, no letters, no numbers; leave all typography to post-processing; original non-real creature only
Avoid: generic phone product shot, normal animal, horror gore, photoreal person, recognizable app UI, corporate advertising, cluttered tiny details that disappear at thumbnail size
```

### Card 02 — motivation eater

```text
Use case: ads-marketing
Asset type: TikTok carousel card background, portrait 9:16
Primary request: a scroll-stopping surreal graphic about a non-human creature that eats motivation
Scene/backdrop: an impossible underwater city built inside the corner of a tiny ordinary room, with coral towers, floating stairs, a desk lamp hanging like a moon, and deep blue water filling the space without splashing
Subject: one original slug-like bioluminescent organism with a soft translucent body, tiny lantern eyes, a mouth full of disappearing sticky notes, and a trail of swallowed golden sparks; it must feel strange, a little cute, and guilty rather than scary; it is waiting in the lower-right corner as if hiding from the viewer
Style/medium: high-end surreal 3D illustration blended with bold screenprint texture and editorial poster art, tactile and richly layered, not a photograph, not a real animal
Composition/framing: portrait composition; reserve a large, calm deep-blue negative-space zone across the upper third and center for later Japanese typography; creature and room-corner reveal concentrated in the lower-right; clear silhouette at thumbnail size
Lighting/mood: submerged midnight blue with acid-lime coral highlights, a single pale cyan beam from above, mysterious, absurd, quietly funny
Color palette: deep navy, cobalt, acid lime, pale cyan, small warm-gold sparks
Materials/textures: ink grain, painted coral, translucent jelly skin, soft particles and bubbles, worn paper edges on the sticky notes
Constraints: no humans, no faces, no existing characters, no logos, no brand marks, no watermark, no readable text, no letters, no numbers; leave all typography to post-processing; original non-real creature only
Avoid: generic sea-life illustration, normal slug, gore, horror monster, recognizable app UI, corporate advertising, cluttered center, photoreal person
```

### Card 03 — lowest rank

```text
Use case: ads-marketing
Asset type: TikTok carousel card background, portrait 9:16
Primary request: a scroll-stopping surreal leaderboard scene where the lowest-ranked person is the only one allowed to return
Scene/backdrop: an impossible vertical arena made of floating black glass platforms and glowing ranking bars, a circular exit portal at the very bottom, upper platforms sealed behind transparent amber glass
Subject: one clearly fictional adult woman, original character, stylized cel-shaded graphic illustration rather than photorealism; striking editorial silhouette, short asymmetric cobalt hair, oversized silver utility jacket, calm deadpan expression, standing on the lowest platform with one foot near the glowing exit portal; she is attractive in a non-sexual fashion-magazine way, fully clothed, no resemblance to any real person
Style/medium: high-end graphic novel key art mixed with glossy 3D poster design, bold anime-inspired linework but original, sharp shapes, meme-ready visual absurdity
Composition/framing: portrait composition; character in lower-middle, exit portal and lowest platform visually dominant; empty dark space in upper third for later typography; upper ranks visible but unreadable and abstract; clear silhouette at thumbnail size
Lighting/mood: electric violet, acid yellow, and cold cyan; triumphant but confusing, deadpan comedy, visual tension
Color palette: ink black, electric violet, acid yellow, cyan white, restrained skin tones
Materials/textures: glass, chromed fabric, holographic dust, screenprint grain
Constraints: no real person, no celebrity likeness, no photoreal face, no sexualization, no revealing clothing, no logos, no trademarks, no watermark, no readable text, no letters, no numbers; leave all typography to post-processing; original character only
Avoid: generic fitness ad, normal sports arena, body comparison, weight-loss implication, dangerous action, gore, recognizable game UI, cluttered tiny text
```

### Card 04 — five more minutes

```text
Use case: ads-marketing
Asset type: TikTok carousel card background, portrait 9:16
Primary request: a surreal POV meme about waiting five more minutes until the clock starts waiting for you
Scene/backdrop: an ordinary small bedroom transformed into a chaotic paper-and-time dimension; a huge soft analog clock is leaning around the doorway like a curious creature, its hands frozen at 5 minutes past the hour; dozens of sticky notes multiply like paper birds from a chair and crawl up the wall
Subject: one original clearly fictional adult character in an oversized hoodie and bright socks, fully clothed, sitting on the floor in a deadpan pose, holding exactly one sticky note while a ridiculous paper avalanche surrounds them; stylized character, not photoreal, not based on any real person
Style/medium: bold editorial comic poster, absurdist meme energy, kinetic collage, clean graphic shapes with painterly texture, original art
Composition/framing: portrait composition; strong visual anomaly in the first glance (clock bending into the room and sticky-note swarm); leave a clean dark or muted zone in the upper third for later typography; character and clock readable at thumbnail size; slight dutch angle for chaos
Lighting/mood: bright cobalt shadows, warm yellow paper, acid red clock hands, theatrical flash, funny anxiety rather than horror
Color palette: cobalt blue, warm paper yellow, tomato red, cream, graphite
Materials/textures: torn paper fibers, cardboard, glossy clock glass, halftone print grain, soft fabric
Constraints: no real person, no celebrity likeness, no photoreal face, no sexualization, no revealing clothing, no logos, no trademarks, no watermark, no readable text, no letters, no numbers on notes; only the clock face may have simple abstract tick marks; leave all typography to post-processing
Avoid: generic productivity poster, normal clock photo, dangerous scene, body shaming, weight-loss claim, recognizable app UI, clutter so dense that the subject disappears
```

## Irodori台本（README内確定版）

詳細版は [irodori-scripts.md](./irodori-scripts.md) にも保存しています。括弧内の指示は読み上げず、演出メモとして使います。

### Card 01 — 通知モンスター

- 読み上げ: 「今日の敵は、腹筋ではなく……通知。まだ消さないで。こいつ、こっちを見てる。」
- 間・声色: 「今日の敵は」は低く平坦。「腹筋ではなく」の後0.35秒。「通知」は乾いた断定。最後は近接マイクの小声。
- 効果音: 小さなnotification ping → 「通知」の後に3連ping → 最後に0.5秒の低いsub-bass。

### Card 02 — やる気を食べる生物

- 読み上げ: 「部屋の隅で、やる気を食べる生物が待っている。……しかも、付箋を吐く。」
- 間・声色: 目撃報告のように淡々と読む。「部屋の隅で」の後0.2秒。「しかも、付箋を吐く」は0.45秒後に真顔のツッコミ。
- 効果音: 薄い水中環境音 → 紙を丸める音 → 「付箋を吐く」の直後にコミカルな紙のぽすっ。

### Card 03 — 最下位だけが帰還

- 読み上げ: 「最下位だけが、帰還できる。上位は、まだ……やる気を待ってる。」
- 間・声色: 一文目は無機質な場内アナウンス。「帰還できる」の後0.7秒。二文目は別人格の小声。「まだ」の後0.35秒。
- 効果音: ガラスのロック音 → portal hum → 遠くの時計の秒針を2回。

### Card 04 — あと5分

- 読み上げ: 「『あと五分』って言ったら、時計のほうが、こっちを待っていた。もう、最初の通知に戻ろう。」
- 間・声色: 「あと五分」は軽い言い訳声。「時計のほうが」で真顔に切り替え0.4秒。「こっちを待っていた」はゆっくり。最後はループ接続用に明瞭に。
- 効果音: 紙が一枚飛ぶ音 → 大きめのtick → 最後にnotification pingを1回。

## AI生成・権利・安全上の注意

- ベース画像は内蔵ImageGenによる新規生成。`base/` に後処理前の生成素材を保存しています。
- ローカルの既存画像、既存キャラクター、実在人物の顔・声、著名人の肖像、第三者ロゴ、第三者音源は使用していません。
- Card 03とCard 04は、実在人物に似せない明確な架空キャラクターとして生成しています。非性的・完全着衣で、身体比較・体型羞恥・危険行為・効果保証は含めていません。
- TikTokへ掲載する場合、AI生成／AI編集コンテンツとしての表示が必要になる可能性があります。特に人物・現実らしい空間・現実の出来事と誤認されうる表現は、投稿画面でAIラベルと商用コンテンツ開示要否を確認し、保守的に明示してください。
- 「実際に通知モンスターがいる」「これでやる気が増える」など、現実の事実や効果として誤認させるキャプションは付けないでください。これは実験用のフィクション／コンセプトカードです。
- Irodori音声は新規録音または権利確認済みの音源のみを使い、実在人物・著名人に似せた声の生成は避けてください。台本と演出指示は [irodori-scripts.md](./irodori-scripts.md) にあります。
- 公開前に、TikTokのAI生成コンテンツ、商用コンテンツ、音楽利用、広告表示の最新要件を確認してください。

## 検証

- 4枚すべてPNGとして出力済み。
- 4枚すべて1080 x 1920 px。
- 日本語コピーは生成画像ではなくSwift/CoreTextで後処理し、目視確認済み。
- app/、src/、設定ファイル、依存ファイル、既存未コミット差分は変更していません。
