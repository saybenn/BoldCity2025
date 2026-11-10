// Direct property reads are replaced at build time by Next.js. Netlify may not
// expose build-only CONTEXT/NETLIFY variables inside the deployed API runtime.
const buildContext = process.env.NEXT_PUBLIC_DEPLOY_CONTEXT;
const buildProvider = process.env.NEXT_PUBLIC_DEPLOY_PROVIDER;
export function deploymentContext(env) {
  if (env.NETLIFY === "true" || env.NETLIFY === "1") return env.CONTEXT || buildContext || "unknown";
  if (env.VERCEL === "1") return env.VERCEL_ENV || "unknown";
  return env.CONTACT_DEPLOY_CONTEXT || env.NEXT_PUBLIC_DEPLOY_CONTEXT || buildContext || "local";
}

export function deploymentProvider(env) {
  if (env.NETLIFY === "true" || env.NETLIFY === "1") return "netlify";
  if (env.VERCEL === "1") return "vercel";
  return env.NEXT_PUBLIC_DEPLOY_PROVIDER || buildProvider || "local";
}

export function productionAnalyticsAllowed(context, hostname) {
  return context === "production" && ["boldcityiaq.com", "www.boldcityiaq.com"].includes(hostname);
}

// This exception is deliberately unavailable in next build/next start and on
// preview/branch deployments, even when a public QA flag is accidentally set.
export function localGtmQaAllowed(nodeEnv, enabled, context, provider, hostname) {
  return nodeEnv === "development" && enabled === "true" && context === "local" && provider === "local"
    && ["localhost", "127.0.0.1"].includes(hostname);
}
