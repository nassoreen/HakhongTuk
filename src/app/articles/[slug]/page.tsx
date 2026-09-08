import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/data';
import SearchBar from '@/components/SearchBar';
import { ArrowLeft, Calendar, Clock, Sparkles, Share2 } from 'lucide-react';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  const article = ARTICLES.find((a) => a.slug === decodedSlug || a.slug === params.slug) || ARTICLES[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับหน้าบทความทั้งหมด</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="inline-block bg-indigo-50 text-indigo-700 font-bold text-xs px-3 py-1 rounded-full border border-indigo-200">
          {article.topic}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishedAt}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            อ่าน {article.readTime}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-card border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        {article.content.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}

        {article.slug.includes('แจกบัตร') && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-amber-900 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              วิธีร่วมสนุกง่ายๆ ใน 3 ขั้นตอน
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-amber-900">
              <li>เขียนรีวิวเล่าประสบการณ์ใช้งานราคาถูกยัง โพสต์ลง Facebook, TikTok, X, Instagram หรือ Lemon8</li>
              <li>ติดแฮชแท็ก <strong>#ราคาถูกยัง #RakaTookYang</strong> ในโพสต์</li>
              <li>นำลิงก์โพสต์มากรอกที่ Google Forms ด้านล่างนี้</li>
            </ol>
            <a
              href="https://forms.gle/HcPRBMmFMXBaJ4hA9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              👉 กรอกฟอร์มลงทะเบียนลุ้นรับบัตร Starbucks ฿100
            </a>
          </div>
        )}
      </div>

      {/* Search Widget Inline */}
      <div className="bg-slate-100 rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">
          อยากรู้ว่าของที่คุณเล็งไว้ราคาถูกจริงไหม?
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          วางลิงก์สินค้าจาก Shopee ในช่องนี้แล้วเช็คประวัติราคาย้อนหลังได้ทันที
        </p>
        <SearchBar />
      </div>

    </div>
  );
}
