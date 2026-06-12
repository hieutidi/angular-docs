import { AppMeta } from '../../models/meta.model';

export const APP_META: AppMeta = {
  name: 'Dev Roadmaps',
  version: '1.0.0',
  tagline: 'Lộ trình học Angular & .NET bằng tiếng Việt',
  description:
    'Ứng dụng học tập tương tác giúp bạn đi từ zero đến junior/mid developer theo lộ trình có thứ tự, tài liệu tóm tắt tiếng Việt, quiz và code lab — không thay thế docs chính thức mà bổ sung cấu trúc học tập.',
  techStack: [
    'Angular 21 (standalone components, signals)',
    'Tailwind CSS 4',
    'CodeMirror 6 (code lab)',
    'Vitest (unit test)',
    'localStorage (lưu tiến độ)',
  ],
  startedAt: '2025',
};
