# Scan Info Network - AI Media Monitoring & Crawler (Gia Lai System)

> **Hệ thống giám sát, thu thập thông tin tự động trên Internet & Mạng xã hội** tích hợp trí tuệ nhân tạo (AI Gemini), phân tích ngữ nghĩa, lọc tin rác/tin nhiễu và phát hiện cảnh báo rủi ro thời gian thực.

---

## 🌟 Tính năng nổi bật (Key Features)

1. **Truy quét & Crawl Tin tức Đa nguồn (Multi-Source AI Crawler)**
   - **Báo chí Trung ương**: VTV, VnExpress, Tuổi Trẻ, Thanh Niên, Nhân Dân...
   - **Báo chí Địa phương**: Báo Gia Lai, Báo SGGP, Báo Đà Nẵng...
   - **Mạng xã hội**: Facebook Group, Zalo, YouTube, TikTok...
   - **Báo chí Quốc tế**: Reuters, BBC, CNA, Bloomberg...

2. **Công nghệ AI Lọc Nhiễu & Phân tích Ngữ nghĩa (AI Noise Filtering & Sentiment Analysis)**
   - Phân loại sắc thái thông tin: Tích cực (Positive), Trung lập (Neutral), Tiêu cực (Negative).
   - Tự động nhận diện tin rác, spam, tin mạo danh ăn theo từ khóa (`isNoise`, `noiseReason`).
   - Đánh giá chỉ số rủi ro dư luận (Risk Score: 0 - 100%) và tự động bật cảnh báo an ninh mạng.

3. **Phân tích Chuyên sâu Đường dẫn (Deep URL Inspector & Fact-Check)**
   - Trích xuất thực thể chính (Entities: Tổ chức, Địa danh, Từ khóa).
   - Đánh giá độ tin cậy của nguồn tin (Credibility Score) và độ lan truyền (Virality Index).
   - Tóm tắt AI nội dung gốc và đề xuất giải pháp xử lý khủng hoảng truyền thông.

4. **Trực quan hóa Dữ liệu & Báo cáo Dư luận (Interactive Analytics Dashboard)**
   - Biểu đồ xu hướng truyền thông 24h & phân bổ sắc thái bằng **Recharts**.
   - Bộ lọc đa chiều theo nguồn tin, thái độ, mức độ rủi ro và từ khóa.
   - Xuất báo cáo tổng quan dành cho cơ quan chỉ đạo và quản lý.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion Animation, Recharts.
- **Backend / Server**: Node.js, Express.js (Custom Server + Vite Middleware).
- **Trí tuệ nhân tạo (AI Engine)**: Google Gemini API (`@google/genai` SDK với model `gemini-3.6-flash`).
- **Build Tool**: Vite, Esbuild, TSX.

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy (Getting Started)

### 1. Yêu cầu hệ thống
- **Node.js**: `v18.x` hoặc `v20.x` trở lên.
- **npm** hoặc **yarn** / **pnpm**.

### 2. Cài đặt Dependencies
```bash
git clone https://github.com/your-username/scan-info-network-gialai.git
cd scan-info-network-gialai
npm install
```

### 3. Cấu hình Biến môi trường (.env)
Tạo file `.env` tại thư mục gốc dự án (hoặc sao chép từ `.env.example`):
```env
GEMINI_API_KEY="your_google_gemini_api_key_here"
PORT=3000
```
> *Lưu ý: Bạn có thể lấy Gemini API Key miễn phí tại [Google AI Studio](https://aistudio.google.com).*

### 4. Khởi chạy Chế độ Phát triển (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:3000`

### 5. Đóng gói Sản phẩm & Chạy Production (Build & Start)
```bash
# Biên dịch dự án
npm run build

# Khởi chạy bản Production
npm start
```

---

## 📂 Cấu trúc Thư mục (Project Structure)

```
scan-info-network-gialai/
├── src/
│   ├── components/           # Các component giao diện
│   │   ├── ArticleCard.tsx        # Thẻ hiển thị bài viết thu thập
│   │   ├── SearchScannerBar.tsx   # Thanh truy quét từ khóa & URL
│   │   ├── UrlScannerTab.tsx      # Tab phân tích URL chuyên sâu
│   │   └── TopNavigation.tsx      # Thanh điều hướng ứng dụng
│   ├── types.ts              # Định nghĩa dữ liệu TypeScript (ArticleItem, FilterState...)
│   ├── App.tsx               # Component chính & Quản lý state toàn cục
│   ├── main.tsx              # Entrypoint React Client
│   └── index.css             # Tailwind CSS Configuration
├── server.ts                 # Express Server & Tích hợp Gemini AI API
├── package.json              # Cấu hình dự án & Dependencies
├── vite.config.ts            # Cấu hình Vite
├── .env.example              # Mẫu file cấu hình biến môi trường
└── README.md                 # Tài liệu dự án
```

---

## 📝 Đẩy dự án lên GitHub (Push to GitHub)

1. Khởi tạo Git repository local (nếu chưa có):
```bash
git init
git add .
git commit -m "feat: Initial commit Scan Info Network Gia Lai"
```

2. Liên kết với Repository trên GitHub và Push:
```bash
git branch -M main
git remote add origin https://github.com/your-username/scan-info-network-gialai.git
git push -u origin main
```

---

## 🛡️ Giấy phép (License)
Phát triển cho hệ thống Giám sát & Quản lý Thông tin Truyền thông. Mọi quyền được bảo lưu.
