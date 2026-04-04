export interface Currency {
  code: string;
  symbol: string;
  name: string;
  nameKey: string;
}

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", nameKey: "usd_name" },
  { code: "LKR", symbol: "රු ", name: "Sri Lankan Rupee", nameKey: "lkr_name" },
  { code: "EUR", symbol: "€", name: "Euro", nameKey: "eur_name" },
  { code: "GBP", symbol: "£", name: "British Pound", nameKey: "gbp_name" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", nameKey: "inr_name" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", nameKey: "jpy_name" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", nameKey: "aud_name" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", nameKey: "cad_name" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", nameKey: "sgd_name" },
  { code: "AED", symbol: "DH ", name: "UAE Dirham", nameKey: "aed_name" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", nameKey: "cny_name" },
];

/** Mocked exchange rates relative to 1 USD */
export const exchangeRates: Record<string, number> = {
  USD: 1,
  LKR: 300, // Approximate for demo
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 151.0,
  AUD: 1.54,
  CAD: 1.36,
  SGD: 1.35,
  AED: 3.67,
  CNY: 7.23,
};

/** Convert price from USD based on active currency */
export function convertPrice(priceInUsd: number, targetCurrency: string): number {
  const rate = exchangeRates[targetCurrency] || 1;
  return priceInUsd * rate;
}

/** Format price with correct symbol and decimals */
export function formatCurrency(price: number, currencyCode: string): string {
  const currency = currencies.find((c) => c.code === currencyCode) || currencies[0];
  const formattedPrice = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${currency.symbol}${formattedPrice}`;
}
