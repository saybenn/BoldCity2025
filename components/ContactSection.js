import StandardContactForm from "./StandardContactForm";
import ContactFaq from "./ContactFaq";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-16 bg-lightGray dark:bg-navy transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <StandardContactForm />
        <ContactFaq />
      </div>
    </section>
  );
}
