import { ArticleItem, AlertNotification, MonitoringCampaign } from '../types';

export const INITIAL_CAMPAIGNS: MonitoringCampaign[] = [
  {
    id: 'camp-1',
    name: 'Giám sát Tổng hợp Gia Lai & Tây Nguyên',
    keywords: ['Gia Lai', 'Pleiku', 'Tây Nguyên', 'Cao tốc Quy Nhơn Pleiku', 'Nông sản Gia Lai'],
    excludedKeywords: ['quảng cáo bán đất lẻ', 'game online'],
    description: 'Thu thập tất cả luồng báo chí trung ương, địa phương và mạng xã hội về sự kiện, hạ tầng và kinh tế Gia Lai.',
    articleCount: 1420,
    lastUpdated: '10 phút trước',
    active: true,
  },
  {
    id: 'camp-2',
    name: 'Chuyển đổi số & KHCN Quốc gia',
    keywords: ['Chuyển đổi số', 'Trí tuệ nhân tạo AI', 'Đổi mới sáng tạo', 'Dịch vụ công trực tuyến'],
    excludedKeywords: ['spam khóa học'],
    description: 'Theo dõi báo chí và phản hồi cộng đồng về chủ đề Công nghệ thông tin & Đổi mới sáng tạo.',
    articleCount: 890,
    lastUpdated: '5 phút trước',
    active: true,
  },
  {
    id: 'camp-3',
    name: 'Kinh tế, Đầu tư & Nông nghiệp Xuất khẩu',
    keywords: ['Giá cà phê', 'Hồ tiêu Gia Lai', 'Xuất khẩu sầu riêng', 'Đầu tư FII', 'Doanh nghiệp FDI'],
    excludedKeywords: [],
    description: 'Cảnh báo thông tin thị trường biến động và phản ánh của bà con nông dân.',
    articleCount: 630,
    lastUpdated: '15 phút trước',
    active: false,
  }
];

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 'art-101',
    title: 'Gia Lai tập trung nguồn lực đẩy nhanh tiến độ dự án Cao tốc Quy Nhơn - Pleiku',
    url: 'https://baogialai.com.vn/gia-lai-tap-trung-nguon-luc-day-nhanh-tien-do-dieu-chinh-quy-hoach-cao-toc-quy-nhon-pleiku-post293101.html',
    sourceName: 'Báo Gia Lai (Điện tử)',
    sourceCategory: 'local_news',
    publishedAt: '2026-07-24T00:15:00Z',
    summary: 'UBND tỉnh Gia Lai họp khẩn với các sở ngành chỉ đạo giải phóng mặt bằng, đảm bảo khởi công đúng tiến độ dự án trọng điểm giao thông kết nối Tây Nguyên với duyên hải miền Trung.',
    contentSnippet: 'Chủ tịch UBND tỉnh nhấn mạnh tầm quan trọng chiến lược của tuyến cao tốc Quy Nhơn - Pleiku đối với việc khơi thông luồng giao thương nông sản xuất khẩu và phát triển du lịch địa phương...',
    sentiment: 'positive',
    sentimentScore: 92,
    isNoise: false,
    entities: [
      { name: 'UBND Tỉnh Gia Lai', category: 'Organization' },
      { name: 'Pleiku', category: 'Location' },
      { name: 'Cao tốc Quy Nhơn - Pleiku', category: 'Policy' },
      { name: 'Tây Nguyên', category: 'Location' }
    ],
    engagementCount: 14200,
    reachEstimate: 85000,
    riskScore: 12,
    topicTag: 'Hạ tầng & Giao thông'
  },
  {
    id: 'art-102',
    title: 'Phê duyệt Chiến lược Phát triển Khoa học Công nghệ và Đổi mới Sáng tạo đến năm 2030',
    url: 'https://vtv.vn/cong-nghe/phe-duyet-chien-luoc-khoa-hoc-cong-nghe-quoc-gia-2026.htm',
    sourceName: 'VTV News',
    sourceCategory: 'central_news',
    publishedAt: '2026-07-23T22:30:00Z',
    summary: 'Chính phủ ban hành quyết định mở rộng ngân sách hỗ trợ các địa phương ứng dụng AI và chuyển đổi số trong quản lý hành chính công và giám sát dữ liệu.',
    contentSnippet: 'Mục tiêu đến năm 2030, tỷ trọng đóng góp của công nghệ AI vào GDP đạt trên 15%, tự động hóa 80% quy trình xử lý hồ sơ hành chính tại 63 tỉnh thành...',
    sentiment: 'positive',
    sentimentScore: 88,
    isNoise: false,
    entities: [
      { name: 'Bộ Khoa học & Công nghệ', category: 'Organization' },
      { name: 'VTV', category: 'Organization' },
      { name: 'Chuyển đổi số', category: 'Keyword' }
    ],
    engagementCount: 32100,
    reachEstimate: 210000,
    riskScore: 5,
    topicTag: 'KHCN & Chuyển đổi số'
  },
  {
    id: 'art-103',
    title: 'Cảnh báo thông tin sai lệch về đợt dịch hại cây cà phê tại một số huyện khu vực Tây Nguyên',
    url: 'https://tuoitre.vn/xac-minh-tin-gia-dich-benh-ca-phe-tai-tay-nguyen-20260723.htm',
    sourceName: 'Báo Tuổi Trẻ',
    sourceCategory: 'central_news',
    publishedAt: '2026-07-23T21:10:00Z',
    summary: 'Sở NN&PTNT xác minh các video lan truyền trên TikTok bóp méo thông tin sương muối gây cháy lá cà phê hàng loạt, nhằm ép giá thu mua nông sản của người dân.',
    contentSnippet: 'Đại diện ngành nông nghiệp khẳng định diện tích cà phê vẫn phát triển bình thường. Mọi hành vi tung tin thất thiệt trục lợi ép giá sẽ bị xử lý nghiêm theo Luật An ninh mạng...',
    sentiment: 'negative',
    sentimentScore: 85,
    isNoise: false,
    riskScore: 78,
    isAlertTriggered: true,
    alertMessage: 'Cảnh báo rủi ro cao: Tin đồn ép giá cà phê đang lan truyền rộng trên MXH',
    entities: [
      { name: 'Sở NN&PTNT Gia Lai', category: 'Organization' },
      { name: 'Giá Cà Phê', category: 'Keyword' },
      { name: 'TikTok Tin Đồn', category: 'Person' }
    ],
    engagementCount: 68500,
    reachEstimate: 450000,
    topicTag: 'Nông nghiệp & Thị trường'
  },
  {
    id: 'art-104',
    title: 'Đăng tải nội dung kích động, rao bán đất dự án ma tại bãi bồi hồ Ayun Hạ',
    url: 'https://facebook.com/groups/gialai.batdongsan/posts/881293021/',
    sourceName: 'Facebook Group - BĐS Gia Lai',
    sourceCategory: 'social_media',
    publishedAt: '2026-07-23T19:40:00Z',
    summary: 'Tài khoản ẩn danh phân phối thông tin sai thực tế về quy hoạch khu du lịch Ayun Hạ để nhận tiền cọc giữ chỗ trái phép.',
    contentSnippet: 'Báo giá chỉ 50 triệu/lô góc view hồ Ayun Hạ. Dự án được tỉnh quy hoạch 5 sao. Inbox gấp để giữ slot...',
    sentiment: 'negative',
    sentimentScore: 95,
    isNoise: true,
    noiseReason: 'Tin rác Spam/Cò đất phân lô bán nền trái phép & Không có nguồn kiểm chứng',
    riskScore: 88,
    isAlertTriggered: true,
    alertMessage: 'Nhiễu dữ liệu: Phát hiện chiến dịch rao bán đất ảo',
    entities: [
      { name: 'Hồ Ayun Hạ', category: 'Location' },
      { name: 'Group BĐS Gia Lai', category: 'Organization' }
    ],
    engagementCount: 3400,
    reachEstimate: 18000,
    topicTag: 'An ninh mạng & Trật tự'
  },
  {
    id: 'art-105',
    title: 'Dân mạng hào hứng với Lễ hội Cồng chiêng và Ẩm thực Măng Đen - Gia Lai mùa hè 2026',
    url: 'https://tiktok.com/@checkingialai/video/73918290123',
    sourceName: 'TikTok Vietnam Trending',
    sourceCategory: 'social_media',
    publishedAt: '2026-07-23T18:00:00Z',
    summary: 'Hàng ngàn video chia sẻ trải nghiệm văn hóa độc đáo, cà phê phin giấy và cơm lam gà nướng thu hút hơn 3 triệu lượt xem.',
    contentSnippet: 'Top 5 địa điểm check-in không thể bỏ qua khi tới Gia Lai hè này! Không khí mát lạnh như Đà Lạt thứ hai...',
    sentiment: 'positive',
    sentimentScore: 96,
    isNoise: false,
    entities: [
      { name: 'Lễ hội Cồng Chiêng', category: 'Policy' },
      { name: 'Gia Lai Tourism', category: 'Location' }
    ],
    engagementCount: 125000,
    reachEstimate: 890000,
    riskScore: 3,
    topicTag: 'Du lịch & Văn hóa'
  },
  {
    id: 'art-106',
    title: 'Vietnam’s Central Highlands Region Expands Sustainable Coffee Processing for EU Market',
    url: 'https://reuters.com/business/sustainable-coffee-vietnam-central-highlands-2026-07-23/',
    sourceName: 'Reuters International',
    sourceCategory: 'international',
    publishedAt: '2026-07-23T15:20:00Z',
    summary: 'Hãng tin quốc tế đánh giá cao việc các tỉnh Gia Lai, Đắk Lắk đáp ứng quy định chống phá rừng EUDR của Liên minh Châu Âu.',
    contentSnippet: 'European importers are increasing forward contracts for traceable robusta beans from Gia Lai province, highlighting sustainable farming practices...',
    sentiment: 'positive',
    sentimentScore: 90,
    isNoise: false,
    entities: [
      { name: 'EUDR Standard', category: 'Policy' },
      { name: 'Gia Lai Province', category: 'Location' },
      { name: 'Reuters', category: 'Organization' }
    ],
    engagementCount: 8900,
    reachEstimate: 120000,
    riskScore: 2,
    topicTag: 'Kinh tế & Đối ngoại'
  },
  {
    id: 'art-107',
    title: 'Hệ thống Dịch vụ công trực tuyến Tỉnh Gia Lai đạt mốc 95% hồ sơ xử lý đúng hạn',
    url: 'https://sggp.org.vn/gia-lai-nang-cao-chi-so-cai-cach-hanh-chinh-pindex-2026.html',
    sourceName: 'Báo Sài Gòn Giải Phóng',
    sourceCategory: 'central_news',
    publishedAt: '2026-07-23T14:10:00Z',
    summary: 'Chỉ số cải cách hành chính (PAR INDEX) của tỉnh tăng 8 bậc nhờ ứng dụng trợ lý AI hỗ trợ công chức kiểm tra tính hợp lệ của văn bản.',
    contentSnippet: 'Nhờ tích hợp nền tảng số hóa đồng bộ từ cấp xã lên tỉnh, thời gian chờ cấp giấy phép đăng ký kinh doanh giảm còn chưa đầy 24 giờ...',
    sentiment: 'positive',
    sentimentScore: 94,
    isNoise: false,
    entities: [
      { name: 'Dịch vụ công Gia Lai', category: 'Organization' },
      { name: 'PAR Index', category: 'Policy' }
    ],
    engagementCount: 15600,
    reachEstimate: 98000,
    riskScore: 4,
    topicTag: 'Hành chính công'
  },
  {
    id: 'art-108',
    title: 'Ý kiến trái chiều về đề xuất điều chỉnh giờ mở cửa chợ đêm Pleiku',
    url: 'https://vnexpress.net/y-kien-trai-chieu-gio-mo-cua-cho-dem-pleiku-478102.html',
    sourceName: 'VnExpress',
    sourceCategory: 'central_news',
    publishedAt: '2026-07-23T11:05:00Z',
    summary: 'Tiểu thương mong muốn kéo dài đến 2h sáng để đón khách du lịch trong khi đại diện khu dân cư lo ngại tiếng ồn và vệ sinh môi trường.',
    contentSnippet: 'Chính quyền địa phương đang tổ chức lấy ý kiến rộng rãi để tìm phương án hài hòa giữa phát triển kinh tế đêm và đảm bảo an ninh trật tự...',
    sentiment: 'neutral',
    sentimentScore: 78,
    isNoise: false,
    entities: [
      { name: 'Chợ đêm Pleiku', category: 'Location' },
      { name: 'VnExpress', category: 'Organization' }
    ],
    engagementCount: 24500,
    reachEstimate: 175000,
    riskScore: 18,
    topicTag: 'Đời sống & Xã hội'
  }
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alt-1',
    title: 'Phát hiện nguy cơ Tin giả ép giá nông sản',
    message: 'Chiến dịch bài viết sai sự thật về dịch bệnh cà phê đang lan truyền mạnh trên TikTok với hơn 68,000 tương tác.',
    severity: 'high',
    timestamp: '25 phút trước',
    articleId: 'art-103',
    read: false
  },
  {
    id: 'alt-2',
    title: 'Báo động Nhiễu thông tin Bất động sản ảo',
    message: 'Phát hiện 12 bài đăng rác lừa đảo cọc đất bãi bồi hồ Ayun Hạ trên các nhóm Facebook bĐS.',
    severity: 'medium',
    timestamp: '1 giờ trước',
    articleId: 'art-104',
    read: false
  },
  {
    id: 'alt-3',
    title: 'Tốc độ lan truyền tích cực về Du lịch Gia Lai',
    message: 'Lượng đề cập về Lễ hội Cồng chiêng & Măng Đen vượt mốc 120,000 tương tác trong 24h qua.',
    severity: 'info',
    timestamp: '3 giờ trước',
    articleId: 'art-105',
    read: true
  }
];
