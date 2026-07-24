import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Sparkles, 
  ExternalLink, 
  BrainCircuit, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  Check, 
  Copy, 
  RefreshCw,
  Globe2,
  Tag
} from 'lucide-react';

export const UrlScannerTab: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleScanUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.analysis);
      }
    } catch (err) {
      console.error('Error analyzing URL:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReport = () => {
    if (!result) return;
    const text = `[SCAN INFO NETWORK - LINK INSPECTOR REPORT]
Tiêu đề: ${result.title}
Tên miền: ${result.sourceDomain}
Sắc thái: ${result.overallSentiment} (${result.sentimentScore}%)
Rủi ro tin giả: ${result.fakeNewsRiskScore}/100
Tóm tắt:
${result.executiveSummary?.map((s: string) => `- ${s}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl text-white border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">
            <LinkIcon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              Công cụ Soi Link & Kiểm tra Bài viết Báo chí AI (URL Deep Inspector)
            </h2>
            <p className="text-xs text-slate-300">
              Dán bất kỳ đường dẫn bài viết báo chí hoặc mạng xã hội. AI sẽ phân tích toàn văn, chấm điểm rủi ro tin giả và tự động rà soát tin liên quan.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleScanUrl} className="mt-4">
          <div className="relative flex items-center">
            <input
              type="url"
              required
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Dán link bài viết tại đây (ví dụ: https://baogialai.com.vn/... hoặc https://vnexpress.net/...)"
              className="w-full pl-4 pr-36 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={loading || !urlInput.trim()}
              className="absolute right-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>AI Đang Soi...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Phân Tích AI</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results View */}
      {loading && (
        <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
          <RefreshCw className="w-8 h-8 text-cyan-600 animate-spin mx-auto" />
          <h3 className="font-bold text-sm text-slate-800">Đang quét toàn văn & đối chiếu cơ sở dữ liệu báo chí...</h3>
          <p className="text-xs text-slate-500">AI Gemini 3.6 Flash đang tính toán điểm rủi ro và trích xuất thực thể ngữ nghĩa.</p>
        </div>
      )}

      {result && !loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          {/* Article Header */}
          <div className="border-b border-slate-100 pb-4 space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded border border-cyan-200 flex items-center gap-1">
                <Globe2 className="w-3 h-3" /> Nguồn: {result.sourceDomain || 'Báo chí Điện tử'}
              </span>
              <a
                href={urlInput}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Mở link gốc</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h3 className="text-xl font-bold text-slate-900 leading-snug">
              {result.title}
            </h3>
          </div>

          {/* Key Metric Meters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Thái độ Sắc thái (Sentiment)
              </span>
              <div className="text-xl font-extrabold text-slate-900 capitalize">
                {result.overallSentiment} ({result.sentimentScore}%)
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Chỉ số Nguy cơ Tin giả / Phản ánh (Risk Score)
              </span>
              <div className={`text-xl font-extrabold ${result.fakeNewsRiskScore > 60 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {result.fakeNewsRiskScore}/100 {result.fakeNewsRiskScore > 60 ? '⚠️ Cảnh báo' : '✅ An toàn'}
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-600" />
              Tóm tắt Từng Ý Chính (Executive Summary)
            </h4>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
              <ul className="list-disc pl-5 space-y-1.5">
                {result.executiveSummary?.map((summaryItem: string, idx: number) => (
                  <li key={idx}>{summaryItem}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Entities */}
          {result.keyEntities && result.keyEntities.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-cyan-600" />
                Thực thể Trọng tâm
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.keyEntities.map((e: any, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-800">
                    <span className="text-[10px] text-slate-400 mr-1">[{e.category}]</span>
                    {e.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleCopyReport}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép kết quả!' : 'Sao chép Kết quả Phân tích'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
