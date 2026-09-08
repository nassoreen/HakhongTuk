'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('rt_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rt_cookie_consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('rt_cookie_consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-5 shadow-2xl transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-sm">เว็บนี้ใช้คุกกี้ (PDPA)</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            เราใช้คุกกี้ที่จำเป็นต่อการทำงานของเว็บเสมอ และขอความยินยอมสำหรับคุกกี้วิเคราะห์เพื่อปรับปรุงระบบให้ดีขึ้น คุณเลือกไม่ยินยอมได้โดยยังใช้งานเว็บได้ครบถ้วน
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors"
            >
              ยินยอม
            </button>
            <button
              onClick={handleDecline}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              ไม่ยินยอม
            </button>
            <Link
              href="/privacy"
              className="text-xs text-slate-400 hover:text-slate-600 underline ml-auto"
            >
              อ่านนโยบาย
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
