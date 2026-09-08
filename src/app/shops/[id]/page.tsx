'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SHOPS, PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, ShieldCheck, Store, ExternalLink } from 'lucide-react';

export default function ShopDetailPage() {
  const params = useParams();
  const shopId = params.id as string;

  const shop = Object.values(SHOPS).find((s) => s.id === shopId) || SHOPS.apple;
  const shopProducts = PRODUCTS.filter((p) => p.shop.id === shop.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <Link
        href="/shops"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับหน้ารวมร้านค้า</span>
      </Link>

      {/* Shop Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shop.avatarUrl}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {shop.isMall && (
                <span className="bg-shopee-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-xs">
                  Shopee Mall
                </span>
              )}
              {shop.isPreferred && (
                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-xs">
                  ร้านแนะนำ
                </span>
              )}
              <span className="text-xs text-slate-500 font-medium">
                ⭐ {shop.ratingStar} คะแนนร้านค้า
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {shop.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              อัปเดตราคาล่าสุด: {shop.lastUpdated} · สินค้าที่มีประวัติราคา {shop.totalTrackedProducts.toLocaleString()} ชิ้น
            </p>
          </div>
        </div>

        {/* Shopee Store Link */}
        <a
          href={`https://shopee.co.th/${shop.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-shopee-500 hover:bg-shopee-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 self-stretch sm:self-auto justify-center"
        >
          <span>ไปที่หน้าร้าน Shopee</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Shop Products Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-900">
            สินค้าของร้านนี้ที่มีประวัติราคาย้อนหลัง ({shopProducts.length})
          </h2>
          <span className="text-xs text-emerald-700 bg-emerald-50 font-bold px-3 py-1 rounded-full border border-emerald-200">
            ↓ ถูกกว่าปกติ {shop.discountedProductsCount} ชิ้น
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {shopProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}
