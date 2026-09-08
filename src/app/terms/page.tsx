import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Info } from 'lucide-react';

export default function TermsPage() {
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
          ข้อกำหนดการใช้งาน & ความโปร่งใส
        </h1>
        <p className="text-xs text-slate-500">
          ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์ ราคาถูกยัง (RakaTookYang.com)
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. วัตถุประสงค์ในการให้บริการ</h2>
          <p>
            ราคาถูกยัง จัดทำขึ้นเพื่อเป็นเครื่องมือช่วยตัดสินใจซื้อสินค้า โดยการแสดงประวัติราคาย้อนหลัง และช่วยคำนวณส่วนลดตามเงื่อนไขที่ร้านค้าหรือแพลตฟอร์มระบุไว้
          </p>
        </section>

        <section className="space-y-3" id="affiliate">
          <h2 className="text-lg font-bold text-slate-900">2. ลิงก์พันธมิตร (Shopee Affiliate Disclosure)</h2>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 text-xs sm:text-sm space-y-2">
            <p>
              • ปุ่มที่พาไปยัง Shopee ส่วนใหญ่เป็นลิงก์พันธมิตร (Affiliate Link) หากคุณกดสั่งซื้อสินค้าผ่านลิงก์ดังกล่าว เราอาจได้รับค่าคอมมิชชั่นเล็กน้อยจากทาง Shopee
            </p>
            <p>
              • <strong>คุณจ่ายราคาเท่าเดิมทุกบาท:</strong> ไม่มีการบวกราคาเพิ่มใดๆ ทั้งสิ้น รายได้ส่วนนี้จะถูกนำมาใช้เป็นค่าบำรุงรักษาเซิร์ฟเวอร์ โดเมน และพัฒนาระบบเพื่อเปิดให้ทุกคนใช้งานได้ฟรี
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. ข้อจำกัดความรับผิดชอบ</h2>
          <p>
            ข้อมูลราคาและโค้ดส่วนลดเก็บรวบรวมจากหน้าร้านค้าสาธารณะ ณ เวลาที่ระบบบันทึก ราคาและโปรโมชั่นจริงอาจมีการเปลี่ยนแปลงโดยผู้ขายหรือแพลตฟอร์ม Shopee ได้ตลอดเวลา โปรดตรวจสอบราคาสุดท้ายในหน้ายืนยันคำสั่งซื้อของ Shopee ทุกครั้งก่อนทำการชำระเงิน
          </p>
        </section>

      </div>

    </div>
  );
}
