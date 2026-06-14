import { Roadmap } from '../models/roadmap.model';

export const ANGULAR_ROADMAP: Roadmap = {
  title: 'Lộ trình học Angular',
  description:
    'Lộ trình từ zero đến junior/mid Angular developer — có thứ tự, có mục tiêu rõ ràng và tài liệu chính thức.',
  totalWeeks: 16,
  phases: [
    {
      id: 'foundation',
      order: 1,
      title: 'Nền tảng',
      subtitle: 'Tuần 1–2',
      description: 'Chuẩn bị kiến thức nền trước khi vào Angular.',
      icon: '🧱',
      color: 'emerald',
      estimatedWeeks: 2,
      topics: [
        {
          id: 'typescript',
          title: 'TypeScript cơ bản',
          description:
            'Types, interfaces, generics, enums, union types — Angular viết bằng TypeScript nên đây là bước bắt buộc.',
          duration: '3–4 ngày',
          level: 'beginner',
          resources: [
            { label: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
            { label: 'Angular + TypeScript', url: 'https://angular.dev/tools/cli/setup-local' },
          ],
        },
        {
          id: 'html-css',
          title: 'HTML & CSS hiện đại',
          description: 'Semantic HTML, Flexbox, Grid, responsive design, CSS variables.',
          duration: '2–3 ngày',
          level: 'beginner',
          resources: [
            { label: 'MDN HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
            { label: 'MDN CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
          ],
        },
        {
          id: 'javascript-es6',
          title: 'JavaScript ES6+',
          description: 'Arrow functions, destructuring, spread/rest, modules, async/await, Promises.',
          duration: '3–4 ngày',
          level: 'beginner',
          resources: [
            { label: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
            { label: 'JavaScript.info', url: 'https://javascript.info/' },
          ],
        },
        {
          id: 'devtools',
          title: 'DevTools & Git',
          description: 'Chrome DevTools, debug cơ bản, Git commit/branch/merge, làm việc với GitHub.',
          duration: '2 ngày',
          level: 'beginner',
          resources: [
            { label: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2' },
            { label: 'Chrome DevTools', url: 'https://developer.chrome.com/docs/devtools' },
          ],
        },
      ],
    },
    {
      id: 'angular-basics',
      order: 2,
      title: 'Angular cơ bản',
      subtitle: 'Tuần 3–5',
      description: 'Hiểu kiến trúc Angular và xây dựng component đầu tiên.',
      icon: '⚡',
      color: 'red',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'setup-cli',
          title: 'Cài đặt & Angular CLI',
          description: 'Node.js, Angular CLI, tạo project, cấu trúc thư mục, `ng serve`, `ng build`.',
          duration: '1 ngày',
          level: 'beginner',
          resources: [
            { label: 'Setup local environment', url: 'https://angular.dev/tools/cli/setup-local' },
            { label: 'CLI overview', url: 'https://angular.dev/tools/cli' },
          ],
        },
        {
          id: 'components',
          title: 'Components & Templates',
          description: '@Component, template syntax, @Input/@Output, lifecycle hooks, standalone components.',
          duration: '4–5 ngày',
          level: 'beginner',
          resources: [
            { label: 'Components', url: 'https://angular.dev/essentials/components' },
            { label: 'Component lifecycle', url: 'https://angular.dev/guide/components/lifecycle' },
          ],
        },
        {
          id: 'data-binding',
          title: 'Data Binding & Directives',
          description: 'Interpolation, property/event binding, two-way binding, *ngIf, *ngFor, ngClass, ngStyle.',
          duration: '3–4 ngày',
          level: 'beginner',
          resources: [
            { label: 'Templates', url: 'https://angular.dev/essentials/templates' },
            { label: 'Built-in directives', url: 'https://angular.dev/guide/directives' },
          ],
        },
        {
          id: 'signals-basics',
          title: 'Signals cơ bản',
          description: 'signal(), computed(), effect() — reactive primitives mới của Angular.',
          duration: '2–3 ngày',
          level: 'beginner',
          resources: [
            { label: 'Signals guide', url: 'https://angular.dev/guide/signals' },
            { label: 'Reactive primitives', url: 'https://angular.dev/essentials/signals' },
          ],
        },
        {
          id: 'first-app',
          title: 'Dự án mini: Todo App',
          description: 'Tổng hợp kiến thức: CRUD local, component con, truyền dữ liệu qua @Input/@Output.',
          duration: '3 ngày',
          level: 'beginner',
          resources: [
            { label: 'Tutorial: Tour of Heroes', url: 'https://angular.dev/tutorials/learn-angular' },
          ],
        },
      ],
    },
    {
      id: 'app-structure',
      order: 3,
      title: 'Cấu trúc ứng dụng',
      subtitle: 'Tuần 6–8',
      description: 'Routing, services, dependency injection và tổ chức code.',
      icon: '🏗️',
      color: 'violet',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'routing',
          title: 'Routing & Navigation',
          description: 'RouterModule, routes, routerLink, route params, nested routes, guards cơ bản.',
          duration: '4 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Routing guide', url: 'https://angular.dev/guide/routing' },
            { label: 'Router reference', url: 'https://angular.dev/api/router/Router' },
          ],
        },
        {
          id: 'services-di',
          title: 'Services & Dependency Injection',
          description: '@Injectable, providedIn, inject(), hierarchical injectors, shared state.',
          duration: '3–4 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Dependency injection', url: 'https://angular.dev/guide/di' },
            { label: 'Creating injectable services', url: 'https://angular.dev/guide/di/creating-injectable-services' },
          ],
        },
        {
          id: 'pipes',
          title: 'Pipes & Custom Pipes',
          description: 'Built-in pipes (date, currency, async), tạo pipe tùy chỉnh, pure vs impure.',
          duration: '2 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Pipes guide', url: 'https://angular.dev/guide/pipes' },
          ],
        },
        {
          id: 'rxjs-intro',
          title: 'RxJS giới thiệu',
          description: 'Observable, Observer, operators cơ bản: map, filter, switchMap, takeUntil.',
          duration: '4–5 ngày',
          level: 'intermediate',
          resources: [
            { label: 'RxJS overview', url: 'https://angular.dev/guide/rxjs' },
            { label: 'Learn RxJS', url: 'https://www.learnrxjs.io/' },
          ],
        },
        {
          id: 'project-blog',
          title: 'Dự án: Blog đa trang',
          description: 'Routing, lazy loading, shared layout, service quản lý bài viết.',
          duration: '4 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Lazy loading', url: 'https://angular.dev/guide/routing/common-router-tasks#lazy-loading' },
          ],
        },
      ],
    },
    {
      id: 'forms-http',
      order: 4,
      title: 'Forms & HTTP',
      subtitle: 'Tuần 9–11',
      description: 'Làm việc với form và gọi API thực tế.',
      icon: '📝',
      color: 'blue',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'template-forms',
          title: 'Template-driven Forms',
          description: 'NgModel, NgForm, validation cơ bản, two-way binding trong form.',
          duration: '2 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Template-driven forms', url: 'https://angular.dev/guide/forms' },
          ],
        },
        {
          id: 'reactive-forms',
          title: 'Reactive Forms',
          description: 'FormControl, FormGroup, FormBuilder, validators, custom validators, dynamic forms.',
          duration: '4–5 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Reactive forms', url: 'https://angular.dev/guide/forms/reactive-forms' },
            { label: 'Form validation', url: 'https://angular.dev/guide/forms/form-validation' },
          ],
        },
        {
          id: 'http-client',
          title: 'HttpClient & Interceptors',
          description: 'GET/POST/PUT/DELETE, error handling, HttpInterceptor, loading states.',
          duration: '4 ngày',
          level: 'intermediate',
          resources: [
            { label: 'HTTP client', url: 'https://angular.dev/guide/http' },
            { label: 'Interceptors', url: 'https://angular.dev/guide/http/interceptors' },
          ],
        },
        {
          id: 'async-pipe',
          title: 'Async Pipe & State',
          description: 'async pipe, combineLatest, quản lý loading/error/data pattern.',
          duration: '2–3 ngày',
          level: 'intermediate',
          resources: [
            { label: 'Async pipe', url: 'https://angular.dev/api/common/AsyncPipe' },
          ],
        },
        {
          id: 'project-crud',
          title: 'Dự án: CRUD App với API',
          description: 'Kết nối JSON Server hoặc REST API, form validation, danh sách + chi tiết.',
          duration: '5 ngày',
          level: 'intermediate',
          resources: [
            { label: 'JSON Server', url: 'https://github.com/typicode/json-server' },
          ],
        },
      ],
    },
    {
      id: 'advanced',
      order: 5,
      title: 'Nâng cao',
      subtitle: 'Tuần 12–14',
      description: 'Performance, testing, state management và best practices.',
      icon: '🚀',
      color: 'amber',
      estimatedWeeks: 3,
      topics: [
        {
          id: 'change-detection',
          title: 'Change Detection & Performance',
          description: 'OnPush strategy, trackBy, defer blocks, lazy loading components.',
          duration: '3 ngày',
          level: 'advanced',
          resources: [
            { label: 'Change detection', url: 'https://angular.dev/best-practices/runtime-performance' },
            { label: '@defer', url: 'https://angular.dev/guide/templates/defer' },
          ],
        },
        {
          id: 'testing',
          title: 'Unit Testing',
          description: 'Jasmine/Vitest, TestBed, component testing, service mocking.',
          duration: '4 ngày',
          level: 'advanced',
          resources: [
            { label: 'Testing guide', url: 'https://angular.dev/guide/testing' },
          ],
        },
        {
          id: 'state-management',
          title: 'State Management',
          description: 'Signals store pattern, NgRx giới thiệu, khi nào cần global state.',
          duration: '4 ngày',
          level: 'advanced',
          resources: [
            { label: 'NgRx', url: 'https://ngrx.io/guide/store' },
            { label: 'Signal-based state', url: 'https://angular.dev/guide/signals' },
          ],
        },
        {
          id: 'auth',
          title: 'Authentication cơ bản',
          description: 'JWT, route guards (CanActivate), HTTP interceptor cho token, login flow.',
          duration: '3 ngày',
          level: 'advanced',
          resources: [
            { label: 'Route guards', url: 'https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access' },
          ],
        },
        {
          id: 'i18n-a11y',
          title: 'i18n & Accessibility',
          description: 'Đa ngôn ngữ, ARIA attributes, keyboard navigation, semantic HTML.',
          duration: '2 ngày',
          level: 'advanced',
          resources: [
            { label: 'Internationalization', url: 'https://angular.dev/guide/i18n' },
            { label: 'Accessibility', url: 'https://angular.dev/best-practices/a11y' },
          ],
        },
      ],
    },
    {
      id: 'production',
      order: 6,
      title: 'Production & Career',
      subtitle: 'Tuần 15–16',
      description: 'Deploy, CI/CD và chuẩn bị phỏng vấn.',
      icon: '🎯',
      color: 'cyan',
      estimatedWeeks: 2,
      topics: [
        {
          id: 'build-deploy',
          title: 'Build & Deploy',
          description: 'Production build, environment configs, deploy Vercel/Netlify/Firebase.',
          duration: '2 ngày',
          level: 'advanced',
          resources: [
            { label: 'Deployment', url: 'https://angular.dev/tools/cli/deployment' },
          ],
        },
        {
          id: 'ssr',
          title: 'SSR & Hydration',
          description: 'Angular Universal, @angular/ssr, SEO benefits, server-side rendering.',
          duration: '3 ngày',
          level: 'advanced',
          resources: [
            { label: 'Server-side rendering', url: 'https://angular.dev/guide/ssr' },
          ],
        },
        {
          id: 'capstone',
          title: 'Dự án tổng kết (Capstone)',
          description: 'Xây full app: auth, CRUD, routing, forms, responsive — đưa lên GitHub portfolio.',
          duration: '1 tuần',
          level: 'advanced',
          resources: [
            { label: 'Angular style guide', url: 'https://angular.dev/style-guide' },
          ],
        },
        {
          id: 'interview',
          title: 'Chuẩn bị phỏng vấn',
          description: 'Câu hỏi Angular thường gặp, DI, change detection, RxJS, system design cơ bản.',
          duration: '3 ngày',
          level: 'advanced',
          resources: [
            { label: 'Angular FAQ', url: 'https://angular.dev/overview' },
          ],
        },
      ],
    },
  ],
};
