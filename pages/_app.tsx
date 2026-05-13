// /pages/_app.js

import "@/styles/globals.css";
import { useEffect } from "react";
import Script from "next/script";
import { captureUTMs } from "@/lib/utm";
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

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    captureUTMs?.();
  }, []);

  return (
    <main className={`${inter.variable} ${poppins.variable} font-sans`}>
      {GTM_ID ? (
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
    </main>
  );
}

