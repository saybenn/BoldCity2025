// /components/financing/AcornFinanceBanner.tsx

import { trackCta } from "@/lib/analytics";

type AcornFinanceBannerProps = {
  className?: string;
};

const ACORN_URL =
  "https://www.acornfinance.com/pre-qualify/?d=J3FPL&utm_medium=web_pre_qual_link_copy";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function AcornFinanceBanner({
  className,
}: AcornFinanceBannerProps) {
  const handleClick = (placement: "desktop" | "mobile" | "button") => {
    trackCta({
      cta_label: "Acorn Finance Pre-Qualify",
      cta_location: `AcornFinanceBanner:${placement}`,
      intent: "financing inquiry",
      page: "/financing",
      href: ACORN_URL,
    });
  };

  return (
    <section
      className={cx("bg-white", className)}
      aria-labelledby="acorn-finance-banner-title"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Third-Party Financing Partner
              </p>

              <h2
                id="acorn-finance-banner-title"
                className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                Explore third-party financing through Acorn Finance
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                For qualifying projects, Bold City IAQ offers access to
                third-party financing through Acorn Finance. You can review
                available payment options and see what may fit your situation.
              </p>

              <div className="mt-5">
                <a
                  href={ACORN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleClick("button")}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Check Financing Options with Acorn
                </a>
              </div>

              <p className="mt-3 text-sm text-slate-600">Opens in a new tab.</p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[420px]">
                <a
                  href={ACORN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleClick("desktop")}
                  className="hidden sm:block"
                >
                  <img
                    src="https://fs.acornfinance.com/banners/acorn-finance-banner-easy-payment-options-horizontal-small.png"
                    alt="Acorn Finance apply and get affordable payment options from multiple lenders"
                    className="h-auto w-full rounded-xl border border-slate-300 bg-white"
                    loading="lazy"
                  />
                </a>

                <a
                  href={ACORN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleClick("mobile")}
                  className="block sm:hidden"
                >
                  <img
                    src="https://fs.acornfinance.com/banners/acorn-finance-banner-easy-payment-options-vertical-small.png"
                    alt="Acorn Finance apply and get affordable payment options from multiple lenders"
                    className="mx-auto h-auto w-full max-w-[220px] rounded-xl border border-slate-300 bg-white"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
