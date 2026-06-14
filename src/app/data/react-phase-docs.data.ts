import { PhaseGuide } from '../models/content.model';

export const REACT_PHASE_GUIDES: PhaseGuide[] = [
  {
    phaseId: 'react-foundation',
    overview:
      'Giai đoạn này tập trung vào các khái niệm cốt lõi nhất của React: Components, JSX, Props và State. Đây là nền tảng để bạn xây dựng bất kỳ ứng dụng React nào.',
    goals: [
      'Hiểu tư duy component-based',
      'Viết markup bằng JSX thành thạo',
      'Truyền dữ liệu giữa các component qua props',
      'Quản lý trạng thái local với useState',
    ],
    tips: [
      'Đừng cố gắng học tất cả các Hook cùng một lúc.',
      'Thực hành "Thinking in React" bằng cách vẽ sơ đồ component trước khi code.',
      'Sử dụng React DevTools để kiểm tra cây component.',
    ],
    checklist: [
      'Hoàn thành bài học React cơ bản',
      'Xây dựng được UI tĩnh từ thiết kế',
      'Hiểu sự khác biệt giữa props và state',
    ],
  },
  {
    phaseId: 'react-hooks',
    overview:
      'Học cách xử lý các tác vụ phức tạp hơn như side effects, tối ưu hiệu suất và tái sử dụng logic với Hooks.',
    goals: [
      'Sử dụng useEffect cho fetch data và subscriptions',
      'Tạo Custom Hooks để chia sẻ logic',
      'Hiểu dependency array trong các Hook',
    ],
    tips: [
      'Luôn khai báo Hook ở cấp cao nhất của component.',
      'Cleanup các side effect trong useEffect để tránh memory leak.',
    ],
    checklist: [
      'Viết được Custom Hook đầu tiên',
      'Fetch dữ liệu từ API và hiển thị lên UI',
      'Hiểu khi nào useEffect chạy lại',
    ],
  },
];
