import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.FITLET_STORE_PORT ?? 8095);
const outputRoot = resolve("public/store/ja");
const basePath = "/fitlet-website";
const scenes = ["home", "session", "training", "league", "coach", "profile"];
const server = spawn("node", ["scripts/serve-static.mjs", "dist/client", String(port)], { stdio: "inherit" });

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
  const page = await browser.newPage({ viewport: { width: 1290, height: 2796 }, deviceScaleFactor: 1 });

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
    await page.goto(`http://127.0.0.1:${port}/store-screenshot/?scene=${scene}&locale=ja`, { waitUntil: "networkidle" });
    await page.waitForFunction((expectedScene) => document.querySelector(".store-shot")?.getAttribute("data-scene") === expectedScene, scene);
    await page.screenshot({ path: join(outputRoot, `fitlet-${scene}-ja.png`), fullPage: false });
  }

  await browser.close();
  console.log(`ストア画像を ${outputRoot} に書き出しました（${scenes.length}枚）。`);
} finally {
  stopServer();
}
