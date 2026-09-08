import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatBaht, getDealVerdict } from '@/lib/utils';
import { findBestCoupon } from '@/lib/coupon-calculator';
import { ExternalLink, Tag, ShieldCheck, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  rank?: number;
}

export default function ProductCard({ product, rank }: ProductCardProps) {
  const verdict = getDealVerdict(product);
  const bestCoupon = findBestCoupon(product.currentPrice, product.coupons);
  const finalPrice = bestCoupon?.eligible ? bestCoupon.finalPrice : product.currentPrice;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-shopee-300 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col overflow-hidden relative">
      
      {/* Rank Badge if in Popular list */}
      {rank && (
        <div className={`absolute top-3 left-3 z-10 w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shadow-md ${
          rank === 1 ? 'bg-amber-400 text-slate-900 ring-2 ring-amber-300' :
          rank === 2 ? 'bg-slate-300 text-slate-800' :
          rank === 3 ? 'bg-amber-700 text-white' :
          'bg-slate-900/80 text-white'
        }`}>
          {rank}
        </div>
      )}

      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block relative aspect-square bg-slate-50 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        
        {/* Mall / Preferred Shop Badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1">
          {product.shop.isMall && (
            <span className="bg-shopee-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> Mall
            </span>
          )}
          {product.shop.isPreferred && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              ร้านแนะนำ
            </span>
          )}
        </div>
      </Link>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Shop Name */}
          <div className="text-xs text-slate-400 font-medium mb-1 truncate">
            {product.shop.name}
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 group-hover:text-shopee-600 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Deal Stats */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          
          {/* Main Price Display */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tight">
              {formatBaht(finalPrice)}
            </span>
            {product.originalPrice > finalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatBaht(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Coupon Highlight if available */}
          {bestCoupon?.eligible && (
            <div className="flex items-center gap-1 text-[11px] text-shopee-600 font-medium bg-shopee-50 px-2 py-1 rounded-md">
              <Tag className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                หลังใช้โค้ดลด {formatBaht(bestCoupon.discountAmount)}
              </span>
            </div>
          )}

          {/* Deal Verdict Tag */}
          <div className="flex items-center justify-between pt-1">
            <span className={`text-[11px] px-2 py-0.5 rounded-full border ${verdict.badgeClass}`}>
              {verdict.label}
            </span>

            <Link
              href={`/products/${product.id}`}
              className="text-xs font-semibold text-shopee-600 hover:text-shopee-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
            >
              <span>ดูกราฟ</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
