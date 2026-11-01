import Head from "next/head";
import SchemaMarkup from "./SchemaMarkup.js";
import Footer from "./Footer.jsx";
import MetaHead from "./MetaHead.js";
import Navbar from "./Navbar.jsx";
import MobileStickyCallButton from "./MobileStickyCallButton.jsx";
import { useRouter } from "next/router";
import { canonicalUrl } from "@/lib/seo";

export default function Layout({
  children,
  meta = {},
  schema = {},
  showNavbar = true,
  showFooter = true,
  showMobileStickyCallButton = true,
  mainClassName = "",
}) {
  const router = useRouter();
  const pageMeta = {
    ...meta,
    title: meta.title || "Restoration Services Jacksonville, FL | Bold City IAQ",
    description: meta.description || "Water damage cleanup, mold remediation and emergency restoration for Jacksonville homes and businesses. Call (904) 434-6318.",
    canonical: canonicalUrl(meta.canonical || meta.canonicalUrl || router.asPath || "/"),
    image: meta.image || meta.og?.image || "/images/about-hero.webp",
    noindex: meta.noindex || router.asPath.startsWith("/ads/") || router.asPath.split("?")[0].endsWith("/success"),
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <MetaHead {...pageMeta} />
      <SchemaMarkup {...pageMeta} faq={schema.faq || []} />

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
