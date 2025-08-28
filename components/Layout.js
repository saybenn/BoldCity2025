// components/Layout.jsx
import Head from "next/head";
import SchemaMarkup from "./SchemaMarkup.js";
import Footer from "./Footer.js";
import MetaHead from "./MetaHead.js";
import Navbar from "./Navbar";
import MobileStickyCallButton from "./MobileStickyCallButton.js";

export default function Layout({ children, meta = {}, schema = {} }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <MetaHead {...meta} />
      <SchemaMarkup {...schema} />
      <Navbar />
      <main className="font-sans bg-background text-darkText dark:text-lightText ">
        {children}
      </main>
      <MobileStickyCallButton />
      <Footer />
    </>
  );
}
