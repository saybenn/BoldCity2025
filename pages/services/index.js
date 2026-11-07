import Link from "next/link";
import Layout from "@/components/Layout";
import { serviceData } from "@/lib/serviceData";
export default function Services() {
 return <Layout meta={{title:"Restoration & Air Duct Cleaning Services | Bold City IAQ",description:"Explore water damage restoration, mold remediation, fire and smoke cleanup, contents cleaning, emergency response and air duct cleaning in Jacksonville.",canonical:"https://boldcityiaq.com/services"}}>
  <section className="mx-auto max-w-6xl px-5 pb-16 pt-28 text-darkText"><h1 className="text-4xl font-bold">Restoration and cleaning services</h1><div className="mt-8 grid gap-5 sm:grid-cols-2">{serviceData.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-2xl border border-gray-200 p-6 hover:border-aqua"><h2 className="text-2xl font-bold">{service.title}</h2><p className="mt-3 leading-7">{service.meta.description}</p></Link>)}</div></section>
 </Layout>;
}
