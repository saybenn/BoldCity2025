import Layout from "@/components/Layout";

export default function Privacy() {
  return <Layout meta={{ title: "Privacy & Analytics Choices | Bold City IAQ", description: "How Bold City IAQ uses service-request information and optional Google Analytics, and how to change your analytics choice." }}>
    <article className="mx-auto max-w-3xl px-5 py-14 text-slate-700">
      <h1 className="text-3xl font-semibold text-navy">Privacy & analytics choices</h1>
      <section className="mt-8 space-y-3 leading-7">
        <h2 className="text-xl font-semibold text-navy">Contacting us</h2>
        <p>When you request service, we use the details you provide to receive and respond to your enquiry. The form can include your name, telephone number, email address, requested service and message, along with referral or campaign information stored for the browsing session. Please avoid sending sensitive information that is not needed for your request.</p>
        <p>Our website uses Netlify for hosting, Cloudflare Turnstile for form security and Postmark for sending request notifications. These services process information needed to perform those tasks. Embedded Google Maps operate separately from the optional analytics choice.</p>
      </section>
      <section className="mt-8 space-y-3 leading-7">
        <h2 className="text-xl font-semibold text-navy">Optional Google Analytics</h2>
        <p>Google Analytics loads only after you choose Allow analytics. It helps us understand page visits, telephone-link clicks, service calls to action and successfully accepted service requests. Our custom analytics events exclude the name, email address, personal telephone number and message entered into the form, and remove URL query strings.</p>
        <p>Google Analytics uses cookies, including identifiers that distinguish visits and sessions, and may collect browser and device information. Google receives and processes analytics information. Learn more about <a className="underline" href="https://policies.google.com/technologies/partner-sites">how Google uses information from partner websites</a> and <a className="underline" href="https://policies.google.com/privacy">Google&apos;s privacy policy</a>.</p>
        <p>Declining analytics leaves contact forms and service enquiries available. Activity before you allow analytics is not saved for later analytics transmission. This choice controls Google Analytics; it does not disable hosting, form security, notification delivery or embedded maps.</p>
      </section>
      <section className="mt-8 space-y-3 leading-7">
        <h2 className="text-xl font-semibold text-navy">Changing your choice</h2>
        <p>Use Analytics choices at the bottom of any page to allow or decline analytics. We store that choice in your browser for up to 180 days. If browser storage is blocked, the choice lasts for the current page session. Declining after allowing reloads the page to stop the loaded analytics code and removes this site&apos;s standard Google Analytics cookies. Save or send any unfinished form first.</p>
        <p>For questions about information you have provided to Bold City IAQ, call <a className="underline" href="tel:+19044346318">(904) 434-6318</a>.</p>
      </section>
    </article>
  </Layout>;
}
