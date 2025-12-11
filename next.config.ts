import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // Keep an explicit (empty) turbopack config so Next can continue using webpack
  // when custom webpack configuration is present. This silences the Turbopack error
  // introduced in newer Next.js versions.
  turbopack: {},
};

export default nextConfig;
