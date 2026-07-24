import React from 'react';
import { 
  FileText, 
  ThumbsUp, 
  Minus, 
  ThumbsDown, 
  ShieldAlert, 
  TrendingUp, 
  FilterX 
} from 'lucide-react';
import { SentimentStats } from '../types';

interface MetricCardsProps {
  stats: SentimentStats;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ stats }) => {
  const { total, positive, neutral, negative, filteredNoiseCount, highRiskCount } = stats;

  const posPct = total > 0 ? Math.round((positive / total) * 100) : 0;
  const neuPct = total > 0 ? Math.round((neutral / total) * 100) : 0;
  const negPct = total > 0 ? Math.round((negative / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      
      {/* 1. Total Articles */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng số bài viết</span>
          <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
            <FileText className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">{total.toLocaleString('vi-VN')}</span>
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +12.4%
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">Đã quét toàn bộ mạng lưới báo chí & MXH</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200" />
      </div>

      {/* 2. Positive Articles */}
      <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-gradient-to-b from-emerald-50/20 to-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Tin Tích cực</span>
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <ThumbsUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-emerald-700">{positive.toLocaleString('vi-VN')}</span>
          <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
            {posPct}%
          </span>
        </div>
        <p className="text-[11px] text-emerald-600/80 mt-1">Nội dung đồng thuận, ủng hộ chủ trương</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" />
      </div>

      {/* 3. Neutral Articles */}
      <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-gradient-to-b from-blue-50/20 to-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Tin Trung lập</span>
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <Minus className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-blue-700">{neutral.toLocaleString('vi-VN')}</span>
          <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
            {neuPct}%
          </span>
        </div>
        <p className="text-[11px] text-blue-600/80 mt-1">Tin tức khách quan, thông tin kỹ thuật</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
      </div>

      {/* 4. Negative Articles */}
      <div className="bg-white rounded-xl p-4 border border-rose-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-gradient-to-b from-rose-50/20 to-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">Tin Tiêu cực</span>
          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
            <ThumbsDown className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-rose-700">{negative.toLocaleString('vi-VN')}</span>
          <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">
            {negPct}%
          </span>
        </div>
        <p className="text-[11px] text-rose-600/80 mt-1">Ý kiến phản đối, bất cập, bức xúc</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500" />
      </div>

      {/* 5. Noise & High Risk Index */}
      <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-gradient-to-b from-amber-50/20 to-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Cảnh báo / Lọc Nhiễu</span>
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-amber-700">{highRiskCount}</span>
          <span className="text-xs font-medium text-amber-600">
            (Đã lọc {filteredNoiseCount} tin nhiễu)
          </span>
        </div>
        <p className="text-[11px] text-amber-700/80 mt-1">Phát hiện nguy cơ tin giả & lan truyền nhanh</p>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500" />
      </div>

    </div>
  );
};
