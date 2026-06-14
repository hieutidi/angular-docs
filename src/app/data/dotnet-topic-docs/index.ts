import { TopicLesson } from '../../models/content.model';
import { SQL_BASICS_LESSON } from './sql-basics.lesson';
import { WEBAPI_BASICS_LESSON } from './webapi-basics.lesson';

const DOTNET_TOPIC_LESSONS: TopicLesson[] = [
  WEBAPI_BASICS_LESSON,
  SQL_BASICS_LESSON,
  {
    topicId: 'csharp-basics',
    summary: 'C# là ngôn ngữ type-safe, hướng đối tượng — nền tảng của mọi app .NET.',
    objectives: ['Khai báo biến với var và kiểu cụ thể', 'Viết method, if/else, vòng lặp', 'Hiểu namespace và using'],
    sections: [
      {
        id: 'hello-csharp',
        title: 'Hello C#',
        content: 'Mọi chương trình C# bắt đầu từ entry point. .NET 6+ dùng top-level statements trong Program.cs.',
        code: `Console.WriteLine("Hello, .NET!");

int age = 25;
var name = "Dev";
if (age >= 18) Console.WriteLine($"{name} is adult");`,
      },
      {
        id: 'methods',
        title: 'Methods',
        content: 'Method nhóm logic tái sử dụng. Tham số có kiểu rõ ràng, return type bắt buộc (trừ void).',
        code: `static int Add(int a, int b) => a + b;

static void Greet(string name, int times = 1)
{
    for (var i = 0; i < times; i++)
        Console.WriteLine($"Hi {name}");
}`,
      },
    ],
    practice: 'Viết console app tính BMI từ weight (kg) và height (m).',
  },
  {
    topicId: 'oop-csharp',
    summary: 'OOP trong C#: class, inheritance, interface — mô hình hóa domain rõ ràng.',
    objectives: ['Tạo class với property/method', 'Kế thừa và override', 'Implement interface'],
    sections: [
      {
        id: 'class-basics',
        title: 'Class & Object',
        content: 'Property thay cho field public — encapsulation tốt hơn. auto-property { get; set; } phổ biến nhất.',
        code: `public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }

    public decimal GetPriceWithTax(decimal rate) => Price * (1 + rate);
}`,
      },
      {
        id: 'interface',
        title: 'Interface',
        content: 'Interface định nghĩa contract — DI trong ASP.NET Core dựa trên interface.',
        code: `public interface IEmailSender
{
    Task SendAsync(string to, string subject, string body);
}

public class SmtpEmailSender : IEmailSender
{
    public Task SendAsync(string to, string subject, string body)
        => Task.CompletedTask; // mock
}`,
      },
    ],
    practice: 'Model Library: Book, Member, ILibraryService với Borrow/Return.',
  },
  {
    topicId: 'dotnet-ecosystem',
    summary: '.NET SDK gồm runtime, compiler và CLI — NuGet quản lý package.',
    objectives: ['dotnet new / build / run', 'Cấu trúc .csproj', 'Thêm package NuGet'],
    sections: [
      {
        id: 'cli',
        title: 'dotnet CLI',
        content: 'CLI là công cụ chính khi dev cross-platform. Solution (.sln) chứa nhiều project.',
        code: `dotnet new console -n MyApp
dotnet add package Newtonsoft.Json
dotnet build
dotnet run`,
      },
    ],
    practice: 'Tạo solution với 1 console project và 1 class library, reference library vào console.',
  },
  {
    topicId: 'git-tools',
    summary: 'VS Code + C# Dev Kit và Git — workflow hàng ngày của .NET developer.',
    objectives: ['Debug breakpoint trong VS Code', 'Git branch/PR workflow', 'User Secrets cho config local'],
    sections: [
      {
        id: 'debug',
        title: 'Debug C#',
        content: 'F5 launch với launch.json. Đặt breakpoint, inspect variable, step over/into.',
      },
    ],
    practice: 'Tạo branch feature, commit, mở PR trên GitHub.',
  },
  {
    topicId: 'linq',
    summary: 'LINQ query collection bằng cú pháp giống SQL — deferred execution.',
    objectives: ['Where, Select, OrderBy', 'FirstOrDefault, Any, Count', 'Method vs query syntax'],
    sections: [
      {
        id: 'linq-methods',
        title: 'LINQ method syntax',
        content: 'Chain methods trên IEnumerable<T>. Query chưa chạy cho đến khi enumerate (ToList, foreach).',
        code: `var adults = users
    .Where(u => u.Age >= 18)
    .OrderBy(u => u.Name)
    .Select(u => u.Name)
    .ToList();`,
      },
    ],
    practice: 'Filter orders theo status, group by customer, tính tổng amount.',
  },
  {
    topicId: 'async-await',
    summary: 'async/await viết code I/O-bound dễ đọc — HttpClient, database, file.',
    objectives: ['Task và async method', 'await không block thread', 'CancellationToken'],
    sections: [
      {
        id: 'async-http',
        title: 'Async với HttpClient',
        content: 'HttpClient.GetAsync trả Task<HttpResponseMessage>. await giải phóng thread trong lúc chờ I/O.',
        code: `public async Task<string> FetchJsonAsync(string url, CancellationToken ct = default)
{
    var client = new HttpClient();
    var response = await client.GetAsync(url, ct);
    response.EnsureSuccessStatusCode();
    return await response.Content.ReadAsStringAsync(ct);
}`,
      },
    ],
    practice: 'Gọi public API, parse JSON, xử lý timeout với CancellationToken.',
  },
  {
    topicId: 'generics-collections',
    summary: 'Generics type-safe; collections chuẩn trong System.Collections.Generic.',
    objectives: ['List, Dictionary, HashSet', 'Generic method/class', 'record type cho DTO'],
    sections: [
      {
        id: 'record',
        title: 'Record types',
        content: 'record immutable by default — lý tưởng cho DTO và value object.',
        code: `public record UserDto(int Id, string Email, string Name);`,
      },
    ],
    practice: 'Cache Dictionary<string, UserDto> với generic repository interface.',
  },
  {
    topicId: 'exception-logging',
    summary: 'Exception hierarchy và ILogger — observability cơ bản.',
    objectives: ['try/catch/finally', 'throw custom exception', 'ILogger log levels'],
    sections: [
      {
        id: 'logging',
        title: 'ILogger',
        content: 'Inject ILogger<T> trong ASP.NET Core. LogInformation, LogWarning, LogError.',
        code: `_logger.LogInformation("Creating order {OrderId}", order.Id);
_logger.LogError(ex, "Failed to save order {OrderId}", order.Id);`,
      },
    ],
    practice: 'Global exception handler middleware log lỗi và trả ProblemDetails.',
  },
  {
    topicId: 'setup-sdk',
    summary: 'Cài .NET SDK, tạo webapi project, hiểu Program.cs và appsettings.',
    objectives: ['Cài .NET 8/9 SDK', 'dotnet new webapi', 'Cấu hình appsettings.json'],
    sections: [
      {
        id: 'program-cs',
        title: 'Program.cs',
        content: 'Minimal hosting model: builder.Services, builder.Build(), app.Map, app.Run.',
        code: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
if (app.Environment.IsDevelopment()) app.UseSwaggerUI();
app.MapControllers();
app.Run();`,
      },
    ],
    practice: 'Tạo webapi, chạy Swagger, đổi port trong launchSettings.json.',
  },
  {
    topicId: 'dependency-injection',
    summary: 'Built-in DI container đăng ký service và inject vào constructor.',
    objectives: ['AddSingleton/Scoped/Transient', 'Inject vào controller', 'IOptions cho config'],
    sections: [
      {
        id: 'lifetimes',
        title: 'Service lifetimes',
        content: 'Singleton: 1 instance/app. Scoped: 1/request. Transient: mỗi lần resolve.',
        code: `builder.Services.AddScoped<IBookService, BookService>();

public class BooksController : ControllerBase
{
    private readonly IBookService _books;
    public BooksController(IBookService books) => _books = books;
}`,
      },
    ],
    practice: 'Tách in-memory store ra IBookRepository + BookService.',
  },
  {
    topicId: 'middleware-pipeline',
    summary: 'Middleware xử lý request/response theo pipeline — thứ tự Use() quan trọng.',
    objectives: ['Hiểu request pipeline', 'Viết custom middleware', 'Exception handling middleware'],
    sections: [
      {
        id: 'custom-mw',
        title: 'Custom middleware',
        content: 'Middleware nhận HttpContext, gọi next() hoặc short-circuit response.',
        code: `app.Use(async (context, next) =>
{
    var sw = Stopwatch.StartNew();
    await next();
    sw.Stop();
    context.Response.Headers["X-Elapsed-Ms"] = sw.ElapsedMilliseconds.ToString();
});`,
      },
    ],
    practice: 'Middleware log method + path + status code + duration.',
  },
  {
    topicId: 'project-rest-api',
    summary: 'Dự án REST API in-memory — tổng hợp controller, DTO, validation.',
    objectives: ['CRUD endpoints', 'DTO mapping', 'Swagger documentation'],
    sections: [{ id: 'scope', title: 'Phạm vi', content: 'API Todo hoặc Book — không cần database ở giai đoạn này.' }],
    practice: 'REST API Todo với filter theo status và sort theo created date.',
  },
  {
    topicId: 'sql-basics',
    summary: 'SQL relational — SELECT, JOIN, constraint là nền cho EF Core.',
    objectives: ['CRUD SQL', 'INNER JOIN', 'Primary key & foreign key'],
    sections: [
      {
        id: 'join',
        title: 'JOIN',
        content: 'INNER JOIN kết hợp bảng qua khóa ngoại — pattern one-to-many.',
        code: `SELECT o.Id, c.Name, o.Total
FROM Orders o
INNER JOIN Customers c ON o.CustomerId = c.Id
WHERE o.Total > 100;`,
      },
    ],
    practice: 'Thiết kế schema Products + Categories, viết 3 query JOIN.',
  },
  {
    topicId: 'ef-core-intro',
    summary: 'EF Core ORM map C# class ↔ database table — Code First phổ biến nhất.',
    objectives: ['DbContext, DbSet', 'Connection string', 'LINQ to Entities'],
    sections: [
      {
        id: 'dbcontext',
        title: 'DbContext',
        content: 'DbContext đại diện session với database. DbSet<T> là bảng.',
        code: `public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
    public DbSet<Product> Products => Set<Product>();
}`,
      },
    ],
    practice: 'Thêm EF Core SQL Server, entity Product, query FirstOrDefault.',
  },
  {
    topicId: 'relationships-migrations',
    summary: 'Model quan hệ và migration version schema database.',
    objectives: ['One-to-many configuration', 'dotnet ef migrations add', 'Seed data'],
    sections: [
      {
        id: 'migration',
        title: 'Migrations',
        content: 'Migration là snapshot schema — add/update/remove qua CLI.',
        code: `dotnet ef migrations add InitialCreate
dotnet ef database update`,
      },
    ],
    practice: 'Order + OrderItem one-to-many, migration + seed 10 products.',
  },
  {
    topicId: 'repository-pattern',
    summary: 'Repository tách data access — cân nhắc khi project lớn hoặc test.',
    objectives: ['IRepository<T>', 'Unit of Work giới thiệu', 'Khi nào skip repository'],
    sections: [
      {
        id: 'when-repo',
        title: 'Khi nào dùng?',
        content: 'EF Core DbContext đã là repository/unit of work — thêm layer khi cần abstraction hoặc swap storage.',
      },
    ],
    practice: 'IProductRepository với implementation EF Core.',
  },
  {
    topicId: 'project-crud-api',
    summary: 'CRUD API + database + pagination — milestone quan trọng.',
    objectives: ['Full CRUD với EF', 'Pagination query params', 'Error handling 404/400'],
    sections: [{ id: 'pagination', title: 'Pagination', content: 'GET /api/products?page=1&pageSize=20 trả items + totalCount.' }],
    practice: 'Products API: category filter, pagination, soft delete.',
  },
  {
    topicId: 'authentication-jwt',
    summary: 'JWT Bearer authentication — stateless API auth phổ biến.',
    objectives: ['Đăng ký AddAuthentication JwtBearer', 'Generate token login', '[Authorize] endpoints'],
    sections: [
      {
        id: 'jwt-flow',
        title: 'JWT flow',
        content: 'Client login → nhận access token → gửi header Authorization: Bearer {token}.',
        code: `builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { /* config */ });`,
      },
    ],
    practice: 'Login endpoint trả JWT, GET /me cần authorize.',
  },
  {
    topicId: 'unit-testing',
    summary: 'xUnit + Moq test logic; WebApplicationFactory cho integration test.',
    objectives: ['Arrange-Act-Assert', 'Mock dependency', 'Test API endpoint'],
    sections: [
      {
        id: 'xunit',
        title: 'xUnit basics',
        content: '[Fact] cho test đơn, [Theory] + [InlineData] cho parameterized.',
        code: `[Fact]
public void Add_ReturnsSum()
{
    var result = Calculator.Add(2, 3);
    Assert.Equal(5, result);
}`,
      },
    ],
    practice: 'Test BookService.Create validates empty title throws.',
  },
  {
    topicId: 'caching-redis',
    summary: 'Cache giảm load database — memory cache dev, Redis production.',
    objectives: ['IMemoryCache GetOrCreate', 'IDistributedCache', 'Cache invalidation'],
    sections: [
      {
        id: 'memory-cache',
        title: 'IMemoryCache',
        content: 'GetOrCreateAsync cache kết quả expensive query với absolute expiration.',
      },
    ],
    practice: 'Cache product list 5 phút, invalidate khi POST/PUT/DELETE.',
  },
  {
    topicId: 'clean-architecture',
    summary: 'Tách layers: Domain không phụ thuộc Infrastructure — testable và maintainable.',
    objectives: ['Domain / Application / Infrastructure / API', 'MediatR CQRS giới thiệu', 'Dependency rule'],
    sections: [
      {
        id: 'layers',
        title: 'Layers',
        content: 'API → Application (use cases) → Domain (entities) ← Infrastructure (EF, email).',
      },
    ],
    practice: 'Refactor CRUD API thành 3 project: Domain, Application, Infrastructure.',
  },
  {
    topicId: 'background-jobs',
    summary: 'IHostedService chạy task nền — email queue, cleanup, sync.',
    objectives: ['BackgroundService', 'CancellationToken stopping', 'Hangfire overview'],
    sections: [
      {
        id: 'hosted',
        title: 'BackgroundService',
        content: 'Kế thừa BackgroundService, override ExecuteAsync với loop + delay.',
      },
    ],
    practice: 'Service gửi heartbeat log mỗi 30 giây khi app chạy.',
  },
  {
    topicId: 'docker-deploy',
    summary: 'Containerize .NET API — portable deploy.',
    objectives: ['Multi-stage Dockerfile', 'docker-compose với DB', 'Environment variables'],
    sections: [
      {
        id: 'dockerfile',
        title: 'Dockerfile',
        content: 'Build stage dùng SDK, runtime stage chỉ aspnet image — image nhỏ hơn.',
        code: `FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "MyApi.dll"]`,
      },
    ],
    practice: 'Docker compose: API + PostgreSQL, chạy migration on startup.',
  },
  {
    topicId: 'cicd-azure',
    summary: 'GitHub Actions build, test, publish — quality gate trước deploy.',
    objectives: ['Workflow dotnet build/test', 'Artifact publish', 'Deploy step'],
    sections: [
      {
        id: 'gha',
        title: 'GitHub Actions',
        content: 'actions/setup-dotnet + dotnet test trên mỗi push/PR.',
        code: `- uses: actions/setup-dotnet@v4
  with:
    dotnet-version: '8.0.x'
- run: dotnet test`,
      },
    ],
    practice: 'Workflow chạy test trên PR, deploy main lên Azure/Railway.',
  },
  {
    topicId: 'capstone-project',
    summary: 'Capstone .NET — API production-ready cho portfolio.',
    objectives: ['JWT + EF Core + tests', 'Clean structure', 'Docker + CI + live URL'],
    sections: [{ id: 'idea', title: 'Ý tưởng', content: 'E-commerce API, Task management, hoặc Blog CMS — chọn 1 domain bạn thích.' }],
    practice: 'Hoàn thành capstone, README với architecture + Swagger link.',
  },
  {
    topicId: 'interview-prep',
    summary: 'Ôn phỏng vấn .NET developer — C#, ASP.NET Core, EF, system design.',
    objectives: ['DI lifetimes', 'EF tracking vs no-tracking', 'async best practices', 'SOLID'],
    sections: [
      {
        id: 'questions',
        title: 'Câu hỏi thường gặp',
        content: '1. Singleton vs Scoped vs Transient? 2. IAsyncEnumerable là gì? 3. EF N+1 problem? 4. Middleware vs Filter? 5. Value type vs reference type?',
      },
    ],
    practice: 'Viết câu trả lời 2 phút cho mỗi câu, practice mock interview.',
  },
];

export function getDotnetTopicLesson(topicId: string): TopicLesson | undefined {
  return DOTNET_TOPIC_LESSONS.find((l) => l.topicId === topicId);
}

export function dotnetHasFeaturedLesson(topicId: string): boolean {
  return topicId === 'webapi-basics' || topicId === 'sql-basics';
}

export function dotnetHasQuizzes(topicId: string): boolean {
  return topicId === 'webapi-basics' || topicId === 'sql-basics';
}
