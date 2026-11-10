"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export type TurnstileAction =
  | "contact_standard"
  | "contact_modal"
  | "contact_lead"
  | "contact_ad";

export type TurnstileFieldHandle = {
  reset: () => void;
  getToken: () => string;
  isExpired: () => boolean;
};

type TurnstileFieldProps = {
  action: TurnstileAction;
  onTokenChange: (token: string) => void;
  onVerificationError?: (message: string) => void;
  className?: string;
};

function verificationMessage(code: string) {
  if (["110100", "110110", "110200", "400020"].includes(code)) return "Verification is unavailable on this website. Please call us directly.";
  if (["200500", "200100"].includes(code)) return "The verification check could not load. Check your connection, then retry or call us.";
  return "Verification did not complete. Please retry or call us directly.";
}

export const TurnstileField = forwardRef<
  TurnstileFieldHandle,
  TurnstileFieldProps
>(function TurnstileField(
  { action, onTokenChange, className = "" },
  forwardedRef,
) {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<"flexible" | "compact">("flexible");
  const [widgetError, setWidgetError] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // Cloudflare's flexible widget has a 300px minimum. Use its official
    // compact layout in narrower form columns, including the 320px viewport.
    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect.width < 300 ? "compact" : "flexible"));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  function clearToken() {
    onTokenChange("");
  }

  const reset = useCallback(() => {
    onTokenChange("");
    setWidgetError("");
    turnstileRef.current?.reset();
  }, [onTokenChange]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      reset,

      getToken() {
        return turnstileRef.current?.getResponse() || "";
      },

      isExpired() {
        return turnstileRef.current?.isExpired() ?? true;
      },
    }),
    [reset],
  );

  if (!siteKey) {
    return (
      <div
        role="alert"
        className={`rounded-md bg-red-50 p-3 text-sm text-red-700 ${className}`}
      >
        Form verification is unavailable. <a href="tel:+19044346318" className="underline">Call (904) 434-6318</a>.
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`min-w-0 max-w-full overflow-hidden ${className}`}>
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        options={{
          action,
          theme: "auto",
          size,

          /*
           * The forms submit JSON and manually include
           * turnstileToken, so no automatic hidden input
           * is needed.
           */
          responseField: false,

          /*
           * Automatically request a new challenge when
           * the current token expires.
           */
          refreshExpired: "auto",
        }}
        onSuccess={(token) => {
          setWidgetError("");
          onTokenChange(token);
        }}
        onExpire={() => {
          clearToken();
        }}
        onError={(code) => {
          clearToken();
          setWidgetError(verificationMessage(String(code)));
          // Only a public error category and form action; never a token or key.
          console.warn("contact_verification", { code: String(code).replace(/[^0-9]/g, "").slice(0, 6), action });
        }}
      />
      {widgetError && <div role="alert" className="mt-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
        <p>{widgetError}</p>
        <div className="mt-2 flex flex-wrap gap-4">
          <button type="button" onClick={reset} className="min-h-11 underline">Retry verification</button>
          <a href="tel:+19044346318" className="inline-flex min-h-11 items-center underline">Call (904) 434-6318</a>
        </div>
      </div>}
    </div>
  );
});

TurnstileField.displayName = "TurnstileField";
