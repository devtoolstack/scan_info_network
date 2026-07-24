import React, { useState, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  SearchScannerBar 
} from './components/SearchScannerBar';
import { 
  MetricCards 
} from './components/MetricCards';
import { 
  ArticleCard 
} from './components/ArticleCard';
import { 
  ArticleDetailModal 
} from './components/ArticleDetailModal';
import { 
  AnalyticsCharts 
} from './components/AnalyticsCharts';
import { 
  AlertsTab 
} from './components/AlertsTab';
import { 
  UrlScannerTab 
} from './components/UrlScannerTab';
import { 
  CrawlerConfigTab 
} from './components/CrawlerConfigTab';
import { 
  NewCampaignModal 
} from './components/NewCampaignModal';

import { 
  INITIAL_ARTICLES, 
  INITIAL_CAMPAIGNS, 
  INITIAL_ALERTS 
} from './data/mockFeed';
import { 
  ArticleItem, 
  SearchFilterState, 
  SentimentStats, 
  MonitoringCampaign, 
  AlertNotification 
} from './types';

import { 
  Radio, 
  BarChart3, 
  Bell, 
  Link as LinkIcon, 
  SlidersHorizontal, 
  Sparkles, 
  FileSpreadsheet, 
  RefreshCw,
  Info,
  CheckCircle2,
  ListFilter
} from 'lucide-react';

export default function App() {
  const [campaigns, setCampaigns] = useState<MonitoringCampaign[]>(INITIAL_CAMPAIGNS);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('camp-1');
  const [articles, setArticles] = useState<ArticleItem[]>(INITIAL_ARTICLES);
  const [alerts, setAlerts] = useState<AlertNotification[]>(INITIAL_ALERTS);

  const [activeTab, setActiveTab] = useState<'feed' | 'analytics' | 'alerts' | 'url_scanner' | 'config'>('feed');

  const [filters, setFilters] = useState<SearchFilterState>({
    query: '',
    sourceCategory: 'all',
    sentiment: 'all',
    noiseFilterActive: true,
    dateRange: 'all',
    topic: 'all',
  });

  const [isScanning, setIsScanning] = useState(false);
  const [activeDetailArticle, setActiveDetailArticle] = useState<ArticleItem | null>(null);
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [aiOverview, setAiOverview] = useState<string>(
    'Dư luận truyền thông 24h qua về các dự án hạ tầng và kinh tế Gia Lai duy trì sắc thái Tích cực (68%). Đã chủ động lọc 12 nội dung tin rác rao bán đất nền trái phép.'
  );

  // Filtered Articles Computation
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Noise filter
      if (filters.noiseFilterActive && art.isNoise) {
        return false;
      }

      // Source category filter
      if (filters.sourceCategory !== 'all' && art.sourceCategory !== filters.sourceCategory) {
        return false;
      }

      // Sentiment filter
      if (filters.sentiment !== 'all' && art.sentiment !== filters.sentiment) {
        return false;
      }

      // Query filter if entered
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(q);
        const matchesSummary = art.summary.toLowerCase().includes(q);
        const matchesSource = art.sourceName.toLowerCase().includes(q);
        const matchesTopic = art.topicTag.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesSource && !matchesTopic) {
          return false;
        }
      }

      return true;
    });
  }, [articles, filters]);

  // Compute Sentiment Stats
  const stats: SentimentStats = useMemo(() => {
    const total = articles.length;
    const positive = articles.filter((a) => a.sentiment === 'positive').length;
    const neutral = articles.filter((a) => a.sentiment === 'neutral').length;
    const negative = articles.filter((a) => a.sentiment === 'negative').length;
    const filteredNoiseCount = articles.filter((a) => a.isNoise).length;
    const highRiskCount = articles.filter((a) => a.riskScore && a.riskScore > 60).length;

    return {
      total,
      positive,
      neutral,
      negative,
      filteredNoiseCount,
      highRiskCount,
    };
  }, [articles]);

  // Trigger AI Scan via Express API
  const handleExecuteScan = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsScanning(true);
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          sourceCategory: filters.sourceCategory,
          noiseFilterActive: filters.noiseFilterActive,
        }),
      });

      const data = await res.json();

      if (data.success && Array.isArray(data.articles) && data.articles.length > 0) {
        // Merge returned articles into feed
        setArticles((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newItems = data.articles.filter((a: ArticleItem) => !existingIds.has(a.id));
          return [...newItems, ...prev];
        });

        if (data.aiSummaryOverview) {
          setAiOverview(data.aiSummaryOverview);
        }
      }
    } catch (err) {
      console.error('Failed to run AI scan:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleToggleArticleNoise = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, isNoise: !a.isNoise } : a))
    );
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const handleAddCampaign = (newCamp: MonitoringCampaign) => {
    setCampaigns([newCamp, ...campaigns]);
    setSelectedCampaignId(newCamp.id);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      
      {/* App Header */}
      <Header
        alerts={alerts}
        onOpenAlertsTab={() => setActiveTab('alerts')}
        isScanning={isScanning}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 mb-6 overflow-x-auto">
          <div className="flex items-center space-x-1 sm:space-x-2 pb-px">
            
            {[
              { id: 'feed', label: 'Luồng Tin tức Live', icon: <Radio className="w-4 h-4" /> },
              { id: 'analytics', label: 'Báo cáo & Phân tích', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'alerts', label: 'Trung tâm Cảnh báo', icon: <Bell className="w-4 h-4" /> },
              { id: 'url_scanner', label: 'Soi Link AI', icon: <LinkIcon className="w-4 h-4" /> },
              { id: 'config', label: 'Cấu hình Thu thập', icon: <SlidersHorizontal className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-cyan-600 text-cyan-600 bg-white/60 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.id === 'alerts' && alerts.filter(a => !a.read).length > 0 && (
                  <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-bold">
                    {alerts.filter(a => !a.read).length}
                  </span>
                )}
              </button>
            ))}

          </div>
        </div>

        {/* Global Metric Cards Summary */}
        <MetricCards stats={stats} />

        {/* Tab 1: Live Stream & Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            
            {/* Unified Search & URL Bar */}
            <SearchScannerBar
              filters={filters}
              onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
              onExecuteScan={handleExecuteScan}
              isScanning={isScanning}
              totalArticlesCount={filteredArticles.length}
            />

            {/* AI Executive Summary Banner */}
            {aiOverview && (
              <div className="p-4 bg-gradient-to-r from-cyan-900 via-slate-900 to-indigo-950 rounded-2xl text-white shadow-md border border-slate-800 flex items-start gap-3">
                <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 animate-spin" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-300">
                    Đánh giá Tổng quan Dư luận từ AI Scan Info Network
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    {aiOverview}
                  </p>
                </div>
              </div>
            )}

            {/* Feed List Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ListFilter className="w-4 h-4 text-cyan-600" />
                Danh sách Bài viết Thu thập ({filteredArticles.length} kết quả)
              </h3>
              <span className="text-xs text-slate-500">
                Sắp xếp: Mới nhất trước
              </span>
            </div>

            {/* Articles List */}
            {filteredArticles.length === 0 ? (
              <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                <Info className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-bold text-sm text-slate-700">Không tìm thấy bài viết phù hợp bộ lọc</h4>
                <p className="text-xs text-slate-500">
                  Thử đổi từ khóa hoặc tắt chế độ "Lọc Nhiễu AI" để xem toàn bộ tin tức.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((art) => (
                  <ArticleCard
                    key={art.id}
                    article={art}
                    onOpenDetailModal={(article) => setActiveDetailArticle(article)}
                    onToggleNoise={handleToggleArticleNoise}
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Analytics & Visual Charts */}
        {activeTab === 'analytics' && (
          <AnalyticsCharts articles={articles} />
        )}

        {/* Tab 3: Real-Time Alerts Center */}
        {activeTab === 'alerts' && (
          <AlertsTab
            alerts={alerts}
            articles={articles}
            onMarkAllAsRead={handleMarkAllAlertsRead}
            onOpenArticleDetail={(article) => setActiveDetailArticle(article)}
          />
        )}

        {/* Tab 4: URL Inspector */}
        {activeTab === 'url_scanner' && (
          <UrlScannerTab />
        )}

        {/* Tab 5: Crawler Configuration */}
        {activeTab === 'config' && (
          <CrawlerConfigTab />
        )}

      </main>

      {/* Article Detail Modal */}
      {activeDetailArticle && (
        <ArticleDetailModal
          article={activeDetailArticle}
          onClose={() => setActiveDetailArticle(null)}
        />
      )}

      {/* New Campaign Modal */}
      {showNewCampaignModal && (
        <NewCampaignModal
          onClose={() => setShowNewCampaignModal(false)}
          onAddCampaign={handleAddCampaign}
        />
      )}

      {/* System Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Scan Info Network</span>
            <span className="text-slate-500">|</span>
            <span>Hệ thống Giám sát & Phân tích Dư luận Báo chí AI</span>
          </div>
          <div className="text-slate-500">
            Powered by Google Gemini 3.6 Flash & Server-Side Intelligence
          </div>
        </div>
      </footer>

    </div>
  );
}
