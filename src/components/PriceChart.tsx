'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { PricePoint } from '@/types';
import { formatBaht } from '@/lib/utils';
import { TrendingDown, Calendar, Info } from 'lucide-react';

interface PriceChartProps {
  data: PricePoint[];
  lowestPrice: number;
  averagePrice: number;
  highestPrice: number;
  currentPrice: number;
}

export default function PriceChart({
  data,
  lowestPrice,
  averagePrice,
  highestPrice,
  currentPrice,
}: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<'all' | '30d' | '14d' | '7d'>('all');

  // Filter data according to timeRange
  const getFilteredData = () => {
    if (timeRange === '7d') return data.slice(-4);
    if (timeRange === '14d') return data.slice(-6);
    if (timeRange === '30d') return data.slice(-10);
    return data;
  };

  const chartData = getFilteredData();

  const minChartPrice = Math.floor(Math.min(...chartData.map(d => d.price), lowestPrice) * 0.95);
  const maxChartPrice = Math.ceil(Math.max(...chartData.map(d => d.price), highestPrice) * 1.05);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-card">
      
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
            ประวัติราคาย้อนหลัง
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            บันทึกราคารายวัน เพื่อตรวจสอบว่าลดจริงหรือแค่ขึ้นราคาก่อนลด
          </p>
        </div>

        {/* Time Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          {(['all', '30d', '14d', '7d'] as const).map((range) => {
            const labels = {
              all: 'ทั้งหมด',
              '30d': '30 วัน',
              '14d': '14 วัน',
              '7d': '7 วัน',
            };
            return (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {labels[range]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Summary Statistic Metric Boxes */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 my-5">
        
        {/* Lowest */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 sm:p-4 text-center">
          <span className="text-[11px] sm:text-xs font-bold text-emerald-700 block uppercase tracking-wider">
            ต่ำสุดที่เคยเจอ
          </span>
          <span className="text-base sm:text-2xl font-black text-emerald-900 mt-1 block">
            {formatBaht(lowestPrice)}
          </span>
          <span className="text-[10px] sm:text-xs text-emerald-600/90 font-medium">
            {currentPrice <= lowestPrice ? '★ ราคาวันนี้เลย' : `ถูกกว่าตอนนี้ ${formatBaht(currentPrice - lowestPrice)}`}
          </span>
        </div>

        {/* Average */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 text-center">
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 block uppercase tracking-wider">
            ราคาเฉลี่ย
          </span>
          <span className="text-base sm:text-2xl font-black text-slate-800 mt-1 block">
            {formatBaht(averagePrice)}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
            มาตรฐานราคาสินค้า
          </span>
        </div>

        {/* Highest */}
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3 sm:p-4 text-center">
          <span className="text-[11px] sm:text-xs font-bold text-rose-700 block uppercase tracking-wider">
            เคยสูงสุด
          </span>
          <span className="text-base sm:text-2xl font-black text-rose-900 mt-1 block">
            {formatBaht(highestPrice)}
          </span>
          <span className="text-[10px] sm:text-xs text-rose-600/90 font-medium">
            ราคาสูงสุดที่ร้านเคยตั้ง
          </span>
        </div>
      </div>

      {/* Main SVG Recharts Graph */}
      <div className="h-64 sm:h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            
            <YAxis 
              domain={[minChartPrice, maxChartPrice]}
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `฿${(v / 1000).toFixed(0)}k`}
            />

            {/* Average Reference Line */}
            <ReferenceLine 
              y={averagePrice} 
              stroke="#94a3b8" 
              strokeDasharray="4 4" 
              label={{ 
                value: `เฉลี่ย ${formatBaht(averagePrice)}`, 
                position: 'insideTopRight',
                fill: '#64748b',
                fontSize: 10,
                fontWeight: 600
              }} 
            />

            {/* Lowest Reference Line */}
            <ReferenceLine 
              y={lowestPrice} 
              stroke="#10b981" 
              strokeDasharray="2 2" 
              label={{ 
                value: `ต่ำสุด ${formatBaht(lowestPrice)}`, 
                position: 'insideBottomRight',
                fill: '#059669',
                fontSize: 10,
                fontWeight: 700
              }} 
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as PricePoint;
                  return (
                    <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700">
                      <div className="font-semibold text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>วันที่ {item.date}</span>
                      </div>
                      <div className="text-base font-black text-amber-400 mt-1">
                        {formatBaht(item.price)}
                      </div>
                      {item.note && (
                        <div className="mt-1.5 text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                          📌 {item.note}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#ee4d2d"
              strokeWidth={3}
              dot={{ r: 4, fill: '#ee4d2d', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 7, fill: '#ee4d2d', strokeWidth: 3, stroke: '#ffffff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Info Box */}
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
        <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span>
          <strong>วิธีอ่านกราฟ:</strong> หากเส้นราคาปัจจุบันอยู่ใกล้หรือต่ำกว่าเส้นประสีเขียว (ต่ำสุด) แสดงว่าราคานี้คุ้มค่าที่จะซื้อทันที
        </span>
      </div>

    </div>
  );
}
