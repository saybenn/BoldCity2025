// /pages/_app.js

import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { track } from "@/lib/analytics";
import { captureUTMs } from "@/lib/utm";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-55RZQMX7";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    captureUTMs?.();
  }, []);

  useEffect(() => {
    const sendPageView = (url) => {
      track("view page", {
        page_path: url.split("?")[0],
        page_url: url,
      });
    };

    sendPageView(window.location.pathname + window.location.search);

    router.events.on("routeChangeComplete", sendPageView);
    return () => {
      router.events.off("routeChangeComplete", sendPageView);
    };
  }, [router.events]);

  return (
    <>
      {GTM_ID && (
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      <Component {...pageProps} />
    </>
  );
}