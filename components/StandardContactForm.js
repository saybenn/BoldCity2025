import { useState, useEffect } from "react";
import { getUTMParams } from "@/lib/utm";
import { formSubmitEvent } from "@/lib/gtm";

export default function StandardContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    financing: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const utms = getUTMParams();
    setFormData((prev) => ({ ...prev, ...utms }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Submission failed.");
    }
    formSubmitEvent({ formType: "ad", financingInterest: formData.financing });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-100 text-green-800 rounded-xl shadow-md">
        Thanks! We'll be in touch shortly.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white dark:bg-darkText rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 ease-in-out"
    >
      <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-100 dark:text-dark mb-4 drop-shadow-sm">
        Talk To Our Certified Restoration Team
      </h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          required
        />
      </div>
      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy min-h-[120px]"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-lightText mb-2">
          Are you interested in financing options?
        </label>
        <div className="flex gap-6">
          <label className="inline-flex items-center text-sm">
            <input
              type="radio"
              name="financing"
              value="Yes"
              checked={formData.financing === "Yes"}
              onChange={handleChange}
              className="text-green focus:ring-green border-gray-300"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center text-sm">
            <input
              type="radio"
              name="financing"
              value="No"
              checked={formData.financing === "No"}
              onChange={handleChange}
              className="text-green focus:ring-green border-gray-300"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      {/* Hidden UTM Fields */}
      <input type="hidden" name="utm_source" value={formData.utm_source} />
      <input type="hidden" name="utm_medium" value={formData.utm_medium} />
      <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />
      <input type="hidden" name="utm_term" value={formData.utm_term} />
      <input type="hidden" name="utm_content" value={formData.utm_content} />

      <button
        type="submit"
        className="w-full py-3 bg-navy text-white rounded-lg font-semibold hover:bg-navy-dark transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
}

