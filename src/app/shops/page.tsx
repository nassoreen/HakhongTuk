'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SHOPS } from '@/lib/data';
import { Store, ShieldCheck, Search, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ShopsPage() {
  const [filterType, setFilterType] = useState<'all' | 'mall' | 'preferred'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const shopList = Object.values(SHOPS).filter((shop) => {
    const matchesFilter =
      filterType === 'all'
        ? true
        : filterType === 'mall'
        ? shop.isMall
        : shop.isPreferred;

    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.username.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับหน้าแรก</span>
      </Link>

      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Store className="w-4 h-4" />
          <span>รายชื่อร้านค้าที่มีประวัติราคาย้อนหลังในระบบ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          ร้านค้าทั้งหมด 🏬
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          กว่า 24,318 ร้านค้าบน Shopee ที่มีการบันทึกราคาสินค้าทุกวัน
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search inside shops */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อร้านค้า..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-shopee-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setFilterType('mall')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              filterType === 'mall'
                ? 'bg-shopee-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Shopee Mall
          </button>
          <button
            onClick={() => setFilterType('preferred')}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterType === 'preferred'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ร้านแนะนำ
          </button>
        </div>

      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopList.map((shop) => (
          <Link
            key={shop.id}
            href={`/shops/${shop.id}`}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-shopee-300 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shop.avatarUrl}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  {shop.isMall && (
                    <span className="bg-shopee-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Mall
                    </span>
                  )}
                  {shop.isPreferred && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ร้านแนะนำ
                    </span>
                  )}
                  <span className="text-xs text-slate-400 ml-auto font-medium">
                    ⭐ {shop.ratingStar}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-shopee-600 truncate">
                  {shop.name}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  @{shop.username}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-slate-500">
                <strong>{shop.totalTrackedProducts.toLocaleString()}</strong> สินค้าที่มีประวัติ
              </div>
              <div className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                ↓ ถูกกว่าปกติ {shop.discountedProductsCount.toLocaleString()} ชิ้น
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
