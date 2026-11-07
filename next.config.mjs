import { deploymentContext, deploymentProvider, localGtmQaAllowed } from "./lib/deployment.mjs";
import { GTM_QA_CSP } from "./lib/gtm-qa.mjs";
const context = deploymentContext(process.env);
const qa = localGtmQaAllowed(process.env.NODE_ENV, process.env.NEXT_PUBLIC_GTM_QA_ENABLED, context, deploymentProvider(process.env), "localhost");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.QA_BUILD_DIR || ".next",
  env: {
    NEXT_PUBLIC_DEPLOY_CONTEXT: context,
    NEXT_PUBLIC_DEPLOY_PROVIDER: deploymentProvider(process.env),
  },
  async headers() {
    const headers = context === "production" ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
    if (qa) headers.push({ source: "/:path*", has: [{ type:"host", value:"^(?:localhost|127\\.0\\.0\\.1)$" }], headers:[
      { key:"Content-Security-Policy", value:GTM_QA_CSP },
      { key:"X-GTM-QA", value:"localhost-diagnostics-collection-blocked" },
    ] });
    return headers;
  },
  images: {
    qualities: [75, 85, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
};

export default nextConfig;

