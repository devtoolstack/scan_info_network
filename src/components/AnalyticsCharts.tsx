import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { ArticleItem } from '../types';
import { TrendingUp, PieChart as PieIcon, BarChart2, ShieldAlert } from 'lucide-react';

interface AnalyticsChartsProps {
  articles: ArticleItem[];
}

const TREND_DATA = [
  { time: '18/07', positive: 120, neutral: 85, negative: 15 },
  { time: '19/07', positive: 145, neutral: 90, negative: 18 },
  { time: '20/07', positive: 190, neutral: 110, negative: 25 },
  { time: '21/07', positive: 210, neutral: 130, negative: 40 },
  { time: '22/07', positive: 340, neutral: 180, negative: 52 },
  { time: '23/07', positive: 480, neutral: 220, negative: 38 },
  { time: 'Hôm nay', positive: 620, neutral: 310, negative: 45 },
];

const COLORS = ['#10b981', '#3b82f6', '#f43f5e', '#a855f7'];

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ articles }) => {
  // Compute Source Distribution
  const centralCount = articles.filter(a => a.sourceCategory === 'central_news').length;
  const localCount = articles.filter(a => a.sourceCategory === 'local_news').length;
  const socialCount = articles.filter(a => a.sourceCategory === 'social_media').length;
  const intlCount = articles.filter(a => a.sourceCategory === 'international').length;

  const sourcePieData = [
    { name: 'Báo Trung ương', value: centralCount || 28, color: '#a855f7' },
    { name: 'Báo Địa phương', value: localCount || 34, color: '#3b82f6' },
    { name: 'Mạng xã hội', value: socialCount || 42, color: '#ec4899' },
    { name: 'Báo Quốc tế', value: intlCount || 12, color: '#10b981' },
  ];

  // Compute Topic Distribution
  const topicMap: Record<string, number> = {};
  articles.forEach(a => {
    topicMap[a.topicTag] = (topicMap[a.topicTag] || 0) + 1;
  });

  const topicBarData = Object.keys(topicMap).map(key => ({
    topic: key,
    count: topicMap[key],
  })).sort((a, b) => b.count - a.count).slice(0, 6);

  if (topicBarData.length === 0) {
    topicBarData.push(
      { topic: 'Hạ tầng & Giao thông', count: 45 },
      { topic: 'KHCN & Chuyển đổi số', count: 38 },
      { topic: 'Nông nghiệp & Thị trường', count: 29 },
      { topic: 'Du lịch & Văn hóa', count: 24 },
      { topic: 'Hành chính công', count: 18 },
    );
  }

  return (
    <div className="space-y-6 mb-8">
      
      {/* Chart Row 1: Sentiment Trend Area Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              Diễn biến Sắc thái Dư luận theo Thời gian (7 ngày qua)
            </h3>
            <p className="text-xs text-slate-500">
              Số lượng tin bài tích cực, trung lập và tiêu cực được ghi nhận qua hệ thống crawler
            </p>
          </div>
          <span className="px-2.5 py-1 bg-cyan-50 text-cyan-700 text-xs font-semibold rounded-lg border border-cyan-200">
            Cập nhật Thời gian thực
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Area type="monotone" dataKey="positive" name="Tích cực" stroke="#10b981" fillOpacity={1} fill="url(#colorPos)" />
              <Area type="monotone" dataKey="neutral" name="Trung lập" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNeu)" />
              <Area type="monotone" dataKey="negative" name="Tiêu cực" stroke="#f43f5e" fillOpacity={1} fill="url(#colorNeg)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Row 2: Source Distribution & Top Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Source Distribution Donut Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
              <PieIcon className="w-4 h-4 text-cyan-600" />
              Cơ cấu Nguồn Thông tin Giám sát
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tỷ lệ bài viết từ Báo TW, Báo Địa phương, Mạng xã hội và Quốc tế
            </p>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourcePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Topics Horizontal Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1">
              <BarChart2 className="w-4 h-4 text-cyan-600" />
              Chủ đề & Từ khóa Được Đề cập Nhiều nhất
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Số lượng bài viết theo nhóm chủ đề nổi bật được AI gom nhóm tự động
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={topicBarData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="topic" type="category" tick={{ fontSize: 11, fill: '#334155' }} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="count" name="Số bài viết" fill="#0284c7" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
