// // pages/_app.js
// import "@/styles/globals.css";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import Script from "next/script";

// const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-55RZQMX7"; // set in .env
// const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-9G03529W5P"; // set in .env (optional)

// export default function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = (url) => {
//       // GTM SPA pageview
//       window.dataLayer = window.dataLayer || [];
//       window.dataLayer.push({ event: "pageview", page: url });

//       // GA4 SPA pageview (only if you run GA directly, not via GTM)
//       if (typeof window.gtag === "function" && GA_ID) {
//         window.gtag("config", GA_ID, { page_path: url });
//       }
//     };

//     // Initial pageview after hydration
//     handleRouteChange(window.location.pathname + window.location.search);

//     // Subsequent client-side navigations
//     router.events.on("routeChangeComplete", handleRouteChange);
//     return () => router.events.off("routeChangeComplete", handleRouteChange);
//   }, [router.events]);

//   return (
//     <>
//       {/* Google Tag Manager (preferred by Next/ESLint) */}
//       {GTM_ID && (
//         <Script id="gtm-base" strategy="afterInteractive">
//           {`
//             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//             })(window,document,'script','dataLayer','${GTM_ID}');
//           `}
//         </Script>
//       )}

//       {/* GA4 direct (remove if GA4 is configured inside GTM) */}
//       {/* {GA_ID && (
//         <>
//           <Script
//             id="ga4-src"
//             src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
//             strategy="afterInteractive"
//           />
//           <Script id="ga4-init" strategy="afterInteractive">
//             {`
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               // Handle SPA pageviews manually to avoid double counts
//               gtag('config', '${GA_ID}', { send_page_view: false });
//             `}
//           </Script>
//         </>
//       )} */}

//       <Component {...pageProps} />
//     </>
//   );
// }

// pages/_app.js
import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-55RZQMX7";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const pushPageview = (url) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "pageview", page_location: url });
    };

    // initial
    pushPageview(window.location.pathname + window.location.search);

    // SPA navigations
    const onRouteChange = (url) => pushPageview(url);
    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
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

