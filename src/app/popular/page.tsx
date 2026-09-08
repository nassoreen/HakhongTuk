'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { TrendingUp, Flame, Calendar, ArrowLeft } from 'lucide-react';

export default function PopularPage() {
  const [timeWindow, setTimeWindow] = useState<'week' | 'month'>('week');

  const sortedProducts = timeWindow === 'week'
    ? PRODUCTS
    : [...PRODUCTS].reverse();

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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-shopee-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>100 อันดับยอดนิยม</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            สินค้ายอดฮิต{timeWindow === 'week' ? 'สัปดาห์นี้' : 'เดือนนี้'} 🔥
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            เรียงตามจำนวนคนที่เข้ามาดูประวัติราคาใน {timeWindow === 'week' ? '7 วันล่าสุด' : '30 วันล่าสุด'}
          </p>
        </div>

        {/* Time Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setTimeWindow('week')}
            className={`text-xs px-4 py-2 rounded-lg font-bold transition-all ${
              timeWindow === 'week'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            สัปดาห์นี้
          </button>
          <button
            onClick={() => setTimeWindow('month')}
            className={`text-xs px-4 py-2 rounded-lg font-bold transition-all ${
              timeWindow === 'month'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เดือนนี้
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product, idx) => (
          <ProductCard key={product.id} product={product} rank={idx + 1} />
        ))}
      </div>

    </div>
  );
}
