'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Flame, 
  TrendingUp, 
  Store, 
  BookOpen, 
  Sparkles, 
  Menu, 
  X,
  Search
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'หน้าแรก', href: '/' },
    { label: 'ดีลไฟไหม้ 🔥', href: '/deals', highlight: true },
    { label: 'สินค้ายอดฮิต 📈', href: '/popular' },
    { label: 'ร้านค้าทั้งหมด', href: '/shops' },
    { label: 'บทความ & ทริค', href: '/articles' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-shopee-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              ฿
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 leading-none tracking-tight flex items-center gap-1.5">
                ราคาถูกยัง
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  Live
                </span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                RakaTookYang.com
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : item.highlight
                      ? 'text-shopee-600 hover:bg-shopee-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Promo Banner */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/articles/แจกบัตรสตาร์บัคส์-รีวิวราคาถูกยัง"
              className="hidden lg:flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-1.5 rounded-full font-medium hover:bg-amber-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>แจกบัตร ฿100 Starbucks</span>
            </Link>

            <Link
              href="#search-box"
              className="bg-shopee-500 hover:bg-shopee-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>เช็คราคาฟรี</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu modal */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                pathname === item.href
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/articles/แจกบัตรสตาร์บัคส์-รีวิวราคาถูกยัง"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full bg-amber-50 border border-amber-200 text-amber-800 text-sm py-2 rounded-lg font-medium"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>ลุ้นรับบัตร Starbucks ฿100 ฟรี</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
