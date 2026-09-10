import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDirectory = path.join(root, "screenshot");
const outputRoot = path.join(root, "public", "store-assets", "source", "screens", "ipad");

const mappings = {
  ja: {
    home: "IMG_5632.PNG",
    session: "IMG_5639.PNG",
    training: "IMG_5633.PNG",
    league: "IMG_5634.PNG",
    profile: "IMG_5637.PNG",
    coach: "IMG_5635.PNG",
  },
  en: {
    home: "IMG_5625.PNG",
    session: "IMG_5631.PNG",
    training: "IMG_5626.PNG",
    league: "IMG_5627.PNG",
    profile: "IMG_5638.PNG",
    coach: "IMG_5628.PNG",
  },
};

for (const [locale, scenes] of Object.entries(mappings)) {
  const localeRoot = path.join(outputRoot, locale);
  await mkdir(localeRoot, { recursive: true });
  for (const [scene, originalName] of Object.entries(scenes)) {
    const sourcePath = path.join(sourceDirectory, originalName);
    const outputPath = path.join(localeRoot, `real-${scene}.png`);
    const metadata = await sharp(sourcePath).metadata();
    if (metadata.width !== 1640 || metadata.height !== 2360) {
      throw new Error(`${originalName} は想定した iPad 素材サイズ 1640×2360 ではありません。`);
    }
    await copyFile(sourcePath, outputPath);
  }
}

console.log("Prepared labelled iPad screenshots for ja and en.");
