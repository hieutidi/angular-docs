import { PhaseGuide } from '../models/content.model';

export const PHASE_GUIDES: PhaseGuide[] = [
  {
    phaseId: 'foundation',
    overview:
      'Giai đoạn nền tảng giúp bạn nắm TypeScript, HTML/CSS, JavaScript ES6+ và Git trước khi học Angular. Angular được viết bằng TypeScript và chạy trên trình duyệt — nếu bỏ qua bước này, bạn sẽ gặp khó khăn khi đọc docs và debug.',
    goals: [
      'Đọc và viết TypeScript cơ bản: type, interface, generic',
      'Dựng layout responsive bằng Flexbox/Grid',
      'Dùng async/await, destructuring, modules trong JS',
      'Commit, branch, merge với Git',
    ],
    tips: [
      'Làm bài tập nhỏ mỗi ngày thay vì đọc lý thuyết liên tục.',
      'Mở DevTools khi học JS — xem console, network, breakpoints.',
      'Tạo repo GitHub ngay từ đầu để quen workflow thực tế.',
    ],
    checklist: [
      'Hoàn thành 4 chủ đề nền tảng',
      'Tạo repo GitHub cá nhân',
      'Viết được function TypeScript có type rõ ràng',
      'Dựng được trang HTML responsive đơn giản',
    ],
  },
  {
    phaseId: 'angular-basics',
    overview:
      'Bạn sẽ tạo project Angular đầu tiên, hiểu component, template, data binding, signals và hoàn thành Todo App mini. Đây là lõi của mọi app Angular.',
    goals: [
      'Tạo và chạy project bằng Angular CLI',
      'Xây component standalone với @Input/@Output',
      'Dùng interpolation, binding, directives cơ bản',
      'Áp dụng signal() và computed()',
      'Hoàn thành Todo App CRUD local',
    ],
    tips: [
      'Đọc song song angular.dev/essentials — docs luôn cập nhật.',
      'Mỗi concept học xong hãy thử trong Todo App ngay.',
      'Chủ đề Components có bài học + 3 quiz mẫu — làm hết trước khi sang chủ đề khác.',
    ],
    checklist: [
      'Chạy được ng serve và hiểu cấu trúc thư mục src/app',
      'Tạo ít nhất 3 component con',
      'Hoàn thành Todo App với thêm/xóa/đánh dấu',
      'Làm 3 quiz ở chủ đề Components & Templates',
    ],
  },
  {
    phaseId: 'app-structure',
    overview:
      'Học cách tổ chức app lớn: routing đa trang, services & DI, pipes, RxJS và dự án Blog. Giai đoạn này chuyển từ “component đơn lẻ” sang “ứng dụng có kiến trúc”.',
    goals: [
      'Cấu hình routes, lazy loading, route params',
      'Tạo service injectable và chia sẻ state',
      'Dùng pipe built-in và custom pipe',
      'Hiểu Observable, map, switchMap cơ bản',
      'Xây Blog đa trang với layout chung',
    ],
    tips: [
      'Tách logic ra service sớm — đừng nhồi hết vào component.',
      'Dùng async pipe thay vì subscribe thủ công khi có thể.',
      'Vẽ sơ đồ routes trước khi code Blog project.',
    ],
    checklist: [
      'Có ít nhất 3 routes với lazy loading',
      'Service quản lý danh sách bài viết',
      'Dùng được switchMap trong HTTP call',
      'Blog có trang list + detail + layout chung',
    ],
  },
  {
    phaseId: 'forms-http',
    overview:
      'Kết nối Angular với backend thực tế: template-driven forms, reactive forms, HttpClient, interceptors và dự án CRUD API.',
    goals: [
      'Tạo form với NgModel và validation cơ bản',
      'Xây reactive form với FormBuilder và validators',
      'Gọi REST API với HttpClient',
      'Xử lý loading/error với async pipe',
      'Hoàn thành CRUD app kết nối JSON Server',
    ],
    tips: [
      'Ưu tiên Reactive Forms cho form phức tạp.',
      'Luôn handle error trong HTTP — đừng để app crash im lặng.',
      'Dùng JSON Server để mock API trước khi có backend thật.',
    ],
    checklist: [
      'Form có validation hiển thị lỗi rõ ràng',
      'CRUD đủ GET/POST/PUT/DELETE',
      'Có loading spinner hoặc skeleton',
      'Interceptor thêm header hoặc log request',
    ],
  },
  {
    phaseId: 'advanced',
    overview:
      'Nâng cao kỹ năng production: change detection, unit test, state management, authentication và accessibility.',
    goals: [
      'Áp dụng OnPush và trackBy để tối ưu render',
      'Viết unit test cho component và service',
      'Hiểu khi nào cần global state (signals store / NgRx)',
      'Implement login flow với JWT và route guard',
      'Biết cơ bản i18n và a11y',
    ],
    tips: [
      'Đừng dùng NgRx quá sớm — signals đủ cho nhiều app.',
      'Test behavior, không test implementation detail.',
      'Chạy Lighthouse accessibility audit trên app của bạn.',
    ],
    checklist: [
      'Ít nhất 1 component dùng ChangeDetectionStrategy.OnPush',
      'Viết được 3+ unit test có ý nghĩa',
      'Login + guard bảo vệ route',
      'Form có label và keyboard navigation đúng',
    ],
  },
  {
    phaseId: 'production',
    overview:
      'Đưa app lên production: build tối ưu, SSR, capstone project portfolio và chuẩn bị phỏng vấn Angular.',
    goals: [
      'Build production và deploy lên Vercel/Netlify',
      'Hiểu SSR và lợi ích SEO',
      'Hoàn thành capstone: auth + CRUD + routing + responsive',
      'Ôn câu hỏi phỏng vấn Angular thường gặp',
    ],
    tips: [
      'README portfolio phải có screenshot, tech stack, link live demo.',
      'Capstone nên deploy thật — recruiter thích xem app chạy.',
      'Ôn DI, change detection, RxJS — 3 chủ đề hay hỏi nhất.',
    ],
    checklist: [
      'App deploy được với URL public',
      'Capstone trên GitHub với README đẹp',
      'Biết giải thích difference Default vs OnPush',
      'Trả lời được 10 câu hỏi phỏng vấn mẫu',
    ],
  },
];
