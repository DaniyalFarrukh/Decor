import { siteConfig } from "@/config/site";

export function formatPrice(price: number): string {
  return `${siteConfig.currencySymbol} ${price.toLocaleString(siteConfig.locale)}`;
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString(siteConfig.locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
