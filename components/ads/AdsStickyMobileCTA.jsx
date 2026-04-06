import AdsButton from "./AdsButton";

export default function AdsStickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="mx-auto max-w-6xl px-4 pb-3">
        <div className="rounded-2xl bg-white/95 shadow-lg ring-1 ring-zinc-200 backdrop-blur">
          <div className="flex gap-2 p-3">
            <AdsButton
              href="tel:+19044346318"
              variant="primary"
              className="flex-1"
              ctaLocation="AdsStickyMobileCTA"
              intent="call emergency restoration"
            >
              Call Now
            </AdsButton>

            <AdsButton
              href="#request-service"
              variant="secondary"
              className="flex-1"
              ctaLocation="AdsStickyMobileCTA"
              intent="request emergency service"
            >
              Request Service
            </AdsButton>
          </div>
        </div>
      </div>
    </div>
  );
}
