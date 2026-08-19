import type { NextConfig } from "next";

const isPagesBuild = process.env.FITLET_PAGES === "true";

const nextConfig: NextConfig = isPagesBuild
  ? {
      output: "export",
      trailingSlash: true,
    }
  : {};

export default nextConfig;
