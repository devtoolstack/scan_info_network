export type SentimentType = 'positive' | 'neutral' | 'negative';

export type SourceCategory = 
  | 'central_news'     // Báo Trung ương (VTV, VNExpress, Tuổi Trẻ, Nhân Dân,...)
  | 'local_news'       // Báo Địa phương (Báo Gia Lai, Báo Hà Nội Mới, Báo Sài Gòn Giải Phóng,...)
  | 'social_media'     // Mạng xã hội (Facebook, TikTok, YouTube, Zalo, X, Forums)
  | 'international';    // Quốc tế (Reuters, BBC, CNA, Bloomberg,...)

export interface Entity {
  name: string;
  category: 'Organization' | 'Location' | 'Person' | 'Keyword' | 'Policy';
}

export interface ArticleItem {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  sourceCategory: SourceCategory;
  publishedAt: string; // ISO or formatted string
  summary: string;
  contentSnippet?: string;
  sentiment: SentimentType;
  sentimentScore: number; // 0 - 100%
  isNoise: boolean;
  noiseReason?: string;
  entities: Entity[];
  engagementCount?: number;
  reachEstimate?: number;
  riskScore?: number; // 0 - 100 (0 low, 100 high fake news or viral panic risk)
  isAlertTriggered?: boolean;
  alertMessage?: string;
  author?: string;
  topicTag: string;
  scannedQuery?: string;
}

export interface SearchFilterState {
  query: string;
  sourceCategory: 'all' | SourceCategory;
  sentiment: 'all' | SentimentType;
  noiseFilterActive: boolean;
  dateRange: '24h' | '7d' | '30d' | 'all';
  topic: string;
}

export interface SentimentStats {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  filteredNoiseCount: number;
  highRiskCount: number;
}

export interface AlertRule {
  id: string;
  name: string;
  keyword: string;
  thresholdType: 'negative_spike' | 'fake_news' | 'high_volume' | 'viral_reach';
  thresholdValue: number;
  enabled: boolean;
  channels: ('dashboard' | 'email' | 'telegram')[];
  createdAt: string;
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'info';
  timestamp: string;
  articleId?: string;
  read: boolean;
}

export interface MonitoringCampaign {
  id: string;
  name: string;
  keywords: string[];
  excludedKeywords: string[];
  description: string;
  articleCount: number;
  lastUpdated: string;
  active: boolean;
}
