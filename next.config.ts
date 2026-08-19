import type { NextConfig } from "next";

const isPagesBuild = process.env.FITLET_PAGES === "true";
const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isPagesBuild
  ? {
      output: "export",
      trailingSlash: true,
      assetPrefix: pagesBasePath || undefined,
    }
  : {};

export default nextConfig;
