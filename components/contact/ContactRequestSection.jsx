import { getUTMParams } from "@/lib/utm";
import ContactRequestForm from "./ContactRequestForm";
import FormCertifications from "./FormCertifications";

export default function ContactRequestSection({ data }) {
  const utm = getUTMParams();

  return (
    <section
      id="request-service"
      className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
    >
      <div data-form-trust-group className="mx-auto max-w-6xl">
        <ContactRequestForm data={data} utm={utm} />
        <FormCertifications className="mt-3" />
      </div>
    </section>
  );
}
