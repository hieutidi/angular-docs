import { Component, computed, input, output, signal } from '@angular/core';
import { QuizLesson } from '../../models/content.model';

@Component({
  selector: 'app-quiz-runner',
  template: `
    <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
      <div class="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p class="text-xs font-medium uppercase tracking-wider text-violet-400">
            Quiz {{ quiz().order }}
          </p>
          <h3 class="text-lg font-semibold text-white">{{ quiz().title }}</h3>
          <p class="mt-1 text-sm text-slate-400">{{ quiz().description }}</p>
        </div>
        @if (passed()) {
          <span class="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
            Đã đạt ✓
          </span>
        }
      </div>

      @if (!submitted()) {
        <div class="space-y-5">
          @for (q of quiz().questions; track q.id; let qi = $index) {
            <fieldset class="rounded-lg border border-slate-700/80 p-4">
              <legend class="mb-3 text-sm font-medium text-white">
                {{ qi + 1 }}. {{ q.question }}
              </legend>
              <div class="space-y-2">
                @for (opt of q.options; track opt.id) {
                  <label
                    class="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 px-3 py-2 transition hover:border-slate-500"
                    [class.border-violet-500]="answers()[q.id] === opt.id"
                    [class.bg-violet-500/10]="answers()[q.id] === opt.id"
                  >
                    <input
                      type="radio"
                      [name]="quiz().id + '-' + q.id"
                      [value]="opt.id"
                      [checked]="answers()[q.id] === opt.id"
                      (change)="selectAnswer(q.id, opt.id)"
                      class="accent-violet-500"
                    />
                    <span class="text-sm text-slate-300">{{ opt.text }}</span>
                  </label>
                }
              </div>
            </fieldset>
          }

          <button
            type="button"
            (click)="submit()"
            [disabled]="!allAnswered()"
            class="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Nộp bài
          </button>
        </div>
      } @else {
        <div class="space-y-4">
          <div
            class="rounded-lg p-4 text-center"
            [class]="passed() ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-rose-500/10 border border-rose-500/30'"
          >
            <p class="text-2xl font-bold" [class]="passed() ? 'text-emerald-400' : 'text-rose-400'">
              {{ score() }}/{{ quiz().questions.length }}
            </p>
            <p class="mt-1 text-sm text-slate-400">
              @if (passed()) {
                Đạt yêu cầu (cần ≥ {{ quiz().passingScore }} đúng)
              } @else {
                Chưa đạt — cần ≥ {{ quiz().passingScore }} câu đúng. Đọc lại bài học và thử lại!
              }
            </p>
          </div>

          @for (q of quiz().questions; track q.id) {
            <div class="rounded-lg border border-slate-700 p-4">
              <p class="mb-2 text-sm font-medium text-white">{{ q.question }}</p>
              <p
                class="text-sm"
                [class]="answers()[q.id] === q.correctOptionId ? 'text-emerald-400' : 'text-rose-400'"
              >
                @if (answers()[q.id] === q.correctOptionId) {
                  ✓ Đúng
                } @else {
                  ✗ Sai — đáp án đúng: {{ correctLabel(q) }}
                }
              </p>
              <p class="mt-2 text-xs text-slate-500">{{ q.explanation }}</p>
            </div>
          }

          <button
            type="button"
            (click)="retry()"
            class="text-sm text-violet-400 underline-offset-2 hover:underline"
          >
            Làm lại quiz này
          </button>
        </div>
      }
    </div>
  `,
})
export class QuizRunnerComponent {
  readonly quiz = input.required<QuizLesson>();
  readonly completed = input(false);
  readonly passedChange = output<boolean>();

  protected readonly answers = signal<Record<string, string>>({});
  protected readonly submitted = signal(false);

  protected readonly score = computed(() => {
    const ans = this.answers();
    return this.quiz().questions.filter((q) => ans[q.id] === q.correctOptionId).length;
  });

  protected readonly passed = computed(
    () => this.completed() || (this.submitted() && this.score() >= this.quiz().passingScore),
  );

  protected allAnswered(): boolean {
    const ans = this.answers();
    return this.quiz().questions.every((q) => !!ans[q.id]);
  }

  protected selectAnswer(questionId: string, optionId: string): void {
    this.answers.update((a) => ({ ...a, [questionId]: optionId }));
  }

  protected submit(): void {
    this.submitted.set(true);
    if (this.score() >= this.quiz().passingScore) {
      this.passedChange.emit(true);
    }
  }

  protected retry(): void {
    this.answers.set({});
    this.submitted.set(false);
  }

  protected correctLabel(q: { correctOptionId: string; options: { id: string; text: string }[] }): string {
    return q.options.find((o) => o.id === q.correctOptionId)?.text ?? '';
  }
}
