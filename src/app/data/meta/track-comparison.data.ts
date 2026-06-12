import { TrackComparisonRow } from '../../models/meta.model';

export const TRACK_COMPARISON: TrackComparisonRow[] = [
  {
    aspect: 'Vai trò',
    angular: 'Frontend — xây giao diện SPA, tương tác người dùng',
    dotnet: 'Backend — API REST, xử lý nghiệp vụ, cơ sở dữ liệu',
  },
  {
    aspect: 'Ngôn ngữ chính',
    angular: 'TypeScript + HTML/CSS',
    dotnet: 'C#',
  },
  {
    aspect: 'Thời lượng',
    angular: '16 tuần · 6 giai đoạn · 28 chủ đề',
    dotnet: '16 tuần · 6 giai đoạn · 27 chủ đề',
  },
  {
    aspect: 'Công cụ CLI',
    angular: 'Angular CLI (ng new, ng serve, ng build)',
    dotnet: 'dotnet CLI (dotnet new, dotnet run, dotnet ef)',
  },
  {
    aspect: 'Docs chính thức',
    angular: 'angular.dev',
    dotnet: 'learn.microsoft.com/dotnet',
  },
  {
    aspect: 'Chủ đề nổi bật',
    angular: 'components — bài học sâu + quiz + code lab',
    dotnet: 'webapi-basics — bài học sâu + quiz',
  },
  {
    aspect: 'Dự án thực hành',
    angular: 'Blog app → CRUD app → Capstone frontend',
    dotnet: 'REST API → CRUD API → Capstone full backend',
  },
  {
    aspect: 'Chủ đề nâng cao',
    angular: 'Signals, RxJS, SSR, testing, i18n/a11y',
    dotnet: 'JWT auth, EF Core, Clean Architecture, Redis, Docker',
  },
  {
    aspect: 'Tiến độ học',
    angular: 'Lưu riêng trong localStorage (key dev-roadmap-progress)',
    dotnet: 'Lưu riêng — học song song không ảnh hưởng track kia',
  },
  {
    aspect: 'Phù hợp nếu bạn',
    angular: 'Thích UI/UX, muốn làm web app phía client',
    dotnet: 'Thích logic server, API, database, hệ thống phân tán',
  },
];

export const TRACK_DIFFERENCES_SUMMARY = [
  'Hai lộ trình độc lập về nội dung nhưng bổ sung cho nhau trong kiến trúc full-stack: Angular render UI, .NET cung cấp API.',
  'Cấu trúc học giống nhau (phase → topic → tóm tắt) nhưng chủ đề và công nghệ khác hẳn — không cần học hết một track trước khi bắt đầu track kia.',
  'Chỉ Angular có code lab tương tác (CodeMirror); .NET tập trung quiz và ví dụ C# trong bài học.',
  'Tiến độ, quiz đã pass và code lab hoàn thành được lưu tách biệt — bạn có thể học 50% Angular và 30% .NET cùng lúc.',
];
