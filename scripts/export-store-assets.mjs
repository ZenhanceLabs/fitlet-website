import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assetsRoot = path.join(root, "public", "store-assets");
const sourceRoot = path.join(assetsRoot, "source");
const screenshotWidth = 1284;
const screenshotHeight = 2778;
const storeGutter = 32;
const connectedCanvasWidth = screenshotWidth * 2 + storeGutter;
const googleWidth = 1280;
const googleHeight = 2560;

async function inlineLocalImages(filePath) {
  let svg = await fs.readFile(filePath, "utf8");
  const matches = [...svg.matchAll(/(?:href|xlink:href)="(\.[^"]+)"/g)];
  for (const match of matches) {
    const reference = match[1];
    const referencedPath = path.resolve(path.dirname(filePath), reference);
    const extension = path.extname(referencedPath).toLowerCase();
    const mime = extension === ".svg" ? "image/svg+xml" : extension === ".webp" ? "image/webp" : "image/png";
    const encoded = (await fs.readFile(referencedPath)).toString("base64");
    svg = svg.replaceAll(reference, `data:${mime};base64,${encoded}`);
  }
  return Buffer.from(svg);
}

async function renderSvg(sourceName, outputPath, width, height, background) {
  const svg = await inlineLocalImages(path.join(sourceRoot, sourceName));
  let image = sharp(svg).resize(width, height, { fit: "fill" });
  if (background) image = image.flatten({ background });
  await image
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

async function readTopLeftColor(filePath) {
  const { data } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  return { r: data[0], g: data[1], b: data[2], alpha: 1 };
}

async function exportGoogleScreenshot(sourcePath, outputPath) {
  const background = await readTopLeftColor(sourcePath);
  await sharp(sourcePath)
    .resize(googleWidth, googleHeight, { fit: "contain", background })
    .flatten({ background })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
}

const googleIcon = path.join(assetsRoot, "google-play", "app-icon-512x512.png");
const featureGraphic = path.join(assetsRoot, "google-play", "feature-graphic-1024x500.png");
const existingIosIcon = path.join(root, "public", "brand", "fitlet-ios-icon.png");
const appleScreenshotsRoot = path.join(assetsRoot, "apple", "screenshots");
const googleScreenshotsRoot = path.join(assetsRoot, "google-play", "screenshots");
const applePreviewRoot = path.join(assetsRoot, "previews", "apple");
const screenshotNames = ["home", "training", "session", "league", "profile", "coach"];

await fs.mkdir(path.dirname(googleIcon), { recursive: true });
await fs.mkdir(appleScreenshotsRoot, { recursive: true });
await fs.mkdir(googleScreenshotsRoot, { recursive: true });
await fs.mkdir(applePreviewRoot, { recursive: true });

await sharp(existingIosIcon)
  .resize(512, 512, { fit: "fill", kernel: sharp.kernel.lanczos3 })
  .ensureAlpha()
  .png({ compressionLevel: 9 })
  .toFile(googleIcon);
await renderSvg("feature-graphic-ja.svg", featureGraphic, 1024, 500, "#eef9f5");

async function exportMapLocale({ locale, sourceName, appleRoot, googleRoot, publicRoot }) {
  const mapSpreadSvg = await inlineLocalImages(path.join(sourceRoot, sourceName));
  const mapSpreadRendered = await sharp(mapSpreadSvg)
    .resize(connectedCanvasWidth, screenshotHeight, { fit: "fill" })
    .flatten({ background: "#e4f5f4" })
    .png()
    .toBuffer();
  const firstMapCrop = await sharp(mapSpreadRendered)
    .extract({ left: 0, top: 0, width: screenshotWidth, height: screenshotHeight })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const secondMapCrop = await sharp(mapSpreadRendered)
    .extract({ left: screenshotWidth + storeGutter, top: 0, width: screenshotWidth, height: screenshotHeight })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const connectedPreview = await sharp({
    create: {
      width: connectedCanvasWidth,
      height: screenshotHeight,
      channels: 3,
      background: "#ffffff",
    },
  })
    .composite([
      { input: firstMapCrop, left: 0, top: 0 },
      { input: secondMapCrop, left: screenshotWidth + storeGutter, top: 0 },
    ])
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();

  const firstApple = path.join(appleRoot, `fitlet-cover-${locale}.png`);
  const secondApple = path.join(appleRoot, `fitlet-home-${locale}.png`);
  const firstGoogle = path.join(googleRoot, `fitlet-cover-${locale}-1280x2560.png`);
  const secondGoogle = path.join(googleRoot, `fitlet-home-${locale}-1280x2560.png`);
  const preview = path.join(applePreviewRoot, `fitlet-map-spread-${locale}.png`);

  await fs.writeFile(firstApple, firstMapCrop);
  await fs.writeFile(secondApple, secondMapCrop);
  await sharp(connectedPreview).png({ compressionLevel: 9 }).toFile(preview);
  await exportGoogleScreenshot(firstApple, firstGoogle);
  await exportGoogleScreenshot(secondApple, secondGoogle);
  if (publicRoot) await fs.copyFile(secondApple, path.join(publicRoot, `fitlet-home-${locale}.png`));
}

await fs.mkdir(path.join(appleScreenshotsRoot, "en"), { recursive: true });
await fs.mkdir(path.join(googleScreenshotsRoot, "en"), { recursive: true });

await exportMapLocale({
  locale: "ja",
  sourceName: "map-spread-ja.svg",
  appleRoot: appleScreenshotsRoot,
  googleRoot: googleScreenshotsRoot,
  publicRoot: path.join(root, "public", "store", "ja"),
});
await exportMapLocale({
  locale: "en",
  sourceName: "map-spread-en.svg",
  appleRoot: path.join(appleScreenshotsRoot, "en"),
  googleRoot: path.join(googleScreenshotsRoot, "en"),
  publicRoot: path.join(root, "public", "store", "en"),
});

for (const locale of ["ja", "en"]) {
  const sourceScreenshotsRoot = path.join(root, "public", "store", locale);
  const appleRoot = locale === "ja" ? appleScreenshotsRoot : path.join(appleScreenshotsRoot, "en");
  const googleRoot = locale === "ja" ? googleScreenshotsRoot : path.join(googleScreenshotsRoot, "en");
  for (const scene of screenshotNames) {
    const name = `fitlet-${scene}-${locale}.png`;
    const sourcePath = path.join(sourceScreenshotsRoot, name);
    await fs.copyFile(sourcePath, path.join(appleRoot, name));
    await exportGoogleScreenshot(sourcePath, path.join(googleRoot, name.replace(".png", "-1280x2560.png")));
  }
}

console.log("Exported Fitlet store assets to public/store-assets");
