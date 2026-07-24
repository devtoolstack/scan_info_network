import React, { useState } from 'react';
import { 
  Search, 
  Link as LinkIcon, 
  Sparkles, 
  Filter, 
  RefreshCw, 
  SlidersHorizontal,
  Check,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { SearchFilterState, SourceCategory, SentimentType } from '../types';

interface SearchScannerBarProps {
  filters: SearchFilterState;
  onFilterChange: (newFilters: Partial<SearchFilterState>) => void;
  onExecuteScan: (query: string) => void;
  isScanning: boolean;
  totalArticlesCount: number;
}

const PRESET_KEYWORDS = [
  'Năm lượng tử Gia Lai 2026',
  'Cao tốc Quy Nhơn Pleiku',
  'Giá cà phê Gia Lai',
  'Chuyển đổi số báo chí',
  'Du lịch Măng Đen Gia Lai',
  'Lễ hội Cồng Chiêng',
  'Hạ tầng giao thông Tây Nguyên'
];

export const SearchScannerBar: React.FC<SearchScannerBarProps> = ({
  filters,
  onFilterChange,
  onExecuteScan,
  isScanning,
  totalArticlesCount,
}) => {
  const [inputVal, setInputVal] = useState(filters.query);

  const isUrlInput = inputVal.trim().startsWith('http://') || inputVal.trim().startsWith('https://');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onExecuteScan(inputVal.trim());
  };

  const handleSelectPreset = (preset: string) => {
    setInputVal(preset);
    onExecuteScan(preset);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 mb-6">
      
      {/* Title & Guidance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-cyan-600" />
            Truy quét & Tìm kiếm Bài viết Tự động trên Toàn Quốc & Quốc Tế
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Nhập <strong className="text-slate-700">từ khóa bất kỳ</strong> hoặc <strong className="text-slate-700">dán đường dẫn (Link bài viết)</strong>. AI sẽ quét báo TW, báo địa phương, MXH và tin quốc tế.
          </p>
        </div>

        {/* AI Noise Filter Badge Toggle */}
        <button
          type="button"
          onClick={() => onFilterChange({ noiseFilterActive: !filters.noiseFilterActive })}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
            filters.noiseFilterActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 shadow-sm'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${filters.noiseFilterActive ? 'text-emerald-600' : 'text-slate-400'}`} />
          <span>Lọc Nhiễu AI: {filters.noiseFilterActive ? 'Bật (Đã lọc tin rác)' : 'Tắt (Xem tất cả)'}</span>
        </button>
      </div>

      {/* Main Search / Link Input Form */}
      <form onSubmit={handleSubmit} className="relative mb-3">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            {isUrlInput ? (
              <LinkIcon className="w-5 h-5 text-cyan-600 animate-pulse" />
            ) : (
              <Search className="w-5 h-5 text-slate-400" />
            )}
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              onFilterChange({ query: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (inputVal.trim()) {
                  onExecuteScan(inputVal.trim());
                }
              }
            }}
            placeholder="Gõ từ khóa (ví dụ: 'Năm lượng tử Gia Lai 2026') HOẶC dán link bài viết (https://...)..."
            className="w-full pl-12 pr-36 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-white transition-all shadow-inner"
          />

          <button
            type="submit"
            disabled={isScanning || !inputVal.trim()}
            className="absolute right-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-medium text-xs rounded-lg transition-all shadow-md shadow-cyan-600/20 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI Quét...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isUrlInput ? 'Soi Link AI' : 'Quét Thông Tin'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preset Keyword Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-slate-500">Từ khóa phổ biến:</span>
        {PRESET_KEYWORDS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className="px-2.5 py-1 bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 border border-slate-200 rounded-lg text-xs text-slate-600 transition-colors cursor-pointer"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Filter Row: Source Filter & Sentiment Filter */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Source Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Nguồn:
          </span>
          {[
            { id: 'all', label: 'Tất cả nguồn' },
            { id: 'central_news', label: 'Báo Trung ương' },
            { id: 'local_news', label: 'Báo Địa phương' },
            { id: 'social_media', label: 'Mạng xã hội' },
            { id: 'international', label: 'Báo Quốc tế' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onFilterChange({ sourceCategory: cat.id as any })}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filters.sourceCategory === cat.id
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sentiment Filter Tabs */}
        <div className="flex items-center gap-1">
          <span className="text-slate-500 font-medium mr-1">Sắc thái:</span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'positive', label: '🟢 Tích cực' },
            { id: 'neutral', label: '🔵 Trung lập' },
            { id: 'negative', label: '🔴 Tiêu cực' },
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onFilterChange({ sentiment: s.id as any })}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filters.sentiment === s.id
                  ? 'bg-cyan-600 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
