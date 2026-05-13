import { trackPhoneClick } from "@/lib/trackPhoneClick";

const DEFAULT_PHONE_HREF = "tel:+19044346318";
const DEFAULT_PHONE_NUMBER = "+19044346318";

export default function TrackedPhoneLink({
  href = DEFAULT_PHONE_HREF,
  phoneNumber = DEFAULT_PHONE_NUMBER,
  ctaLabel = "Call Now",
  ctaLocation = "unknown",
  page = "/",
  intent = "call",
  className = "",
  ariaLabel,
  children,
  onClick,
  ...props
}) {
  function handleClick(event) {
    trackPhoneClick({
      ctaLabel,
      ctaLocation,
      page,
      href,
      phoneNumber,
      intent,
    });

    onClick?.(event);
  }

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel || ctaLabel}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
