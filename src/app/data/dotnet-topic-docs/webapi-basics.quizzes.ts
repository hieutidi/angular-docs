import { TopicQuizzes } from '../../models/content.model';

/** 4 bài quiz gắn với Web API & Controllers */
export const WEBAPI_BASICS_QUIZZES: TopicQuizzes = {
  topicId: 'webapi-basics',
  lessons: [
    {
      id: 'webapi-quiz-1',
      order: 1,
      title: 'Quiz 1: Cấu trúc & Middleware',
      description: 'Kiểm tra hiểu biết về Program.cs và pipeline.',
      passingScore: 2,
      questions: [
        {
          id: 'q1-1',
          question: 'Middleware nào dùng để map route tới các Controller?',
          options: [
            { id: 'a', text: 'app.UseRouting()' },
            { id: 'b', text: 'app.MapControllers()' },
            { id: 'c', text: 'app.UseEndpoints()' },
            { id: 'd', text: 'app.UseControllers()' },
          ],
          correctOptionId: 'b',
          explanation: 'app.MapControllers() là lệnh chính để đăng ký các route từ class Controller vào pipeline.',
        },
        {
          id: 'q1-2',
          question: 'Thứ tự Middleware nào sau đây là đúng?',
          options: [
            { id: 'a', text: 'Authorization → ExceptionHandler → Routing' },
            { id: 'b', text: 'ExceptionHandler → Routing → Authorization' },
            { id: 'c', text: 'Routing → ExceptionHandler → Authorization' },
            { id: 'd', text: 'Authorization → Routing → ExceptionHandler' },
          ],
          correctOptionId: 'b',
          explanation: 'Exception Handler nên ở đầu để bắt lỗi của các lớp sau. Routing phải đứng trước Authorization để biết route đó yêu cầu quyền gì.',
        },
        {
          id: 'q1-3',
          question: 'WebApplication.CreateBuilder(args) dùng để làm gì?',
          options: [
            { id: 'a', text: 'Khởi tạo DI container và cấu hình app' },
            { id: 'b', text: 'Chạy ứng dụng ngay lập tức' },
            { id: 'c', text: 'Kết nối tới Database' },
            { id: 'd', text: 'Tạo file Program.cs mới' },
          ],
          correctOptionId: 'a',
          explanation: 'Builder dùng để đăng ký Services và cấu hình ban đầu trước khi gọi Build().',
        },
      ],
    },
    {
      id: 'webapi-quiz-2',
      order: 2,
      title: 'Quiz 2: Dependency Injection',
      description: 'Phân biệt các loại Lifetime trong DI.',
      passingScore: 2,
      questions: [
        {
          id: 'q2-1',
          question: 'Lifetime nào tạo instance mới cho mỗi lần được yêu cầu (resolve)?',
          options: [
            { id: 'a', text: 'Singleton' },
            { id: 'b', text: 'Scoped' },
            { id: 'c', text: 'Transient' },
            { id: 'd', text: 'Static' },
          ],
          correctOptionId: 'c',
          explanation: 'Transient tạo instance mới mỗi khi service được yêu cầu.',
        },
        {
          id: 'q2-2',
          question: 'Scoped lifetime hoạt động như thế nào?',
          options: [
            { id: 'a', text: 'Tạo một instance duy nhất cho cả vòng đời ứng dụng' },
            { id: 'b', text: 'Tạo một instance duy nhất cho mỗi HTTP Request' },
            { id: 'c', text: 'Tạo instance mới cho mỗi class inject' },
            { id: 'd', text: 'Chỉ tạo instance khi client gọi API' },
          ],
          correctOptionId: 'b',
          explanation: 'Scoped đảm bảo trong cùng một request, các class sẽ nhận chung một instance của service.',
        },
        {
          id: 'q2-3',
          question: 'Nên dùng Singleton cho loại service nào?',
          options: [
            { id: 'a', text: 'DbContext (Database Connection)' },
            { id: 'b', text: 'Cấu hình hệ thống (Configuration) hoặc Cache' },
            { id: 'c', text: 'User Session' },
            { id: 'd', text: 'Repository xử lý nghiệp vụ' },
          ],
          correctOptionId: 'b',
          explanation: 'Singleton phù hợp cho các service không thay đổi trạng thái hoặc dùng chung cho toàn bộ app.',
        },
      ],
    },
    {
      id: 'webapi-quiz-3',
      order: 3,
      title: 'Quiz 3: Controllers & Verbs',
      description: 'Sử dụng Verbs và Attributes chuyên sâu.',
      passingScore: 2,
      questions: [
        {
          id: 'q3-1',
          question: 'Attribute [ApiController] có tác dụng gì?',
          options: [
            { id: 'a', text: 'Bắt buộc class phải kế thừa từ Controller' },
            { id: 'b', text: 'Tự động validate Model và trả về lỗi 400 nếu sai' },
            { id: 'c', text: 'Chỉ cho phép trả về dữ liệu JSON' },
            { id: 'd', text: 'Tắt tính năng Dependency Injection' },
          ],
          correctOptionId: 'b',
          explanation: '[ApiController] bật nhiều convention như automatic model validation, binding source inference.',
        },
        {
          id: 'q3-2',
          question: 'Làm sao để lấy tham số từ Query String (ví dụ: ?page=1)?',
          options: [
            { id: 'a', text: 'Dùng [FromBody]' },
            { id: 'b', text: 'Dùng [FromRoute]' },
            { id: 'c', text: 'Dùng [FromQuery]' },
            { id: 'd', text: 'Dùng [FromHeader]' },
          ],
          correctOptionId: 'c',
          explanation: '[FromQuery] chỉ định tham số được lấy từ query string của URL.',
        },
        {
          id: 'q3-3',
          question: 'CreatedAtAction trả về status code nào?',
          options: [
            { id: 'a', text: '200 OK' },
            { id: 'b', text: '201 Created' },
            { id: 'c', text: '204 No Content' },
            { id: 'd', text: '202 Accepted' },
          ],
          correctOptionId: 'b',
          explanation: '201 Created là chuẩn khi tạo mới resource thành công kèm link tới resource đó.',
        },
      ],
    },
    {
      id: 'webapi-quiz-4',
      order: 4,
      title: 'Quiz 4: Validation & Error Handling',
      description: 'Xử lý dữ liệu và phản hồi lỗi.',
      passingScore: 2,
      questions: [
        {
          id: 'q4-1',
          question: 'Sử dụng Data Annotation nào để giới hạn độ dài chuỗi?',
          options: [
            { id: 'a', text: '[Range]' },
            { id: 'b', text: '[Required]' },
            { id: 'c', text: '[StringLength]' },
            { id: 'd', text: '[MaxLength]' },
          ],
          correctOptionId: 'c',
          explanation: '[StringLength] (hoặc [MaxLength]) dùng để giới hạn số ký tự của string.',
        },
        {
          id: 'q4-2',
          question: 'ProblemDetails là gì?',
          options: [
            { id: 'a', text: 'Một lỗi trong database' },
            { id: 'b', text: 'Chuẩn HTTP cho việc trả về chi tiết lỗi máy định dạng được' },
            { id: 'c', text: 'Tên của một middleware' },
            { id: 'd', text: 'Cấu hình trong appsettings.json' },
          ],
          correctOptionId: 'b',
          explanation: 'ProblemDetails (RFC 7807) là chuẩn để API trả về thông báo lỗi nhất quán.',
        },
        {
          id: 'q4-3',
          question: 'Khi validate thất bại ở lớp Controller, response mặc định là gì?',
          options: [
            { id: 'a', text: '500 Internal Server Error' },
            { id: 'b', text: '404 Not Found' },
            { id: 'c', text: '400 Bad Request' },
            { id: 'd', text: '403 Forbidden' },
          ],
          correctOptionId: 'c',
          explanation: 'Nếu ModelState không hợp lệ, [ApiController] tự động trả về 400 Bad Request.',
        },
      ],
    },
  ],
};
