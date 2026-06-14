using Microsoft.EntityFrameworkCore;

namespace AngularDocs.Api.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Roadmap> Roadmaps => Set<Roadmap>();
    public DbSet<Phase> Phases => Set<Phase>();
    public DbSet<Topic> Topics => Set<Topic>();
    public DbSet<TopicResource> TopicResources => Set<TopicResource>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed some initial data for DotNet Roadmap
        modelBuilder.Entity<Roadmap>().HasData(new Roadmap
        {
            Id = "dotnet",
            Title = ".NET Backend Developer",
            Description = "Lộ trình trở thành lập trình viên .NET Backend chuyên nghiệp, từ cơ bản đến nâng cao.",
            TotalWeeks = 24
        });

        modelBuilder.Entity<Phase>().HasData(new Phase
        {
            Id = "csharp-basics",
            RoadmapId = "dotnet",
            Order = 1,
            Title = "C# & .NET Core Cơ bản",
            Subtitle = "Tuần 1-4",
            Description = "Nắm vững cú pháp C# và nền tảng .NET Core.",
            Icon = "🚀",
            Color = "violet",
            EstimatedWeeks = 4
        });

        modelBuilder.Entity<Topic>().HasData(new Topic
        {
            Id = "csharp-syntax",
            PhaseId = "csharp-basics",
            Title = "Cú pháp C# cơ bản",
            Description = "Biến, kiểu dữ liệu, vòng lặp, câu lệnh điều kiện.",
            Duration = "1 tuần",
            Level = "beginner"
        });

        modelBuilder.Entity<TopicResource>().HasData(new TopicResource
        {
            Id = 1,
            TopicId = "csharp-syntax",
            Label = "Microsoft C# Docs",
            Url = "https://learn.microsoft.com/en-us/dotnet/csharp/"
        });

        // Seed some initial data for Angular Roadmap
        modelBuilder.Entity<Roadmap>().HasData(new Roadmap
        {
            Id = "angular",
            Title = "Lộ trình học Angular (Từ C# API)",
            Description = "Dữ liệu này được load từ SQLite thông qua C# Web API! Lộ trình từ zero đến junior/mid Angular developer.",
            TotalWeeks = 16
        });

        modelBuilder.Entity<Phase>().HasData(new Phase
        {
            Id = "foundation",
            RoadmapId = "angular",
            Order = 1,
            Title = "Nền tảng",
            Subtitle = "Tuần 1–2",
            Description = "Chuẩn bị kiến thức nền trước khi vào Angular.",
            Icon = "🧱",
            Color = "emerald",
            EstimatedWeeks = 2
        });

        modelBuilder.Entity<Topic>().HasData(new Topic
        {
            Id = "typescript",
            PhaseId = "foundation",
            Title = "TypeScript cơ bản",
            Description = "Types, interfaces, generics, enums, union types — Angular viết bằng TypeScript nên đây là bước bắt buộc.",
            Duration = "3–4 ngày",
            Level = "beginner"
        });

        modelBuilder.Entity<TopicResource>().HasData(new TopicResource
        {
            Id = 2,
            TopicId = "typescript",
            Label = "TypeScript Handbook",
            Url = "https://www.typescriptlang.org/docs/handbook/intro.html"
        });
    }
}
