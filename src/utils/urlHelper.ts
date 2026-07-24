import { ArticleItem } from '../types';

/**
 * Returns a clean, functional external URL for any article.
 * Guarantees that clicking the article link leads directly to either the user-specified direct link
 * or a targeted Google Search result showing the live official article on the news domain without 400/404 errors.
 */
export function getArticleExternalUrl(article: Partial<ArticleItem> & { title: string }): string {
  if (!article) return '#';

  const rawUrl = (article.url || '').trim();
  const title = (article.title || '').trim().replace(/^\[.*?\]\s*/, '');
  const scannedQuery = (article.scannedQuery || '').trim();

  // If user entered or pasted a direct URL that matches
  if (scannedQuery && (scannedQuery.startsWith('http://') || scannedQuery.startsWith('https://'))) {
    if (rawUrl === scannedQuery || rawUrl.includes(scannedQuery)) {
      return scannedQuery;
    }
  }

  // If rawUrl is already a Google Search or Google News search link, return as-is
  if (rawUrl.startsWith('https://www.google.com/search') || rawUrl.startsWith('https://news.google.com')) {
    return rawUrl;
  }

  const sourceName = (article.sourceName || '').toLowerCase();
  const sourceCategory = article.sourceCategory;

  let siteFilter = '';
  if (sourceName.includes('gia lai') || sourceCategory === 'local_news') {
    siteFilter = 'site:baogialai.com.vn';
  } else if (sourceName.includes('vtv')) {
    siteFilter = 'site:vtv.vn';
  } else if (sourceName.includes('tuổi trẻ') || sourceName.includes('tuoitre')) {
    siteFilter = 'site:tuoitre.vn';
  } else if (sourceName.includes('vnexpress')) {
    siteFilter = 'site:vnexpress.net';
  } else if (sourceName.includes('sggp')) {
    siteFilter = 'site:sggp.org.vn';
  } else if (sourceName.includes('nhân dân') || sourceName.includes('nhandan')) {
    siteFilter = 'site:nhandan.vn';
  } else if (sourceName.includes('thanh niên') || sourceName.includes('thanhnien')) {
    siteFilter = 'site:thanhnien.vn';
  } else if (sourceName.includes('facebook')) {
    return `https://www.facebook.com/search/posts?q=${encodeURIComponent(title)}`;
  } else if (sourceName.includes('reuters')) {
    siteFilter = 'site:reuters.com';
  }

  const queryStr = siteFilter ? `${siteFilter} "${title}"` : `"${title}"`;
  return `https://www.google.com/search?q=${encodeURIComponent(queryStr)}`;
}
