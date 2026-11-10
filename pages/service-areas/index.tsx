import Link from "next/link";
import Layout from "@/components/Layout";
import { AREAS } from "@/data/service-area-pages/areas";
export default function ServiceAreas() {
  return <Layout meta={{title:"Jacksonville Area Restoration Service Areas | Bold City IAQ",description:"Find water damage restoration and mold remediation information for Jacksonville, Orange Park and five other Northeast Florida communities.",canonical:"https://boldcityiaq.com/service-areas"}}>
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-28 text-darkText"><h1 className="text-4xl font-bold">Restoration service areas</h1><p className="mt-5 max-w-2xl text-lg">Explore local water damage and mold remediation guidance. Call to confirm availability and access for your property.</p><div className="mt-8 grid gap-5 sm:grid-cols-2">{Object.values(AREAS).map((area) => <Link key={area.slug} href={`/service-areas/${area.slug}`} className="rounded-2xl border border-gray-200 p-6 hover:border-aqua"><h2 className="text-2xl font-bold">{area.fullLabel}</h2><p className="mt-3 leading-7">{area.intro}</p></Link>)}</div></section>
  </Layout>;
}
