import { TopicQuizzes } from '../../models/content.model';

export const SQL_BASICS_QUIZZES: TopicQuizzes = {
  topicId: 'sql-basics',
  lessons: [
    {
      id: 'sql-quiz-1',
      order: 1,
      title: 'Quiz 1: SQL Cơ bản & CRUD',
      description: 'Kiểm tra kiến thức về truy vấn và thao tác dữ liệu.',
      passingScore: 2,
      questions: [
        {
          id: 'q1-1',
          question: 'Câu lệnh nào dùng để lấy các bản ghi duy nhất (không trùng lặp)?',
          options: [
            { id: 'a', text: 'SELECT UNIQUE' },
            { id: 'b', text: 'SELECT DISTINCT' },
            { id: 'c', text: 'SELECT DIFFERENT' },
            { id: 'd', text: 'SELECT ONLY' }
          ],
          correctOptionId: 'b',
          explanation: 'DISTINCT dùng để loại bỏ các bản ghi trùng lặp trong kết quả trả về.'
        },
        {
          id: 'q1-2',
          question: 'Lệnh UPDATE mà thiếu WHERE sẽ gây ra hậu quả gì?',
          options: [
            { id: 'a', text: 'Lỗi cú pháp' },
            { id: 'b', text: 'Không có bản ghi nào bị cập nhật' },
            { id: 'c', text: 'Cập nhật tất cả các hàng trong bảng' },
            { id: 'd', text: 'Chỉ cập nhật hàng đầu tiên' }
          ],
          correctOptionId: 'c',
          explanation: 'Nếu không có điều kiện WHERE, SQL Server sẽ áp dụng thay đổi cho mọi hàng trong bảng.'
        },
        {
          id: 'q1-3',
          question: 'Thứ tự đúng của các mệnh đề trong SQL?',
          options: [
            { id: 'a', text: 'SELECT, WHERE, FROM, ORDER BY' },
            { id: 'b', text: 'SELECT, FROM, ORDER BY, WHERE' },
            { id: 'c', text: 'SELECT, FROM, WHERE, ORDER BY' },
            { id: 'd', text: 'FROM, SELECT, WHERE, ORDER BY' }
          ],
          correctOptionId: 'c',
          explanation: 'Thứ tự chuẩn là SELECT (chọn cột) → FROM (chọn bảng) → WHERE (lọc hàng) → ORDER BY (sắp xếp).'
        }
      ]
    },
    {
      id: 'sql-quiz-2',
      order: 2,
      title: 'Quiz 2: JOIN & Relationships',
      description: 'Kiểm tra kiến thức về liên kết bảng.',
      passingScore: 2,
      questions: [
        {
          id: 'q2-1',
          question: 'Khóa ngoại (Foreign Key) dùng để làm gì?',
          options: [
            { id: 'a', text: 'Định danh duy nhất một hàng' },
            { id: 'b', text: 'Tạo liên kết giữa hai bảng' },
            { id: 'c', text: 'Tăng tốc độ tìm kiếm' },
            { id: 'd', text: 'Mã hóa dữ liệu' }
          ],
          correctOptionId: 'b',
          explanation: 'Khóa ngoại trỏ đến khóa chính của bảng khác để tạo mối quan hệ giữa chúng.'
        },
        {
          id: 'q2-2',
          question: 'INNER JOIN trả về kết quả như thế nào?',
          options: [
            { id: 'a', text: 'Lấy tất cả hàng ở cả hai bảng' },
            { id: 'b', text: 'Chỉ lấy các hàng có giá trị khớp ở cả hai bảng' },
            { id: 'c', text: 'Lấy tất cả hàng ở bảng bên trái' },
            { id: 'd', text: 'Lấy các hàng không khớp nhau' }
          ],
          correctOptionId: 'b',
          explanation: 'INNER JOIN chỉ trả về những bản ghi có sự tương ứng giữa hai bảng dựa trên điều kiện JOIN.'
        },
        {
          id: 'q2-3',
          question: 'Loại JOIN nào lấy tất cả hàng từ bảng đầu tiên ngay cả khi không có kết quả khớp ở bảng thứ hai?',
          options: [
            { id: 'a', text: 'INNER JOIN' },
            { id: 'b', text: 'RIGHT JOIN' },
            { id: 'c', text: 'LEFT JOIN' },
            { id: 'd', text: 'FULL JOIN' }
          ],
          correctOptionId: 'c',
          explanation: 'LEFT JOIN (hoặc LEFT OUTER JOIN) giữ lại toàn bộ bản ghi của bảng bên trái.'
        }
      ]
    },
    {
      id: 'sql-quiz-3',
      order: 3,
      title: 'Quiz 3: Aggregate & Constraints',
      description: 'Kiểm tra kiến thức về hàm gộp và ràng buộc dữ liệu.',
      passingScore: 2,
      questions: [
        {
          id: 'q3-1',
          question: 'Để lọc kết quả sau khi đã GROUP BY, ta dùng mệnh đề nào?',
          options: [
            { id: 'a', text: 'WHERE' },
            { id: 'b', text: 'FILTER' },
            { id: 'c', text: 'HAVING' },
            { id: 'd', text: 'LIMIT' }
          ],
          correctOptionId: 'c',
          explanation: 'WHERE dùng để lọc hàng trước khi nhóm, HAVING dùng để lọc các nhóm sau khi GROUP BY.'
        },
        {
          id: 'q3-2',
          question: 'Ràng buộc IDENTITY(1,1) thường dùng cho cột nào?',
          options: [
            { id: 'a', text: 'Cột chứa tên' },
            { id: 'b', text: 'Cột Khóa chính để tự động tăng số' },
            { id: 'c', text: 'Cột chứa ngày tháng' },
            { id: 'd', text: 'Cột chứa giá tiền' }
          ],
          correctOptionId: 'b',
          explanation: 'IDENTITY giúp SQL Server tự động sinh giá trị tăng dần cho khóa chính.'
        },
        {
          id: 'q3-3',
          question: 'Hàm nào dùng để tính giá trị trung bình?',
          options: [
            { id: 'a', text: 'MEAN()' },
            { id: 'b', text: 'TOTAL()' },
            { id: 'c', text: 'AVG()' },
            { id: 'd', text: 'SUM() / 2' }
          ],
          correctOptionId: 'c',
          explanation: 'AVG() viết tắt của Average, dùng để tính trung bình cộng của một cột số.'
        }
      ]
    }
  ]
};
