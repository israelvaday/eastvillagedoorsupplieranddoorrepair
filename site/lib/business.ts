// Single source of truth for NAP, hours, insurance wording, and links.
export const BIZ = {
  name: "East Village Door Supplier and Door Repair",
  legalName: "East Village Door Supplier and Door Repair",
  tagline: "Premium Door Supply, Installation & Structural Repair — East Village & NYC",
  phone: "(212) 505-8847",
  phoneE164: "+12125058847",
  phoneHref: "tel:+12125058847",
  smsHref: "sms:+12125058847",
  email: "info@eastvillagedoorsupplieranddoorrepair.com",
  emailHref: "mailto:info@eastvillagedoorsupplieranddoorrepair.com",
  /** Routed via Cloudflare Email Routing → your personal inbox (see Cloudflare dashboard). */
  quotesEmail: "quotes@eastvillagedoorsupplieranddoorrepair.com",
  /** Quote form notifications (Railway + Resend). Override with QUOTE_TO_EMAIL env (comma-separated). */
  quoteNotifyEmails: ["israelvaday97@gmail.com", "oren.siyonov@gmail.com"],
  /** Compatibility field for existing trust components; no license is asserted. */
  licenseId: "Insured",
  /** Legacy compatibility field used by existing templates. */
  bsis: "Insured",
  url: "https://eastvillagedoorsupplieranddoorrepair.com",
  address: {
    street: "99 Loisaida Ave",
    locality: "New York",
    region: "NY",
    postalCode: "10009",
    country: "US",
    full: "99 Loisaida Ave, New York, NY 10009",
  },
  geo: { lat: 40.7235, lng: -73.977 },
  /** East Village HQ — Manhattan, Brooklyn, and Lower Manhattan service radius */
  metroBounds: {
    minLat: 40.55,
    maxLat: 40.88,
    minLng: -74.05,
    maxLng: -73.75,
  },
  /** Default embed map center (NYC view from East Village HQ) */
  metroMap: { lat: 40.7235, lng: -73.977, zoom: 12 },
  hours247: false,
  hours: [
    { day: 0, open: "00:00", close: "00:00", label: "Sunday", closed: true },
    { day: 1, open: "07:00", close: "18:00", label: "Monday" },
    { day: 2, open: "07:00", close: "18:00", label: "Tuesday" },
    { day: 3, open: "07:00", close: "18:00", label: "Wednesday" },
    { day: 4, open: "07:00", close: "18:00", label: "Thursday" },
    { day: 5, open: "07:00", close: "18:00", label: "Friday" },
    { day: 6, open: "08:00", close: "14:00", label: "Saturday" },
  ] as const,
  social: {
    google: "",
    yelp: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  },
};
