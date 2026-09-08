'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { formatBaht, getDealVerdict } from '@/lib/utils';
import { Share2, X, Copy, Check, MessageCircle, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ product, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const verdict = getDealVerdict(product);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://rakatookyang.com/products/${product.id}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `เช็คราคา ${product.name} บนราคาถูกยัง ตอนนี้ราคา ${formatBaht(product.currentPrice)} (${verdict.label}) ดูประวัติราคาย้อนหลังได้ที่:`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-extrabold text-slate-900 text-lg mb-1 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-shopee-500" />
          แชร์ราคาให้เพื่อน
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          ส่งต่อประวัติราคาให้เพื่อนดูว่าราคานี้ควรซื้อหรือยัง
        </p>

        {/* Share Preview Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
          <div className="w-16 h-16 relative bg-white rounded-xl border border-slate-200 flex-shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs text-slate-900 truncate">
              {product.name}
            </h4>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-sm font-black text-shopee-600">
                {formatBaht(product.currentPrice)}
              </span>
              <span className="text-[10px] text-slate-400 line-through">
                {formatBaht(product.originalPrice)}
              </span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold inline-block mt-1 ${verdict.badgeClass}`}>
              {verdict.label}
            </span>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#06C755]/10 text-[#06C755] font-bold text-xs hover:bg-[#06C755]/20 transition-colors"
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span>LINE</span>
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1877F2]/10 text-[#1877F2] font-bold text-xs hover:bg-[#1877F2]/20 transition-colors"
          >
            <span className="text-base font-black mb-0.5">f</span>
            <span>Facebook</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/10 text-slate-900 font-bold text-xs hover:bg-slate-900/20 transition-colors"
          >
            <span className="text-sm font-black mb-0.5">𝕏</span>
            <span>X (Twitter)</span>
          </a>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 select-all focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1 flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>คัดลอกแล้ว</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>คัดลอก</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
