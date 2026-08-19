import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function render(pathname = "/") {
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Fitlet home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /ちょっと動くを、/);
  assert.match(html, /習慣に/);
  assert.match(html, /次の場所へ進みます/);
  assert.match(html, /自動でカウント/);
  assert.match(html, /39種目から/);
  assert.match(html, /毎週のFP/);
  assert.match(html, /Fitlet Pro/);
  assert.match(html, /[/]app-screens[/]ja[/]real-home\.png/);
  assert.match(html, /[/]app-screens[/]ja[/]real-session\.png/);
  assert.match(html, /[/]app-screens[/]ja[/]real-training\.png/);
  assert.match(html, /[/]app-screens[/]ja[/]real-league\.png/);
  assert.match(html, /[/]app-screens[/]ja[/]real-coach\.png/);
  assert.match(html, /[/]app-screens[/]ja[/]real-profile\.png/);
  assert.match(html, /[/]brand[/]fitlet-pro-logo\.svg/);
  assert.match(html, /プライバシーポリシー/);
  assert.match(html, /href="\/terms"/);
  assert.doesNotMatch(html, /\/app-materials\/ui\//);
  assert.doesNotMatch(html, /coach-analysis\.png|Fitletコーチタブの分析画面/);
  assert.doesNotMatch(html, /UIカタログ|39種目を、<br\/>アプリの素材で見る|ヨガ|yoga|FITLET APP|ACTUAL SCREENS|store-assets|store-screenshots|ホームタブの実画面|トレーニング中の実画面/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|react-loading-skeleton|pitaya|✳/);
});

test("server-renders legal routes", async () => {
  for (const pathname of ["/legal", "/privacy", "/terms", "/support", "/friend"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /Fitlet/);
    assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
    if (pathname === "/legal") {
      assert.match(html, /プライバシー・利用規約/);
      assert.match(html, /href="\/privacy"/);
      assert.match(html, /href="\/terms"/);
      assert.doesNotMatch(html, /1\. 取得する情報|第1条（適用・同意）/);
      assert.doesNotMatch(html, /エクスポート|インポート|公開前に必ず確定|現行アプリのコード/);
    }
    if (pathname === "/privacy") {
      assert.match(html, /プライバシーポリシー/);
      assert.match(html, /取得する情報/);
      assert.doesNotMatch(html, /第1条（適用・同意）/);
    }
    if (pathname === "/terms") {
      assert.match(html, /利用規約/);
      assert.match(html, /第1条（適用・同意）/);
      assert.doesNotMatch(html, /1\. 取得する情報/);
    }
    if (pathname === "/support") {
      assert.match(html, /zenhancelabs@gmail\.com/);
      assert.match(html, /forms\.gle\/A6AuxEZ4otXFmGQ28/);
      assert.match(html, /x\.com\/ZenhanceLabs/);
      assert.match(html, /href="\/privacy"/);
      assert.match(html, /href="\/terms"/);
    }
    if (pathname === "/friend") {
      assert.match(html, /Fitletでフレンドになる/);
      assert.match(html, /共有されたプロフィールカード/);
    }
  }
});
