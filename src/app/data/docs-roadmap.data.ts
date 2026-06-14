import { Roadmap } from '../models/roadmap.model';

export const DOCS_ROADMAP: Roadmap = {
  title: 'Thư viện tài liệu (Docs)',
  description:
    'Kho lưu trữ các hướng dẫn chuyên sâu, cẩm nang công nghệ và tài liệu tham khảo cho Web Developer.',
  totalWeeks: 0,
  phases: [
    {
      id: 'backend-guides',
      order: 1,
      title: 'Backend Deep Dives',
      subtitle: 'Nâng cao',
      description: 'Các chủ đề chuyên sâu về hệ thống server và tối ưu hóa API.',
      icon: '⚙️',
      color: 'blue',
      estimatedWeeks: 0,
      topics: [
        {
          id: 'webapi-best-practices',
          title: 'Web API Best Practices',
          description: 'Cẩm nang thiết kế REST API chuyên nghiệp, bảo mật và hiệu năng cao.',
          duration: '1 ngày',
          level: 'advanced',
          resources: [
            { label: 'Microsoft API Design', url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design' },
          ],
        },
        {
          id: 'sql-advanced',
          title: 'SQL Server Advanced',
          description: 'Tối ưu hóa truy vấn, Indexing, Execution Plan và Store Procedure.',
          duration: '2 ngày',
          level: 'advanced',
          resources: [
            { label: 'SQL Performance', url: 'https://learn.microsoft.com/en-us/sql/relational-databases/performance/monitor-and-tune-for-performance' },
          ],
        },
      ],
    },
    {
      id: 'architecture',
      order: 2,
      title: 'Kiến trúc & Design',
      subtitle: 'Chuyên gia',
      description: 'Học cách thiết kế hệ thống lớn và bền vững.',
      icon: '🏛️',
      color: 'violet',
      estimatedWeeks: 0,
      topics: [
        {
          id: 'clean-architecture',
          title: 'Clean Architecture',
          description: 'Tìm hiểu về Onion Architecture, Dependency Rule và cách tách lớp ứng dụng.',
          duration: '3 ngày',
          level: 'advanced',
          resources: [
            { label: 'Clean Architecture Guide', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html' },
          ],
        },
      ],
    },
  ],
};
