import { TopicLesson } from '../../models/content.model';

/** Bài học chi tiết mẫu cho .NET — tương tự Components trong Angular track */
export const WEBAPI_BASICS_LESSON: TopicLesson = {
  topicId: 'webapi-basics',
  summary:
    'ASP.NET Core Web API là framework mạnh mẽ để xây dựng RESTful services. Nó cung cấp cơ chế routing linh hoạt, tích hợp sẵn Dependency Injection và Middleware pipeline giúp xử lý request/response một cách chuyên nghiệp.',
  objectives: [
    'Hiểu cấu trúc Program.cs và Middleware pipeline',
    'Phân biệt các loại Dependency Injection Lifetimes',
    'Xây dựng CRUD Controller với đầy đủ HTTP Verbs',
    'Sử dụng DTOs và Data Annotations để validate dữ liệu',
    'Xử lý lỗi tập trung và trả về chuẩn ProblemDetails',
  ],
  sections: [
    {
      id: 'program-structure',
      title: 'Cấu trúc Program.cs & Pipeline',
      content:
        'Trong .NET hiện đại, Program.cs đảm nhận cả việc cấu hình Service (DI Container) và xây dựng Request Pipeline (Middleware). Thứ tự các middleware rất quan trọng: Auth phải đứng trước Endpoints, Exception Handler nên đứng đầu.',
      code: `var builder = WebApplication.CreateBuilder(args);

// 1. Cấu hình Services (DI)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IBookService, BookService>();

var app = builder.Build();

// 2. Cấu hình Pipeline (Middleware)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers(); // Map route tới Controller

app.Run();`,
    },
    {
      id: 'di-lifetimes',
      title: 'Dependency Injection Lifetimes',
      content:
        'ASP.NET Core tích hợp sẵn DI container. Bạn cần chọn lifetime phù hợp: Transient (tạo mới mỗi lần gọi), Scoped (tạo một lần cho mỗi HTTP request), Singleton (tạo một lần duy nhất cho toàn bộ app).',
      code: `// Trong Program.cs
builder.Services.AddTransient<IOperationTransient, Operation>();
builder.Services.AddScoped<IOperationScoped, Operation>();
builder.Services.AddSingleton<IOperationSingleton, Operation>();

// Inject qua Constructor
public class BooksController(IBookService bookService) : ControllerBase
{
    // C# 12 Primary Constructor syntax
}`,
    },
    {
      id: 'routing-verbs',
      title: 'Routing & HTTP Verbs',
      content:
        'Sử dụng [ApiController] và [Route] để định nghĩa API. Các verb như [HttpGet], [HttpPost], [HttpPut], [HttpDelete] xác định hành động. Query string và Route params được tự động bind vào tham số của method.',
      code: `[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    [HttpGet] // GET /api/books
    public IActionResult GetAll([FromQuery] string? genre) => Ok();

    [HttpGet("{id:int}")] // GET /api/books/1
    public IActionResult GetById(int id) => Ok();

    [HttpPost] // POST /api/books
    public IActionResult Create([FromBody] CreateBookDto dto) 
        => CreatedAtAction(nameof(GetById), new { id = 1 }, dto);
}`,
    },
    {
      id: 'dto-validation',
      title: 'DTO & Validation',
      content:
        'Đừng bao giờ expose trực tiếp Database Entity ra API. Hãy dùng DTO (Data Transfer Object) kết hợp Data Annotations để validate input ngay tại lớp Controller.',
      code: `public record CreateBookDto(
    [Required] [StringLength(100)] string Title,
    [Range(0, 1000)] decimal Price,
    string? Author
);

// [ApiController] tự động kiểm tra ModelState
// Nếu valid fail, nó sẽ trả về 400 Bad Request kèm chi tiết lỗi.`,
    },
    {
      id: 'error-handling',
      title: 'Xử lý lỗi & Status Codes',
      content:
        'Một API tốt nên trả về HTTP Status Codes chuẩn: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found). Sử dụng ProblemDetails để trả về lỗi chi tiết cho client.',
      code: `[HttpGet("{id}")]
public ActionResult<BookDto> Get(int id)
{
    var book = _service.GetById(id);
    if (book == null)
    {
        return NotFound(new ProblemDetails 
        { 
            Title = "Không tìm thấy sách",
            Detail = $"Sách có ID {id} không tồn tại trong hệ thống." 
        });
    }
    return Ok(book);
}`,
    },
  ],
  practice:
    'Nhiệm vụ: Xây dựng một API quản lý Library. 1. Tạo DTO cho Book. 2. Viết Controller với các endpoint CRUD. 3. Sử dụng Dependency Injection để inject BookService. 4. Thêm validation cho input và xử lý trường hợp 404 khi không tìm thấy sách.',
  codeExercises: [
    {
      id: 'webapi-lab-1',
      title: 'Lab 1: Cấu hình Dependency Injection',
      instructions:
        'Trong file Program.cs, hãy đăng ký interface IBookService với implementation BookService theo Scoped lifetime.',
      starterCode: `var builder = WebApplication.CreateBuilder(args);

// TODO: Đăng ký IBookService với BookService (Scoped)
// builder.Services.Add...

var app = builder.Build();
app.Run();

public interface IBookService {}
public class BookService : IBookService {}`,
      language: 'csharp',
      checks: [
        { id: 'c1', description: 'Sử dụng AddScoped', pattern: 'AddScoped' },
        { id: 'c2', description: 'Đăng ký đúng interface và class', pattern: 'AddScoped<IBookService,\\s*BookService>' },
      ],
      hints: [
        'Sử dụng builder.Services để truy cập DI container.',
        'Cú pháp: AddScoped<TInterface, TImplementation>().',
      ],
    },
    {
      id: 'webapi-lab-2',
      title: 'Lab 2: Viết GetById với Validation',
      instructions: 'Hoàn thiện method GetById trả về 404 NotFound nếu service trả về null.',
      starterCode: `[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IBookService _service;
    public BooksController(IBookService service) => _service = service;

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var book = _service.GetById(id);
        // TODO: Kiểm tra book null thì trả về NotFound()
        // Ngược lại trả về Ok(book)
        return null;
    }
}

public interface IBookService { object GetById(int id); }`,
      language: 'csharp',
      checks: [
        { id: 'c1', description: 'Kiểm tra null', pattern: 'if\\s*\\(book\\s*==\\s*null\\)' },
        { id: 'c2', description: 'Trả về NotFound()', pattern: 'return\\s*NotFound\\(\\)' },
        { id: 'c3', description: 'Trả về Ok(book)', pattern: 'return\\s*Ok\\(book\\)' },
      ],
      hints: [
        'Dùng lệnh if để check dữ liệu.',
        'ControllerBase có sẵn các helper method như Ok() và NotFound().',
      ],
    },
  ],
};
