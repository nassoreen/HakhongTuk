import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับหน้าแรก</span>
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          นโยบายความเป็นส่วนตัว (Privacy Policy)
        </h1>
        <p className="text-xs text-slate-500">
          ปรับปรุงล่าสุด 2 กันยายน 2569 · ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
        </p>
      </div>

      {/* Summary Box */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3">
        <h3 className="font-extrabold text-emerald-900 text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          สรุปสั้นๆ ให้เข้าใจง่าย
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
          <li>• <strong>ราคาสินค้าทั้งหมดในเว็บนี้ไม่ได้มาจากการช้อปของคุณ:</strong> ทีมงานเป็นผู้เปิดดูหน้าสินค้าบน Shopee เองจากหน้าสาธารณะ</li>
          <li>• <strong>ไม่ต้องสมัครสมาชิก:</strong> หากคุณใช้งานทั่วไป เราไม่เก็บข้อมูลส่วนบุคคลใดๆ ของคุณ</li>
          <li>• <strong>เราไม่ขายข้อมูลส่วนบุคคลให้ใครโดยเด็ดขาด</strong></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. ผู้ควบคุมข้อมูลส่วนบุคคล</h2>
          <p>
            ราคาถูกยัง (RakaTookYang.com) เป็นผู้ควบคุมข้อมูลส่วนบุคคลตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. ข้อมูลที่มีการบันทึก</h2>
          <p>
            เว็บนี้บันทึกเพียงตัวเลขนับรวมรายวัน (Aggregation) เช่น จำนวนครั้งที่หน้าประวัติราคาถูกเปิด เพื่อจัดอันดับสินค้ายอดฮิต โดยไม่มีการผูกกับ IP Address, เลขบัญชี หรือข้อมูลที่สามารถระบุตัวตนผู้ใช้ได้
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. คุกกี้ (Cookies)</h2>
          <p>
            เราใช้เฉพาะคุกกี้ที่จำเป็นต่อการทำงานของระบบ (Essential Cookies) สำหรับการจัดเก็บความยินยอมและการตั้งค่าทั่วไป สำหรับคุกกี้เพื่อการวิเคราะห์ (Vercel Analytics) จะทำงานเมื่อได้รับความยินยอมจากคุณเท่านั้น
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. สิทธิของเจ้าของข้อมูลส่วนบุคคล (PDPA Rights)</h2>
          <p>
            คุณมีสิทธิในการขอเข้าถึง ขอรับสำเนา ขอให้แก้ไข ขอให้ลบ หรือคัดค้านการประมวลผลข้อมูลส่วนบุคคลของคุณได้ตลอดเวลา โดยสามารถติดต่อผ่านช่องทางของเว็บไซต์
          </p>
        </section>

      </div>

    </div>
  );
}
