import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Sliders, 
  Check, 
  Radio, 
  Mail, 
  Send 
} from 'lucide-react';
import { AlertNotification, AlertRule, ArticleItem } from '../types';

interface AlertsTabProps {
  alerts: AlertNotification[];
  articles: ArticleItem[];
  onMarkAllAsRead: () => void;
  onOpenArticleDetail: (article: ArticleItem) => void;
}

const DEFAULT_RULES: AlertRule[] = [
  {
    id: 'rule-1',
    name: 'Cảnh báo Báo động Tin giả / Bóp méo nông sản',
    keyword: 'dịch bệnh cà phê, ép giá, sương muối cháy lá',
    thresholdType: 'fake_news',
    thresholdValue: 75,
    enabled: true,
    channels: ['dashboard', 'email'],
    createdAt: '2026-07-20',
  },
  {
    id: 'rule-2',
    name: 'Cảnh báo Đột biến Tin Tiêu cực về Hạ tầng',
    keyword: 'cao tốc, tiến độ, giải phóng mặt bằng',
    thresholdType: 'negative_spike',
    thresholdValue: 150,
    enabled: true,
    channels: ['dashboard', 'telegram'],
    createdAt: '2026-07-18',
  },
  {
    id: 'rule-3',
    name: 'Cảnh báo Tin bão bùng Tương tác khủng (Viral Reach)',
    keyword: 'Gia Lai, Pleiku, Măng Đen',
    thresholdType: 'viral_reach',
    thresholdValue: 50000,
    enabled: true,
    channels: ['dashboard'],
    createdAt: '2026-07-15',
  }
];

export const AlertsTab: React.FC<AlertsTabProps> = ({
  alerts,
  articles,
  onMarkAllAsRead,
  onOpenArticleDetail,
}) => {
  const [rules, setRules] = useState<AlertRule[]>(DEFAULT_RULES);
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleKeyword, setNewRuleKeyword] = useState('');
  const [newRuleThreshold, setNewRuleThreshold] = useState(70);

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim() || !newRuleKeyword.trim()) return;

    const createdRule: AlertRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName,
      keyword: newRuleKeyword,
      thresholdType: 'fake_news',
      thresholdValue: newRuleThreshold,
      enabled: true,
      channels: ['dashboard', 'email'],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRules([createdRule, ...rules]);
    setNewRuleName('');
    setNewRuleKeyword('');
    setShowAddRuleModal(false);
  };

  const handleToggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Alert Feed Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-600 animate-bounce" />
            Trung tâm Cảnh báo Thời gian thực (Real-time Alert Center)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tự động giám sát biến động dữ liệu, thông tin tiêu cực đột biến và nghi vấn tin giả 24/7.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllAsRead}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Đánh dấu Đã đọc tất cả
          </button>
          <button
            onClick={() => setShowAddRuleModal(true)}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-rose-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            Tạo Quy tắc Cảnh báo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Triggered Notifications Stream (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            Nhật ký Cảnh báo Mới nhận
          </h3>

          {alerts.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs">Không có cảnh báo rủi ro mới nào. Hệ thống an toàn.</p>
            </div>
          ) : (
            alerts.map((alt) => {
              const matchedArticle = articles.find(a => a.id === alt.articleId);

              return (
                <div
                  key={alt.id}
                  className={`p-4 rounded-xl border transition-all ${
                    !alt.read
                      ? alt.severity === 'high'
                        ? 'bg-rose-50/70 border-rose-300 shadow-sm'
                        : 'bg-amber-50/70 border-amber-300 shadow-sm'
                      : 'bg-white border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {alt.severity === 'high' ? (
                        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                      ) : alt.severity === 'medium' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      ) : (
                        <Info className="w-5 h-5 text-cyan-600 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">
                          {alt.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">{alt.timestamp}</span>
                      </div>
                    </div>

                    {!alt.read && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-600 text-white">
                        Mới
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    {alt.message}
                  </p>

                  {matchedArticle && (
                    <div className="p-2.5 bg-white/80 border border-slate-200/80 rounded-lg flex items-center justify-between text-xs">
                      <span className="truncate font-medium text-slate-800 max-w-[80%]">
                        📌 {matchedArticle.title}
                      </span>
                      <button
                        onClick={() => onOpenArticleDetail(matchedArticle)}
                        className="text-cyan-700 hover:underline font-bold text-xs cursor-pointer shrink-0"
                      >
                        Xem bài viết
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Alert Rules Engine */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-600" />
            Cấu hình Quy tắc Cảnh báo (Rules)
          </h3>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{rule.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRule(rule.id)}
                      className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                        rule.enabled ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform absolute top-0.25 ${
                        rule.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </button>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Xóa quy tắc"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <div>
                    <span className="font-medium text-slate-500">Từ khóa theo dõi:</span>{' '}
                    <strong className="text-slate-800">{rule.keyword}</strong>
                  </div>
                  <div>
                    <span className="font-medium text-slate-500">Ngưỡng kích hoạt:</span>{' '}
                    <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                      {rule.thresholdValue}% rủi ro
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Add Rule */}
      {showAddRuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Thêm Quy tắc Cảnh báo Mới</h3>
            
            <form onSubmit={handleAddRule} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tên quy tắc</label>
                <input
                  type="text"
                  required
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  placeholder="ví dụ: Cảnh báo Tin bóp méo Dự án Cao tốc"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Từ khóa theo dõi (phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  required
                  value={newRuleKeyword}
                  onChange={(e) => setNewRuleKeyword(e.target.value)}
                  placeholder="ví dụ: Quy Nhơn Pleiku, chậm tiến độ, đền bù"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Ngưỡng rủi ro kích hoạt: {newRuleThreshold}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={newRuleThreshold}
                  onChange={(e) => setNewRuleThreshold(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium shadow-sm shadow-rose-600/20"
                >
                  Tạo Quy tắc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
