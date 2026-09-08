'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { formatBaht, getDealVerdict } from '@/lib/utils';
import PriceChart from '@/components/PriceChart';
import CouponCalculator from '@/components/CouponCalculator';
import ProductCard from '@/components/ProductCard';
import ShareModal from '@/components/ShareModal';
import { 
  ArrowLeft, 
  ExternalLink, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Store, 
  TrendingDown, 
  Bell, 
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const verdict = getDealVerdict(product);

  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const sameShopProducts = PRODUCTS.filter(
    (p) => p.shop.id === product.shop.id && p.id !== product.id
  );

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setAlertSuccess(true);
      setTimeout(() => setAlertSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Breadcrumb & Share Actions */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/"
          className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับหน้าแรก</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{isFavorite ? 'กำลังติดตามราคา' : 'เฝ้าราคา'}</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>แชร์</span>
          </button>
        </div>
      </div>

      {/* Alert toast if favorite toggled */}
      {alertSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>เพิ่มลงในรายการติดตามแล้ว! เราจะแจ้งเตือนเมื่อราคาสินค้านี้ลดลงถึงจุดต่ำสุด</span>
          </div>
        </div>
      )}

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Product Image & Store Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card relative aspect-square flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
            {product.shop.isMall && (
              <span className="absolute top-4 left-4 bg-shopee-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Shopee Mall
              </span>
            )}
          </div>

          {/* Shop Card */}
          <Link
            href={`/shops/${product.shop.id}`}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-card hover:border-shopee-300 transition-all flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.shop.avatarUrl}
                alt={product.shop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs text-slate-400 font-medium">ร้านค้าบน Shopee</span>
              <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-shopee-600">
                {product.shop.name}
              </h4>
              <div className="text-[11px] text-slate-500">
                ⭐ {product.shop.ratingStar} · {product.shop.totalTrackedProducts.toLocaleString()} สินค้าที่บันทึก
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-shopee-600 flex-shrink-0" />
          </Link>
        </div>

        {/* Right: Product Pricing, Verdict & Primary Buy Button */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
              <span className="text-xs text-slate-400">
                อัปเดตราคาล่าสุด: {product.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Deal Verdict Highlight Banner */}
          <div className={`p-4 rounded-2xl border ${verdict.badgeClass} flex items-start gap-3`}>
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-extrabold text-sm sm:text-base">
                {verdict.label}
              </div>
              <div className="text-xs sm:text-sm mt-0.5 opacity-90 leading-relaxed">
                {verdict.detail}
              </div>
            </div>
          </div>

          {/* Price Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
            
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">
                  ราคาล่าสุดหน้าร้าน
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    {formatBaht(product.currentPrice)}
                  </span>
                  {product.originalPrice > product.currentPrice && (
                    <span className="text-base text-slate-400 line-through">
                      {formatBaht(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice > product.currentPrice && (
                    <span className="text-xs bg-rose-50 text-rose-700 border border-rose-200 font-bold px-2 py-0.5 rounded-full">
                      ประหยัด {formatBaht(product.originalPrice - product.currentPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Price Stats Micro Badge */}
              <div className="text-right text-xs text-slate-500">
                <div>เคยลงต่ำสุดถึง <strong className="text-emerald-700">{formatBaht(product.lowestPrice)}</strong></div>
                <div>ราคาเฉลี่ยปกติ <strong>{formatBaht(product.averagePrice)}</strong></div>
              </div>
            </div>

            {/* Main Outbound Affiliate Action */}
            <div className="pt-2">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-shopee-500 hover:bg-shopee-600 active:scale-[0.99] text-white font-extrabold text-base sm:text-lg py-4 px-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>ดูสินค้าและสั่งซื้อบน Shopee ↗</span>
              </a>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                * ลิงก์พันธมิตร Shopee — คุณจ่ายราคาเท่าเดิมทุกบาท ไม่มีการคิดเงินเพิ่ม
              </p>
            </div>

          </div>

          {/* Coupon Calculator Section */}
          <CouponCalculator
            basePrice={product.currentPrice}
            coupons={product.coupons}
            affiliateUrl={product.affiliateUrl}
          />

        </div>

      </div>

      {/* Historical Price Chart */}
      <section className="pt-6" id="price-history">
        <PriceChart
          data={product.priceHistory}
          lowestPrice={product.lowestPrice}
          averagePrice={product.averagePrice}
          highestPrice={product.highestPrice}
          currentPrice={product.currentPrice}
        />
      </section>

      {/* Similar items in same shop */}
      {sameShopProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold text-slate-900 text-xl">
              สินค้าอื่นใน {product.shop.name}
            </h3>
            <Link
              href={`/shops/${product.shop.id}`}
              className="text-xs sm:text-sm font-bold text-shopee-600 hover:text-shopee-700"
            >
              ดูทั้งร้าน ({product.shop.totalTrackedProducts.toLocaleString()} รายการ) →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sameShopProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Share Modal Dialog */}
      <ShareModal
        product={product}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

    </div>
  );
}
