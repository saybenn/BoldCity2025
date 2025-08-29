// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-55RZQMX7";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#0C2340" />
        </Head>
        <body>
          {/* GTM noscript must be the first thing in <body> */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

