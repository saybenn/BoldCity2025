export const adLandingPageData = {
  id: "boldcity-emergency-ads",
  route: "/ads/emergency-restoration",
  meta: {
    title: "24/7 Emergency Restoration Jacksonville FL | Bold City IAQ",
    description:
      "On our way in 2 hours or less. Water, fire, mold & storm damage cleanup with direct insurance billing and flexible financing. Call now for 24/7 help.",
    canonical: "https://www.boldcityiaq.com/ads/emergency-restoration",
    og: {
      title: "Emergency Restoration • 24/7 • Jacksonville, FL",
      description:
        "Live answer 24/7. Board-up, tarping, water removal, fire/smoke cleanup, mold mitigation. Financing available. Call now.",
      image: "/images/ads/emergencyHero.webp",
    },
  },
  settings: {
    stickyCTA: {
      enabled: true,
      mobileOnly: true,
      primaryLabel: "Call Now",
      primaryHref: "tel:19044346318",
      secondaryLabel: "Get Financing",
      secondaryHref: "#finance",
    },
    hideGlobalNav: true,
    trackUTM: true,
  },
  hero: {
    heading: "24/7 Emergency Restoration",
    highlight: "On Our Way in 2 Hours or Less",
    subheading:
      "Water • Fire • Mold • Storm — Certified cleanup, rapid stabilization, and full restoration.",
    financeBadge: {
      label: "No Upfront Cost • Flexible Financing",
      sublabel: "We bill insurance directly for covered losses",
    },
    ctas: [
      {
        label: "Call Now (904) 434-6318",
        href: "tel:19044346318",
        variant: "primary",
      },
      {
        label: "Request Emergency Service",
        href: "#lead-form",
        variant: "secondary",
      },
      { label: "Get Financing", href: "#finance", variant: "ghost" },
    ],
    bullets: [
      "Live Answer 24/7",
      "IICRC & NORMI Certified",
      "Insurance-Ready Documentation",
      "Locally Owned & Operated",
    ],
    image: "/images/ads/emergencyHero.webp",
    trustBadgesInline: true,
  },
  trustBar: {
    heading: "Trusted by Northeast Florida Property Owners",
    badges: [
      { name: "IICRC Certified", image: "/images/iicrc-certified.webp" },
      { name: "NORMI Certified", image: "/images/normilogo.png" },
      {
        name: "Google Reviews ★★★★★",
        image: "/images/5-star-google.png",
      },
      //   {
      //     name: "Local Business Award",
      //     image: "/images/badges/local-award.webp",
      //   },
    ],
    testimonial: {
      quote:
        "I highly recommend Andre and his team. After they did the mold remediation on my home we were able to move home and my daughter has recovered from mold toxicity. He is an expert on the subject, shows up on time and as promised, and his team does an excellent job. He came recommended from another person in the Jacksonville area and I'm so glad to have found them!",
      author: "Charlotte Baker, Jacksonville",
      avatar: "/images/ads/avatar.png",
    },
    subtext:
      "Locally Owned & Operated — Serving Jacksonville & NE Florida Since 2012",
  },
  urgency: {
    heading: "Why You Need Fast Action",
    bullets: [
      "Mold can begin within 24–48 hours in wet materials",
      "Openings invite wind, rain, and intruders",
      "Soot residues damage finishes the longer they sit",
      "Rapid stabilization reduces total repair costs",
    ],
    miniCTA: {
      label: "Call Now — Technicians Standing By",
      href: "tel:19044346318",
    },
  },
  services: {
    heading: "Emergency Services We Provide",
    items: [
      {
        icon: "water",
        title: "Water Removal & Drying",
        text: "High-capacity extraction, structural drying, and moisture monitoring to stop secondary damage.",
        href: "/services/water-damage-restoration",
      },
      {
        icon: "fire",
        title: "Fire & Smoke Cleanup",
        text: "Soot removal, deodorization, HVAC protection, and full rebuilds with insurance coordination.",
        href: "/services/fire-and-smoke-restoration",
      },
      {
        icon: "mold",
        title: "Mold Remediation",
        text: "Containment, HEPA filtration, and safe remediation to protect health and indoor air quality.",
        href: "/services/mold-remediation",
      },
      {
        icon: "storm",
        title: "Storm & Hurricane",
        text: "Emergency board-up, roof tarping, debris removal, and rapid stabilization after severe weather.",
        href: "/services/emergency-services",
      },
      {
        icon: "clean",
        title: "Cleaning & Sanitization",
        text: "Deep cleaning, disinfection, and odor control for contents and structures after any loss.",
        href: "/services/cleaning-and-sanitization",
      },
    ],
  },
  finance: {
    id: "finance",
    heading: "Get Emergency Help Now — Pay Later",
    bullets: [
      "0% APR promotional plans for qualified homeowners",
      "No upfront payment required to start work",
      "We bill your insurance directly for covered losses",
      "Flexible options for uncovered damage",
    ],
    cta: { label: "Check Financing Options", href: "#lead-form" },
    image: "/images/ads/finance.png",
    faq: [
      {
        q: "Can you start work before insurance pays?",
        a: "Yes. We can begin immediately and bill your carrier directly when applicable. We also offer financing for uncovered items so you’re not delayed.",
      },
      {
        q: "Will applying for financing hurt my credit?",
        a: "Most providers use a soft credit check for pre-qualification, which does not impact your credit score.",
      },
    ],
  },
  process: {
    heading: "How It Works",
    steps: [
      {
        head: "Call Us 24/7",
        tail: "Speak to a live expert and get an immediate ETA.",
      },
      {
        head: "On-Site in ≤ 2 Hours",
        tail: "We secure openings, extract water, and stabilize conditions.",
      },
      {
        head: "Clean, Repair & Restore",
        tail: "From mitigation to rebuilds, we handle everything.",
      },
      {
        head: "Insurance Coordination",
        tail: "Detailed photos, moisture logs, and estimates for your claim.",
      },
    ],
    image: "/images/ads/process-emergency.webp",
  },
  testimonials: {
    heading: "What Homeowners Are Saying",
    list: [
      {
        quote:
          "Andre and his company was awesome. They were quick to come over and diagnose the issue and remediate the mold. Will definitely use them again if I have more issues..",
        author: "Ryan Patton",
      },
      {
        quote:
          "I can't recommend Andre and his team enough. Andre is extremely knowlegable and caring in his approach. I really appreciate a professional that takes the time to listen and cares enough to explain the entire process patiently. If you want to be in good hands, don't hesitate to count on Bold City IAQ!!",
        author: "Alvaro Zuluaga",
      },
      {
        quote:
          "We had an interior leak from the second floor to the ground floor that caused some major damage and mold growth. A good friend of mine recommended Bold city Indoor air quality to us. From the time we made our appointment, we were treated with the upmost professional customer service from beginning to the end with this company. The man who came to give the estimate and later performed the work was totally awesome, he arrived on time and after his inspection he explained to us in detail what to expect and provided a time-line for each service that we needed in order to get things back to normal in my house. ",
        author: "Pharisha Banks",
      },
    ],
  },
  serviceAreas: {
    heading: "Proudly Serving Jacksonville & Northeast Florida",
    text: "We’re local and ready 24/7 across the metro and surrounding counties.",
    areas: [
      "Jacksonville, FL",
      "Orange Park, FL",
      "St. Augustine, FL",
      "Ponte Vedra, FL",
      "Fleming Island, FL",
      "Baldwin, FL",
      "Beaches (Atlantic, Neptune, Jacksonville Beach)",
      "Argyle Forest, FL",
      "Oakleaf Plantation, FL",
      "Duval County, FL",
      "Clay County, FL",
      "Flagler County, FL",
    ],
    mapImage: "/images/ads/map.png",
  },
  leadForm: {
    id: "lead-form",
    heading: "Request Emergency Service",
    subheading:
      "Complete this short form and we’ll call you right away. For fastest help, call now.",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      {
        name: "service",
        label: "Service Needed",
        type: "select",
        options: [
          "Water",
          "Fire/Smoke",
          "Mold",
          "Storm",
          "Cleaning/Sanitization",
        ],
        required: true,
      },
      { name: "zip", label: "ZIP Code", type: "text", required: true },
      {
        name: "notes",
        label: "Brief Description (Optional)",
        type: "textarea",
      },
      { name: "utm_source", type: "hidden" },
      { name: "utm_campaign", type: "hidden" },
      { name: "utm_term", type: "hidden" },
    ],
    consentText:
      "By submitting, you agree to be contacted by Bold City IAQ via phone, text, or email regarding your request.",
    submit: { label: "Get Immediate Help", variant: "primary" },
    altCTA: { label: "Or Call Now (904) 434-6318", href: "tel:19044346318" },
  },
  closingCTA: {
    heading: "Don’t Wait — Every Minute Matters",
    subheading:
      "Call now for 24/7 emergency help. We’ll secure your property and start restoration immediately.",
    ctas: [
      {
        label: "Call Now (904) 434-6318",
        href: "tel:19044346318",
        variant: "primary",
      },
      {
        label: "Request Emergency Service",
        href: "#lead-form",
        variant: "secondary",
      },
    ],
  },
};
