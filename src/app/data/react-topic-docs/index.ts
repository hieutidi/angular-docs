import { TopicLesson } from '../../models/content.model';
import { REACT_BASICS_LESSON } from './react-basics.lesson';

const REACT_TOPIC_LESSONS: TopicLesson[] = [
  REACT_BASICS_LESSON,
  {
    topicId: 'react-advanced',
    summary: 'Nâng cao với Hooks, Context API và tối ưu hiệu suất.',
    objectives: ['Dùng useEffect cho side effects', 'Quản lý state phức tạp với useReducer', 'Chia sẻ state với Context API'],
    sections: [
      {
        id: 'use-effect',
        title: 'useEffect Hook',
        content: 'useEffect cho phép bạn thực hiện các side effect (như fetch data, subscribe) trong function component.',
        code: `useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);`,
      },
      {
        id: 'context-api',
        title: 'Context API',
        content: 'Context cung cấp cách truyền dữ liệu xuyên suốt cây component mà không cần truyền props thủ công qua từng cấp.',
        code: `const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}`,
      },
    ],
    practice: 'Xây dựng một ứng dụng nhỏ sử dụng Context API để quản lý Dark/Light mode cho toàn bộ app.',
  },
];

export function getReactTopicLesson(topicId: string): TopicLesson | undefined {
  return REACT_TOPIC_LESSONS.find((l) => l.topicId === topicId);
}

export function reactHasFeaturedLesson(topicId: string): boolean {
  return topicId === 'react-basics';
}

export function reactHasQuizzes(topicId: string): boolean {
  return topicId === 'react-basics';
}
