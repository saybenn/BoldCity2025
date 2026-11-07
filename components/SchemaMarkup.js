import Head from "next/head";
import { buildPageGraph } from "@/lib/seo";
export default function SchemaMarkup(props) {
  const graph = buildPageGraph(props);
  return <Head><script key="page-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} /></Head>;
}
