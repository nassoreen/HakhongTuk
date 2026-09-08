export interface PricePoint {
  date: string;       // e.g. "2026-08-15" or formatted "15 ส.ค. 69"
  price: number;      // recorded THB
  originalPrice?: number;
  note?: string;      // e.g. "โปร 8.8", "Mid Month", "PayDay", "9.9"
}

export interface Coupon {
  id: string;
  name: string;
  code?: string;
  discountType: 'PERCENT' | 'FIXED';
  value: number;        // e.g. 17 (%) or 1000 (THB)
  minSpend: number;     // e.g. 10000
  maxDiscount?: number; // e.g. 10000
  isVip?: boolean;
  tag?: string;         // e.g. "โค้ดลดคุ้ม", "VIP Exclusive", "Double Day"
  affiliateUrl?: string;
}

export interface Shop {
  id: string;
  shopeeShopId: string;
  name: string;
  username: string;
  avatarUrl: string;
  isMall: boolean;
  isPreferred: boolean;
  ratingStar: number;
  followerCount?: number;
  totalTrackedProducts: number;
  discountedProductsCount: number;
  lastUpdated: string;
}

export interface Product {
  id: string;
  shopeeItemId: string;
  shopeeShopId: string;
  name: string;
  slug: string;
  imageUrl: string;
  category: string;
  shop: Shop;
  currentPrice: number;
  originalPrice: number;
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  discountFromAveragePercent: number; // negative means cheaper than average e.g. -12%
  lowestPriceDate?: string;
  lastUpdated: string;
  priceHistoryCount: number;
  priceHistory: PricePoint[];
  coupons: Coupon[];
  shopeeUrl: string;
  affiliateUrl: string;
  viewCount: number;
  clickCount: number;
  isHotDeal?: boolean;
}

export type DealVerdict = 
  | 'ALL_TIME_LOW'     // ✓ ถูกสุดที่เคยเจอ
  | 'CHEAPER_THAN_AVG' // ↓ ถูกกว่าเฉลี่ย
  | 'EXPENSIVE_THAN_AVG' // ↑ แพงกว่าเฉลี่ย
  | 'NORMAL_PRICE'     // = ราคาปกติ
  | 'UNCHANGED';       // ยังไม่เคยเห็นราคาเปลี่ยน

export interface Article {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  content: string[];
}
