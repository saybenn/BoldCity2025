import Layout from "@/components/Layout";
import Link from "next/link";
export default function EmergencyChecklist() {
 return <Layout meta={{title:"Emergency Restoration Call Checklist | Bold City IAQ",description:"Prepare the address, damage details and access information for an emergency water damage or restoration call in Jacksonville.",canonical:"https://boldcityiaq.com/resources/emergency-checklist"}}>
  <article className="mx-auto max-w-3xl px-5 pb-16 pt-28 text-darkText"><h1 className="text-4xl font-bold">Emergency restoration call checklist</h1><p className="mt-5 leading-7">For an active emergency, call <a href="tel:+19044346318" className="font-bold text-navy underline">(904) 434-6318</a>. Have these details ready when you can gather them safely.</p>
  <ol className="mt-6 list-decimal space-y-4 pl-5 leading-7"><li>Property address, unit number and an on-site contact.</li><li>What happened: pipe or appliance leak, rain intrusion, outdoor water, sewage, fire or another loss.</li><li>Whether the source is still active and which rooms or materials are affected.</li><li>Access restrictions, occupancy and building-management requirements.</li><li>Photos and the approximate time the damage was noticed, if available without entering an unsafe area.</li></ol>
  <p className="mt-6 leading-7">Do not enter an unsafe area to collect details. Tell the team about sewage, outdoor floodwater or fire damage. Availability and next steps depend on conditions at the property.</p><p className="mt-6"><Link className="text-navy underline" href="/contact">Request service online</Link> · <Link className="text-navy underline" href="/services/water-damage-restoration">Read about water restoration</Link></p></article>
 </Layout>;
}
