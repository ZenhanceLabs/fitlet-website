# Fitlet TikTok Script Library v1

高モデルで作成した、AI動画化前提の3本。候補を増やす前に、各1本を制作・投稿・計測する。

共通方針：Fitletを説明しない。異常・人物・状況の意味を先に走らせ、実画面は正体、証拠、オチとして差し込む。実画面は `assets/png/onboarding/1.png`、`2.png`、`3.png` のみ使用する。

採用順：A（Fitlet固有性）→ B（初速）→ C（コメント分裂）。

## A. 青い人、出た。

- Creative Family: Found Footage Horror × Delayed Reveal Comedy
- Hook: 人間は1人しかいないのに、背後で青い骨格だけの人影がしゃがむ。
- 尺: 10秒 / 縦9:16

### 構成

- 0.0–1.0秒：夜のワンルームを固定監視カメラ風の広角で撮る。成人女性が中央に立つ。背後に半透明の青い関節点と骨格線だけの人型が一瞬現れ、本人より0.2秒遅れてしゃがむ。テロップ「昨日からいる」。
- 1.0–3.0秒：女性が振り返る。誰もいない。正面に戻ると、青い人影だけが先にスクワットする。女性「……いるよね？」。
- 3.0–4.2秒：`onboarding/2.png` をハードカットで差し込む。青い姿勢表示から `3/10` へ視線を誘導し、これが異常の正体だと一度だけ分からせる。
- 4.2–6.0秒：部屋へ戻り、女性が恐る恐る1回だけスクワット。説明はしない。
- 6.0–8.5秒：女性がスマホを見る。機械音声「残り、7回。」女性「いや、そういう問題じゃない」。
- 8.5–10.0秒：背後に2体目の青い骨格が0.3秒だけ立つ。暗転。最後のノイズを冒頭の監視カメラノイズにつなぐ。

### Irodori音声

- 0.0–2.2秒：無音。低い冷蔵庫音のみ。
- 2.2–3.0秒：小声「……いるよね？」
- 3.0–5.8秒：無音。
- 5.8–6.8秒：感情のない機械声「残り、7回。」
- 6.9–8.5秒：女性、恐怖と呆れ「いや、そういう問題じゃない」
- 8.5–10.0秒：無音。最後に小さな電子ノイズ。

### AI動画生成プロンプト

```text
Create a 10-second vertical 9:16 found-footage horror comedy video. A realistic small Japanese apartment living room at night, identical furniture and lighting in every shot, fixed wide-angle security-camera view from an upper corner, subtle CCTV compression and digital noise. One adult Japanese woman, around 25 years old, shoulder-length dark brown hair, oversized charcoal gray T-shirt, black lounge shorts, barefoot, identical appearance and clothes throughout. She stands alone. Behind her, an eerie translucent cyan-blue human pose skeleton appears: glowing joint dots connected by thin cyan lines, no body inside, like computer vision tracking. The skeleton squats 0.2 seconds after the woman, disappears when she turns around, then squats by itself. Reserve a clean 3.0–4.2 second interval for inserting a real smartphone app screenshot; do not generate any fake UI. At the very end, a second separate cyan pose skeleton appears behind her for less than half a second. Tone: convincing paranormal footage that turns into dry deadpan comedy, not a polished advertisement.

Negative prompt: extra humans, duplicate woman, changing face, changing clothes, distorted hands, malformed legs, floating body parts, cartoon, anime, glamorous commercial lighting, beauty advertisement, gym, camera movement, random text, subtitles, logos, fake phone interface, blue physical person, monster face, gore, blood, jumpscare creature.
```

### 判定

止まる理由は「人はいないのに人型だけ動く」が音声なしで伝わること。失敗時は青い骨格をAIに生成させず、人物映像に後付け合成する。1本目の最有力。

## B. 通知を3日無視したら、家まで来た。

- Creative Family: POV Intruder Meme × Attractive Deadpan Character
- Hook: 玄関を開けた瞬間、魅力的な成人女性が顔から50cmの距離に立ち、「3回、無視したよね？」と言う。
- 尺: 10秒 / 縦9:16

### 構成

- 0.0–1.0秒：一人称POVで玄関を開ける。黒いジャケットとスポーツウェアの成人女性が異様に近い。台詞「3回、無視したよね？」。テロップ「POV：通知を3日無視した」。
- 1.0–3.0秒：女性が勝手に入る。無表情で床を指差し「はい。」。ジャンプカットで家具が壁際に移動し、運動スペースになる。
- 3.0–4.2秒：POVが下がりスクワット。`onboarding/2.png` の `3/10` を一瞬だけ明確に見せる。
- 4.2–6.0秒：女性は腕時計を見るように待つ。「あと7。」次のスクワットで照明がクラブのように点滅し、さらに観葉植物だけ浮く。女性は無反応。
- 6.0–9.0秒：女性が一歩近づく。「明日は、逃げないでね。」
- 9.0–10.0秒：ドアをPOVに向かって閉める。ドア音の直後、冒頭のドアが開く映像へループ。

### Irodori音声

- 0.0–0.2秒：無音。
- 0.2–1.2秒：低めで淡々「3回、無視したよね？」
- 1.2–2.5秒：無音。
- 2.5–2.9秒：「はい。」
- 2.9–4.5秒：無音。
- 4.5–5.1秒：「あと7。」
- 5.1–7.4秒：無音。
- 7.4–9.0秒：別れの挨拶のように「明日は、逃げないでね。」
- 9.0–10.0秒：ドア音のみ。

### AI動画生成プロンプト

```text
Create a 10-second vertical 9:16 surreal POV meme video with deadpan comedy. A realistic ordinary Japanese apartment entrance and living room in the evening, spatially consistent throughout. First-person smartphone POV from the resident. One attractive adult Japanese woman, 25–28, straight dark hair in a low ponytail, exact same black oversized tailored blazer, dark gray fitted athletic top, black track pants and white sneakers in every shot. Elegant but completely emotionless and intimidating; not seductive, no posing. She stands unusually close when the door opens, walks inside without invitation, points at the floor, and silently orders the POV viewer to squat. Hard cut: the furniture is suddenly pushed against the walls. During the squats, apartment lights briefly become absurd nightclub lighting and one small houseplant floats. She reacts to nothing. Reserve 3.2–4.2 seconds for inserting a real fitness app screenshot; generate no fake UI. End by closing the door directly toward the camera. Fast TikTok hard cuts, realistic social-media footage, dry deadpan comedy.

Negative prompt: minor, teenager, sexualized posing, cleavage focus, lingerie, glamour photoshoot, beauty commercial, changing face, changing clothes, duplicated woman, extra people, deformed hands, distorted fingers, inconsistent apartment, gym equipment, fake app UI, text, captions, logos, anime, cartoon, excessive camera shake, horror monster, violence.
```

### 判定

美女を視線誘導ではなく「Fitletから派遣された取り立て屋」に変換しているのが強み。初速は3本中最も攻撃的。ただしAI美女感が出ると広告認定されるため、ファッション広告の照明・肌・ポーズを避け、生活空間と無表情を優先する。

## C. 終電 vs ブロンズIII

- Creative Family: Rank Brainrot × Everyday Loss × Absurd Deadpan
- Hook: 終電のドアが閉まりかけているのに、スーツの成人男性が突然スクワットを始める。
- 尺: 10秒 / 縦9:16

### 構成

- 0.0–1.0秒：夜の駅。発車ベル。男性が電車へ走るが、黄色線の前で急停止してスクワット。テロップ「終電まで8秒」。
- 1.0–3.0秒：ドアが閉まり始める。男性は乗らず、もう1回スクワット。車内の人が「何してんの？」という顔で見る。
- 3.0–6.0秒：`onboarding/2.png` の `3/10` を一瞬。機械声「残り7回。」男性は必死に続け、背後で電車が発車する。
- 6.0–8.7秒：`onboarding/3.png` へハードカット。Bronze III、順位9位。誰もいないホームに戻り、男性がスマホを見て満足そうに頷く。「よし。」
- 8.7–10.0秒：駅員音声「本日の運行は終了しました。」テロップ「9位は守った。」の後に「帰れない。」発車ベルで冒頭へループ。

### Irodori音声

- 0.0–2.8秒：無音。発車ベルと駅環境音のみ。
- 2.8–3.8秒：機械声「残り、7回。」
- 3.8–7.3秒：無音。衣擦れと電車の発車音。
- 7.3–8.7秒：男性、満足そうに「よし。」
- 8.7–10.0秒：駅員音声「本日の運行は終了しました。」

### AI動画生成プロンプト

```text
Create a 10-second vertical 9:16 surreal deadpan comedy video on a realistic Japanese railway platform late at night. Keep the same platform, train, signage style and harsh fluorescent lighting throughout. One adult Japanese man, about 27, average build, short black hair, wearing the exact same slightly tired dark navy business suit, white shirt with top button open, loosened dark tie, black business shoes and black backpack in every shot. He runs toward an open train door, stops before the yellow line, and suddenly performs serious squats while the train doors close. A few adult commuters inside stare at him. Reserve 3.0–4.0 seconds for inserting a real smartphone app screenshot and 6.0–7.5 seconds for a real league screenshot; do not generate fake UI. After the train departs, he remains alone, checks his phone, and nods with satisfaction. Natural social-media footage, mostly static medium-wide shot, no cinematic camera movement, no goofy acting.

Negative prompt: minors, extra main characters, changing face, changing clothes, distorted hands, unreadable fake text, fake app UI, logos, cartoon, anime, glamour commercial, exaggerated acting, slapstick face, unsafe train-track behavior, gore, violence, camera crane, random subtitles.
```

### 判定

「Fitlet：勝利 / 人生：敗北」の構造。コメントを「乗れよ」「10位でいいだろ」「俺ならやる」に分裂させやすい。A/Bが視覚フック担当なら、Cはコメントとミームの検証枠。
