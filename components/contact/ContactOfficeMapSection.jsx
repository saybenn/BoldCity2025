import { trackCta } from "@/lib/analytics";

export default function ContactOfficeMapSection({ data, MapComponent }) {
  function trackLink(label, href, intent) {
    return () =>
      trackCta({
        cta_label: label,
        cta_location: "ContactOfficeMapSection",
        intent,
        page: "/contact",
        href,
      });
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 sm:p-8">
          <h2 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">
            Office & Service Area
          </h2>

          <div className="mt-5 space-y-3 text-zinc-800">
            <p>
              <strong>Address:</strong> {data.address}
            </p>
            <p>
              <strong>24-Hour Phone:</strong>{" "}
              <a
                href={data.phoneHref}
                onClick={trackLink(
                  "24-Hour Phone",
                  data.phoneHref,
                  "call emergency restoration",
                )}
                className="text-blue-700 hover:underline"
              >
                {data.phoneDisplay}
              </a>
            </p>
            <p>
              <strong>Office (non-emergency):</strong>{" "}
              <a
                href={data.officePhoneHref}
                onClick={trackLink(
                  "Office Phone",
                  data.officePhoneHref,
                  "call office",
                )}
                className="text-blue-700 hover:underline"
              >
                {data.officePhoneDisplay}
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={data.emailHref}
                onClick={trackLink(
                  "Office Email",
                  data.emailHref,
                  "email office",
                )}
                className="text-blue-700 hover:underline"
              >
                {data.email}
              </a>
            </p>
            <p>
              <strong>Hours:</strong> {data.hours}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500">
              Areas We Commonly Serve
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 ring-1 ring-zinc-200"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-zinc-200 min-h-[320px]">
          <MapComponent />
        </div>
      </div>
    </section>
  );
}
