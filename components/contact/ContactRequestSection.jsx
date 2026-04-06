import { getUTMParams } from "@/lib/utm";
import ContactRequestForm from "./ContactRequestForm";

export default function ContactRequestSection({ data }) {
  const utm = getUTMParams();

  return (
    <section
      id="request-service"
      className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
    >
      <div className="mx-auto max-w-6xl">
        <ContactRequestForm data={data} utm={utm} />
      </div>
    </section>
  );
}
