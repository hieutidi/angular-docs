import { PhaseGuide } from '../models/content.model';

export const DOTNET_PHASE_GUIDES: PhaseGuide[] = [
  {
    phaseId: 'foundation',
    overview:
      'Giai đoạn nền tảng giúp bạn nắm C# cơ bản, OOP và hệ sinh thái .NET trước khi vào ASP.NET Core. Nếu bỏ qua bước này, bạn sẽ khó đọc docs Microsoft và debug lỗi compile/runtime.',
    goals: [
      'Viết được chương trình C# console cơ bản',
      'Hiểu class, interface, inheritance',
      'Dùng dotnet CLI tạo project và restore package',
      'Quen Git workflow và debug trong VS Code',
    ],
    tips: [
      'Chạy code mỗi ngày — C# học bằng thực hành.',
      'Đọc lỗi compiler kỹ — C# type system rất rõ ràng.',
      'Tạo repo GitHub ngay từ project console đầu tiên.',
    ],
    checklist: [
      'Hoàn thành 4 chủ đề nền tảng',
      'Viết được class với property và method',
      'Tạo solution với dotnet new sln',
      'Push code lên GitHub',
    ],
  },
  {
    phaseId: 'csharp-advanced',
    overview:
      'Nâng cao kỹ năng C# — LINQ, async/await và collections là nền tảng cho mọi API .NET hiện đại.',
    goals: [
      'Query collection bằng LINQ method syntax',
      'Viết async method với Task và await',
      'Dùng List, Dictionary, record type',
      'Log và xử lý exception đúng cách',
    ],
    tips: [
      'Ưu tiên method syntax LINQ — dễ đọc hơn query syntax.',
      'Không dùng .Result hoặc .Wait() — dễ deadlock.',
      'Dùng ILogger thay vì Console.WriteLine trong app thật.',
    ],
    checklist: [
      'Viết được 5+ LINQ query thực tế',
      'Async method gọi HttpClient',
      'Custom exception có message rõ ràng',
      'Hiểu deferred vs immediate LINQ execution',
    ],
  },
  {
    phaseId: 'aspnet-core',
    overview:
      'Bạn sẽ tạo Web API đầu tiên, hiểu DI, middleware và hoàn thành REST API in-memory. Đây là lõi backend .NET.',
    goals: [
      'Tạo project webapi với dotnet new',
      'Xây CRUD endpoints với controller hoặc minimal API',
      'Đăng ký service trong DI container',
      'Viết custom middleware đơn giản',
      'Hoàn thành REST API todo/sách',
    ],
    tips: [
      'Đọc song song learn.microsoft.com/aspnet/core — docs chính thức.',
      'Test API bằng Swagger hoặc REST Client ngay sau mỗi endpoint.',
      'Chủ đề Web API có bài học chi tiết — đọc kỹ trước khi sang EF Core.',
    ],
    checklist: [
      'API chạy được với Swagger UI',
      'CRUD đủ GET/POST/PUT/DELETE',
      'Service inject vào controller',
      'Middleware log request time',
    ],
  },
  {
    phaseId: 'ef-core',
    overview:
      'Kết nối API với database thật: SQL cơ bản, EF Core, migrations và dự án CRUD có pagination.',
    goals: [
      'Viết SQL SELECT/JOIN cơ bản',
      'Cấu hình DbContext và connection string',
      'Tạo migration và update database',
      'Model relationship one-to-many',
      'API CRUD với EF Core + pagination',
    ],
    tips: [
      'Dùng SQL Server LocalDB hoặc PostgreSQL Docker cho dev.',
      'Luôn review migration trước khi apply production.',
      'Tránh N+1 query — dùng Include() hoặc projection.',
    ],
    checklist: [
      'Database tạo bằng migration, không tạo tay',
      'Entity có navigation property đúng',
      'API có phân trang (page, pageSize)',
      'Seed data cho dev environment',
    ],
  },
  {
    phaseId: 'advanced',
    overview:
      'Kỹ năng production: JWT auth, unit/integration test, caching, clean architecture và background jobs.',
    goals: [
      'Implement login + JWT bearer auth',
      'Viết unit test với xUnit và Moq',
      'Dùng IMemoryCache hoặc Redis',
      'Tổ chức project theo layers',
      'Chạy background task với IHostedService',
    ],
    tips: [
      'Đừng over-engineer Clean Architecture quá sớm — REST API nhỏ có thể đơn giản.',
      'Integration test quan trọng hơn mock mọi thứ.',
      'Auth: lưu secret trong User Secrets / env, không commit.',
    ],
    checklist: [
      'Endpoint protected với [Authorize]',
      'Ít nhất 5 unit test có ý nghĩa',
      '1 integration test với WebApplicationFactory',
      'Project tách được Domain và Infrastructure',
    ],
  },
  {
    phaseId: 'production',
    overview:
      'Đưa API lên production: Docker, CI/CD, capstone portfolio và ôn phỏng vấn .NET.',
    goals: [
      'Dockerize ASP.NET Core API',
      'GitHub Actions build + test tự động',
      'Hoàn thành capstone: auth + EF + tests + deploy',
      'Ôn câu hỏi phỏng vấn .NET thường gặp',
    ],
    tips: [
      'README capstone: architecture diagram, API docs, link Swagger live.',
      'Docker multi-stage build giảm image size.',
      'Ôn DI lifetimes, async, EF tracking — hay hỏi nhất.',
    ],
    checklist: [
      'API chạy trong Docker container',
      'CI pipeline pass trên GitHub',
      'Capstone deploy được (Azure/Railway/Render)',
      'Trả lời được 10 câu hỏi phỏng vấn mẫu',
    ],
  },
];
