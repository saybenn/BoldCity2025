import Head from "next/head";
import SchemaMarkup from "./SchemaMarkup.js";
import Footer from "./Footer.jsx";
import MetaHead from "./MetaHead.js";
import Navbar from "./Navbar.jsx";
import MobileStickyCallButton from "./MobileStickyCallButton.js";

export default function Layout({
  children,
  meta = {},
  schema = {},
  showNavbar = true,
  showFooter = true,
  showMobileStickyCallButton = true,
  mainClassName = "",
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <MetaHead {...meta} />
      <SchemaMarkup {...schema} />

      {showNavbar ? <Navbar /> : null}

      <main
        className={`font-sans bg-background text-lightText ${mainClassName}`}
      >
        {children}
      </main>

      {showMobileStickyCallButton ? <MobileStickyCallButton /> : null}
      {showFooter ? <Footer /> : null}
    </>
  );
}
