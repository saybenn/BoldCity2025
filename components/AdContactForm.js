"use client";

import { useState, useEffect } from "react";
import { getUTMParams } from "@/lib/utm";

export default function AdContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    financing: false,
    message: "",
    ...getUTMParams(),
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed.");
      formSubmitEvent({
        formType: "ad",
        financingInterest: formData.financing,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-heading text-navy mb-2">Thank You!</h2>
        <p className="text-darkText">
          Your request has been received. We&apos;ll contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-heading text-navy mb-4">
        Request Emergency Help
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Phone
        </label>
        <input
          required
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium">
          Service Needed
        </label>
        <select
          required
          name="service"
          id="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2"
        >
          <option value="">Select One</option>
          <option>Water Damage Restoration</option>
          <option>Mold Remediation</option>
          <option>Emergency Extraction</option>
          <option>Storm & Flood Cleanup</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Additional Message (optional)
        </label>
        <textarea
          name="message"
          id="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="financing"
          id="financing"
          checked={formData.financing}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label htmlFor="financing" className="text-sm">
          I&apos;m interested in financing options
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green hover:bg-green-dark text-white py-2 px-4 rounded-md transition"
      >
        {submitting ? "Submitting..." : "Request My Free Estimate"}
      </button>
    </form>
  );
}
