"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

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

const VERIFICATION_ERROR = "Verification failed. Please try again.";

export const TurnstileField = forwardRef<
  TurnstileFieldHandle,
  TurnstileFieldProps
>(function TurnstileField(
  { action, onTokenChange, onVerificationError, className = "" },
  forwardedRef,
) {
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  function clearToken() {
    onTokenChange("");
  }

  function reset() {
    clearToken();
    turnstileRef.current?.reset();
  }

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
    [onTokenChange],
  );

  if (!siteKey) {
    return (
      <div
        role="alert"
        className={`rounded-md bg-red-50 p-3 text-sm text-red-700 ${className}`}
      >
        Form verification is unavailable.
      </div>
    );
  }

  return (
    <div className={className}>
      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        options={{
          action,
          theme: "auto",
          size: "flexible",

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
          onTokenChange(token);
          onVerificationError?.("");
        }}
        onExpire={() => {
          clearToken();
        }}
        onError={() => {
          clearToken();
          onVerificationError?.(VERIFICATION_ERROR);
        }}
      />
    </div>
  );
});

TurnstileField.displayName = "TurnstileField";
