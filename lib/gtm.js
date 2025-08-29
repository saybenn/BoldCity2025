// export const GTM_ID = "GTM-55RZQMX7";

// export const pageview = (url) => {
//   if (typeof window !== "undefined" && window.dataLayer) {
//     window.dataLayer.push({
//       event: "pageview",
//       page: url,
//     });
//   }
// };

// export const event = ({ action, category, label, value }) => {
//   if (typeof window !== "undefined" && window.dataLayer) {
//     window.dataLayer.push({
//       event: action,
//       eventCategory: category,
//       eventLabel: label,
//       eventValue: value,
//     });
//   }
// };

// export const formSubmitEvent = ({ formType, financingInterest }) => {
//   if (typeof window !== "undefined" && window.dataLayer) {
//     window.dataLayer.push({
//       event: "form_submit",
//       formType,
//       financingInterest,
//     });
//   }
// };

// lib/gtm.js
export const pageview = (url) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "pageview", page_location: url });
};

export const event = ({ action, category, label, value }) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
  });
};

export const formSubmitEvent = ({ formType, financingInterest }) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submit",
    formType,
    financingInterest: userCheckedFinance ? "yes" : "no",
  });
};

// Recommended specific helpers
export const generateLead = (params = {}) => event("form_submit", params);

export const callClickEvent = (phone_number) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "call_click", phone_number });
};
