"use client";

import { useEffect, useState } from "react";
import { getUTMParams } from "@/lib/utm";
import { formSubmitEvent } from "@/lib/gtm";

const initialState = {
  name: "",
  email: "",
  message: "",
  financing: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
};

export default function StandardContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const utms = getUTMParams();
    setFormData((prev) => ({ ...prev, ...utms }));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        let message = "Submission failed.";
        try {
          const errorData = await res.json();
          message = errorData.error || message;
        } catch {}
        throw new Error(message);
      }

      formSubmitEvent({
        formType: "ad",
        financingInterest: formData.financing || "unspecified",
        utm_source: formData.utm_source || "",
        utm_medium: formData.utm_medium || "",
        utm_campaign: formData.utm_campaign || "",
        utm_term: formData.utm_term || "",
        utm_content: formData.utm_content || "",
      });

      const utms = getUTMParams();

      setSubmitted(true);
      setFormData({
        ...initialState,
        ...utms,
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-100 p-6 text-green-800 shadow-md">
        <h2 className="text-2xl font-heading font-bold">Request received</h2>
        <p className="mt-2 text-base leading-7">
          Thanks. A member of the team will follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl bg-white p-6 shadow-xl sm:p-8"
    >
      <h2 className="text-3xl font-heading font-bold text-darkText sm:text-4xl">
        Talk to Our Restoration Team
      </h2>
      <p className="mt-3 text-base leading-7 text-gray-600">
        Tell us what happened and how to reach you. Emergency requests can also
        call directly for faster response.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Your name"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            What happened?
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            placeholder="Water leak, visible mold, storm damage, smoke issue, or other restoration need"
            onChange={handleChange}
            className="min-h-[140px] w-full rounded-lg border border-gray-300 px-4 py-3 text-darkText outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/20"
            required
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-gray-800">
            Interested in financing options?
          </span>
          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="radio"
                name="financing"
                value="Yes"
                checked={formData.financing === "Yes"}
                onChange={handleChange}
                className="border-gray-300 text-aqua focus:ring-aqua"
              />
              <span className="ml-2">Yes</span>
            </label>

            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="radio"
                name="financing"
                value="No"
                checked={formData.financing === "No"}
                onChange={handleChange}
                className="border-gray-300 text-aqua focus:ring-aqua"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <input type="hidden" name="utm_source" value={formData.utm_source} />
        <input type="hidden" name="utm_medium" value={formData.utm_medium} />
        <input
          type="hidden"
          name="utm_campaign"
          value={formData.utm_campaign}
        />
        <input type="hidden" name="utm_term" value={formData.utm_term} />
        <input type="hidden" name="utm_content" value={formData.utm_content} />

        {error ? (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-navy px-6 py-3 font-semibold text-white transition hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Request Service"}
        </button>
      </div>
    </form>
  );
}

