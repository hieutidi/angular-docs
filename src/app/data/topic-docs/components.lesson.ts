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
};
