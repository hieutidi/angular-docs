import { TopicLesson } from '../../models/content.model';

export const SQL_BASICS_LESSON: TopicLesson = {
  topicId: 'sql-basics',
  summary:
    'SQL (Structured Query Language) là ngôn ngữ tiêu chuẩn để quản lý và thao tác dữ liệu trong các hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) như SQL Server. Hiểu SQL là bước bắt buộc để làm việc hiệu quả với EF Core.',
  objectives: [
    'Nắm vững cú pháp SELECT, FROM, WHERE, ORDER BY',
    'Thực hiện các thao tác CRUD: INSERT, UPDATE, DELETE',
    'Sử dụng JOIN để kết hợp dữ liệu từ nhiều bảng',
    'Hiểu về Primary Key, Foreign Key và các ràng buộc (Constraints)',
    'Sử dụng các hàm aggregate (COUNT, SUM, AVG) và GROUP BY'
  ],
  sections: [
    {
      id: 'select-basics',
      title: 'Truy vấn dữ liệu với SELECT',
      content:
        'Câu lệnh SELECT dùng để lấy dữ liệu từ một hoặc nhiều bảng. Bạn có thể chọn cụ thể các cột hoặc dùng * để lấy tất cả. WHERE dùng để lọc dữ liệu theo điều kiện.',
      code: `-- Lấy tất cả cột
SELECT * FROM Products;

-- Chọn cột cụ thể và lọc theo giá
SELECT Name, Price 
FROM Products 
WHERE Price > 500 AND CategoryId = 1
ORDER BY Price DESC;`
    },
    {
      id: 'crud-ops',
      title: 'Thao tác dữ liệu (CRUD)',
      content:
        'Ngoài đọc dữ liệu, chúng ta cần Insert (thêm), Update (sửa) và Delete (xóa). Luôn cẩn thận với WHERE trong câu lệnh Update và Delete để tránh ảnh hưởng toàn bộ bảng.',
      code: `-- Thêm bản ghi mới
INSERT INTO Products (Name, Price, Stock)
VALUES ('Laptop Dell', 1200, 10);

-- Cập nhật giá
UPDATE Products 
SET Price = 1100 
WHERE Id = 5;

-- Xóa sản phẩm
DELETE FROM Products 
WHERE Stock = 0;`
    },
    {
      id: 'joins',
      title: 'Kết hợp bảng với JOIN',
      content:
        'Trong DB quan hệ, dữ liệu thường được tách ra nhiều bảng. INNER JOIN là loại phổ biến nhất, dùng để lấy các bản ghi có giá trị khớp nhau ở cả hai bảng (thông qua Foreign Key).',
      code: `-- Lấy sản phẩm kèm tên danh mục
SELECT p.Name, c.CategoryName
FROM Products p
INNER JOIN Categories c ON p.CategoryId = c.Id;

-- LEFT JOIN lấy tất cả sản phẩm, kể cả loại chưa có danh mục
SELECT p.Name, c.CategoryName
FROM Products p
LEFT JOIN Categories c ON p.CategoryId = c.Id;`
    },
    {
      id: 'aggregate-groupby',
      title: 'Hàm gộp & GROUP BY',
      content:
        'Các hàm như COUNT, SUM, AVG giúp thống kê dữ liệu. GROUP BY dùng để nhóm các hàng có cùng giá trị vào các hàng tóm tắt.',
      code: `-- Đếm số sản phẩm trong mỗi danh mục
SELECT CategoryId, COUNT(*) as TotalProducts
FROM Products
GROUP BY CategoryId
HAVING COUNT(*) > 5;`
    },
    {
      id: 'constraints',
      title: 'Ràng buộc & Khóa (Constraints)',
      content:
        'Primary Key (Khóa chính) định danh duy nhất mỗi hàng. Foreign Key (Khóa ngoại) tạo mối liên kết giữa các bảng. Ràng buộc giúp đảm bảo tính toàn vẹn của dữ liệu.',
      code: `-- Tạo bảng với ràng buộc
CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderDate DATETIME DEFAULT GETDATE(),
    CustomerId INT NOT NULL,
    TotalAmount DECIMAL(18,2) CHECK (TotalAmount >= 0),
    FOREIGN KEY (CustomerId) REFERENCES Customers(Id)
);`
    }
  ],
  practice:
    'Thực hành: 1. Viết query lấy danh sách sinh viên có điểm > 8. 2. Dùng JOIN để lấy tên sinh viên kèm tên lớp. 3. Tính điểm trung bình của mỗi lớp bằng GROUP BY và AVG.',
  codeExercises: [
    {
      id: 'sql-lab-1',
      title: 'Lab 1: Truy vấn JOIN cơ bản',
      instructions:
        'Viết câu lệnh SQL để lấy cột Title của bảng Books và Name của bảng Authors thông qua JOIN giữa hai bảng này.',
      starterCode: `-- Cấu trúc: Books (Id, Title, AuthorId), Authors (Id, Name)
-- Viết câu lệnh SELECT JOIN ở dưới:
`,
      language: 'sql',
      checks: [
        { id: 'c1', description: 'Sử dụng SELECT', pattern: 'SELECT' },
        { id: 'c2', description: 'Sử dụng JOIN hoặc INNER JOIN', pattern: 'JOIN' },
        { id: 'c3', description: 'Sử dụng ON để nối khóa', pattern: 'ON' }
      ],
      hints: [
        'Cú pháp: SELECT b.Title, a.Name FROM Books b JOIN Authors a ON b.AuthorId = a.Id',
        'Đừng quên định danh bảng (alias) để query ngắn gọn hơn.'
      ]
    },
    {
      id: 'sql-lab-2',
      title: 'Lab 2: Filter và Aggregate',
      instructions: 'Đếm số lượng sách (count) của tác giả có Id = 1.',
      starterCode: `-- Viết câu lệnh COUNT ở dưới:
`,
      language: 'sql',
      checks: [
        { id: 'c1', description: 'Sử dụng COUNT(*)', pattern: 'COUNT\\(' },
        { id: 'c2', description: 'Có điều kiện WHERE AuthorId = 1', pattern: 'WHERE.*AuthorId\\s*=\\s*1' }
      ],
      hints: ['Dùng SELECT COUNT(*) FROM Books...', 'Thêm WHERE để lọc đúng tác giả.']
    }
  ]
};
