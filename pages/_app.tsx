// /pages/_app.js

import "@/styles/globals.css";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { productionAnalyticsAllowed } from "@/lib/deployment.mjs";
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
const analyticsSnapshot = () => productionAnalyticsAllowed(process.env.NEXT_PUBLIC_DEPLOY_CONTEXT, window.location.hostname);
const serverAnalyticsSnapshot = () => false;

export default function MyApp({ Component, pageProps }) {
  const analyticsEnabled = useSyncExternalStore(subscribeToHost, analyticsSnapshot, serverAnalyticsSnapshot);
  return (
    <div className={`${inter.variable} ${poppins.variable} font-sans`}>
      <AnalyticsLifecycle />
      {analyticsEnabled && GTM_ID ? (
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

