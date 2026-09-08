import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'ราคาถูกยัง (RakaTookYang.com) — เช็คประวัติราคาสินค้า Shopee ย้อนหลัง',
  description: 'ดูประวัติราคาย้อนหลังของสินค้าบน Shopee รู้ทันทีว่าราคาวันนี้ถูกจริงหรือแค่ขึ้นราคาก่อนลด พร้อมคำนวณราคาหลังใช้โค้ดส่วนลดและแจ้งเตือนเมื่อราคาลง',
  keywords: ['เช็คราคา Shopee', 'ประวัติราคาย้อนหลัง', 'ราคาถูกยัง', 'ส่วนลด Shopee', 'RakaTookYang', 'โปร 9.9', 'ลดจริงหรือลดหลอก'],
  openGraph: {
    title: 'ราคาถูกยัง (RakaTookYang.com) — ลดจริง หรือลดหลอก?',
    description: 'ดูราคาย้อนหลังของจริง แล้วรู้ทันทีว่าควรกดสั่ง หรือรอก่อน',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&family=Prompt:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#f8fafc] text-slate-900 min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
