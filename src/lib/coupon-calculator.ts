import { Coupon } from "@/types";

export interface CouponCalculationResult {
  coupon: Coupon;
  eligible: boolean;
  reason?: string;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  savedPercentage: number;
  hitMaxCap: boolean;
}

/**
 * Calculates the exact price after applying a Shopee voucher.
 * Implements real-world voucher mechanics:
 * 1. Checks minimum spend threshold
 * 2. Calculates percentage or fixed discount
 * 3. Enforces maximum discount cap
 */
export function calculateCouponDiscount(
  itemPrice: number,
  coupon: Coupon
): CouponCalculationResult {
  if (itemPrice < coupon.minSpend) {
    return {
      coupon,
      eligible: false,
      reason: `ยอดสั่งซื้อขั้นต่ำ ${coupon.minSpend.toLocaleString('th-TH')} บาท`,
      originalPrice: itemPrice,
      discountAmount: 0,
      finalPrice: itemPrice,
      savedPercentage: 0,
      hitMaxCap: false,
    };
  }

  let discount = 0;
  let hitMaxCap = false;

  if (coupon.discountType === 'PERCENT') {
    discount = (itemPrice * coupon.value) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
      hitMaxCap = true;
    }
  } else {
    discount = coupon.value;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
      hitMaxCap = true;
    }
  }

  // Discount cannot exceed item price
  discount = Math.min(discount, itemPrice);
  const finalPrice = Math.max(0, itemPrice - discount);
  const savedPercentage = itemPrice > 0 ? Math.round((discount / itemPrice) * 100) : 0;

  return {
    coupon,
    eligible: true,
    originalPrice: itemPrice,
    discountAmount: discount,
    finalPrice,
    savedPercentage,
    hitMaxCap,
  };
}

/**
 * Find the best coupon for a given item price
 */
export function findBestCoupon(itemPrice: number, coupons: Coupon[]): CouponCalculationResult | null {
  if (!coupons || coupons.length === 0) return null;

  const validResults = coupons
    .map(c => calculateCouponDiscount(itemPrice, c))
    .filter(r => r.eligible)
    .sort((a, b) => b.discountAmount - a.discountAmount);

  return validResults.length > 0 ? validResults[0] : null;
}
