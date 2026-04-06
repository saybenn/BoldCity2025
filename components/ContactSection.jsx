import StandardContactForm from "./StandardContactForm";
import ContactFaq from "./ContactFaq";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-navy py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-6 lg:px-8">
        <StandardContactForm />
        <ContactFaq />
      </div>
    </section>
  );
}
