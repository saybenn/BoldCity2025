import { trackCta, trackCallClick } from "@/lib/analytics";

type TrackPhoneClickInput = {
  ctaLabel: string;
  ctaLocation: string;
  page: string;
  href?: string;
  phoneNumber?: string;
  intent?: string;
};

const DEFAULT_PHONE_HREF = "tel:+19044346318";
const DEFAULT_PHONE_NUMBER = "+19044346318";

function normalizePhoneNumberFromHref(href?: string) {
  if (!href) return DEFAULT_PHONE_NUMBER;

  if (href.startsWith("tel:")) {
    return href.replace("tel:", "");
  }

  return href;
}

export function trackPhoneClick({
  ctaLabel,
  ctaLocation,
  page,
  href = DEFAULT_PHONE_HREF,
  phoneNumber,
  intent = "call",
}: TrackPhoneClickInput) {
  const normalizedPhoneNumber =
    phoneNumber || normalizePhoneNumberFromHref(href);

  trackCta({
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    intent,
    page,
    href,
  });

  trackCallClick({
    cta_location: ctaLocation,
    page,
    phone_number: normalizedPhoneNumber,
    intent,
  });
}