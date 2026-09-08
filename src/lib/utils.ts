import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DealVerdict, Product } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers into Thai Baht string (e.g. ฿37,333)
 */
export function formatBaht(amount: number): string {
  return `฿${Math.round(amount).toLocaleString("th-TH")}`;
}

/**
 * Format raw number with comma
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("th-TH");
}

/**
 * Format compact numbers (e.g. 2.91M, 24.3K)
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Determine deal verdict based on current, lowest, average, and highest prices
 */
export function getDealVerdict(product: Product): {
  type: DealVerdict;
  label: string;
  badgeClass: string;
  textClass: string;
  detail: string;
} {
  const { currentPrice, lowestPrice, averagePrice, highestPrice, priceHistory } = product;

  if (priceHistory.length <= 1 || lowestPrice === highestPrice) {
    return {
      type: 'UNCHANGED',
      label: 'ยังไม่เคยเห็นราคาเปลี่ยน',
      badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
      textClass: 'text-slate-500',
      detail: 'ราคานี้คงที่มาตลอดตั้งแต่เริ่มบันทึก'
    };
  }

  // If current price is equal or less than all-time lowest
  if (currentPrice <= lowestPrice + 1) {
    const diffPct = Math.round(((highestPrice - currentPrice) / highestPrice) * 100);
    return {
      type: 'ALL_TIME_LOW',
      label: `✓ ถูกสุดที่เคยเจอ ${diffPct > 0 ? `−${diffPct}%` : ''}`,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
      textClass: 'text-emerald-600 font-bold',
      detail: `ราคาลงมาแตะจุดต่ำสุดเท่าที่เคยบันทึกไว้ในประวัติ (${formatBaht(lowestPrice)})`
    };
  }

  // If cheaper than average by >= 1%
  const diffFromAvg = Math.round(((currentPrice - averagePrice) / averagePrice) * 100);

  if (diffFromAvg <= -1) {
    return {
      type: 'CHEAPER_THAN_AVG',
      label: `↓ ถูกกว่าเฉลี่ย ${Math.abs(diffFromAvg)}%`,
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
      textClass: 'text-teal-600',
      detail: `ถูกกว่าราคาเฉลี่ยปกติ ${formatBaht(Math.abs(currentPrice - averagePrice))}`
    };
  }

  // If higher than average by >= 1%
  if (diffFromAvg >= 1) {
    return {
      type: 'EXPENSIVE_THAN_AVG',
      label: `↑ แพงกว่าเฉลี่ย ${diffFromAvg}%`,
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      textClass: 'text-amber-600',
      detail: `แพงกว่าราคาเฉลี่ยปกติ ${formatBaht(currentPrice - averagePrice)} — ควรรอก่อน`
    };
  }

  return {
    type: 'NORMAL_PRICE',
    label: '= ราคาปกติ',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    textClass: 'text-slate-600',
    detail: 'ราคาใกล้เคียงกับราคาเฉลี่ยที่ผ่านมา'
  };
}
