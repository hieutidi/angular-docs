import { PhaseGuide } from '../models/content.model';

export const DOCS_PHASE_GUIDES: PhaseGuide[] = [
  {
    phaseId: 'backend-guides',
    overview:
      'Giai đoạn này tập trung vào các kỹ thuật nâng cao để xây dựng và tối ưu hóa các hệ thống Backend chuyên nghiệp.',
    goals: [
      'Nắm vững các nguyên tắc thiết kế REST API tốt nhất',
      'Hiểu cách tối ưu hóa hiệu suất SQL Server',
      'Biết cách bảo mật API và quản lý tài nguyên hệ thống'
    ],
    tips: [
      'Luôn đọc tài liệu chính thức từ Microsoft và Azure Architecture Center.',
      'Thực hành tối ưu hóa trên các tập dữ liệu lớn để thấy rõ sự khác biệt.',
      'Sử dụng các công cụ đo lường hiệu năng (Benchmark) thường xuyên.'
    ],
    checklist: [
      'Hoàn thành bài đọc về Web API Best Practices',
      'Hiểu cơ chế hoạt động của SQL Indexing',
      'Biết cách viết Store Procedure tối ưu'
    ]
  },
  {
    phaseId: 'architecture',
    overview:
      'Học về các mẫu kiến trúc phần mềm giúp ứng dụng dễ bảo trì, mở rộng và kiểm thử.',
    goals: [
      'Hiểu rõ tư tưởng của Clean Architecture',
      'Phân biệt các lớp: Domain, Application, Infrastructure',
      'Áp dụng thành thạo Dependency Rule'
    ],
    tips: [
      'Đừng làm phức tạp hóa vấn đề nếu dự án còn nhỏ.',
      'Vẽ sơ đồ luồng dữ liệu trước khi bắt đầu code cấu trúc folder.',
      'Đọc sách Clean Architecture của Uncle Bob để hiểu sâu hơn.'
    ],
    checklist: [
      'Giải thích được tại sao Domain không nên phụ thuộc vào bất kỳ lớp nào',
      'Tạo được project mẫu theo cấu trúc Clean Architecture',
      'Hiểu về Inversion of Control (IoC) trong kiến trúc phần mềm'
    ]
  }
];
