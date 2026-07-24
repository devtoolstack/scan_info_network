import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle, 
  Tag, 
  FileText, 
  Share2, 
  Copy, 
  Check, 
  BrainCircuit,
  Building2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { ArticleItem } from '../types';
import { getArticleExternalUrl } from '../utils/urlHelper';

interface ArticleDetailModalProps {
  article: ArticleItem | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [deepAnalysis, setDeepAnalysis] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (article) {
      fetchDeepAnalysis(article.url || article.title);
    } else {
      setDeepAnalysis(null);
    }
  }, [article]);

  const fetchDeepAnalysis = async (targetUrl: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setDeepAnalysis(data.analysis);
      }
    } catch (err) {
      console.error('Error fetching deep analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!article) return null;

  const handleCopyReport = () => {
    const externalUrl = getArticleExternalUrl(article);
    const reportText = `[SCAN INFO NETWORK - AI REPORT]
Tiêu đề: ${article.title}
Nguồn: ${article.sourceName} (${externalUrl})
Sắc thái: ${article.sentiment.toUpperCase()} (${article.sentimentScore}%)
Chỉ số rủi ro: ${article.riskScore || 10}/100
Tóm tắt: ${article.summary}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide text-white">
                Báo Cáo Phân Tích Ngữ Nghĩa AI Chi Tiết
              </h3>
              <p className="text-[11px] text-slate-400">Scan Info Network Deep Intelligence Engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Article Info Bar */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
                {article.sourceName}
              </span>
              <a
                href={getArticleExternalUrl(article)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Mở bài viết gốc</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {article.title}
            </h2>
          </div>

          {/* Key Indicators Row: Sentiment & Risk Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Sentiment Meter */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Sắc thái Dư luận
              </span>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xl font-extrabold capitalize ${
                  article.sentiment === 'positive' ? 'text-emerald-600' :
                  article.sentiment === 'negative' ? 'text-rose-600' : 'text-blue-600'
                }`}>
                  {article.sentiment === 'positive' ? '🟢 Tích cực' :
                   article.sentiment === 'negative' ? '🔴 Tiêu cực' : '🔵 Trung lập'}
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {article.sentimentScore}% độ tin cậy
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full ${
                    article.sentiment === 'positive' ? 'bg-emerald-500' :
                    article.sentiment === 'negative' ? 'bg-rose-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${article.sentimentScore}%` }}
                />
              </div>
            </div>

            {/* Risk Score Meter */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Chỉ số Rủi ro Tin giả / Kháng nghị
              </span>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xl font-extrabold ${
                  (article.riskScore || 10) > 60 ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {article.riskScore || 12}/100
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {(article.riskScore || 10) > 60 ? 'Cảnh báo mức Cao' : 'An toàn'}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full ${
                    (article.riskScore || 10) > 60 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${article.riskScore || 12}%` }}
                />
              </div>
            </div>

          </div>

          {/* AI Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-600" />
              Tóm tắt Nội dung Chuyên sâu bởi AI
            </h4>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-800 mb-2">{article.summary}</p>
              {deepAnalysis && deepAnalysis.executiveSummary && (
                <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-2">
                  {deepAnalysis.executiveSummary.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Extracted Entities */}
          {article.entities && article.entities.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-cyan-600" />
                Thực thể Trọng tâm Đã phát hiện (Entities)
              </h4>
              <div className="flex flex-wrap gap-2">
                {article.entities.map((e, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center gap-1"
                  >
                    <span className="text-[10px] text-slate-400 font-normal">[{e.category}]</span>
                    {e.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Paragraph Sentiment Breakdown (if deep analysis returned it) */}
          {deepAnalysis && deepAnalysis.paragraphAnalysis && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                Phân tích Ngữ điệu theo từng Đoạn văn
              </h4>
              <div className="space-y-2">
                {deepAnalysis.paragraphAnalysis.map((p: any, idx: number) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-700">Đoạn {p.paragraphIndex || idx + 1}:</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {p.sentiment} ({p.keyTone})
                      </span>
                    </div>
                    <p className="text-slate-600 italic">"{p.excerpt}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media & Crisis Management Recommendation */}
          <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-xl space-y-1.5">
            <h4 className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-cyan-600" />
              Khuyến nghị Xử lý Truyền thông từ AI Scan Info:
            </h4>
            <p className="text-xs text-cyan-800 leading-relaxed">
              {deepAnalysis?.mediaRecommendation ||
                'Nội dung đang lan truyền theo hướng tích cực/trung lập. Khuyến nghị tiếp tục theo dõi biến động tương tác và duy trì luồng thông tin chính thống từ cơ quan quản lý.'}
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleCopyReport}
            className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép Báo cáo!' : 'Sao chép Báo cáo'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
