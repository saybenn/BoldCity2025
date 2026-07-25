import { useEffect, useRef, useState } from "react";
import { TurnstileField } from "@/components/forms/TurnstileField";

function cleanString(value, maxLength) {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(value) {
  if (!value || value.length > 254) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ModalContactForm({ onClose }) {
  const formRef = useRef(null);
  const turnstileRef = useRef(null);

  const [turnstileToken, setTurnstileToken] = useState("");

  const [formStartedAt, setFormStartedAt] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setFormStartedAt(new Date().toISOString());

    function handleKeyDown(event) {
      if (event.key === "Escape" && !submitting) {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, submitting]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) return;

    setError("");

    const formElement = formRef.current;

    if (!formElement?.reportValidity()) {
      return;
    }

    setSubmitting(true);

    let requestStarted = false;

    try {
      const form = new FormData(formElement);

      const name = cleanString(form.get("name"), 120);

      const email = cleanString(form.get("email"), 254).toLowerCase();

      const message = cleanString(form.get("message"), 2_000);

      const companyWebsite = cleanString(form.get("companyWebsite"), 500);

      if (name.length < 2) {
        throw new Error("Please enter your name.");
      }

      if (!isValidEmail(email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (message.length < 5) {
        throw new Error("Please enter a brief message.");
      }

      if (!turnstileToken) {
        throw new Error("Please complete the verification.");
      }

      const payload = {
        formType: "modal",
        name,
        email,
        message,

        companyWebsite,
        honeypot: companyWebsite,

        formStartedAt: formStartedAt || new Date().toISOString(),

        turnstileToken,
      };

      requestStarted = true;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok || json?.ok === false) {
        throw new Error(json?.error || "We couldn't submit the form.");
      }

      setSubmitted(true);
      formElement.reset();
    } catch (err) {
      console.error("Modal contact form error:", err);

      if (requestStarted) {
        turnstileRef.current?.reset();
      }

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && !submitting) {
      onClose?.();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-contact-heading"
      onMouseDown={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
        {submitted ? (
          <div>
            <h2
              id="modal-contact-heading"
              className="text-xl font-semibold text-navy"
            >
              Request received
            </h2>

            <p className="mt-2 text-green-700">
              Submitted! We&apos;ll be in touch.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded bg-navy px-4 py-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2
              id="modal-contact-heading"
              className="mb-4 text-xl font-semibold text-navy"
            >
              Contact Us
            </h2>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >
              <div
                className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="modal-company-website">Company website</label>

                <input
                  id="modal-company-website"
                  type="text"
                  name="companyWebsite"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-name"
                  className="mb-1 block text-sm font-medium"
                >
                  Name
                </label>

                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={120}
                  required
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email
                </label>

                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  required
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-message"
                  className="mb-1 block text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="modal-message"
                  name="message"
                  rows={4}
                  maxLength={2_000}
                  required
                  className="w-full rounded border p-2"
                />
              </div>

              <TurnstileField
                ref={turnstileRef}
                action="contact_modal"
                onTokenChange={setTurnstileToken}
                onVerificationError={setError}
              />

              <div aria-live="polite">
                {error ? (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                ) : null}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  className="rounded bg-gray-200 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting || !turnstileToken}
                  aria-busy={submitting}
                  className="rounded bg-navy px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

