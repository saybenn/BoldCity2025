// pages/api/contact.js

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    name,
    email,
    phone,
    message,
    serviceType,
    financingInterest,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  } = req.body;

  // Basic validation for required fields
  if (!name || !phone) {
    return res
      .status(400)
      .json({ error: "Name and phone number are required." });
  }

  // Format email content
  const content = `
🚨 New Lead from BoldCityIAQ.com

👤 Contact Info
Name: ${name}
Phone: ${phone}
Email: ${email || "N/A"}

🛠️ Service Details
Service Type: ${serviceType || "N/A"}
Interested in Financing: ${financingInterest ? "Yes" : "No"}
Message: ${message || "N/A"}

📈 UTM Tracking
- Source: ${utm_source || "N/A"}
- Medium: ${utm_medium || "N/A"}
- Campaign: ${utm_campaign || "N/A"}
- Term: ${utm_term || "N/A"}
- Content: ${utm_content || "N/A"}
`;

  try {
    await sgMail.send({
      to: process.env.CONTACT_EMAIL_TO,
      from: process.env.CONTACT_EMAIL_FROM, // must be verified in SendGrid
      subject: "🚨 New Lead - Bold City IAQ",
      text: content,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
