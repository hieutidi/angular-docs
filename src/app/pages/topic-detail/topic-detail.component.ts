import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocViewerComponent } from '../../components/doc-viewer/doc-viewer.component';
import { QuizRunnerComponent } from '../../components/quiz-runner/quiz-runner.component';
import { ContentService } from '../../services/content.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-topic-detail',
  imports: [RouterLink, DocViewerComponent, QuizRunnerComponent],
  template: `
    @if (context(); as ctx) {
      <section class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <a
          [routerLink]="['/phase', ctx.phase.id]"
          class="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
        >
          ← Quay lại {{ ctx.phase.title }}
        </a>

        <header class="mb-8">
          <p class="mb-1 text-xs text-slate-500">
            Giai đoạn {{ ctx.phase.order }} · {{ ctx.topic.duration }} · {{ ctx.topic.level }}
          </p>
          <h1 class="text-2xl font-bold text-white sm:text-3xl">{{ ctx.topic.title }}</h1>
          <p class="mt-2 text-slate-400">{{ ctx.topic.description }}</p>

          @if (ctx.topic.resources.length > 0) {
            <div class="mt-4 flex flex-wrap gap-2">
              @for (res of ctx.topic.resources; track res.url) {
                <a
                  [href]="res.url"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-300 transition hover:bg-slate-700 hover:text-white"
                >
                  {{ res.label }} ↗
                </a>
              }
            </div>
          }
        </header>

        @if (lesson(); as doc) {
          <div class="mb-4 flex items-center gap-2">
            <span class="text-sm font-medium text-white">Nội dung bài học</span>
            @if (quizzes()) {
              <span class="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium uppercase text-violet-400">
                + 3 quiz mẫu
              </span>
            }
          </div>
          <app-doc-viewer [lesson]="doc" />
        } @else {
          <p class="rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-400">
            Tài liệu cho chủ đề này đang được cập nhật.
          </p>
        }

        @if (quizzes(); as qz) {
          <div class="mt-10">
            <h2 class="mb-2 text-xl font-semibold text-white">📝 3 bài Quiz</h2>
            <p class="mb-6 text-sm text-slate-400">
              Làm lần lượt 3 quiz sau khi đọc bài học. Đạt ≥ {{ qz.lessons[0].passingScore }}/3 mỗi bài để hoàn
              thành.
            </p>
            <div class="space-y-6">
              @for (quiz of qz.lessons; track quiz.id) {
                <app-quiz-runner
                  [quiz]="quiz"
                  [completed]="progress.isQuizPassed(quiz.id)"
                  (passedChange)="onQuizPassed(quiz.id)"
                />
              }
            </div>

            @if (allQuizzesPassed()) {
              <div class="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                <p class="font-medium text-emerald-400">Chúc mừng! Bạn đã hoàn thành cả 3 quiz.</p>
                <button
                  type="button"
                  (click)="markTopicComplete()"
                  class="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                >
                  Đánh dấu chủ đề hoàn thành
                </button>
              </div>
            }
          </div>
        }

        @if (!quizzes()) {
          <div class="mt-8 rounded-xl border border-dashed border-slate-700 p-5 text-center">
            <p class="text-sm text-slate-500">
              Chủ đề này có tài liệu tóm tắt. Ví dụ đầy đủ <strong class="text-slate-300">1 nội dung + 3 quiz</strong>
              xem tại
              <a routerLink="/phase/angular-basics/topic/components" class="text-red-400 hover:underline">
                Components & Templates
              </a>.
            </p>
          </div>
        }
      </section>
    } @else {
      <section class="mx-auto max-w-3xl px-4 py-16 text-center">
        <p class="text-slate-400">Không tìm thấy chủ đề.</p>
        <a routerLink="/" class="mt-4 inline-block text-red-400 hover:underline">← Về trang chủ</a>
      </section>
    }
  `,
})
export class TopicDetailComponent {
  readonly phaseId = input.required<string>();
  readonly topicId = input.required<string>();

  private readonly content = inject(ContentService);
  protected readonly progress = inject(ProgressService);

  protected readonly context = computed(() =>
    this.content.findTopic(this.phaseId(), this.topicId()),
  );

  protected readonly lesson = computed(() => {
    const ctx = this.context();
    return ctx ? this.content.getTopicLesson(ctx.topic.id) : undefined;
  });

  protected readonly quizzes = computed(() => {
    const ctx = this.context();
    return ctx ? this.content.getTopicQuizzes(ctx.topic.id) : undefined;
  });

  protected readonly allQuizzesPassed = computed(() => {
    const qz = this.quizzes();
    if (!qz) return false;
    return qz.lessons.every((l) => this.progress.isQuizPassed(l.id));
  });

  protected onQuizPassed(quizId: string): void {
    this.progress.markQuizPassed(quizId);
  }

  protected markTopicComplete(): void {
    const ctx = this.context();
    if (ctx && !this.progress.isCompleted(ctx.topic.id)) {
      this.progress.toggleTopic(ctx.topic.id);
    }
  }
}
