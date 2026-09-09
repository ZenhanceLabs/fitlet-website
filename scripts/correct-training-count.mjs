import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const englishScreenshot = "public/store-assets/source/screens/en/real-training.png";
const japaneseScreenshots = [
  "public/store-assets/source/screens/ja/real-training.png",
  "public/app-screens/ja/real-training.png",
];

// Reuse the matching anti-aliased “2” from the English source image so the
// Japanese screenshot keeps the original app UI and typography intact.
const replacement = await sharp(await readFile(englishScreenshot))
  .extract({ left: 57, top: 717, width: 31, height: 44 })
  .png()
  .toBuffer();

for (const screenshot of japaneseScreenshots) {
  const corrected = await sharp(await readFile(screenshot))
    .composite([{ input: replacement, left: 57, top: 717 }])
    .png()
    .toBuffer();
  await writeFile(screenshot, corrected);
}

console.log("Corrected the Japanese training screenshot count to 29.");
