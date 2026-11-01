import { track, trackPageView, trackCallClick, trackFormSubmit } from "./analytics";
export const pageview = (url) => trackPageView(url);
export const event = ({ action, ...payload }) => track(action, payload);
export const formSubmitEvent = ({ formType, financingInterest }) => trackFormSubmit({ form_id: formType, form_location: formType, intent: financingInterest ? "financing inquiry" : "service request" });
export const generateLead = (params) => trackFormSubmit(params);
export const callClickEvent = (phone_number) => trackCallClick({phone_number});
