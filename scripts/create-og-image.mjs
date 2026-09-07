import { readFile } from "node:fs/promises";
import sharp from "sharp";

const logo = await sharp(await readFile("public/brand/fitlet-logo.svg"))
  .resize({ width: 900, height: 472, fit: "contain" })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile("public/brand/fitlet-og.png");
