// One free code-based rule covers both public form endpoints. Confirm acceptance
// in the preview deploy post-processing log and test the shared counter there.
export default async function contactProtection(request: Request, context: { ip: string; next: () => Promise<Response> }) {
  if (!context.ip) return Response.json({ ok: false, error: "Form protection is unavailable. Please call (904) 434-6318." }, { status: 503 });
  const response = await context.next();
  const headers = new Headers(response.headers);
  if (!["boldcityiaq.com", "www.boldcityiaq.com"].includes(new URL(request.url).hostname)) headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export const config = {
  path: "/api/:endpoint(contact|lead)",
  method: "POST",
  onError: "fail",
  rateLimit: { action: "rate_limit", windowLimit: 20, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
