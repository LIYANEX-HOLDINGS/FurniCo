"use client"
import { useAppStore } from "@/store/appStore";
import { convertPrice, formatCurrency } from "@/lib/currency";

interface PriceProps {
  amount: number;
  className?: string;
  showSymbol?: boolean;
}

export function Price({ amount, className, showSymbol = true }: PriceProps) {
  const { currency } = useAppStore();
  
  const converted = convertPrice(amount, currency);
  const formatted = formatCurrency(converted, currency);

  return (
    <span className={className}>
      {formatted}
    </span>
  );
}
