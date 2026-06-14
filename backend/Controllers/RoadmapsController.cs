using AngularDocs.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularDocs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoadmapsController : ControllerBase
{
    private readonly AppDbContext _context;

    public RoadmapsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Roadmap>>> GetRoadmaps()
    {
        return await _context.Roadmaps
            .Include(r => r.Phases)
                .ThenInclude(p => p.Topics)
                    .ThenInclude(t => t.Resources)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Roadmap>> GetRoadmap(string id)
    {
        var roadmap = await _context.Roadmaps
            .Include(r => r.Phases)
                .ThenInclude(p => p.Topics)
                    .ThenInclude(t => t.Resources)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (roadmap == null)
        {
            return NotFound();
        }

        return roadmap;
    }
}
