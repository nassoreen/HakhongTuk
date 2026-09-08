import React from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/data';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับหน้าแรก</span>
      </Link>

      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>ทริคและเทคนิคการซื้อของให้ถูกที่สุด</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          บทความ & ข่าวสาร 📝
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          คู่มือการใช้งาน วิธีดักซื้อของช่วงแคมเปญ Double Day และการคำนวณจุดคุ้มทุน
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group bg-white rounded-3xl border border-slate-200 hover:border-shopee-300 shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {article.topic}
                </span>
              </div>

              <div className="p-6">
                <div className="text-xs text-slate-400 mb-2">
                  {article.publishedAt} · อ่าน {article.readTime}
                </div>
                <h2 className="font-bold text-slate-900 text-lg group-hover:text-shopee-600 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-shopee-600">
              <span>อ่านบทความฉบับเต็ม</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
