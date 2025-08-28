export const GTM_ID = "GTM-55RZQMX7";

export const pageview = (url) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
  }
};

export const event = ({ action, category, label, value }) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    });
  }
};

export const formSubmitEvent = ({ formType, financingInterest }) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "form_submit",
      formType,
      financingInterest,
    });
  }
};
