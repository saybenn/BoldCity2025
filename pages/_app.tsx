// /pages/_app.js

import "@/styles/globals.css";
import { useEffect, useSyncExternalStore } from "react";
import { localGtmQaAllowed, productionAnalyticsAllowed } from "@/lib/deployment.mjs";
import AnalyticsLifecycle from "@/components/AnalyticsLifecycle";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import { applyGoogleConsent, getAnalyticsConsent, serverAnalyticsConsent, subscribeAnalyticsConsent } from "@/lib/analytics-consent";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-head",
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-55RZQMX7";
const subscribeToHost = () => () => {};
const analyticsSnapshot = () => productionAnalyticsAllowed(process.env.NEXT_PUBLIC_DEPLOY_CONTEXT, window.location.hostname) ? "production"
  : localGtmQaAllowed(process.env.NODE_ENV, process.env.NEXT_PUBLIC_GTM_QA_ENABLED,
    process.env.NEXT_PUBLIC_DEPLOY_CONTEXT, process.env.NEXT_PUBLIC_DEPLOY_PROVIDER, window.location.hostname) ? "qa" : "off";
const serverAnalyticsSnapshot = () => "off";

export default function MyApp({ Component, pageProps }) {
  const analyticsMode = useSyncExternalStore(subscribeToHost, analyticsSnapshot, serverAnalyticsSnapshot);
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, serverAnalyticsConsent);
  useEffect(() => {
    // Ignore the server's conservative hydration snapshot when a saved choice
    // is already available; never overwrite it with a transient denial.
    if (consent !== getAnalyticsConsent()) return;
    applyGoogleConsent(consent);
    if (consent !== "granted" || analyticsMode === "off" || !GTM_ID || window.bcGtmLoaded) return;
    window.bcGtmLoaded = true;
    window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(script);
  }, [analyticsMode, consent]);
  useEffect(() => {
    if (analyticsMode !== "qa") return;
    // Diagnostic clicks still bubble to AnalyticsLifecycle; prevent an actual
    // phone launch. This profile never sends leads, even by accidental submit.
    const phone = (event: MouseEvent) => { if ((event.target as Element)?.closest?.('a[href^="tel:"]')) event.preventDefault(); };
    const submit = (event: Event) => { event.preventDefault(); event.stopImmediatePropagation(); };
    document.addEventListener("click", phone, true);
    document.addEventListener("submit", submit, true);
    return () => { document.removeEventListener("click", phone, true); document.removeEventListener("submit", submit, true); };
  }, [analyticsMode]);
  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans`}>
      <AnalyticsLifecycle />
      <Component {...pageProps} />
      <AnalyticsConsent />
    </div>
  );
}

