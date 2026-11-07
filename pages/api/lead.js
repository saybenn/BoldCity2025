// Preserve the legacy URL while sharing validation, Turnstile and Postmark.
import contactHandler from "./contact";
export const config = { api: { bodyParser: { sizeLimit: "20kb" } } };
export default function handler(req, res) {
  req.body = { ...(req.body || {}), formType: "lead" };
  return contactHandler(req, res);
}
