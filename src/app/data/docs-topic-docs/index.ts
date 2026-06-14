import { TopicLesson } from '../../models/content.model';

const DOCS_TOPIC_LESSONS: TopicLesson[] = [
  {
    topicId: 'webapi-best-practices',
    summary: 'Thiết kế REST API không chỉ là Map các endpoint mà còn là về tính nhất quán, bảo mật và khả năng mở rộng.',
    objectives: [
      'Sử dụng đúng HTTP Verbs và Status Codes',
      'Thiết kế URL tài nguyên theo chuẩn REST',
      'Hỗ trợ Versioning và Pagination ngay từ đầu',
      'Xử lý lỗi tập trung và bảo mật API'
    ],
    practice: 'Review lại API hiện tại của bạn dựa trên checklist Best Practices và đề xuất 3 cải tiến.',
    sections: [
      {
        id: 'naming-convention',
        title: 'Quy tắc đặt tên (Naming)',
        content: 'Dùng danh từ số nhiều cho tài nguyên. Tránh dùng động từ trong URL. Ví dụ: /api/products thay vì /api/get-all-products.',
      }
    ]
  },
  {
    topicId: 'clean-architecture',
    summary: 'Clean Architecture là kiến trúc tách rời business logic khỏi công nghệ (DB, UI, Framework).',
    objectives: [
      'Hiểu Dependency Rule: Mọi sự phụ thuộc phải hướng vào tâm (Domain)',
      'Tách biệt Entities, Use Cases và Interface Adapters',
      'Khả năng kiểm thử (Testability) độc lập với Database'
    ],
    practice: 'Vẽ sơ đồ các lớp trong Clean Architecture và xác định xem DbContext nên nằm ở lớp nào.',
    sections: [
      {
        id: 'domain-layer',
        title: 'Lớp Domain (Tâm)',
        content: 'Chứa Business Entities và Logic cốt lõi. Đây là lớp bền vững nhất và không được phụ thuộc vào bất kỳ thư viện bên thứ ba nào.',
      }
    ]
  }
];

export function getDocsTopicLesson(topicId: string) {
  return DOCS_TOPIC_LESSONS.find(l => l.topicId === topicId);
}

export function docsHasFeaturedLesson(topicId: string) {
  return ['webapi-best-practices', 'clean-architecture'].includes(topicId);
}

export function docsHasQuizzes(topicId: string) {
  return false; // Hiện tại chưa có quiz cho track Docs
}
