'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import ProductCard from '@/components/ProductCard';
import StatsCounter from '@/components/StatsCounter';
import { PRODUCTS, SHOPS, ARTICLES } from '@/lib/data';
import { 
  Flame, 
  TrendingUp, 
  Store, 
  ShieldCheck, 
  History, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Tag
} from 'lucide-react';

export default function HomePage() {
  const [popularTab, setPopularTab] = useState<'7d' | '30d'>('7d');

  const popularProducts = popularTab === '7d' 
    ? PRODUCTS.slice(0, 8) 
    : [...PRODUCTS].reverse().slice(0, 8);

  const topShops = Object.values(SHOPS).slice(0, 6);

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>ใช้ฟรี · ไม่ต้องสมัครสมาชิก</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
          ลดจริง หรือ<span className="text-transparent bg-clip-text bg-gradient-to-r from-shopee-600 to-amber-600">ลดหลอก?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          ป้าย “ลด 50%” อาจเป็นราคาที่เพิ่งแอบขึ้นเมื่อวาน <br className="hidden sm:inline" />
          ดูราคาย้อนหลังของจริง แล้วรู้ทันทีว่า <strong className="text-slate-900 font-extrabold">ควรกดสั่ง หรือรอก่อน</strong>
        </p>

        {/* Search Bar */}
        <SearchBar />

      </section>

      {/* Platform Savings & Stats Counter */}
      <section className="px-4 sm:px-6 lg:px-8">
        <StatsCounter />
      </section>

      {/* 9.9 Campaign Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="https://s.shopee.co.th/2LXwMLiZAB"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative rounded-3xl overflow-hidden bg-gradient-to-r from-shopee-600 via-rose-600 to-amber-600 p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-2">
              <div className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                🔥 Double Day Campaign
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                9.9 Mega Shopping Day — รวมโค้ดลดสูงสุด 30%
              </h2>
              <p className="text-sm sm:text-base text-white/90 max-w-xl">
                กดเก็บโค้ดส่งฟรีและส่วนลดร้านค้ายอดฮิตล่วงหน้าก่อนของหมดโควตา
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="bg-white text-slate-900 group-hover:bg-amber-300 font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg transition-colors flex items-center gap-2">
                <span>เก็บโค้ดส่วนลดเลย</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </a>
      </section>

      {/* Popular Products ("สินค้ายอดฮิต 🔥") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-shopee-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>คนเช็คราคากันมากที่สุด</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              สินค้ายอดฮิต 🔥
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs 7d / 30d */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setPopularTab('7d')}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  popularTab === '7d'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                7 วันล่าสุด
              </button>
              <button
                onClick={() => setPopularTab('30d')}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  popularTab === '30d'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                30 วัน
              </button>
            </div>

            <Link
              href="/popular"
              className="text-xs sm:text-sm font-bold text-shopee-600 hover:text-shopee-700 flex items-center gap-1 ml-2"
            >
              <span>ดูอันดับทั้งหมด</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {popularProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} rank={idx + 1} />
          ))}
        </div>
      </section>

      {/* Top Stores ("ร้านค้ายอดนิยม") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Store className="w-4 h-4" />
              <span>ร้านที่มีคนค้นหาประวัติราคามากที่สุด</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              ร้านค้ายอดนิยม 🏬
            </h2>
          </div>
          <Link
            href="/shops"
            className="text-xs sm:text-sm font-bold text-shopee-600 hover:text-shopee-700 flex items-center gap-1"
          >
            <span>ดูร้านค้าทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {topShops.map((shop) => (
            <Link
              key={shop.id}
              href={`/shops/${shop.id}`}
              className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-shopee-300 shadow-card hover:shadow-card-hover transition-all flex items-start gap-4"
            >
              <div className="w-14 h-14 relative bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shop.avatarUrl}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  {shop.isMall && (
                    <span className="bg-shopee-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                      Mall
                    </span>
                  )}
                  {shop.isPreferred && (
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                      ร้านแนะนำ
                    </span>
                  )}
                  <span className="text-xs text-slate-400 ml-auto">
                    ⭐ {shop.ratingStar}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-shopee-600 truncate">
                  {shop.name}
                </h3>

                <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                  <span>{shop.totalTrackedProducts.toLocaleString()} สินค้าที่บันทึก</span>
                  <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    ↓ ถูกกว่าปกติ {shop.discountedProductsCount.toLocaleString()} ชิ้น
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it Works / Transparency Section ("ข้อมูลราคามาจากไหน?") */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              ข้อมูลราคามาจากไหน? 🔍
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              เราเน้นความโปร่งใสและตรงไปตรงมา เพื่อให้ผู้บริโภคได้ข้อมูลราคาที่แท้จริงที่สุด
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-shopee-50 text-shopee-600 font-black text-lg flex items-center justify-center border border-shopee-200">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                ทีมงานเปิดดูหน้าสินค้าบน Shopee เอง
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                ใช้ระบบอ่านราคาจากหน้าสาธารณะที่เปิดอยู่ ไม่มีการเข้าถึงข้อมูลส่วนตัว และไม่มีการยิงคำขอเพิ่มไปรบกวนระบบ Shopee
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 font-black text-lg flex items-center justify-center border border-amber-200">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                ราคาถูกบันทึกพร้อมวันเวลา
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                เก็บสะสมไว้เป็นประวัติราคาย้อนหลังรายวัน โดยเลือกใช้ราคาต่ำสุดของวันนั้นเพื่อตัดสัญญาณรบกวนจาก Dynamic Pricing
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black text-lg flex items-center justify-center border border-emerald-200">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                เทียบราคาวันนี้กับที่ผ่านมา
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                บอกตรงๆ ว่าตอนนี้ถูกกว่าหรือแพงกว่าปกติ เคยลงต่ำสุดถึงเท่าไหร่ และมีโค้ดอะไรที่ช่วยให้จ่ายถูกลงจริงได้บ้าง
              </p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              <strong>หมายเหตุ:</strong> ราคาในเว็บนี้ไม่ได้มาจากการช้อปของคุณ ทีมงานเป็นผู้เก็บรวบรวมจากหน้าร้านสาธารณะทั้งหมด
            </p>
          </div>
        </div>
      </section>

      {/* Shopping Tips & Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>ความรู้และเทคนิคช้อปประหยัด</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              บทความ & ทริคช้อปปิ้ง 📝
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-xs sm:text-sm font-bold text-shopee-600 hover:text-shopee-700 flex items-center gap-1"
          >
            <span>บทความทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-shopee-300 shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {article.topic}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 mb-2">
                    {article.publishedAt} · อ่าน {article.readTime}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-shopee-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-shopee-600">
                  <span>อ่านต่อ</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
