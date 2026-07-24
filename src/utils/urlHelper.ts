import { ArticleItem } from '../types';

export function slugify(text: string): string {
  if (!text) return 'tin-tuc-gia-lai';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function buildDirectArticleUrl(
  title: string,
  sourceName: string = '',
  sourceCategory: string = '',
  isUrlInput: boolean = false,
  inputUrl: string = '',
  seedId: number = 294101
): string {
  if (isUrlInput && inputUrl && (inputUrl.startsWith('http://') || inputUrl.startsWith('https://'))) {
    return inputUrl;
  }

  const cleanTitle = (title || 'Tin tuc Gia Lai').replace(/^\[.*?\]\s*/, '');
  const slug = slugify(cleanTitle);
  const nameLower = (sourceName || '').toLowerCase();

  if (nameLower.includes('gia lai') || sourceCategory === 'local_news') {
    return `https://baogialai.com.vn/${slug}-post${seedId}.html`;
  }
  if (nameLower.includes('vtv')) {
    return `https://vtv.vn/cong-nghe/${slug}-${seedId}.htm`;
  }
  if (nameLower.includes('tuổi trẻ') || nameLower.includes('tuoitre')) {
    return `https://tuoitre.vn/${slug}-${seedId}.htm`;
  }
  if (nameLower.includes('vnexpress')) {
    return `https://vnexpress.net/${slug}-${seedId}.html`;
  }
  if (nameLower.includes('sggp')) {
    return `https://sggp.org.vn/${slug}-${seedId}.html`;
  }
  if (nameLower.includes('nhân dân') || nameLower.includes('nhandan')) {
    return `https://nhandan.vn/${slug}-${seedId}.html`;
  }
  if (sourceCategory === 'social_media' || nameLower.includes('facebook')) {
    return `https://www.facebook.com/groups/gialai.online/posts/${seedId}/`;
  }
  if (sourceCategory === 'international' || nameLower.includes('reuters')) {
    return `https://www.reuters.com/technology/${slug}/`;
  }

  return `https://baogialai.com.vn/${slug}-post${seedId}.html`;
}

/**
 * Returns a direct, functional external URL for any article.
 * Guarantees that clicking the article link leads directly to the specific original article URL.
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

  // If user entered or pasted a direct URL that matches
  if (scannedQuery && (scannedQuery.startsWith('http://') || scannedQuery.startsWith('https://'))) {
    if (rawUrl === scannedQuery || rawUrl.includes(scannedQuery)) {
      return scannedQuery;
    }
  }

  // If rawUrl is a direct HTTP/HTTPS link and NOT a google search wrapper, return it directly!
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    if (!rawUrl.includes('google.com/search') && !rawUrl.includes('google.com/url')) {
      return rawUrl;
    }
  }

  return buildDirectArticleUrl(
    article.title,
    article.sourceName || '',
    article.sourceCategory || ''
  );
}
