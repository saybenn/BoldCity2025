import AdsSection from "./AdsSection";
import AdsButton from "./AdsButton";

export default function AdsFinanceStrip() {
  return (
    <AdsSection id="finance" className="py-10 md:py-12">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-zinc-900">
            Get Emergency Help Now — Pay Later
          </h2>

          <ul className="mt-4 grid gap-2 text-zinc-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-emerald-500">✔</span>
              <span>
                Promotional financing options may be available for qualified
                homeowners.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-emerald-500">✔</span>
              <span>
                No need to delay mitigation while figuring out the full payment
                path.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-emerald-500">✔</span>
              <span>
                We can help organize documentation for covered losses and
                insurance coordination.
              </span>
            </li>
          </ul>

          <div className="mt-6">
            <AdsButton
              href="/financing"
              variant="secondary"
              ctaLocation="AdsFinanceStrip"
              intent="view financing options"
            >
              Check Financing Options
            </AdsButton>
          </div>
        </div>

        <div className="rounded-3xl bg-zinc-50 p-6 ring-1 ring-zinc-200">
          <details className="rounded-xl bg-white p-4 ring-1 ring-zinc-200">
            <summary className="cursor-pointer font-medium text-zinc-900">
              Can work start before insurance pays?
            </summary>
            <p className="mt-2 text-zinc-700">
              In many cases, mitigation should not wait. Payment paths vary, but
              financing can help bridge urgent situations.
            </p>
          </details>

          <details className="mt-3 rounded-xl bg-white p-4 ring-1 ring-zinc-200">
            <summary className="cursor-pointer font-medium text-zinc-900">
              Will applying for financing affect credit?
            </summary>
            <p className="mt-2 text-zinc-700">
              Terms depend on the financing provider. Final details should be
              reviewed during the financing process.
            </p>
          </details>
        </div>
      </div>
    </AdsSection>
  );
}
