import { Roadmap } from '../models/roadmap.model';

export const REACT_ROADMAP: Roadmap = {
  title: 'Lộ trình học React',
  description:
    'Lộ trình từ cơ bản đến nâng cao để trở thành React Developer chuyên nghiệp — tập trung vào Hooks, Performance và Ecosystem.',
  totalWeeks: 12,
  phases: [
    {
      id: 'react-foundation',
      order: 1,
      title: 'Nền tảng React',
      subtitle: 'Tuần 1–3',
      description: 'Làm quen với các khái niệm cốt lõi của React.',
      icon: '⚛️',
      color: 'blue',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'react-basics',
          title: 'React cơ bản',
          description: 'Components, JSX, Props, State và Event Handling.',
          duration: '1 tuần',
          level: 'beginner',
          resources: [
            { label: 'React Quick Start', url: 'https://react.dev/learn' },
          ],
        },
        {
          id: 'react-lists',
          title: 'Lists & Keys',
          description: 'Rendering danh sách và tầm quan trọng của keys.',
          duration: '3 ngày',
          level: 'beginner',
          resources: [
            { label: 'Rendering Lists', url: 'https://react.dev/learn/rendering-lists' },
          ],
        },
      ],
    },
    {
      id: 'react-hooks',
      order: 2,
      title: 'Hooks chuyên sâu',
      subtitle: 'Tuần 4–6',
      description: 'Quản lý side effects và logic phức tạp.',
      icon: '⚓',
      color: 'indigo',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'use-effect',
          title: 'useEffect Hook',
          description: 'Side effects, dependency array và cleanup function.',
          duration: '1 tuần',
          level: 'intermediate',
          resources: [
            { label: 'Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' },
          ],
        },
        {
          id: 'custom-hooks',
          title: 'Custom Hooks',
          description: 'Tái sử dụng logic giữa các components.',
          duration: '1 tuần',
          level: 'intermediate',
          resources: [
            { label: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' },
          ],
        },
      ],
    },
  ],
};
