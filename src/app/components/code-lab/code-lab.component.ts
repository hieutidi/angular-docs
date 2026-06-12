import { Component, computed, effect, inject, input, model, output, signal, viewChild } from '@angular/core';
import { CodeExercise } from '../../models/content.model';
import { CheckResult, CodeCheckerService } from '../../services/code-checker.service';
import { CodeEditorComponent } from '../code-editor/code-editor.component';

@Component({
  selector: 'app-code-lab',
  imports: [CodeEditorComponent],
  template: `
    <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
      <div class="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p class="text-xs font-medium uppercase tracking-wider text-sky-400">Thực hành code</p>
          <h3 class="text-lg font-semibold text-white">{{ exercise().title }}</h3>
          <p class="mt-1 text-sm text-slate-400">{{ exercise().instructions }}</p>
        </div>
        @if (completed()) {
          <span
            class="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30"
          >
            Đã hoàn thành ✓
          </span>
        }
      </div>

      <app-code-editor
        #editor
        [(code)]="userCode"
        [language]="exercise().language"
      />

      <div class="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          (click)="checkCode()"
          class="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-500"
        >
          Kiểm tra code
        </button>
        <button
          type="button"
          (click)="resetCode()"
          class="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white"
        >
          Đặt lại
        </button>
        @if (exercise().hints?.length) {
          <button
            type="button"
            (click)="showHints.update((v) => !v)"
            class="rounded-lg border border-amber-500/40 px-4 py-2 text-sm text-amber-400 transition hover:bg-amber-500/10"
          >
            {{ showHints() ? 'Ẩn gợi ý' : 'Gợi ý' }}
          </button>
        }
      </div>

      @if (showHints() && exercise().hints?.length) {
        <ul class="mt-3 space-y-1 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          @for (hint of exercise().hints; track hint) {
            <li class="text-sm text-amber-200/80">💡 {{ hint }}</li>
          }
        </ul>
      }

      @if (checked()) {
        <div class="mt-4 space-y-2">
          <p class="text-sm font-medium text-white">
            Kết quả: {{ passedCount() }}/{{ results().length }} tiêu chí
          </p>
          @for (result of results(); track result.check.id) {
            <div
              class="flex items-start gap-2 rounded-lg border px-3 py-2 text-sm"
              [class]="
                result.passed
                  ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300'
                  : 'border-rose-500/30 bg-rose-500/5 text-rose-300'
              "
            >
              <span>{{ result.passed ? '✓' : '✗' }}</span>
              <span>{{ result.check.description }}</span>
            </div>
          }

          @if (allPassed()) {
            <p class="text-center text-sm font-medium text-emerald-400">
              Tuyệt vời! Bạn đã hoàn thành bài thực hành này.
            </p>
          } @else {
            <p class="text-center text-sm text-slate-400">
              Sửa code và bấm "Kiểm tra code" lại nhé.
            </p>
          }
        </div>
      }
    </div>
  `,
})
export class CodeLabComponent {
  readonly exercise = input.required<CodeExercise>();
  readonly completed = input(false);
  readonly passedChange = output<boolean>();

  private readonly checker = inject(CodeCheckerService);
  private readonly editor = viewChild<CodeEditorComponent>('editor');

  protected readonly userCode = model('');
  protected readonly checked = signal(false);
  protected readonly results = signal<CheckResult[]>([]);
  protected readonly showHints = signal(false);

  protected readonly passedCount = computed(() => this.results().filter((r) => r.passed).length);
  protected readonly allPassed = computed(() => this.checker.allPassed(this.results()));

  constructor() {
    effect(() => {
      const ex = this.exercise();
      this.userCode.set(ex.starterCode);
      this.checked.set(false);
      this.results.set([]);
      this.showHints.set(false);
    });
  }

  protected checkCode(): void {
    const results = this.checker.runChecks(this.userCode(), this.exercise().checks);
    this.results.set(results);
    this.checked.set(true);
    if (this.checker.allPassed(results)) {
      this.passedChange.emit(true);
    }
  }

  protected resetCode(): void {
    const starter = this.exercise().starterCode;
    this.editor()?.reset(starter);
    this.userCode.set(starter);
    this.checked.set(false);
    this.results.set([]);
  }
}