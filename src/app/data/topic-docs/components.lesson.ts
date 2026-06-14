import { TopicLesson } from '../../models/content.model';

/** Ví dụ đầy đủ: 1 nội dung bài học + tích hợp 3 quiz (xem components.quizzes.ts) */
export const COMPONENTS_LESSON: TopicLesson = {
  topicId: 'components',
  summary:
    'Component là khối xây dựng cơ bản của Angular. Mỗi component gồm class TypeScript, template HTML và (tuỳ chọn) styles — được decorator @Component đánh dấu.',
  objectives: [
    'Tạo standalone component với Angular CLI',
    'Hiểu @Input và @Output để giao tiếp component cha–con',
    'Dùng lifecycle hook ngOnInit',
    'Tổ chức template với control flow @if, @for',
  ],
  sections: [
    {
      id: 'what-is-component',
      title: 'Component là gì?',
      content:
        'Trong Angular, mọi thứ hiển thị trên UI đều là component: header, nút bấm, form, cả trang dashboard. Component đóng gói logic (TS) và giao diện (HTML/CSS) thành một đơn vị tái sử dụng.',
      code: `@Component({
  selector: 'app-hello',
  standalone: true,
  template: \`<h1>Xin chào, {{ name() }}!</h1>\`,
})
export class HelloComponent {
  readonly name = signal('Angular');
}`,
    },
    {
      id: 'standalone',
      title: 'Standalone Components',
      content:
        'Từ Angular 14+, standalone component là chuẩn mặc định — không cần NgModule. Khai báo imports trực tiếp trong @Component để dùng RouterLink, CommonModule, v.v.',
      code: `@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <article class="card">
      <h2>{{ user().name }}</h2>
      <a [routerLink]="['/users', user().id]">Xem chi tiết</a>
    </article>
  \`,
})
export class UserCardComponent {
  readonly user = input.required<User>();
}`,
    },
    {
      id: 'input-output',
      title: '@Input và @Output',
      content:
        '@Input (hoặc input()) nhận dữ liệu từ component cha. @Output (hoặc output()) phát sự kiện lên cha. Đây là pattern one-way data flow chuẩn của Angular.',
      code: `// Component con
export class TodoItemComponent {
  readonly todo = input.required<Todo>();
  readonly toggle = output<string>();

  onToggle(): void {
    this.toggle.emit(this.todo().id);
  }
}

// Template cha
@for (item of todos(); track item.id) {
  <app-todo-item [todo]="item" (toggle)="onToggle($event)" />
}`,
    },
    {
      id: 'lifecycle',
      title: 'Lifecycle Hooks',
      content:
        'ngOnInit chạy sau khi component được khởi tạo — dùng để fetch data, subscribe. ngOnDestroy dùng để cleanup subscription. Với signals, nhiều trường hợp có thể bỏ subscribe thủ công.',
      code: `export class ProfileComponent implements OnInit {
  private readonly api = inject(UserApiService);
  readonly user = signal<User | null>(null);

  ngOnInit(): void {
    this.api.getProfile().subscribe((u) => this.user.set(u));
  }
}`,
    },
  ],
  practice:
    'Tạo TodoItemComponent nhận todo qua input(), emit sự kiện toggle/delete qua output(). Ghép vào TodoListComponent cha. Thêm @if hiển thị badge "Hoàn thành" khi todo.done === true.',
  codeExercises: [
    {
      id: 'components-lab-1',
      title: 'Lab 1: Standalone Hello Component',
      instructions:
        'Hoàn thiện component standalone hiển thị lời chào. Cần có @Component, selector app-hello và template dùng interpolation.',
      starterCode: `import { Component } from '@angular/core';

// TODO: thêm @Component với selector 'app-hello', standalone: true
export class HelloComponent {
  readonly name = 'Angular';
}

// Template gợi ý: <h1>Xin chào, {{ name }}!</h1>`,
      language: 'typescript',
      checks: [
        { id: 'c1', description: 'Có decorator @Component', pattern: '@Component' },
        { id: 'c2', description: "Selector là 'app-hello'", pattern: "selector\\s*:\\s*['\"]app-hello['\"]" },
        { id: 'c3', description: 'Khai báo standalone: true', pattern: 'standalone\\s*:\\s*true' },
      ],
      hints: [
        'Decorator @Component nhận object config: selector, standalone, template.',
        'Template có thể viết inline trong thuộc tính template: `...`',
      ],
    },
    {
      id: 'components-lab-2',
      title: 'Lab 2: TodoItem với input() và output()',
      instructions:
        'Viết TodoItemComponent nhận todo qua input.required(), phát sự kiện toggle qua output().',
      starterCode: `import { Component, input, output } from '@angular/core';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  template: \`
    <li>
      <span>{{ todo().title }}</span>
      <button type="button" (click)="onToggle()">Toggle</button>
    </li>
  \`,
})
export class TodoItemComponent {
  // TODO: khai báo todo = input.required<Todo>()
  // TODO: khai báo toggle = output<string>()

  onToggle(): void {
    // TODO: emit id của todo
  }
}`,
      language: 'typescript',
      checks: [
        { id: 'c1', description: 'Dùng input.required cho todo', pattern: 'input\\.required' },
        { id: 'c2', description: 'Khai báo output toggle', pattern: 'output\\s*<' },
        { id: 'c3', description: 'Gọi toggle.emit trong onToggle', pattern: 'toggle\\.emit' },
      ],
      hints: [
        'input.required<Todo>() trả về signal — gọi todo() trong class.',
        'output<string>() tạo EventEmitter — dùng this.toggle.emit(this.todo().id).',
      ],
    },
  ],
};
