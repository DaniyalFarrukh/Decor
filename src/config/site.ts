export const siteConfig = {
  name: "Decornish",
  description: "Premium interior decor and modern furnishings.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  currency: "PKR",
  currencySymbol: "Rs.",
  locale: "en-PK",
  contactEmail: "support@decornish.com",
} as const;
