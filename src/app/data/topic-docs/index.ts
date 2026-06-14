import { TopicLesson } from '../../models/content.model';
import { COMPONENTS_LESSON } from './components.lesson';

/** Tài liệu tóm tắt cho mọi chủ đề — chủ đề `components` có bài học đầy đủ + 3 quiz */
const TOPIC_LESSONS: TopicLesson[] = [
  COMPONENTS_LESSON,
  {
    topicId: 'typescript',
    summary: 'TypeScript thêm type system lên JavaScript — Angular dùng TS cho toàn bộ codebase.',
    objectives: ['Khai báo type, interface, enum', 'Dùng generic cơ bản', 'Union types và type narrowing'],
    sections: [
      {
        id: 'types',
        title: 'Types & Interfaces',
        content: 'Interface mô tả shape của object. Type alias linh hoạt hơn cho union/intersection.',
        code: `interface User { id: string; name: string; }
type Status = 'active' | 'inactive';`,
      },
      {
        id: 'generics',
        title: 'Generics',
        content: 'Generic cho phép function/class tái sử dụng với nhiều type.',
        code: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}`,
      },
    ],
    practice: 'Định nghĩa interface Todo { id: string; title: string; done: boolean } và function filterDone(todos: Todo[]): Todo[].',
  },
  {
    topicId: 'html-css',
    summary: 'HTML semantic và CSS layout hiện đại — nền tảng cho template Angular.',
    objectives: ['Dùng semantic tags', 'Flexbox và Grid', 'Responsive với media queries'],
    sections: [
      {
        id: 'semantic',
        title: 'Semantic HTML',
        content: 'Dùng <header>, <main>, <nav>, <article> thay vì div thuần — tốt cho SEO và a11y.',
      },
      {
        id: 'flex-grid',
        title: 'Flexbox & Grid',
        content: 'Flexbox cho hàng/cột 1 chiều. Grid cho layout 2 chiều phức tạp.',
        code: `.container { display: flex; gap: 1rem; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); }`,
      },
    ],
    practice: 'Dựng card layout 3 cột responsive (1 cột trên mobile).',
  },
  {
    topicId: 'javascript-es6',
    summary: 'ES6+ features dùng hàng ngày trong Angular: modules, destructuring, async/await.',
    objectives: ['Arrow functions & destructuring', 'import/export modules', 'Promises và async/await'],
    sections: [
      {
        id: 'modules',
        title: 'ES Modules',
        content: 'Angular dùng import/export — mỗi file component là một module.',
        code: `import { signal } from '@angular/core';
export class MyComponent {}`,
      },
      {
        id: 'async',
        title: 'Async/Await',
        content: 'Viết code bất đồng bộ dễ đọc hơn callback lồng nhau.',
        code: `async function load() {
  const res = await fetch('/api/data');
  return res.json();
}`,
      },
    ],
    practice: 'Viết function fetchTodos() dùng async/await và try/catch.',
  },
  {
    topicId: 'devtools',
    summary: 'Chrome DevTools và Git — công cụ không thể thiếu khi develop Angular.',
    objectives: ['Debug với breakpoints', 'Git branch/merge workflow', 'Push lên GitHub'],
    sections: [
      {
        id: 'git-flow',
        title: 'Git workflow cơ bản',
        content: 'Nhánh feature → commit → pull request → merge. Commit message rõ ràng.',
        code: `git checkout -b feature/todo-app
git add .
git commit -m "Add todo list component"
git push -u origin feature/todo-app`,
      },
    ],
    practice: 'Tạo repo, 3 commit có message mô tả, 1 branch feature và merge.',
  },
  {
    topicId: 'setup-cli',
    summary: 'Cài Node.js, Angular CLI và tạo project đầu tiên.',
    objectives: ['Cài Angular CLI global', 'ng new / ng serve / ng build', 'Hiểu cấu trúc angular.json'],
    sections: [
      {
        id: 'cli-commands',
        title: 'Lệnh CLI thường dùng',
        content: 'CLI tạo component, service, guard — giữ convention nhất quán.',
        code: `npm install -g @angular/cli
ng new my-app --style=css --ssr=false
ng generate component pages/home --standalone`,
      },
    ],
    practice: 'Tạo project mới, generate 1 component, chạy ng serve.',
  },
  {
    topicId: 'data-binding',
    summary: 'Interpolation, property/event binding, two-way binding và built-in directives.',
    objectives: ['{{ }} interpolation', '[property] và (event) binding', '@if, @for control flow'],
    sections: [
      {
        id: 'binding-types',
        title: 'Các loại binding',
        content: 'Interpolation hiển thị text. Property binding gán thuộc tính DOM. Event binding lắng nghe sự kiện.',
        code: `<button [disabled]="isLoading()" (click)="save()">Lưu</button>
<p>{{ message() }}</p>`,
      },
    ],
    practice: 'Form tìm kiếm: input (input) cập nhật signal, @for hiển thị kết quả lọc.',
  },
  {
    topicId: 'signals-basics',
    summary: 'signal(), computed(), effect() — reactive primitives của Angular hiện đại.',
    objectives: ['Tạo và cập nhật signal', 'computed phụ thuộc signal', 'Khi nào dùng effect'],
    sections: [
      {
        id: 'signal-api',
        title: 'Signal API',
        content: 'signal lưu state. computed tự tính lại khi dependency đổi. effect chạy side effect.',
        code: `const count = signal(0);
const double = computed(() => count() * 2);
count.set(count() + 1);`,
      },
    ],
    practice: 'Todo counter: signal todos, computed remaining = chưa done.',
  },
  {
    topicId: 'first-app',
    summary: 'Dự án Todo App — tổng hợp component, binding, signals.',
    objectives: ['CRUD todo local', 'Component cha/con', 'CSS cơ bản cho UI'],
    sections: [
      {
        id: 'todo-structure',
        title: 'Cấu trúc Todo App',
        content: 'App → TodoList → TodoItem. State ở component cha hoặc service đơn giản.',
      },
    ],
    practice: 'Hoàn thành Todo App: thêm, xóa, toggle done, lọc all/active/done.',
  },
  {
    topicId: 'routing',
    summary: 'Angular Router — điều hướng đa trang SPA.',
    objectives: ['Khai báo routes', 'routerLink và router-outlet', 'Route params với input()'],
    sections: [
      {
        id: 'routes-config',
        title: 'Cấu hình routes',
        content: 'Routes map path → component. Lazy load giảm bundle ban đầu.',
        code: `{ path: 'users/:id', loadComponent: () => import('./user').then(m => m.UserComponent) }`,
      },
    ],
    practice: '3 routes: home, about, users/:id với component riêng.',
  },
  {
    topicId: 'services-di',
    summary: 'Service và Dependency Injection — chia sẻ logic và state.',
    objectives: ['@Injectable providedIn root', 'inject() function', 'Singleton vs component scope'],
    sections: [
      {
        id: 'injectable',
        title: 'Tạo service',
        content: 'Service chứa business logic, gọi API. DI container tự inject vào component.',
        code: `@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);
}`,
      },
    ],
    practice: 'TodoService quản lý list todo, component chỉ hiển thị.',
  },
  {
    topicId: 'pipes',
    summary: 'Transform dữ liệu trong template với pipe.',
    objectives: ['date, currency, async pipe', 'Tạo custom pure pipe'],
    sections: [
      {
        id: 'builtin-pipes',
        title: 'Built-in pipes',
        content: 'date pipe format ngày. async pipe subscribe Observable tự động.',
        code: `{{ createdAt | date:'dd/MM/yyyy' }}
{{ users$ | async }}`,
      },
    ],
    practice: 'Custom pipe truncate: cắt chuỗi dài + "...".',
  },
  {
    topicId: 'rxjs-intro',
    summary: 'RxJS Observable — nền tảng cho HttpClient và async trong Angular.',
    objectives: ['Observable vs Promise', 'map, filter, switchMap', 'takeUntil cleanup'],
    sections: [
      {
        id: 'operators',
        title: 'Operators cơ bản',
        content: 'map biến đổi value. switchMap hủy request cũ khi có request mới.',
        code: `this.route.paramMap.pipe(
  switchMap(params => this.api.getUser(params.get('id')!))
).subscribe(user => this.user.set(user));`,
      },
    ],
    practice: 'Search box debounce 300ms rồi gọi API với switchMap.',
  },
  {
    topicId: 'project-blog',
    summary: 'Dự án Blog đa trang — áp dụng routing, lazy loading, services.',
    objectives: ['Layout chung header/footer', 'List + detail bài viết', 'Lazy load module routes'],
    sections: [{ id: 'blog-routes', title: 'Routes Blog', content: '/ → list, /post/:slug → chi tiết, shared layout component.' }],
    practice: 'Blog với 5 bài mock, lazy load trang admin.',
  },
  {
    topicId: 'template-forms',
    summary: 'Forms khai báo trong template với NgModel.',
    objectives: ['NgForm và NgModel', 'Validation HTML5 + Angular', 'Khi nào dùng template-driven'],
    sections: [
      {
        id: 'ngmodel',
        title: 'NgModel',
        content: 'Phù hợp form đơn giản. Import FormsModule hoặc NgModel standalone.',
        code: `<input [(ngModel)]="name" name="name" required />`,
      },
    ],
    practice: 'Form đăng ký newsletter 2 field: email + agree checkbox.',
  },
  {
    topicId: 'reactive-forms',
    summary: 'Model-driven forms — kiểm soát form trong TypeScript.',
    objectives: ['FormControl, FormGroup, FormBuilder', 'Validators built-in', 'Custom validator'],
    sections: [
      {
        id: 'formbuilder',
        title: 'FormBuilder',
        content: 'Reactive form testable, dễ dynamic form hơn template-driven.',
        code: `this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
});`,
      },
    ],
    practice: 'Form đăng nhập email/password với validation message.',
  },
  {
    topicId: 'http-client',
    summary: 'HttpClient gọi REST API — GET, POST, PUT, DELETE.',
    objectives: ['provideHttpClient()', 'Typed response', 'Error handling'],
    sections: [
      {
        id: 'http-get-post',
        title: 'HTTP methods',
        content: 'HttpClient trả Observable. Dùng generic cho type response.',
        code: `this.http.get<Todo[]>('/api/todos').subscribe({
  next: todos => this.todos.set(todos),
  error: err => this.error.set(err.message),
});`,
      },
    ],
    practice: 'Service CRUD todos qua JSON Server.',
  },
  {
    topicId: 'async-pipe',
    summary: 'async pipe và pattern loading/error/data.',
    objectives: ['Tránh subscribe leak', 'combineLatest nhiều stream', 'Template @if loading'],
    sections: [
      {
        id: 'async-pattern',
        title: 'Loading pattern',
        content: 'Giữ state loading/error/data trong service hoặc component signals.',
      },
    ],
    practice: 'Trang list: skeleton khi loading, message khi error.',
  },
  {
    topicId: 'project-crud',
    summary: 'Dự án CRUD kết nối API thật hoặc JSON Server.',
    objectives: ['List + form create/edit', 'Delete có confirm', 'Validation đầy đủ'],
    sections: [{ id: 'crud-flow', title: 'CRUD flow', content: 'List → click item → edit form → save PUT → refresh list.' }],
    practice: 'CRUD products: name, price, category.',
  },
  {
    topicId: 'change-detection',
    summary: 'Change Detection — cách Angular cập nhật DOM.',
    objectives: ['Default vs OnPush', 'trackBy trong @for', '@defer lazy render'],
    sections: [
      {
        id: 'onpush',
        title: 'OnPush strategy',
        content: 'Component chỉ check khi input đổi hoặc event trong component — tối ưu list lớn.',
        code: `@Component({ changeDetection: ChangeDetectionStrategy.OnPush })`,
      },
    ],
    practice: 'List 1000 item với OnPush + trackBy, đo performance.',
  },
  {
    topicId: 'testing',
    summary: 'Unit test với TestBed và Vitest/Jasmine.',
    objectives: ['Test component render', 'Mock service', 'Test form validation'],
    sections: [
      {
        id: 'testbed',
        title: 'TestBed',
        content: 'Tạo component trong môi trường test, query DOM, simulate click.',
        code: `const fixture = TestBed.createComponent(MyComponent);
fixture.detectChanges();
expect(fixture.nativeElement.textContent).toContain('Hello');`,
      },
    ],
    practice: 'Test TodoItem emit event khi click checkbox.',
  },
  {
    topicId: 'state-management',
    summary: 'Quản lý state — signals store vs NgRx.',
    objectives: ['Signal store pattern', 'Khi nào cần NgRx', 'Facade pattern giới thiệu'],
    sections: [
      {
        id: 'signal-store',
        title: 'Signals store',
        content: 'Service + signals đủ cho nhiều app. NgRx khi team lớn, time-travel debug.',
      },
    ],
    practice: 'CartService với signal items, computed total.',
  },
  {
    topicId: 'auth',
    summary: 'Authentication flow với JWT và route guards.',
    objectives: ['Login form + token storage', 'CanActivate guard', 'HTTP interceptor gắn token'],
    sections: [
      {
        id: 'guard',
        title: 'Route guard',
        content: 'canActivate kiểm tra đăng nhập trước khi vào route protected.',
      },
    ],
    practice: 'Login mock → lưu token → guard /dashboard.',
  },
  {
    topicId: 'i18n-a11y',
    summary: 'Đa ngôn ngữ và accessibility.',
    objectives: ['i18n attribute trong template', 'ARIA labels', 'Keyboard navigation'],
    sections: [
      {
        id: 'a11y',
        title: 'Accessibility',
        content: 'Mọi input cần label. Button cần text hoặc aria-label. Focus visible.',
      },
    ],
    practice: 'Audit form với Lighthouse accessibility.',
  },
  {
    topicId: 'build-deploy',
    summary: 'Production build và deploy.',
    objectives: ['ng build configuration', 'Environment variables', 'Deploy static hosting'],
    sections: [
      {
        id: 'build',
        title: 'Production build',
        content: 'ng build tạo output trong dist/. Upload lên Vercel/Netlify.',
        code: `ng build --configuration production`,
      },
    ],
    practice: 'Deploy Todo App lên Netlify với URL public.',
  },
  {
    topicId: 'ssr',
    summary: 'Server-Side Rendering với @angular/ssr.',
    objectives: ['Khi nào cần SSR', 'ng add @angular/ssr', 'Hydration basics'],
    sections: [{ id: 'ssr-why', title: 'Tại sao SSR?', content: 'SEO tốt hơn, first paint nhanh — e-commerce, landing page.' }],
    practice: 'Thêm SSR vào project, so sánh view-source trước/sau.',
  },
  {
    topicId: 'capstone',
    summary: 'Dự án tổng kết portfolio — full-stack Angular app.',
    objectives: ['Auth + CRUD + routing', 'Responsive UI', 'README + demo link'],
    sections: [{ id: 'capstone-scope', title: 'Phạm vi capstone', content: 'VD: Quản lý task team — login, projects, tasks, assignee.' }],
    practice: 'Hoàn thành capstone, push GitHub, deploy live.',
  },
  {
    topicId: 'interview',
    summary: 'Chuẩn bị phỏng vấn Angular developer.',
    objectives: ['Giải thích DI', 'Change detection', 'RxJS hot vs cold', 'Smart vs dumb components'],
    sections: [
      {
        id: 'common-questions',
        title: 'Câu hỏi thường gặp',
        content: '1. Dependency Injection hoạt động thế nào? 2. Difference Observable vs Promise? 3. OnPush khi nào? 4. Standalone vs NgModule?',
      },
    ],
    practice: 'Viết câu trả lời 2 phút cho mỗi câu trên, practice với bạn.',
  },
];

export function getTopicLesson(topicId: string): TopicLesson | undefined {
  return TOPIC_LESSONS.find((l) => l.topicId === topicId);
}

export function hasQuizzes(topicId: string): boolean {
  return topicId === 'components';
}
