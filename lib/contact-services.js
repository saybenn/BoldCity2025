// Shared by every form and the API. Legacy values remain accepted for old tabs.
export const CONTACT_SERVICES = [
  "Water Damage Restoration", "Mold Remediation", "Emergency Services",
  "Emergency Extraction", "Storm & Flood Cleanup", "Fire & Smoke Restoration",
  "Cleaning & Sanitization", "Air Duct Cleaning", "General Restoration Request",
  "General Emergency Request",
];
export const ALLOWED_SERVICES = new Set(CONTACT_SERVICES);
const LEGACY_SERVICES = {
  Water: "Water Damage Restoration", Mold: "Mold Remediation",
  "Fire/Smoke": "Fire & Smoke Restoration", Storm: "Storm & Flood Cleanup",
  "Cleaning/Sanitization": "Cleaning & Sanitization",
};
export function normalizeService(value) { return LEGACY_SERVICES[value] || value; }
