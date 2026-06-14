namespace AngularDocs.Api.Models;

public class Roadmap
{
    public string Id { get; set; } = string.Empty; // e.g. "dotnet", "angular"
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int TotalWeeks { get; set; }
    
    public ICollection<Phase> Phases { get; set; } = new List<Phase>();
}

public class Phase
{
    public string Id { get; set; } = string.Empty;
    public int Order { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public int EstimatedWeeks { get; set; }

    // Foreign Key
    public string RoadmapId { get; set; } = string.Empty;
    public Roadmap? Roadmap { get; set; }

    public ICollection<Topic> Topics { get; set; } = new List<Topic>();
}

public class Topic
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty; // beginner, intermediate, advanced

    // Foreign Key
    public string PhaseId { get; set; } = string.Empty;
    public Phase? Phase { get; set; }

    public ICollection<TopicResource> Resources { get; set; } = new List<TopicResource>();
}

public class TopicResource
{
    public int Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;

    // Foreign Key
    public string TopicId { get; set; } = string.Empty;
    public Topic? Topic { get; set; }
}
