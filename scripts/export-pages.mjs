import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join, resolve } from "node:path";

const port = Number(process.env.FITLET_PAGES_PORT ?? 4173);
const root = resolve("dist/client");
const routes = ["/", "/friend", "/legal", "/pose-calibration", "/privacy", "/support", "/terms"];
const server = spawn("node_modules/.bin/vinext", ["start", "--port", String(port)], { env: process.env, stdio: "inherit" });

const stopServer = () => {
  if (!server.killed) server.kill("SIGTERM");
};
process.once("SIGINT", stopServer);
process.once("SIGTERM", stopServer);

try {
  let ready = false;
  for (let attempt = 0; attempt < 60 && !ready; attempt += 1) {
    try {
      ready = (await fetch(`http://127.0.0.1:${port}/`)).ok;
    } catch {
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
    }
  }
  if (!ready) throw new Error("Pages用の生成サーバーを起動できませんでした。");

  for (const route of routes) {
    const response = await fetch(`http://127.0.0.1:${port}${route === "/" ? "/" : `${route}/`}`);
    if (!response.ok) throw new Error(`${route} のHTML生成に失敗しました（${response.status}）。`);
    const outputPath = route === "/" ? join(root, "index.html") : join(root, route.slice(1), "index.html");
    await mkdir(resolve(outputPath, ".."), { recursive: true });
    await writeFile(outputPath, await response.text(), "utf8");
  }
} finally {
  stopServer();
}
