import AdsSection from "./AdsSection";
import AdContactForm from "../AdContactForm";
import FormCertifications from "../contact/FormCertifications";

export default function AdsLeadFormSection() {
  return <AdsSection id="request-service" className="py-10 md:py-12">
    <div data-form-trust-group>
    <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-zinc-200 md:p-8">
      <h2 className="text-3xl font-semibold text-zinc-900 md:text-4xl">Request Emergency Service</h2>
      <p className="mb-6 mt-2 text-zinc-700">Tell us what happened. For urgent help, call (904) 434-6318.</p>
      <AdContactForm successPath="/ads/emergency-restoration/success" />
    </div>
    <FormCertifications className="mt-3" />
    </div>
  </AdsSection>;
}
