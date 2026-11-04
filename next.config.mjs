import { deploymentContext, deploymentProvider } from "./lib/deployment.mjs";
const context = deploymentContext(process.env);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.QA_BUILD_DIR || ".next",
  env: {
    NEXT_PUBLIC_DEPLOY_CONTEXT: context,
    NEXT_PUBLIC_DEPLOY_PROVIDER: deploymentProvider(process.env),
  },
  async headers() {
    return context === "production" ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  images: {
    qualities: [75, 85, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
};

export default nextConfig;

