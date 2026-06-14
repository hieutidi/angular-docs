import { TopicQuizzes } from '../../models/content.model';

/** 3 bài quiz mẫu gắn với nội dung Components & Templates */
export const COMPONENTS_QUIZZES: TopicQuizzes = {
  topicId: 'components',
  lessons: [
    {
      id: 'components-quiz-1',
      order: 1,
      title: 'Quiz 1: Kiến thức cơ bản',
      description: 'Kiểm tra hiểu biết về component, selector và standalone.',
      passingScore: 2,
      questions: [
        {
          id: 'q1-1',
          question: 'Decorator nào đánh dấu một class là Angular component?',
          options: [
            { id: 'a', text: '@Injectable' },
            { id: 'b', text: '@Component' },
            { id: 'c', text: '@NgModule' },
            { id: 'd', text: '@Directive' },
          ],
          correctOptionId: 'b',
          explanation: '@Component khai báo metadata: selector, template, styles.',
        },
        {
          id: 'q1-2',
          question: 'Standalone component khác NgModule ở điểm nào?',
          options: [
            { id: 'a', text: 'Không dùng được template HTML' },
            { id: 'b', text: 'Khai báo imports trực tiếp trong @Component' },
            { id: 'c', text: 'Chỉ chạy trên server' },
            { id: 'd', text: 'Không hỗ trợ TypeScript' },
          ],
          correctOptionId: 'b',
          explanation: 'Standalone bỏ NgModule — imports nằm ngay trong decorator.',
        },
        {
          id: 'q1-3',
          question: 'selector: "app-hello" nghĩa là gì trong template?',
          options: [
            { id: 'a', text: 'Dùng <app-hello></app-hello> để render component' },
            { id: 'b', text: 'Tên file bắt buộc phải là app-hello.ts' },
            { id: 'c', text: 'Route path mặc định' },
            { id: 'd', text: 'Tên service inject' },
          ],
          correctOptionId: 'a',
          explanation: 'Selector là tag HTML custom để nhúng component.',
        },
      ],
    },
    {
      id: 'components-quiz-2',
      order: 2,
      title: 'Quiz 2: Input / Output',
      description: 'Áp dụng giao tiếp component cha–con.',
      passingScore: 2,
      questions: [
        {
          id: 'q2-1',
          question: 'Cách mới (Angular 17+) để nhận dữ liệu từ component cha?',
          options: [
            { id: 'a', text: 'input() hoặc input.required()' },
            { id: 'b', text: 'inject(ParentComponent)' },
            { id: 'c', text: '@HostBinding' },
            { id: 'd', text: 'ngModel' },
          ],
          correctOptionId: 'a',
          explanation: 'input() thay thế @Input() — trả về signal đọc được trong template.',
        },
        {
          id: 'q2-2',
          question: 'Component con muốn báo cha "đã xóa item" — dùng gì?',
          options: [
            { id: 'a', text: 'output() / EventEmitter' },
            { id: 'b', text: 'HttpClient.post' },
            { id: 'c', text: 'Router.navigate' },
            { id: 'd', text: 'localStorage.setItem' },
          ],
          correctOptionId: 'a',
          explanation: 'output() phát sự kiện lên cha: (delete)="onDelete($event)".',
        },
        {
          id: 'q2-3',
          question: 'Data flow chuẩn Angular giữa cha và con?',
          options: [
            { id: 'a', text: 'Con mutate trực tiếp object của cha' },
            { id: 'b', text: 'Cha truyền xuống, con emit sự kiện lên' },
            { id: 'c', text: 'Chỉ dùng global variable' },
            { id: 'd', text: 'Con gọi method private của cha' },
          ],
          correctOptionId: 'b',
          explanation: 'One-way data flow: props down, events up.',
        },
      ],
    },
    {
      id: 'components-quiz-3',
      order: 3,
      title: 'Quiz 3: Tổng hợp & thực hành',
      description: 'Kịch bản Todo App — áp dụng toàn bộ bài học.',
      passingScore: 2,
      questions: [
        {
          id: 'q3-1',
          question: 'Hook nào phù hợp để gọi API lấy danh sách todo khi component load?',
          options: [
            { id: 'a', text: 'ngOnInit' },
            { id: 'b', text: 'constructor template binding' },
            { id: 'c', text: 'ngAfterViewChecked mỗi frame' },
            { id: 'd', text: 'Không cần hook — gọi trong template' },
          ],
          correctOptionId: 'a',
          explanation: 'ngOnInit chạy sau khi inputs đã sẵn sàng — phù hợp fetch data.',
        },
        {
          id: 'q3-2',
          question: 'Template nào đúng với signal input todo?',
          options: [
            { id: 'a', text: '{{ todo.name }}' },
            { id: 'b', text: '{{ todo().title }}' },
            { id: 'c', text: '{{ todo.title }}' },
            { id: 'd', text: '[[ todo.title ]]' },
          ],
          correctOptionId: 'b',
          explanation: 'Signal input gọi như function: todo() trong template.',
        },
        {
          id: 'q3-3',
          question: 'Muốn render danh sách todo với key ổn định — dùng?',
          options: [
            { id: 'a', text: '@for (t of todos(); track t.id)' },
            { id: 'b', text: '*ngFor without trackBy' },
            { id: 'c', text: '@if only' },
            { id: 'd', text: 'document.querySelectorAll' },
          ],
          correctOptionId: 'a',
          explanation: '@for với track giúp Angular cập nhật DOM hiệu quả.',
        },
      ],
    },
  ],
};
