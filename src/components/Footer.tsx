import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Info, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-12 pb-16 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-shopee-600 to-amber-500 flex items-center justify-center text-white font-black text-lg">
                ฿
              </div>
              <span className="font-extrabold text-lg text-slate-900">
                ราคาถูกยัง (RakaTookYang)
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md">
              เช็คประวัติราคาสินค้าย้อนหลังบน Shopee เพื่อให้รู้ทันทีว่าป้าย “ลด 50%” 
              เป็นราคาที่เพิ่งแอบขึ้นเมื่อวานหรือลดจริง จะได้รู้ว่าควรกดสั่งหรือรอก่อน
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 p-3 rounded-lg max-w-md">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>นโยบายความเป็นส่วนตัว:</strong> ราคาทั้งหมดเก็บจากหน้าสินค้าสาธารณะ ไม่มีการเข้าถึงบัญชีหรือข้อมูลการช้อปส่วนบุคคลของผู้ใช้งาน
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">ฟีเจอร์หลัก</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/deals" className="hover:text-shopee-600 transition-colors">
                  🔥 ดีลไฟไหม้ (ลดจริงเทียบประวัติ)
                </Link>
              </li>
              <li>
                <Link href="/popular" className="hover:text-shopee-600 transition-colors">
                  📈 สินค้ายอดฮิต 100 อันดับ
                </Link>
              </li>
              <li>
                <Link href="/shops" className="hover:text-shopee-600 transition-colors">
                  🏬 รวมร้านค้า Shopee Mall
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-shopee-600 transition-colors">
                  📝 บทความ & ทริคเก็บโค้ด
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Transparency */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 text-sm">ความโปร่งใส</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                  นโยบายความเป็นส่วนตัว (PDPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900 transition-colors">
                  ข้อกำหนดการใช้งาน & พันธมิตร
                </Link>
              </li>
              <li>
                <Link href="/articles/วิธีใช้งาน-ราคาถูกยัง" className="hover:text-slate-900 transition-colors">
                  วิธีคำนวณส่วนต่างราคา
                </Link>
              </li>
              <li>
                <a 
                  href="https://forms.gle/HcPRBMmFMXBaJ4hA9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 flex items-center gap-1 text-amber-600 font-medium"
                >
                  แจ้งข้อมูลผิดพลาด / ติดต่อเรา <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Note */}
        <div className="border-t border-slate-100 pt-6 pb-6 text-xs text-slate-400 space-y-2">
          <p>
            * ปุ่มที่พาไปยัง Shopee เป็นลิงก์พันธมิตร (Shopee Affiliate) หากมีการสั่งซื้อ ทางเราอาจได้รับค่าตอบแทนเล็กน้อยเพื่อนำมาเป็นค่าดูแลระบบและเซิร์ฟเวอร์ โดยผู้ซื้อจ่ายในราคาเท่าเดิมทุกประการ ไม่มีการบวกราคาเพิ่ม
          </p>
          <p>
            * ข้อมูลราคาและโค้ดส่วนลดเป็นการรวบรวมจากหน้าเว็บสาธารณะ ณ เวลาที่บันทึก เงื่อนไขและโควตาโค้ดจริงเป็นไปตามที่ Shopee กำหนด
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© 2026 ราคาถูกยัง (RakaTookYang.com) — สร้างด้วย</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>เพื่อผู้บริโภคชาวไทย</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <a href="https://facebook.com/rakatookyang" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
