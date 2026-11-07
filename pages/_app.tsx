// /pages/_app.js

import "@/styles/globals.css";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { localGtmQaAllowed, productionAnalyticsAllowed } from "@/lib/deployment.mjs";
import AnalyticsLifecycle from "@/components/AnalyticsLifecycle";
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
      {analyticsMode !== "off" && GTM_ID ? (
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      ) : null}

      <Component {...pageProps} />
    </div>
  );
}

