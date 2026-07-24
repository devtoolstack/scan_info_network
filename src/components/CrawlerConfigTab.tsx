import React, { useState } from 'react';
import { 
  Radio, 
  Rss, 
  Globe, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  CheckCircle2, 
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';

export const CrawlerConfigTab: React.FC = () => {
  const [sources, setSources] = useState([
    { id: 'src-1', name: 'Báo Gia Lai (Điện tử)', type: 'local_news', url: 'baogialai.com.vn', status: 'active', frequency: '5 phút/lần' },
    { id: 'src-2', name: 'VTV News', type: 'central_news', url: 'vtv.vn', status: 'active', frequency: '15 phút/lần' },
    { id: 'src-3', name: 'VnExpress', type: 'central_news', url: 'vnexpress.net', status: 'active', frequency: '10 phút/lần' },
    { id: 'src-4', name: 'Báo Sài Gòn Giải Phóng', type: 'central_news', url: 'sggp.org.vn', status: 'active', frequency: '15 phút/lần' },
    { id: 'src-5', name: 'Facebook Fanpages & Groups', type: 'social_media', url: 'facebook.com', status: 'active', frequency: '3 phút/lần' },
    { id: 'src-6', name: 'TikTok Vietnam Videos', type: 'social_media', url: 'tiktok.com', status: 'active', frequency: '5 phút/lần' },
    { id: 'src-7', name: 'Reuters International', type: 'international', url: 'reuters.com', status: 'active', frequency: '30 phút/lần' },
  ]);

  const [blacklistedKeywords, setBlacklistedKeywords] = useState([
    'cần bán đất giá rẻ lẻ',
    'game bài đổi thưởng',
    'vay tiền trả góp không thế chấp',
    'spam nhấp link nhận quà'
  ]);

  const [newKeyword, setNewKeyword] = useState('');
  const [saved, setSaved] = useState(false);

  const handleAddBlacklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    setBlacklistedKeywords([...blacklistedKeywords, newKeyword.trim()]);
    setNewKeyword('');
  };

  const handleRemoveBlacklist = (kw: string) => {
    setBlacklistedKeywords(blacklistedKeywords.filter(k => k !== kw));
  };

  const handleSaveConfig = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-600" />
            Cấu hình Mạng lưới Thu thập Tự động (Crawler & Source Feeds)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quản lý tần suất thu thập tin tức, nguồn theo dõi và quy tắc chặn rác/nhiễu tự động.
          </p>
        </div>

        <button
          onClick={handleSaveConfig}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-600/20"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Đã Lưu Cấu Hình!' : 'Lưu Cấu Hình'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Sources Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-cyan-600" />
            Danh sách Nguồn tin Đang Giám sát (7 nguồn hoạt động)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="p-2.5 font-semibold">Tên nguồn</th>
                  <th className="p-2.5 font-semibold">Tên miền / Nền tảng</th>
                  <th className="p-2.5 font-semibold">Tần suất Quét</th>
                  <th className="p-2.5 font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {sources.map((src) => (
                  <tr key={src.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-2.5 font-bold text-slate-900">{src.name}</td>
                    <td className="p-2.5 text-cyan-700 font-medium">{src.url}</td>
                    <td className="p-2.5 text-slate-500">{src.frequency}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ● Đang chạy
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Noise Blacklist Rules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Danh sách Từ khóa Nhiễu / Spam Cần Tự Động Lọc
          </h3>

          <form onSubmit={handleAddBlacklist} className="flex items-center gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Nhập từ khóa rác..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
            <button
              type="submit"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-2">
            {blacklistedKeywords.map((kw, idx) => (
              <div
                key={idx}
                className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs text-slate-700"
              >
                <span>🚫 {kw}</span>
                <button
                  onClick={() => handleRemoveBlacklist(kw)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
