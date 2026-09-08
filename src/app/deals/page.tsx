'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Flame, Filter, Sparkles, ArrowDownRight, Tag } from 'lucide-react';

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [minDiscountPct, setMinDiscountPct] = useState<number>(0);

  const categories = ['ทั้งหมด', 'สมาร์ทโฟน', 'เกมและคอนโซล', 'คอมพิวเตอร์', 'สมาร์ทวอทช์', 'ความงามและของใช้ส่วนตัว', 'หูฟัง'];

  const dealProducts = PRODUCTS.filter((p) => {
    const categoryMatch = selectedCategory === 'ทั้งหมด' || p.category === selectedCategory;
    const discountMatch = Math.abs(p.discountFromAveragePercent) >= minDiscountPct;
    return categoryMatch && discountMatch && (p.isHotDeal || p.discountFromAveragePercent < 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-shopee-600 to-amber-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>ลดจริงเทียบประวัติราคาย้อนหลัง</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            ดีลไฟไหม้ 🔥
          </h1>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            รวมสินค้าที่ราคาเพิ่งปรับลดลงต่ำกว่าราคาเฉลี่ยจริงในอดีต กรองป้ายลดราคาหลอกตาออกทั้งหมด เหลือแต่ของที่คุ้มค่าแก่การสั่งซื้อจริง
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-card flex flex-wrap items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-shopee-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Min Discount Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Filter className="w-4 h-4 text-slate-400" />
          <span>ลดขั้นต่ำ:</span>
          <select
            value={minDiscountPct}
            onChange={(e) => setMinDiscountPct(Number(e.target.value))}
            className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none"
          >
            <option value={0}>ทุกส่วนลด</option>
            <option value={5}>ลด 5% ขึ้นไป</option>
            <option value={10}>ลด 10% ขึ้นไป</option>
            <option value={20}>ลด 20% ขึ้นไป</option>
          </select>
        </div>

      </div>

      {/* Deals Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>พบสินค้าดีลคุ้ม {dealProducts.length} รายการ</span>
        <span>จัดอันดับตามเปอร์เซ็นต์ส่วนลดจริง</span>
      </div>

      {/* Deals Grid */}
      {dealProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Tag className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900">ไม่พบสินค้าในหมวดหมู่นี้</h3>
          <p className="text-xs text-slate-500">
            ลองปรับเปลี่ยนตัวกรอง หรือค้นหาสินค้าจากช่องค้นหาด้านบน
          </p>
        </div>
      )}

    </div>
  );
}
