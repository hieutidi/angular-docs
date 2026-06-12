import { Roadmap } from '../models/roadmap.model';

export const DOTNET_ROADMAP: Roadmap = {
  title: 'Lộ trình học .NET',
  description:
    'Lộ trình từ zero đến junior/mid .NET developer — C#, ASP.NET Core, EF Core, deploy và chuẩn bị phỏng vấn.',
  totalWeeks: 16,
  phases: [
    {
      id: 'foundation',
      order: 1,
      title: 'Nền tảng',
      subtitle: 'Tuần 1–2',
      description: 'C# cơ bản, OOP và làm quen hệ sinh thái .NET.',
      icon: '🧱',
      color: 'emerald',
      estimatedWeeks: 2,
      topics: [
        {
          id: 'csharp-basics',
          title: 'C# cơ bản',
          description: 'Biến, kiểu dữ liệu, vòng lặp, điều kiện, method, namespace và cấu trúc project.',
          duration: '4–5 ngày',
          level: 'beginner',
          resources: [
            { label: 'C# docs', url: 'https://learn.microsoft.com/dotnet/csharp/' },
            { label: 'Tour of C#', url: 'https://learn.microsoft.com/dotnet/csharp/tour-of-csharp/' },
          ],
        },
        {
          id: 'oop-csharp',
          title: 'OOP trong C#',
          description: 'Class, object, inheritance, polymorphism, interface, abstract class, encapsulation.',
          duration: '3–4 ngày',
          level: 'beginner',
          resources: [
            { label: 'OOP in C#', url: 'https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/' },
          ],
        },
        {
          id: 'dotnet-ecosystem',
          title: 'Hệ sinh thái .NET',
          description: '.NET SDK, runtime, NuGet, solution/project structure, CLI cơ bản.',
          duration: '2 ngày',
          level: 'beginner',
          resources: [
            { label: '.NET overview', url: 'https://learn.microsoft.com/dotnet/core/introduction' },
            { label: 'dotnet CLI', url: 'https://learn.microsoft.com/dotnet/core/tools/' },
          ],
        },
        {
          id: 'git-tools',
          title: 'Git & IDE',
          description: 'Visual Studio / VS Code + C# Dev Kit, Git workflow, debug cơ bản.',
          duration: '2 ngày',
          level: 'beginner',
          resources: [
            { label: 'VS Code C#', url: 'https://code.visualstudio.com/docs/languages/csharp' },
            { label: 'Pro Git', url: 'https://git-scm.com/book/en/v2' },
          ],
        },
      ],
    },
    {
      id: 'csharp-advanced',
      order: 2,
      title: 'C# nâng cao',
      subtitle: 'Tuần 3–4',
      description: 'LINQ, async/await, generics và xử lý lỗi chuyên nghiệp.',
      icon: '⚡',
      color: 'violet',
      estimatedWeeks: 2,
      topics: [
        {
          id: 'linq',
          title: 'LINQ',
          description: 'Query syntax vs method syntax, Where, Select, GroupBy, Join, deferred execution.',
          duration: '3–4 ngày',
          level: 'beginner',
          resources: [
            { label: 'LINQ', url: 'https://learn.microsoft.com/dotnet/csharp/linq/' },
          ],
        },
        {
          id: 'async-await',
          title: 'Async / Await',
          description: 'Task, async/await, ConfigureAwait, cancellation token, tránh deadlock.',
          duration: '3–4 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Async programming', url: 'https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/' },
          ],
        },
        {
          id: 'generics-collections',
          title: 'Generics & Collections',
          description: 'List, Dictionary, HashSet, IEnumerable, generic constraints, record types.',
          duration: '3 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Generics', url: 'https://learn.microsoft.com/dotnet/csharp/fundamentals/types/generics' },
            { label: 'Collections', url: 'https://learn.microsoft.com/dotnet/standard/collections/' },
          ],
        },
        {
          id: 'exception-logging',
          title: 'Exception & Logging',
          description: 'try/catch/finally, custom exceptions, ILogger, log levels, structured logging.',
          duration: '2 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Exceptions', url: 'https://learn.microsoft.com/dotnet/csharp/fundamentals/exceptions/' },
            { label: 'Logging in .NET', url: 'https://learn.microsoft.com/dotnet/core/extensions/logging' },
          ],
        },
      ],
    },
    {
      id: 'aspnet-core',
      order: 3,
      title: 'ASP.NET Core',
      subtitle: 'Tuần 5–7',
      description: 'Xây Web API, dependency injection, middleware và dự án REST đầu tiên.',
      icon: '🌐',
      color: 'blue',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'setup-sdk',
          title: 'Cài đặt & Project',
          description: 'dotnet new webapi, Program.cs, appsettings.json, launchSettings, Swagger.',
          duration: '1 ngày',
          level: 'beginner',
          resources: [
            { label: 'ASP.NET Core', url: 'https://learn.microsoft.com/aspnet/core/' },
            { label: 'Web API tutorial', url: 'https://learn.microsoft.com/aspnet/core/tutorials/first-web-api' },
          ],
        },
        {
          id: 'webapi-basics',
          title: 'Web API & Controllers',
          description: 'Minimal API vs Controller, routing, model binding, IActionResult, status codes.',
          duration: '4–5 ngày',
          level: 'beginner',
          resources: [
            { label: 'Controllers', url: 'https://learn.microsoft.com/aspnet/core/web-api/' },
            { label: 'Minimal APIs', url: 'https://learn.microsoft.com/aspnet/core/fundamentals/minimal-apis' },
          ],
        },
        {
          id: 'dependency-injection',
          title: 'Dependency Injection',
          description: 'IServiceCollection, lifetimes (Singleton/Scoped/Transient), inject vào controller.',
          duration: '3 ngày',
          level: 'intermediate',
          resources: [
            { label: 'DI in ASP.NET Core', url: 'https://learn.microsoft.com/aspnet/core/fundamentals/dependency-injection' },
          ],
        },
        {
          id: 'middleware-pipeline',
          title: 'Middleware Pipeline',
          description: 'Request pipeline, Use/Run/Map, custom middleware, exception handling middleware.',
          duration: '2–3 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Middleware', url: 'https://learn.microsoft.com/aspnet/core/fundamentals/middleware/' },
          ],
        },
        {
          id: 'project-rest-api',
          title: 'Dự án: REST API đơn giản',
          description: 'API quản lý sách/todo in-memory — CRUD endpoints, DTO, validation cơ bản.',
          duration: '4 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Tutorial Web API', url: 'https://learn.microsoft.com/aspnet/core/tutorials/first-web-api' },
          ],
        },
      ],
    },
    {
      id: 'ef-core',
      order: 4,
      title: 'Database & EF Core',
      subtitle: 'Tuần 8–10',
      description: 'SQL cơ bản, Entity Framework Core, migrations và CRUD với database thật.',
      icon: '🗄️',
      color: 'cyan',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'sql-basics',
          title: 'SQL cơ bản',
          description: 'SELECT, INSERT, UPDATE, DELETE, JOIN, WHERE, ORDER BY, primary/foreign key.',
          duration: '3 ngày',
          level: 'beginner',
          resources: [
            { label: 'SQL Server tutorial', url: 'https://learn.microsoft.com/sql/t-sql/tutorial-writing-transact-sql-statements' },
          ],
        },
        {
          id: 'ef-core-intro',
          title: 'EF Core giới thiệu',
          description: 'DbContext, DbSet, Code First, connection string, querying với LINQ.',
          duration: '4 ngày',
          level: 'intermediate',
          resources: [
            { label: 'EF Core', url: 'https://learn.microsoft.com/ef/core/' },
            { label: 'Getting started', url: 'https://learn.microsoft.com/ef/core/get-started/overview/first-app' },
          ],
        },
        {
          id: 'relationships-migrations',
          title: 'Relationships & Migrations',
          description: 'One-to-many, many-to-many, Fluent API, dotnet ef migrations, seed data.',
          duration: '4 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Relationships', url: 'https://learn.microsoft.com/ef/core/modeling/relationships' },
            { label: 'Migrations', url: 'https://learn.microsoft.com/ef/core/managing-schemas/migrations/' },
          ],
        },
        {
          id: 'repository-pattern',
          title: 'Repository Pattern',
          description: 'Tách data access, IRepository, Unit of Work — khi nào cần, khi nào không.',
          duration: '2 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Repository pattern', url: 'https://learn.microsoft.com/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design' },
          ],
        },
        {
          id: 'project-crud-api',
          title: 'Dự án: CRUD API + DB',
          description: 'API products/users với SQL Server hoặc PostgreSQL, EF Core migrations, pagination.',
          duration: '5 ngày',
          level: 'intermediate',
          resources: [
            { label: 'EF Core with Web API', url: 'https://learn.microsoft.com/aspnet/core/data/ef-rp/intro' },
          ],
        },
      ],
    },
    {
      id: 'advanced',
      order: 5,
      title: 'Nâng cao',
      subtitle: 'Tuần 11–13',
      description: 'Authentication, testing, caching, clean architecture và background jobs.',
      icon: '🚀',
      color: 'amber',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'authentication-jwt',
          title: 'Authentication & JWT',
          description: 'ASP.NET Core Identity, JWT bearer, [Authorize], refresh token cơ bản.',
          duration: '4 ngày',
          level: 'advanced',
          resources: [
            { label: 'Auth in Web API', url: 'https://learn.microsoft.com/aspnet/core/security/authentication/' },
            { label: 'JWT Bearer', url: 'https://learn.microsoft.com/aspnet/core/security/authentication/jwt-authn' },
          ],
        },
        {
          id: 'unit-testing',
          title: 'Unit Testing',
          description: 'xUnit, Moq, test controller/service, integration test với WebApplicationFactory.',
          duration: '4 ngày',
          level: 'advanced',
          resources: [
            { label: 'Unit testing C#', url: 'https://learn.microsoft.com/dotnet/core/testing/' },
            { label: 'Integration tests', url: 'https://learn.microsoft.com/aspnet/core/test/integration-tests' },
          ],
        },
        {
          id: 'caching-redis',
          title: 'Caching & Performance',
          description: 'IMemoryCache, distributed cache, Redis, response compression, async best practices.',
          duration: '3 ngày',
          level: 'advanced',
          resources: [
            { label: 'Caching', url: 'https://learn.microsoft.com/aspnet/core/performance/caching/memory' },
          ],
        },
        {
          id: 'clean-architecture',
          title: 'Clean Architecture',
          description: 'Layers: Domain, Application, Infrastructure, API — CQRS giới thiệu, MediatR.',
          duration: '4 ngày',
          level: 'advanced',
          resources: [
            { label: '.NET architecture guides', url: 'https://learn.microsoft.com/dotnet/architecture/' },
          ],
        },
        {
          id: 'background-jobs',
          title: 'Background Jobs',
          description: 'IHostedService, BackgroundService, Hangfire/Quartz giới thiệu, queue pattern.',
          duration: '2 ngày',
          level: 'advanced',
          resources: [
            { label: 'Background tasks', url: 'https://learn.microsoft.com/aspnet/core/fundamentals/host/hosted-services' },
          ],
        },
      ],
    },
    {
      id: 'production',
      order: 6,
      title: 'Production & Career',
      subtitle: 'Tuần 14–16',
      description: 'Docker, CI/CD, capstone project và chuẩn bị phỏng vấn .NET.',
      icon: '🎯',
      color: 'indigo',
      estimatedWeeks: 2,
      topics: [
        {
          id: 'docker-deploy',
          title: 'Docker & Deploy',
          description: 'Dockerfile cho ASP.NET Core, docker-compose, deploy Azure App Service / Railway.',
          duration: '3 ngày',
          level: 'advanced',
          resources: [
            { label: 'Docker with .NET', url: 'https://learn.microsoft.com/dotnet/core/docker/introduction' },
            { label: 'Deploy to Azure', url: 'https://learn.microsoft.com/aspnet/core/host-and-deploy/' },
          ],
        },
        {
          id: 'cicd-azure',
          title: 'CI/CD',
          description: 'GitHub Actions build & test, publish artifact, deploy pipeline cơ bản.',
          duration: '2 ngày',
          level: 'advanced',
          resources: [
            { label: 'GitHub Actions .NET', url: 'https://docs.github.com/actions/automating-builds-and-tests/building-and-testing-net' },
          ],
        },
        {
          id: 'capstone-project',
          title: 'Dự án tổng kết (Capstone)',
          description: 'Full API: auth JWT, EF Core, clean architecture, tests, Docker, README portfolio.',
          duration: '1 tuần',
          level: 'advanced',
          resources: [
            { label: 'Clean Architecture template', url: 'https://github.com/jasontaylordev/CleanArchitecture' },
          ],
        },
        {
          id: 'interview-prep',
          title: 'Chuẩn bị phỏng vấn',
          description: 'Câu hỏi C#, DI lifetimes, EF Core, async, SOLID, system design API cơ bản.',
          duration: '3 ngày',
          level: 'advanced',
          resources: [
            { label: 'C# interview prep', url: 'https://learn.microsoft.com/dotnet/csharp/' },
          ],
        },
      ],
    },
  ],
};
