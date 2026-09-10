import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.FITLET_STORE_PORT ?? 8095);
const locale = process.env.FITLET_STORE_LOCALE === "en" ? "en" : "ja";
const device = process.env.FITLET_STORE_DEVICE === "ipad" ? "ipad" : "iphone";
const outputRoot = resolve(`public/store/${device}/${locale}`);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/fitlet";
const screenshotWidth = device === "ipad" ? 2064 : 1284;
const screenshotHeight = device === "ipad" ? 2752 : 2778;
const scenes = ["home", "session", "training", "league", "coach", "profile"];
const server = process.env.FITLET_STORE_SERVER === "dev"
  ? spawn("node_modules/.bin/vinext", ["dev", "--hostname", "127.0.0.1", "--port", String(port)], { stdio: "inherit" })
  : spawn("node", ["scripts/serve-static.mjs", "dist/client", String(port)], { stdio: "inherit" });

const stopServer = () => {
  if (!server.killed) server.kill("SIGTERM");
};

process.once("SIGINT", stopServer);
process.once("SIGTERM", stopServer);

try {
  let ready = false;
  for (let attempt = 0; attempt < 60 && !ready; attempt += 1) {
    try {
      ready = (await fetch(`http://127.0.0.1:${port}/store-screenshot/`)).ok;
    } catch {
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
    }
  }
  if (!ready) throw new Error("ストア画像用の静的サーバーを起動できませんでした。");

  await mkdir(outputRoot, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: screenshotWidth, height: screenshotHeight }, deviceScaleFactor: 1 });

  await page.route("**/*", async (route) => {
    const requestUrl = new URL(route.request().url());
    if (requestUrl.pathname.startsWith(`${basePath}/`)) {
      const localUrl = `http://127.0.0.1:${port}${requestUrl.pathname.slice(basePath.length)}${requestUrl.search}`;
      await route.continue({ url: localUrl });
      return;
    }
    await route.continue();
  });

  for (const scene of scenes) {
    await page.goto(`http://127.0.0.1:${port}/store-screenshot/?scene=${scene}&locale=${locale}&device=${device}`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction((expectedScene) => document.querySelector(".store-shot")?.getAttribute("data-scene") === expectedScene, scene);
    await page.waitForFunction(() => {
      const image = document.querySelector(".store-shot-screen img");
      return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
    });
    await page.evaluate(() => document.fonts?.ready);
    await page.screenshot({ path: join(outputRoot, `fitlet-${scene}-${locale}.png`), fullPage: false });
  }

  await browser.close();
  console.log(`${device} のストア画像を ${outputRoot} に書き出しました（${scenes.length}枚）。`);
} finally {
  stopServer();
}
