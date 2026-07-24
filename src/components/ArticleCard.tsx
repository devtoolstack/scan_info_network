import React from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  ShieldAlert, 
  Filter, 
  MessageSquare, 
  Eye, 
  Share2, 
  Bookmark, 
  Tag, 
  Clock,
  ThumbsUp,
  ThumbsDown,
  MinusCircle,
  Building,
  MapPin,
  User,
  HelpCircle
} from 'lucide-react';
import { ArticleItem, SourceCategory } from '../types';
import { getArticleExternalUrl } from '../utils/urlHelper';

interface ArticleCardProps {
  article: ArticleItem;
  onOpenDetailModal: (article: ArticleItem) => void;
  onToggleNoise: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onOpenDetailModal,
  onToggleNoise,
}) => {
  const getSourceBadge = (cat: SourceCategory) => {
    switch (cat) {
      case 'central_news':
        return { label: 'Báo Trung ương', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'local_news':
        return { label: 'Báo Địa phương', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'social_media':
        return { label: 'Mạng xã hội', bg: 'bg-pink-100 text-pink-800 border-pink-200' };
      case 'international':
        return { label: 'Báo Quốc tế', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      default:
        return { label: 'Tin tức', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const getSentimentBadge = (sentiment: string, score: number) => {
    if (sentiment === 'positive') {
      return {
        label: 'Tích cực',
        icon: <ThumbsUp className="w-3 h-3 mr-1 text-emerald-600" />,
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    } else if (sentiment === 'negative') {
      return {
        label: 'Tiêu cực',
        icon: <ThumbsDown className="w-3 h-3 mr-1 text-rose-600" />,
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    } else {
      return {
        label: 'Trung lập',
        icon: <MinusCircle className="w-3 h-3 mr-1 text-blue-600" />,
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
      };
    }
  };

  const sourceBadge = getSourceBadge(article.sourceCategory);
  const sentimentBadge = getSentimentBadge(article.sentiment, article.sentimentScore);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`bg-white rounded-xl border transition-all hover:shadow-md ${
      article.isNoise 
        ? 'border-amber-200 bg-amber-50/20' 
        : article.riskScore && article.riskScore > 60 
          ? 'border-rose-300 shadow-rose-100/50' 
          : 'border-slate-200'
    }`}>
      <div className="p-4 md:p-5">
        
        {/* Header Tags Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Source Category Tag */}
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${sourceBadge.bg}`}>
              {sourceBadge.label}
            </span>

            {/* Source Name */}
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              {article.sourceName}
            </span>

            {/* Published Date */}
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {formattedDate}
            </span>
          </div>

          {/* Sentiment Badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${sentimentBadge.bg}`}>
              {sentimentBadge.icon}
              {sentimentBadge.label} ({article.sentimentScore}%)
            </span>

            {/* Noise Badge */}
            {article.isNoise && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <Filter className="w-2.5 h-2.5" /> Tin Nhiễu / Rác
              </span>
            )}
          </div>
        </div>

        {/* High Risk Alert Banner if triggered */}
        {article.riskScore && article.riskScore > 60 && (
          <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Cảnh báo rủi ro cao ({article.riskScore}%):</strong>{' '}
              {article.alertMessage || 'Bài viết chứa nội dung nhạy cảm hoặc nguy cơ tin giả lan truyền rộng.'}
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 hover:text-cyan-600 transition-colors leading-snug mb-2">
          <a href={getArticleExternalUrl(article)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1.5 group">
            <span>{article.title}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 shrink-0 mt-1" />
          </a>
        </h3>

        {/* AI Summary / Snippet */}
        <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
          {article.summary}
        </p>

        {/* Noise Reason if filtered */}
        {article.isNoise && article.noiseReason && (
          <div className="mb-3 px-3 py-1.5 bg-amber-100/70 border border-amber-200 rounded-md text-xs text-amber-900 italic">
            <strong>Lý do AI phân loại nhiễu:</strong> {article.noiseReason}
          </div>
        )}

        {/* Entities Tags */}
        {article.entities && article.entities.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3" /> Thực thể:
            </span>
            {article.entities.map((e, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium"
              >
                {e.name}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer: Reach Metrics & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          
          {/* Engagement metrics */}
          <div className="flex items-center gap-4">
            {article.reachEstimate !== undefined && (
              <span className="flex items-center gap-1" title="Lượt tiếp cận ước tính">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {article.reachEstimate.toLocaleString('vi-VN')} lượt tiếp cận
              </span>
            )}
            {article.engagementCount !== undefined && (
              <span className="flex items-center gap-1" title="Lượt tương tác">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                {article.engagementCount.toLocaleString('vi-VN')} tương tác
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
              {article.topicTag}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            
            {/* Toggle Noise Flag */}
            <button
              onClick={() => onToggleNoise(article.id)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                article.isNoise
                  ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
              title={article.isNoise ? 'Bỏ cờ tin nhiễu' : 'Đánh dấu tin nhiễu'}
            >
              {article.isNoise ? 'Gỡ tin nhiễu' : 'Gắn cờ nhiễu'}
            </button>

            {/* Deep AI Analysis Button */}
            <button
              onClick={() => onOpenDetailModal(article)}
              className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-600/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Phân tích AI</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
