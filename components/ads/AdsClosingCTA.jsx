import AdsSection from "./AdsSection";
import AdsButton from "./AdsButton";

export default function AdsClosingCTA() {
  return (
    <AdsSection className="pb-28 pt-8 md:pb-16">
      <div className="rounded-3xl bg-gradient-to-br from-blue-400 to-blue-700 p-8 text-white">
        <h2 className="text-3xl font-semibold">
          Don’t Wait — Every Minute Matters
        </h2>
        <p className="mt-2 text-blue-100">
          Call now for 24/7 emergency help, or send a request and we will follow
          up quickly.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <AdsButton
            href="tel:+19044346318"
            variant="outline"
            ctaLocation="AdsClosingCTA"
            intent="call emergency restoration"
          >
            Call Now (904) 434-6318
          </AdsButton>

          <AdsButton
            href="#request-service"
            variant="secondary"
            ctaLocation="AdsClosingCTA"
            intent="request emergency service"
          >
            Request Emergency Service
          </AdsButton>
        </div>
      </div>
    </AdsSection>
  );
}
