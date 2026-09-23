import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const width = 2064;
const height = 2752;
const screenshotNames = ["home", "training", "session", "league", "profile", "coach"];
const colors = {
  home: "#e4f5f4",
  training: "#eef6d6",
  session: "#fff0e8",
  league: "#fff9e8",
  profile: "#f4f3ef",
  coach: "#f4f1e9",
};
const copy = {
  ja: {
    home: { title: ["動くと", "マップが進む"], detail: "1回約8分で 次の場所へ" },
    training: { title: ["好きな運動から", "始められる"], detail: "29種目から 自由に選べる" },
    session: { title: ["カメラが", "回数を数える"], detail: "スマホを置くだけ 自動カウント" },
    league: { title: ["今週は何位まで", "いける？"], detail: "毎週の運動量で 仲間と競う" },
    profile: { title: ["続けるほど", "成長が見えてくる"], detail: "レベルと記録が積み上がる" },
    coach: { title: ["今日の運動を", "コーチに任せる"], detail: "Proなら 次の運動を提案" },
  },
  en: {
    home: { title: ["Move", "Map moves"], detail: "8 min per session" },
    training: { title: ["Start with any", "workout"], detail: "29 exercises to choose from" },
    session: { title: ["Let the camera", "count your reps"], detail: "Just set your phone down" },
    league: { title: ["Climb the ranks", "every week"], detail: "Compete with friends" },
    profile: { title: ["Keep going", "watch yourself grow"], detail: "Your progress adds up" },
    coach: { title: ["Let your coach", "plan today"], detail: "Your next workout, planned" },
  },
};

const sourceRoot = path.join(root, "public", "store-assets", "source", "screens", "ipad");
const storeRoot = path.join(root, "public", "store", "ipad");
const appleRoot = path.join(root, "public", "store-assets", "apple", "screenshots", "ipad");
const previewRoot = path.join(root, "public", "store-assets", "previews", "apple", "ipad");
const logoPath = path.join(root, "public", "brand", "fitlet-logo.svg");
const proLogoPath = path.join(root, "public", "brand", "fitlet-pro-logo.svg");

async function rasterizeLogo(filePath, widthPx) {
  return sharp(filePath).resize({ width: widthPx }).png().toBuffer();
}

async function makeScreen(screenPath) {
  return sharp(screenPath)
    .resize(width, height, { fit: "fill" })
    .png()
    .toBuffer();
}

async function measureTextWidth({ text, fontSize, letterSpacing, fontFamily }) {
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="400"><style>text{font-family:${fontFamily};font-weight:950;fill:#111318;}</style><text x="200" y="${fontSize}" font-size="${fontSize}" letter-spacing="${letterSpacing}">${text}</text></svg>`);
  const { info } = await sharp(svg).png().trim().toBuffer({ resolveWithObject: true });
  return info.width;
}

async function textSvg({ locale, scene, widthPx, heightPx, map = false }) {
  const content = copy[locale][scene];
  const fontFamily = "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', 'Yu Gothic', Arial, sans-serif";
  const titleSize = map ? 160 : locale === "en" ? 154 : 170;
  const detailSize = map ? 92 : locale === "en" ? 72 : 88;
  const titleLineHeight = titleSize * 1.02;
  const titleX = map ? (locale === "ja" ? 4056 : 4056) : widthPx / 2;
  const titleY = map ? 318 : 330;
  const anchor = map ? "end" : "middle";
  const titleTransform = map ? "" : "";
  const lines = content.title.map((line, index) => `<text x="${titleX}" y="${titleY + index * titleLineHeight}" text-anchor="${anchor}" font-size="${titleSize}" letter-spacing="${-titleSize * 0.09}">${line}</text>`).join("");
  const detailY = map ? 670 : titleY + titleLineHeight * content.title.length + 100;
  const detail = `<text x="${titleX}" y="${detailY}" text-anchor="${anchor}" font-size="${detailSize}" font-weight="780" letter-spacing="${-detailSize * 0.07}">${content.detail}</text>`;
  const titleUnderlineY = titleY + titleLineHeight * (content.title.length - 1) + titleSize * 0.24;
  const titleUnderlineWidth = map ? 0 : await measureTextWidth({ text: content.title[content.title.length - 1], fontSize: titleSize, letterSpacing: -titleSize * 0.09, fontFamily });
  const underline = map
    ? `<line x1="${locale === "ja" ? 3190 : 3290}" y1="530" x2="4056" y2="530" stroke="#20b8c3" stroke-width="12" stroke-linecap="round"/>`
    : `<line x1="${widthPx / 2 - titleUnderlineWidth / 2}" y1="${titleUnderlineY}" x2="${widthPx / 2 + titleUnderlineWidth / 2}" y2="${titleUnderlineY}" stroke="${colors[scene] === "#eef6d6" ? "#75bd4d" : "#20b8c3"}" stroke-width="12" stroke-linecap="round"/>`;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${widthPx}" height="${heightPx}"><style>text{font-family:${fontFamily};font-weight:950;fill:#111318;}</style>${titleTransform}${lines}${detail}${underline}</svg>`);
}

async function makeSingle({ locale, scene }) {
  const bg = colors[scene];
  const output = path.join(storeRoot, locale, `fitlet-${scene}-${locale}.png`);
  const screenPath = path.join(sourceRoot, locale, `real-${scene}.png`);
  const screen = await makeScreen(screenPath);
  const scaledScreen = await sharp(screen).resize({ width: 1300 }).png().toBuffer();
  const logo = await rasterizeLogo(logoPath, 430);
  const layers = [
    { input: logo, left: 140, top: 92 },
    { input: await textSvg({ locale, scene, widthPx: width, heightPx: height }), left: 0, top: 0 },
    { input: scaledScreen, left: 382, top: 850 },
  ];
  if (scene === "coach") layers.push({ input: await rasterizeLogo(proLogoPath, 430), left: width - 570, top: 100 });
  await sharp({ create: { width, height, channels: 3, background: bg } })
    .composite(layers)
    .flatten({ background: bg })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(output);
  await fs.copyFile(output, path.join(appleRoot, locale, `fitlet-${scene}-${locale}.png`));
}

async function makeMapSpread(locale) {
  const spreadWidth = width * 2 + 48;
  const screenPath = path.join(sourceRoot, locale, "real-home.png");
  const screen = await makeScreen(screenPath);
  const rotated = await sharp(screen)
    .resize({ width: 1600 })
    .rotate(-25, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const rotatedMeta = await sharp(rotated).metadata();
  const rotatedLeft = Math.floor((spreadWidth - rotatedMeta.width) / 2);
  const rotatedTop = Math.max(0, Math.floor((height - rotatedMeta.height) / 2));
  const logo = await rasterizeLogo(logoPath, 350);
  const leftCopy = locale === "ja" ? "ちょっと動くを" : "Move a little";
  const rightCopy = locale === "ja" ? "習慣に" : "Make it a habit";
  const leftText = `<text x="120" y="2490" font-size="160" letter-spacing="-14.4">${leftCopy}</text><text x="120" y="2660" font-size="160" letter-spacing="-14.4">${rightCopy}</text><line x1="120" y1="2700" x2="${locale === "ja" ? 570 : 820}" y2="2700" stroke="#20b8c3" stroke-width="12" stroke-linecap="round"/>`;
  const rightText = locale === "ja"
    ? `<text x="4056" y="318" text-anchor="end" font-size="160" letter-spacing="-14.4">動くと</text><text x="4056" y="488" text-anchor="end" font-size="160" letter-spacing="-14.4">マップが進む</text><text x="4056" y="670" text-anchor="end" font-size="92" font-weight="780" letter-spacing="-6.4">1回約8分で 次の場所へ</text>`
    : `<text x="4056" y="318" text-anchor="end" font-size="160" letter-spacing="-14.4">Move</text><text x="4056" y="488" text-anchor="end" font-size="160" letter-spacing="-14.4">Map moves</text><text x="4056" y="670" text-anchor="end" font-size="92" font-weight="780" letter-spacing="-6.4">8 min per session</text>`;
  const textLayer = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${spreadWidth}" height="${height}"><style>text{font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Yu Gothic',Arial,sans-serif;font-weight:950;fill:#111318;}</style>${leftText}${rightText}<line x1="3190" y1="530" x2="4056" y2="530" stroke="#20b8c3" stroke-width="12" stroke-linecap="round"/></svg>`);
  const connected = path.join(previewRoot, `fitlet-map-spread-${locale}.png`);
  await sharp({ create: { width: spreadWidth, height, channels: 3, background: "#e4f5f4" } })
    .composite([
      { input: logo, left: 110, top: 92 },
      { input: rotated, left: rotatedLeft, top: rotatedTop },
      { input: textLayer, left: 0, top: 0 },
    ])
    .flatten({ background: "#e4f5f4" })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(connected);
  const first = path.join(appleRoot, locale, `fitlet-cover-${locale}.png`);
  const second = path.join(appleRoot, locale, `fitlet-home-${locale}.png`);
  await sharp(connected).extract({ left: 0, top: 0, width, height }).png({ compressionLevel: 9 }).toFile(first);
  await sharp(connected).extract({ left: width + 48, top: 0, width, height }).png({ compressionLevel: 9 }).toFile(second);
  await fs.copyFile(first, path.join(storeRoot, locale, `fitlet-cover-${locale}.png`));
  await fs.copyFile(second, path.join(storeRoot, locale, `fitlet-home-${locale}.png`));
}

for (const locale of ["ja", "en"]) {
  await fs.mkdir(path.join(storeRoot, locale), { recursive: true });
  await fs.mkdir(path.join(appleRoot, locale), { recursive: true });
  await fs.mkdir(previewRoot, { recursive: true });
  await makeMapSpread(locale);
  for (const scene of screenshotNames.filter((name) => name !== "home")) await makeSingle({ locale, scene });
}

console.log("Exported bezel-free iPad store assets.");
