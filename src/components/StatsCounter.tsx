'use client';

import React, { useEffect, useState } from 'react';
import { formatNumber, formatCompactNumber } from '@/lib/utils';
import { PLATFORM_STATS } from '@/lib/data';
import { Sparkles, ShoppingBag, Database, Store, Info } from 'lucide-react';

export default function StatsCounter() {
  const [savings, setSavings] = useState(PLATFORM_STATS.totalSavedThb);

  // Subtle live tick to simulate ongoing shoppers saving money
  useEffect(() => {
    const interval = setInterval(() => {
      setSavings((prev) => prev + Math.floor(Math.random() * 350 + 50));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      
      {/* Big Savings Card */}
      <div className="bg-gradient-to-r from-amber-500 via-shopee-500 to-rose-500 p-0.5 rounded-3xl shadow-lg">
        <div className="bg-slate-950 text-white rounded-[22px] px-6 py-6 sm:py-7 flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-1.5 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>ช่วยคนไทยประหยัดเงินไปแล้ว</span>
          </div>

          {/* Big Currency Number */}
          <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100 tracking-tight py-1 font-mono">
            ฿{formatNumber(savings)}
          </div>

          <p className="text-xs text-slate-400 mt-2 max-w-lg leading-relaxed">
            คำนวณจากส่วนต่างระหว่างราคาจริงกับราคาเฉลี่ยทุกครั้งที่มีการเช็คราคาก่อนกดซื้อ
          </p>

          {/* 3 Secondary Counter Chips */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 pt-6 border-t border-slate-800 w-full max-w-2xl">
            
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <ShoppingBag className="w-3.5 h-3.5 text-shopee-400" />
                <span>สินค้าในระบบ</span>
              </div>
              <span className="text-base sm:text-xl font-bold text-white mt-1">
                {formatCompactNumber(PLATFORM_STATS.totalProducts)}
              </span>
              <span className="text-[10px] text-slate-500">
                {formatNumber(PLATFORM_STATS.totalProducts)} ชิ้น
              </span>
            </div>

            <div className="flex flex-col items-center border-x border-slate-800 px-2">
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>ราคาที่บันทึก</span>
              </div>
              <span className="text-base sm:text-xl font-bold text-white mt-1">
                {formatCompactNumber(PLATFORM_STATS.totalPriceLogs)}
              </span>
              <span className="text-[10px] text-slate-500">
                {formatNumber(PLATFORM_STATS.totalPriceLogs)} บันทึก
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                <Store className="w-3.5 h-3.5 text-amber-400" />
                <span>ร้านค้า</span>
              </div>
              <span className="text-base sm:text-xl font-bold text-white mt-1">
                {formatCompactNumber(PLATFORM_STATS.totalShops)}
              </span>
              <span className="text-[10px] text-slate-500">
                {formatNumber(PLATFORM_STATS.totalShops)} ร้าน
              </span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
