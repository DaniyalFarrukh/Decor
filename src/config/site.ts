export const siteConfig = {
  name: "Decornish",
  description: "Premium interior decor and modern furnishings.",
  url: process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://decornish.vercel.app"),
  currency: "PKR",
  currencySymbol: "Rs.",
  locale: "en-PK",
  contactEmail: "support@decornish.com",
} as const;
