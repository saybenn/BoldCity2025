import nextVitals from "eslint-config-next/core-web-vitals";
const config = [
  ...nextVitals,
  { ignores: [".next/**", ".next-qa-production/**", "node_modules/**", "context/media/**", "context/qa/**", "playwright-report/**", "test-results/**", ".qa-lock/**"] },
  { files:["components/**/*.{js,jsx}","pages/**/*.{js,jsx}","lib/**/*.js"], rules:{"no-undef":"error"} },
  { files:["components/StandardContactForm.jsx","components/AdContactForm.jsx","components/LeadForm.jsx","components/ModalContactForm.jsx","components/contact/ContactRequestForm.jsx","components/MobileStickyCallButton.jsx"],
    // These forms deliberately hydrate browser storage/timestamps after SSR.
    // React Compiler is not enabled; keep this new optimization rule advisory.
    rules:{"react-hooks/set-state-in-effect":"warn"} },
];
export default config;
