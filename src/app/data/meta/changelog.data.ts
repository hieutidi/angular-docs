import { ChangelogEntry } from '../../models/meta.model';

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2025-06',
    title: 'Dev Roadmaps — hai lộ trình full-stack',
    summary:
      'Phiên bản đầu tiên hoàn chỉnh với hai track Angular và .NET, hub chọn lộ trình, tiến độ riêng từng track và trang tổng quan dự án.',
    changes: [
      {
        type: 'feature',
        text: 'Hub chọn lộ trình Angular hoặc .NET với tiến độ hiển thị ngay trên trang chủ.',
      },
      {
        type: 'feature',
        text: 'Lộ trình .NET: 6 giai đoạn, 27 chủ đề — từ C# cơ bản đến Docker, CI/CD và phỏng vấn.',
        tracks: ['dotnet'],
      },
      {
        type: 'feature',
        text: 'Bài học nổi bật webapi-basics: nội dung chi tiết + 3 bài quiz cho track .NET.',
        tracks: ['dotnet'],
      },
      {
        type: 'feature',
        text: 'Trang Về dự án: lịch sử phát triển, changelog và so sánh hai lộ trình.',
      },
      {
        type: 'improvement',
        text: 'Footer và điều hướng cập nhật phản ánh cả hai track, không chỉ Angular.',
      },
    ],
  },
  {
    version: '0.3.0',
    date: '2025-05',
    title: 'Multi-track & tiến độ tách biệt',
    summary:
      'Chuyển từ ứng dụng chỉ Angular sang nền tảng đa lộ trình; tiến độ, quiz và code lab lưu riêng theo từng track.',
    changes: [
      {
        type: 'feature',
        text: 'Thêm lộ trình .NET backend với cấu trúc phase/topic tương tự Angular.',
        tracks: ['dotnet'],
      },
      {
        type: 'feature',
        text: 'Route /:track với trackGuard — URL rõ ràng: /angular/... và /dotnet/...',
      },
      {
        type: 'breaking',
        text: 'URL cũ /phase/... tự chuyển hướng sang /angular/phase/... để tương thích ngược.',
        tracks: ['angular'],
      },
      {
        type: 'improvement',
        text: 'Migration localStorage: khóa cũ angular-roadmap-progress được chuyển sang dev-roadmap-progress.',
      },
    ],
  },
  {
    version: '0.2.0',
    date: '2025-04',
    title: 'Quiz & Code Lab tương tác',
    summary:
      'Bổ sung học tập tương tác cho chủ đề Components — quiz nhiều cấp và phòng lab code trong trình duyệt.',
    changes: [
      {
        type: 'feature',
        text: 'Bài học nổi bật components: nội dung sâu, mục tiêu rõ, ví dụ code TypeScript.',
        tracks: ['angular'],
      },
      {
        type: 'feature',
        text: '3 bài quiz cho components với điểm đạt và giải thích đáp án.',
        tracks: ['angular'],
      },
      {
        type: 'feature',
        text: 'Code lab CodeMirror: viết code, kiểm tra pattern, gợi ý — lưu trạng thái hoàn thành.',
        tracks: ['angular'],
      },
      {
        type: 'feature',
        text: 'Tóm tắt tiếng Việt cho toàn bộ 28 chủ đề Angular.',
        tracks: ['angular'],
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2025-03',
    title: 'Angular Roadmap — phiên bản đầu',
    summary:
      'Khởi đầu dự án: lộ trình Angular 16 tuần, theo dõi tiến độ localStorage, hướng dẫn từng giai đoạn.',
    changes: [
      {
        type: 'feature',
        text: '6 giai đoạn, 28 chủ đề — từ TypeScript/HTML đến SSR, deploy và phỏng vấn.',
        tracks: ['angular'],
      },
      {
        type: 'feature',
        text: 'Phase guide: mục tiêu, mẹo học và checklist cho mỗi giai đoạn.',
        tracks: ['angular'],
      },
      {
        type: 'feature',
        text: 'Đánh dấu chủ đề đã học, tiến độ theo phase và tổng thể lưu trong trình duyệt.',
        tracks: ['angular'],
      },
      {
        type: 'feature',
        text: 'Liên kết tài liệu chính thức angular.dev cho từng chủ đề.',
        tracks: ['angular'],
      },
    ],
  },
];
