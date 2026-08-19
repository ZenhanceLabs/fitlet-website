import vinext from "vinext";
import { defineConfig } from "vite";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig(async () => {
  if (process.env.FITLET_PAGES === "true") {
    return {
      resolve: {
        extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".jsx", ".js", ".json"],
      },
      plugins: [vinext({ prerender: true })],
    };
  }

  // Keep the GitHub Pages source independent from local Sites/Cloudflare files.
  // Vite must not resolve these optional modules while FITLET_PAGES is enabled.
  const projectRoot = process.cwd();
  const resolveOptions = {
    extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".jsx", ".js", ".json"],
  };
  const hostingConfigPath = pathToFileURL(`${projectRoot}/.openai/hosting.json`).href;
  const sitesPluginPath = pathToFileURL(`${projectRoot}/build/sites-vite-plugin`).href;
  if (!existsSync(`${projectRoot}/.openai/hosting.json`) || !existsSync(`${projectRoot}/build/sites-vite-plugin`)) {
    return {
      resolve: resolveOptions,
      server: isCodexSeatbeltSandbox
        ? { watch: { useFsEvents: false, usePolling: true } }
        : undefined,
      plugins: [vinext()],
    };
  }
  const { default: hostingConfig } = await import(/* @vite-ignore */ hostingConfigPath, {
    with: { type: "json" },
  });
  const { sites } = await import(/* @vite-ignore */ sitesPluginPath);
  const SITE_CREATOR_PLACEHOLDER_DATABASE_ID = "00000000-0000-4000-8000-000000000000";
  const { d1, r2 } = hostingConfig;
  const localBindingConfig = {
    main: "./worker/index.ts",
    compatibility_flags: ["nodejs_compat"],
    d1_databases: d1
      ? [{ binding: d1, database_name: "site-creator-d1", database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID }]
      : [],
    r2_buckets: r2
      ? [{ binding: r2, bucket_name: "site-creator-r2" }]
      : [],
  };

  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    resolve: resolveOptions,
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
