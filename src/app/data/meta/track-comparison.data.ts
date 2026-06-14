import { TrackComparisonRow } from '../../models/meta.model';

export const TRACK_COMPARISON: TrackComparisonRow[] = [
  {
    aspect: 'Vai trò',
    angular: 'Frontend — xây giao diện SPA, tương tác người dùng',
    react: 'Frontend — xây giao diện UI bằng thư viện linh hoạt',
    dotnet: 'Backend — API REST, xử lý nghiệp vụ, cơ sở dữ liệu',
  },
  {
    aspect: 'Ngôn ngữ chính',
    angular: 'TypeScript + HTML/CSS',
    react: 'JavaScript/TypeScript + JSX + CSS',
    dotnet: 'C#',
  },
  {
    aspect: 'Thời lượng',
    angular: '16 tuần · 6 giai đoạn · 28 chủ đề',
    react: '12 tuần · 2 giai đoạn · 12 chủ đề (đang phát triển)',
    dotnet: '16 tuần · 6 giai đoạn · 27 chủ đề',
  },
  {
    aspect: 'Công cụ CLI',
    angular: 'Angular CLI (ng new, ng serve, ng build)',
    react: 'Vite / Create React App (npm create vite@latest)',
    dotnet: 'dotnet CLI (dotnet new, dotnet run, dotnet ef)',
  },
  {
    aspect: 'Docs chính thức',
    angular: 'angular.dev',
    react: 'react.dev',
    dotnet: 'learn.microsoft.com/dotnet',
  },
  {
    aspect: 'Chủ đề nổi bật',
    angular: 'components — bài học sâu + quiz + code lab',
    react: 'react-basics — bài học sâu về Hooks & JSX',
    dotnet: 'webapi-basics — bài học sâu + quiz',
  },
  {
    aspect: 'Dự án thực hành',
    angular: 'Blog app → CRUD app → Capstone frontend',
    react: 'Profile Card → Task list → Advanced project',
    dotnet: 'REST API → CRUD API → Capstone full backend',
  },
  {
    aspect: 'Chủ đề nâng cao',
    angular: 'Signals, RxJS, SSR, testing, i18n/a11y',
    react: 'Hooks chuyên sâu, Context API, Performance, ecosystem',
    dotnet: 'JWT auth, EF Core, Clean Architecture, Redis, Docker',
  },
  {
    aspect: 'Tiến độ học',
    angular: 'Lưu riêng trong localStorage',
    react: 'Lưu riêng trong localStorage',
    dotnet: 'Lưu riêng — học song song không ảnh hưởng track kia',
  },
  {
    aspect: 'Phù hợp nếu bạn',
    angular: 'Thích UI/UX, muốn làm web app quy mô lớn/enterprise',
    react: 'Thích sự linh hoạt, hệ sinh thái rộng lớn, UI tinh gọn',
    dotnet: 'Thích logic server, API, database, hệ thống phân tán',
  },
];

export const TRACK_DIFFERENCES_SUMMARY = [
  'Ba lộ trình độc lập về nội dung nhưng bổ sung cho nhau: Angular/React cho UI, .NET cung cấp API backend.',
  'Cấu trúc học giống nhau (phase → topic → tóm tắt) giúp bạn dễ dàng chuyển đổi hoặc học song song.',
  'Chỉ Angular có code lab tương tác (CodeMirror); .NET và React tập trung vào lý thuyết tóm tắt, quiz và bài tập thực hành.',
  'Tiến độ, quiz đã pass và code lab hoàn thành được lưu tách biệt cho từng track trong trình duyệt của bạn.',
];
