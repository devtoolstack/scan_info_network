import { ArticleItem } from '../types';

/**
 * Returns a clean, working external URL for any article.
 * Prevents dead/fictional post IDs that cause news sites (like Báo Gia Lai) to load unrelated fallback articles.
 */
export function getArticleExternalUrl(article: {
  title: string;
  url?: string;
  sourceName?: string;
  sourceCategory?: string;
  scannedQuery?: string;
}): string {
  if (!article) return '#';

  const rawUrl = (article.url || '').trim();
  const scannedQuery = (article.scannedQuery || '').trim();
  const isUrlInput = scannedQuery.startsWith('http://') || scannedQuery.startsWith('https://');

  // 1. If user entered a specific direct URL, use that exact URL
  if (isUrlInput) {
    return scannedQuery;
  }

  // 2. If article has a valid real news URL from mockFeed or real source (and NOT a fake generated post ID)
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    if (
      !rawUrl.includes('google.com/search') &&
      !rawUrl.includes('google.com/url') &&
      !rawUrl.includes('post29410') &&
      !rawUrl.includes('20260724101522') &&
      !rawUrl.includes('20260724120011') &&
      !rawUrl.includes('88214299102')
    ) {
      return rawUrl;
    }
  }

  // 3. For scanned queries or generated items: construct clean, direct search URLs on official portals
  // This guarantees that clicking the link opens live results with ACTUAL relevant articles for the searched keyword!
  const queryTerm = scannedQuery || article.title.replace(/^\[.*?\]\s*/, '').replace(/^(Báo Gia Lai|VTV News|Báo Tuổi Trẻ|Facebook Trending|Reuters)\s*:\s*/i, '');
  const cleanTerm = queryTerm.trim();
  const encTerm = encodeURIComponent(cleanTerm);
  const sourceName = (article.sourceName || '').toLowerCase();
  const sourceCategory = article.sourceCategory || '';

  if (sourceName.includes('gia lai') || sourceCategory === 'local_news') {
    return `https://www.google.com/search?q=site:baogialai.com.vn+${encTerm}`;
  }
  if (sourceName.includes('vtv')) {
    return `https://vtv.vn/tim-kiem.htm?keywords=${encTerm}`;
  }
  if (sourceName.includes('tuổi trẻ') || sourceName.includes('tuoitre')) {
    return `https://tuoitre.vn/tim-kiem.htm?keywords=${encTerm}`;
  }
  if (sourceName.includes('vnexpress')) {
    return `https://vnexpress.net/tim-kiem?q=${encTerm}`;
  }
  if (sourceCategory === 'social_media' || sourceName.includes('facebook')) {
    return `https://www.facebook.com/search/posts?q=${encTerm}`;
  }
  if (sourceCategory === 'international' || sourceName.includes('reuters')) {
    return `https://www.reuters.com/site-search/?query=${encTerm}`;
  }

  return `https://news.google.com/search?q=${encTerm}&hl=vi-VN&gl=VN&ceid=VN:vi`;
}
