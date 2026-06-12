import { TechHistory } from '../../models/meta.model';

export const TECH_HISTORY: TechHistory = {
  angular: [
    {
      era: 'v1.x',
      period: '2010',
      title: 'AngularJS',
      description: 'Khởi đầu của framework tại Google với cú pháp JavaScript thuần và Two-way binding.',
      milestones: [
        'Giới thiệu Dependency Injection cho frontend',
        'Cơ chế digest cycle nổi tiếng',
        'Nền tảng cho các ứng dụng SPA (Single Page Application)'
      ]
    },
    {
      era: 'v2 - v8',
      period: '2016',
      title: 'Angular Rewrite',
      description: 'Cuộc cách mạng viết lại toàn bộ framework bằng TypeScript và kiến trúc Component.',
      milestones: [
        'Chuyển sang kiến trúc hướng Component thay vì Controller',
        'Tối ưu hóa Mobile-first và Lazy Loading',
        'Hệ sinh thái RxJS cho xử lý bất đồng bộ'
      ]
    },
    {
      era: 'v9 - v16',
      period: '2020',
      title: 'Ivy & Standalone',
      description: 'Tập trung vào hiệu suất và sự đơn giản hóa cấu trúc project.',
      milestones: [
        'Ivy Compiler giúp giảm kích thước bundle và tăng tốc compile',
        'Standalone Components loại bỏ sự phụ thuộc vào NgModules',
        'Nâng cấp trải nghiệm Developer với Angular CLI mạnh mẽ'
      ]
    },
    {
      era: 'v17+',
      period: 'Nay',
      title: 'Angular Renaissance',
      description: 'Thời kỳ "Phục hưng" với Signals và các tính năng Reactive hiện đại nhất.',
      milestones: [
        'Angular Signals: Cơ chế reactivity chi tiết (fine-grained)',
        'Cú pháp Control Flow mới (@if, @for) cực nhanh',
        'Zoneless Angular: Chạy ứng dụng không cần zone.js'
      ]
    }
  ],
  dotnet: [
    {
      era: 'Legacy',
      period: '2002 - 2019',
      title: '.NET Framework',
      description: 'Nền tảng đóng chỉ chạy trên Windows, gắn liền với IIS và kỷ nguyên web cũ.',
      milestones: [
        'Phát triển các ứng dụng WebForms và MVC thời kỳ đầu',
        'Sử dụng ngôn ngữ C# và VB.NET',
        'Phụ thuộc chặt chẽ vào hệ điều hành Windows'
      ]
    },
    {
      era: 'Core',
      period: '2016',
      title: '.NET Core',
      description: 'Bước ngoặt sang mã nguồn mở, đa nền tảng (Windows, Linux, macOS).',
      milestones: [
        'Tối ưu hóa hoàn toàn cho Cloud và Microservices',
        'Hiệu suất HTTP tăng vọt so với bản Framework',
        'NuGet package manager trở nên phổ biến'
      ]
    },
    {
      era: 'Modern',
      period: '2020',
      title: '.NET 5 & 6 (LTS)',
      description: 'Hợp nhất các nhánh .NET thành một nền tảng duy nhất, tập trung vào hiệu năng.',
      milestones: [
        'Minimal APIs: Xây dựng web API cực kỳ nhanh gọn',
        'Hỗ trợ ARM64 và tối ưu hóa cho Container/Docker',
        'C# 10/11 với nhiều tính năng clean code'
      ]
    },
    {
      era: 'Cutting Edge',
      period: '2024 - Nay',
      title: '.NET 8 & 9',
      description: 'Bản LTS mới nhất với những cải tiến đột phá về tốc độ và Cloud-native.',
      milestones: [
        'Native AOT: Biên dịch trực tiếp ra mã máy, khởi động tức thì',
        'AI Support: Tích hợp thư viện xử lý AI trực tiếp',
        'ASP.NET Core nhanh nhất trong các bài benchmark web'
      ]
    }
  ]
};
