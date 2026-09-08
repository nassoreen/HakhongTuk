'use client';

import React, { useState } from 'react';
import { Coupon } from '@/types';
import { calculateCouponDiscount } from '@/lib/coupon-calculator';
import { formatBaht } from '@/lib/utils';
import { Tag, Sparkles, CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface CouponCalculatorProps {
  basePrice: number;
  coupons: Coupon[];
  affiliateUrl?: string;
}

export default function CouponCalculator({
  basePrice,
  coupons,
  affiliateUrl = "https://s.shopee.co.th/6VNVNZwqIL",
}: CouponCalculatorProps) {
  const [selectedCouponId, setSelectedCouponId] = useState<string>(
    coupons[0]?.id || ''
  );
  const [isVipMember, setIsVipMember] = useState(false);
  const [customDiscountPct, setCustomDiscountPct] = useState<number | ''>('');
  const [customMaxCap, setCustomMaxCap] = useState<number | ''>('');

  const activeCoupon = coupons.find((c) => c.id === selectedCouponId);

  // If custom coupon is being simulated
  const customCoupon: Coupon | null =
    customDiscountPct !== ''
      ? {
          id: 'custom',
          name: `โค้ดลดที่กำหนดเอง (${customDiscountPct}%)`,
          discountType: 'PERCENT',
          value: Number(customDiscountPct),
          minSpend: 0,
          maxDiscount: customMaxCap !== '' ? Number(customMaxCap) : undefined,
        }
      : null;

  const currentCouponToEvaluate = customCoupon || activeCoupon || coupons[0];
  const calcResult = currentCouponToEvaluate
    ? calculateCouponDiscount(basePrice, currentCouponToEvaluate)
    : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-card space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <Tag className="w-5 h-5 text-shopee-500" />
            คำนวณราคาหลังใช้โค้ด (จ่ายจริง)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            คำนวณตามเงื่อนไขจริง ทั้งยอดขั้นต่ำและเพดานส่วนลดสูงสุด
          </p>
        </div>

        {/* Shopee VIP Toggle */}
        <button
          onClick={() => setIsVipMember(!isVipMember)}
          className={`text-xs px-3 py-1.5 rounded-full font-bold border transition-all flex items-center gap-1.5 ${
            isVipMember
              ? 'bg-amber-400 border-amber-500 text-slate-900 shadow-xs'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>สมาชิก Shopee VIP: {isVipMember ? 'เปิด' : 'ปิด'}</span>
        </button>
      </div>

      {/* Available Coupon Chips */}
      <div>
        <label className="text-xs font-bold text-slate-600 block mb-2 uppercase tracking-wider">
          เลือกโค้ดส่วนลดที่ต้องการทดสอบ:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {coupons.map((coupon) => {
            const isSelected = selectedCouponId === coupon.id && !customCoupon;
            const res = calculateCouponDiscount(basePrice, coupon);

            return (
              <button
                key={coupon.id}
                onClick={() => {
                  setSelectedCouponId(coupon.id);
                  setCustomDiscountPct('');
                  setCustomMaxCap('');
                }}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-shopee-500 bg-shopee-50/50 shadow-xs ring-1 ring-shopee-400'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {coupon.name}
                  </span>
                  {coupon.tag && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                      {coupon.tag}
                    </span>
                  )}
                </div>

                <div className="mt-1 text-xs text-slate-500 flex items-center justify-between">
                  <span>
                    ลด {coupon.discountType === 'PERCENT' ? `${coupon.value}%` : formatBaht(coupon.value)}
                    {coupon.maxDiscount ? ` (สูงสุด ${formatBaht(coupon.maxDiscount)})` : ''}
                  </span>
                  <span className="font-extrabold text-shopee-600">
                    ประหยัด {formatBaht(res.discountAmount)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Coupon Simulator Toggle */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <span className="text-xs font-bold text-slate-700 block mb-2">
          🎯 มีโค้ดอื่นในมือ? ทดลองใส่ตัวเลขคำนวณเอง:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">
              เปอร์เซ็นต์ส่วนลด (%)
            </label>
            <input
              type="number"
              value={customDiscountPct}
              onChange={(e) => setCustomDiscountPct(e.target.value ? Number(e.target.value) : '')}
              placeholder="เช่น 20, 30"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-shopee-500 bg-white"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">
              เพดานสูงสุด (฿)
            </label>
            <input
              type="number"
              value={customMaxCap}
              onChange={(e) => setCustomMaxCap(e.target.value ? Number(e.target.value) : '')}
              placeholder="เช่น 3000"
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-shopee-500 bg-white"
            />
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-end">
            <button
              onClick={() => {
                setCustomDiscountPct('');
                setCustomMaxCap('');
              }}
              className="w-full text-xs py-2 px-3 rounded-lg bg-slate-200 hover:bg-slate-300 font-semibold text-slate-700 transition-colors"
            >
              รีเซ็ตโค้ด
            </button>
          </div>
        </div>
      </div>

      {/* Net Calculation Summary Box */}
      {calcResult && (
        <div className="bg-gradient-to-r from-shopee-50 to-amber-50 border border-shopee-200/80 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div>
              <span className="text-xs font-semibold text-slate-600 block">
                ราคาจ่ายจริงสุทธิหลังหักส่วนลด:
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-shopee-600">
                  {formatBaht(calcResult.finalPrice)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatBaht(basePrice)}
                </span>
                <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
                  ประหยัด {formatBaht(calcResult.discountAmount)} (-{calcResult.savedPercentage}%)
                </span>
              </div>
              
              {calcResult.hitMaxCap && (
                <p className="text-[11px] text-amber-800 font-medium mt-1">
                  ⚠️ โค้ดนี้ติดเพดานส่วนลดสูงสุด ({formatBaht(calcResult.coupon.maxDiscount || 0)})
                </p>
              )}
            </div>

            {/* Direct Shopee Voucher Collect CTA */}
            <a
              href={activeCoupon?.affiliateUrl || affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-shopee-500 hover:bg-shopee-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 self-stretch sm:self-auto"
            >
              <span>เก็บโค้ดนี้บน Shopee</span>
              <ExternalLink className="w-4 h-4" />
            </a>

          </div>
        </div>
      )}

      {/* Note */}
      <p className="text-[11px] text-slate-400 leading-relaxed">
        * <strong>คำแนะนำ:</strong> Shopee มักปล่อยโค้ด 20–30% ในช่วงวันเบิ้ล (เช่น 9.9, 10.10, PayDay) แนะนำให้เก็บโค้ดไว้ล่วงหน้าทุกลิมิต ระบบจะเลือกใบที่ลดมากที่สุดให้อัตโนมัติในหน้าชำระเงิน
      </p>

    </div>
  );
}
