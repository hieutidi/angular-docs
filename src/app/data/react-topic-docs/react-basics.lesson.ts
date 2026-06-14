import { TopicLesson } from '../../models/content.model';

export const REACT_BASICS_LESSON: TopicLesson = {
  topicId: 'react-basics',
  summary:
    'React là một thư viện JavaScript để xây dựng giao diện người dùng (UI). Nó dựa trên các thành phần (components) tái sử dụng và quản lý trạng thái hiệu quả.',
  objectives: [
    'Hiểu khái niệm Component trong React',
    'Sử dụng JSX để viết markup',
    'Quản lý trạng thái với useState Hook',
    'Truyền dữ liệu qua Props',
    'Xử lý sự kiện và Rendering danh sách',
  ],
  sections: [
    {
      id: 'what-is-component',
      title: 'Component là gì?',
      content:
        'Các ứng dụng React được xây dựng từ các component. Một component là một phần của UI có logic và giao diện riêng. Trong React, component là các hàm JavaScript trả về markup.',
      code: `function MyButton() {
  return (
    <button>Tôi là một nút bấm</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Chào mừng đến với ứng dụng của tôi</h1>
      <MyButton />
    </div>
  );
}`,
    },
    {
      id: 'jsx-markup',
      title: 'Viết Markup với JSX',
      content:
        'JSX là một phần mở rộng cú pháp cho JavaScript trông giống như HTML. Nó nghiêm ngặt hơn HTML: bạn phải đóng các thẻ như <br />, và component không thể trả về nhiều thẻ JSX gốc (phải bọc trong <div> hoặc Fragment <>...</>).',
      code: `function AboutPage() {
  return (
    <>
      <h1>Giới thiệu</h1>
      <p>Chào bạn.<br />Bạn khỏe không?</p>
    </>
  );
}`,
    },
    {
      id: 'props-data',
      title: 'Truyền dữ liệu với Props',
      content:
        'Component React sử dụng props để giao tiếp với nhau. Mỗi component cha có thể truyền một số thông tin cho các component con của nó bằng cách cung cấp cho chúng các props.',
      code: `function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={person.imageUrl}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageUrl: 'https://i.imgur.com/1bX5QH6.jpg' }}
      size={100}
    />
  );
}`,
    },
    {
      id: 'state-hook',
      title: 'Quản lý trạng thái với useState',
      content:
        'Để component "ghi nhớ" thông tin và cập nhật giao diện khi thông tin đó thay đổi, chúng ta dùng useState Hook. Nó trả về một mảng gồm giá trị hiện tại và một hàm để cập nhật giá trị đó.',
      code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Đã bấm {count} lần
    </button>
  );
}`,
    },
    {
      id: 'conditional-rendering',
      title: 'Rendering có điều kiện',
      content:
        'Trong React, bạn có thể render các phần khác nhau của UI tùy thuộc vào điều kiện cụ thể bằng cách sử dụng cú pháp JavaScript thông thường như if, toán tử ternary ? : hoặc &&.',
      code: `function PackingList() {
  return (
    <section>
      <h1>Danh sách đồ dùng</h1>
      <ul>
        <Item isPacked={true} name="Áo khoác" />
        <Item isPacked={false} name="Kính râm" />
      </ul>
    </section>
  );
}

function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}`,
    },
    {
      id: 'rendering-lists',
      title: 'Rendering danh sách',
      content:
        'Bạn sẽ thường sử dụng các tính năng của JavaScript như vòng lặp for và phương thức mảng .map() để render các danh sách component. Đừng quên cung cấp một thuộc tính key duy nhất cho mỗi phần tử.',
      code: `const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}`,
    },
  ],
  practice:
    'Tạo một component ProfileCard nhận thông tin user qua props. Sử dụng useState để theo dõi trạng thái "Like" (true/false). Hiển thị danh sách các sở thích (hobbies) của user bằng cách dùng .map().',
  codeExercises: [
    {
      id: 'react-lab-1',
      title: 'Lab 1: Your First Component',
      instructions:
        'Hoàn thiện component MyGreeting để hiển thị lời chào "Hello React!". Cần đảm bảo tên component bắt đầu bằng chữ cái viết hoa.',
      starterCode: `import React from 'react';

// TODO: Tạo component MyGreeting trả về thẻ <h1>Hello React!</h1>
export default function App() {
  return (
    <div>
      {/* TODO: Render component MyGreeting ở đây */}
    </div>
  );
}`,
      language: 'javascript',
      checks: [
        { id: 'c1', description: 'Có định nghĩa function MyGreeting', pattern: 'function\\s+MyGreeting' },
        { id: 'c2', description: 'Trả về thẻ h1', pattern: '<h1>' },
        { id: 'c3', description: 'Render MyGreeting trong App', pattern: '<MyGreeting\\s*/>' },
      ],
      hints: [
        'Component React là một function trả về JSX.',
        'Đừng quên gọi component con bằng cú pháp <ComponentName />.',
      ],
    },
    {
      id: 'react-lab-2',
      title: 'Lab 2: State and Events',
      instructions:
        'Tạo một nút bấm đếm số lần click. Sử dụng useState để lưu trữ số lần bấm và cập nhật nó mỗi khi click.',
      starterCode: `import React, { useState } from 'react';

export default function Counter() {
  // TODO: Khai báo state 'count' khởi tạo là 0
  
  return (
    <button>
      {/* TODO: Hiển thị giá trị count và thêm sự kiện onClick để tăng count */}
      Clicked 0 times
    </button>
  );
}`,
      language: 'javascript',
      checks: [
        { id: 'c1', description: 'Sử dụng useState(0)', pattern: 'useState\\(0\\)' },
        { id: 'c2', description: 'Có sự kiện onClick', pattern: 'onClick' },
        { id: 'c3', description: 'Gọi hàm setter của count', pattern: 'setCount' },
      ],
      hints: [
        'Cấu trúc useState: const [value, setValue] = useState(initialValue);',
        'Sự kiện onClick trong React viết kiểu camelCase.',
      ],
    },
  ],
};
