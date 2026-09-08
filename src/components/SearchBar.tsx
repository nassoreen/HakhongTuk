'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Link as LinkIcon, Sparkles, ArrowRight, Loader2, Clipboard } from 'lucide-react';
import { parseShopeeInput } from '@/lib/shopee-parser';
import { PRODUCTS } from '@/lib/data';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ 
  placeholder = "วางลิงก์สินค้า Shopee หรือพิมพ์ชื่อสินค้า เช่น iPhone 17, Nintendo Switch...",
  autoFocus = false
}: SearchBarProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (overrideQuery?: string) => {
    const query = (overrideQuery !== undefined ? overrideQuery : input).trim();
    if (!query) {
      setError('กรุณาวางลิงก์สินค้า Shopee หรือพิมพ์ชื่อสินค้า');
      return;
    }

    setError(null);
    setLoading(true);

    const parsed = parseShopeeInput(query);

    // Direct match against mock dataset
    if (parsed.itemId) {
      const matched = PRODUCTS.find(p => p.shopeeItemId === parsed.itemId);
      if (matched) {
        router.push(`/products/${matched.id}`);
        return;
      }
    }

    // Keyword or fallback match
    const matchedByText = PRODUCTS.find(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.shop.name.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedByText) {
      setTimeout(() => {
        router.push(`/products/${matchedByText.id}`);
      }, 350);
      return;
    }

    // Default fallback to popular / top deal
    setTimeout(() => {
      router.push(`/products/${PRODUCTS[0].id}?q=${encodeURIComponent(query)}`);
    }, 450);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        handleSearch(text);
      }
    } catch {
      // Clipboard permission denied or unsupported
    }
  };

  const demoItems = [
    { label: "📱 iPhone 17 Pro Max", id: "cmsuk8ogj02w4qn73a6kebzqp" },
    { label: "🎮 Nintendo Switch 2", id: "734ed65b-2beb-45a2-b50f-f32206ee48b4" },
    { label: "✨ Dr.PONG Whitening Serum", id: "drpong-hyaluronic-serum" },
    { label: "🖥️ Asus TUF Gaming 27\"", id: "8661dfd1-87dd-42dc-8075-749f53833f50" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto" id="search-box">
      {/* Search Input Container */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="relative group"
      >
        <div className="relative flex items-center shadow-lg hover:shadow-xl focus-within:shadow-xl rounded-2xl bg-white border-2 border-shopee-500/80 transition-all duration-200 overflow-hidden">
          
          <div className="pl-4 sm:pl-5 text-slate-400">
            <LinkIcon className="w-5 h-5 text-shopee-500" />
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(null);
            }}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full py-4 sm:py-5 pl-3 pr-28 sm:pr-36 text-slate-900 text-sm sm:text-base font-medium placeholder-slate-400 bg-transparent focus:outline-none"
          />

          {/* Quick Paste & Submit Buttons */}
          <div className="absolute right-2 sm:right-2.5 flex items-center gap-1 sm:gap-2">
            {!input && (
              <button
                type="button"
                onClick={handlePasteClipboard}
                className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-2 rounded-lg transition-colors"
                title="วางจากคลิปบอร์ด"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>วาง</span>
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-shopee-500 hover:bg-shopee-600 active:scale-95 disabled:opacity-75 text-white font-bold text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">กำลังเช็ค...</span>
                </>
              ) : (
                <>
                  <span>เช็คราคา</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-2 text-xs text-rose-600 font-medium text-left pl-2">
            {error}
          </p>
        )}
      </form>

      {/* Quick Helper Step Banner */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">วิธีใช้</span>
        <span>กดปุ่มแชร์ในแอป Shopee</span>
        <span className="text-slate-300">→</span>
        <span>คัดลอกลิงก์</span>
        <span className="text-slate-300">→</span>
        <span>วางที่ช่องด้านบน แล้วรู้ทันทีว่าลดจริงไหม</span>
      </div>

      {/* Suggested Demo Clickables */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          ลองดูตัวอย่าง:
        </span>
        {demoItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => router.push(`/products/${item.id}`)}
            className="text-xs bg-white hover:bg-shopee-50 text-slate-700 hover:text-shopee-600 border border-slate-200 hover:border-shopee-200 px-2.5 py-1 rounded-full transition-all duration-150 font-medium shadow-xs"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
