import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to instantiate Gemini AI client safely on the server side
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing in environment variables.');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Route: AI-powered scan across central news, local news, social media, and global sources
app.post('/api/scan', async (req, res) => {
  try {
    const { query, sourceCategory = 'all', noiseFilterActive = true } = req.body;
    
    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Keyword or URL is required' });
      return;
    }

    const ai = getGeminiClient();
    const isUrl = query.trim().startsWith('http://') || query.trim().startsWith('https://');

    const prompt = isUrl
      ? `Bạn là hệ thống AI Giám sát và Thu thập Thông tin Internet (Scan Info Network). 
Người dùng vừa dán 1 link bài viết: "${query}".
Hãy phân tích ngữ nghĩa bài viết này và đồng thời TỰ ĐỘNG TÌM KIẾM, ĐỒNG BỘ tất cả các bài viết liên quan từ Báo trung ương (VTV, VnExpress, Tuổi Trẻ, Nhân Dân...), Báo địa phương (Báo Gia Lai, Báo SGGP, Báo Hà Nội Mới...), Mạng xã hội (Facebook, TikTok, YouTube, Zalo) và Báo Quốc tế (Reuters, BBC, CNA...) nói về chủ đề này.

Yêu cầu trả về định dạng JSON gồm danh sách 6-10 bài viết liên quan được tìm thấy kèm chỉ số thống kê.`
      : `Bạn là hệ thống AI Giám sát và Thu thập Thông tin Internet hàng đầu (Scan Info Network).
Người dùng nhập từ khóa tìm kiếm: "${query}".
Hãy mô phỏng quét thu thập tự động tất cả các thông tin bài viết liên quan từ:
1. Báo Trung ương (VTV, VnExpress, Tuổi Trẻ, Thanh Niên, Nhân Dân...)
2. Báo Địa phương (Báo Gia Lai, Báo SGGP, Báo Đà Nẵng, Báo Hà Nội Mới...)
3. Mạng xã hội (Facebook, TikTok, YouTube, Zalo, X)
4. Báo chí Quốc tế (Reuters, BBC, CNA, Bloomberg...)

Phân tích ngữ nghĩa AI để lọc nhiễu (loại bỏ tin rác, spam, cò đất, bài trùng lặp), phân loại thái độ (positive: tích cực, neutral: trung lập, negative: tiêu cực), trích xuất thực thể chính (Entities) và tính điểm rủi ro tin giả/hoang mang (riskScore: 0-100).
Trả về kết quả dưới dạng JSON chuẩn.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: `Bạn là hệ thống AI lõi của Scan Info Network. Hãy luôn trả về đúng cấu trúc JSON phù hợp schema yêu cầu. Thông tin bằng tiếng Việt chính xác, súc tích, mang tính chuyên môn cao như các hệ thống giám sát báo chí chính phủ và tập đoàn lớn.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            articles: {
              type: Type.ARRAY,
              description: 'Danh sách bài viết được thu thập và phân tích',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                  sourceName: { type: Type.STRING },
                  sourceCategory: {
                    type: Type.STRING,
                    description: 'Phân loại nguồn: central_news, local_news, social_media, international',
                  },
                  publishedAt: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  sentiment: { type: Type.STRING, description: 'positive, neutral, negative' },
                  sentimentScore: { type: Type.NUMBER, description: 'Phần trăm độ tin cậy sentiment (0-100)' },
                  isNoise: { type: Type.BOOLEAN, description: 'True nếu là tin nhiễu/spam' },
                  noiseReason: { type: Type.STRING, description: 'Lý do bị gắn cờ tin nhiễu nếu có' },
                  riskScore: { type: Type.NUMBER, description: 'Mức độ rủi ro tin đồn/tin giả/tiêu cực (0-100)' },
                  topicTag: { type: Type.STRING, description: 'Chủ đề chi tiết' },
                  engagementCount: { type: Type.NUMBER },
                  reachEstimate: { type: Type.NUMBER },
                  entities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        category: { type: Type.STRING, description: 'Organization, Location, Person, Policy, Keyword' },
                      },
                      required: ['name', 'category'],
                    },
                  },
                },
                required: [
                  'id',
                  'title',
                  'url',
                  'sourceName',
                  'sourceCategory',
                  'publishedAt',
                  'summary',
                  'sentiment',
                  'sentimentScore',
                  'isNoise',
                  'riskScore',
                  'topicTag',
                  'entities',
                ],
              },
            },
            aiSummaryOverview: {
              type: Type.STRING,
              description: 'Tóm tắt tổng quan AI về luồng dư luận và xu hướng tin tức',
            },
            suggestedTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Các chủ đề nổi bật được phát hiện',
            },
          },
          required: ['articles', 'aiSummaryOverview', 'suggestedTopics'],
        },
      },
    });

    const jsonText = response.text || '{}';
    const parsedData = JSON.parse(jsonText);

    res.json({
      success: true,
      query,
      isUrl,
      articles: parsedData.articles || [],
      aiSummaryOverview: parsedData.aiSummaryOverview || '',
      suggestedTopics: parsedData.suggestedTopics || [],
    });
  } catch (error: any) {
    console.error('Error in /api/scan:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error executing AI scan',
    });
  }
});

// API Route: Deep URL Analysis & Fact-Check Inspector
app.post('/api/analyze-url', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ error: 'URL parameter is required' });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `Phân tích sâu ngữ nghĩa bài viết từ đường dẫn URL: "${url}".
Hãy thực hiện các bước sau:
1. Đánh giá thái độ chung (Positive / Neutral / Negative) và điểm % tự tin.
2. Điểm rủi ro thông tin sai lệch / tin giả (Fake News Risk Score 0-100).
3. Tóm tắt nội dung chính bằng 3-5 gạch đầu dòng ngắn gọn.
4. Trích xuất các thực thể trọng tâm (Cơ quan, Nhân vật, Địa danh, Chính sách).
5. Phân tích thái độ theo từng đoạn/ý chính.
6. Đưa ra khuyến nghị xử lý truyền thông cho cơ quan/doanh nghiệp.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            sourceDomain: { type: Type.STRING },
            authorName: { type: Type.STRING },
            publishDate: { type: Type.STRING },
            overallSentiment: { type: Type.STRING },
            sentimentScore: { type: Type.NUMBER },
            fakeNewsRiskScore: { type: Type.NUMBER },
            isNoise: { type: Type.BOOLEAN },
            noiseReason: { type: Type.STRING },
            executiveSummary: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            keyEntities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
              },
            },
            paragraphAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  paragraphIndex: { type: Type.NUMBER },
                  excerpt: { type: Type.STRING },
                  sentiment: { type: Type.STRING },
                  keyTone: { type: Type.STRING },
                },
              },
            },
            mediaRecommendation: { type: Type.STRING },
          },
          required: [
            'title',
            'sourceDomain',
            'overallSentiment',
            'sentimentScore',
            'fakeNewsRiskScore',
            'executiveSummary',
            'keyEntities',
            'mediaRecommendation',
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    res.json({ success: true, url, analysis: parsedData });
  } catch (error: any) {
    console.error('Error in /api/analyze-url:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Setup Express development / production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Scan Info Network server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
