import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeLabComponent } from '../../components/code-lab/code-lab.component';
import { DocViewerComponent } from '../../components/doc-viewer/doc-viewer.component';
import { QuizRunnerComponent } from '../../components/quiz-runner/quiz-runner.component';
import { RoadmapTrack } from '../../models/track.model';
import { ProgressService } from '../../services/progress.service';
import { RoadmapService } from '../../services/roadmap.service';

@Component({
  selector: 'app-topic-detail',
  imports: [RouterLink, DocViewerComponent, CodeLabComponent, QuizRunnerComponent],
  template: `
    @if (context(); as ctx) {
      <section class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 transition-colors duration-300">
        <a
          [routerLink]="['/', track(), 'phase', ctx.phase.id]"
          class="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 transition hover:text-slate-900 dark:hover:text-white"
        >
          ← Quay lại {{ ctx.phase.title }}
        </a>

        <header class="mb-8">
          <p class="mb-1 text-xs text-slate-500 dark:text-slate-500">
            Giai đoạn {{ ctx.phase.order }} · {{ ctx.topic.duration }} · {{ ctx.topic.level }}
          </p>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{{ ctx.topic.title }}</h1>
          <p class="mt-2 text-slate-600 dark:text-slate-400">{{ ctx.topic.description }}</p>

          @if (ctx.topic.resources.length > 0) {
            <div class="mt-4 flex flex-wrap gap-2">
              @for (res of ctx.topic.resources; track res.url) {
                <a
                  [href]="res.url"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 transition hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white shadow-sm"
                >
                  {{ res.label }} ↗
                </a>
              }
            </div>
          }
        </header>

        @if (lesson(); as doc) {
          <div class="mb-4 flex items-center gap-2">
            <span class="text-sm font-medium text-slate-900 dark:text-white">Nội dung bài học</span>
            @if (codeExercises().length > 0) {
              <span class="rounded-full bg-sky-100 dark:bg-sky-500/15 px-2 py-0.5 text-[10px] font-medium uppercase text-sky-600 dark:text-sky-400">
                + IDE thực hành
              </span>
            }
            @if (quizzes()) {
              <span class="rounded-full bg-violet-100 dark:bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium uppercase text-violet-600 dark:text-violet-400">
                + 3 quiz
              </span>
            }
            @if (featuredLesson() && !quizzes()) {
              <span class="rounded-full bg-sky-100 dark:bg-sky-500/15 px-2 py-0.5 text-[10px] font-medium uppercase text-sky-600 dark:text-sky-400">
                bài học chi tiết
              </span>
            }
          </div>
          <app-doc-viewer [lesson]="doc" />
        } @else {
          <p class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 text-sm text-slate-600 dark:text-slate-400">
            Tài liệu cho chủ đề này đang được cập nhật.
          </p>
        }

        @if (codeExercises().length > 0) {
          <div class="mt-10">
            <h2 class="mb-2 text-xl font-semibold text-slate-900 dark:text-white">💻 Thực hành viết code</h2>
            <p class="mb-6 text-sm text-slate-600 dark:text-slate-400">
              Viết code trong IDE, bấm "Kiểm tra code" để hệ thống chấm tự động theo từng tiêu chí.
            </p>
            <div class="space-y-6">
              @for (ex of codeExercises(); track ex.id) {
                <app-code-lab
                  [exercise]="ex"
                  [completed]="progress.isCodeLabPassed(track(), ex.id)"
                  (passedChange)="onCodeLabPassed(ex.id)"
                />
              }
            </div>
          </div>
        }

        @if (quizzes(); as qz) {
          <div class="mt-10">
            <h2 class="mb-2 text-xl font-semibold text-slate-900 dark:text-white">📝 3 bài Quiz</h2>
            <p class="mb-6 text-sm text-slate-600 dark:text-slate-400">
              Làm lần lượt 3 quiz sau khi đọc bài học. Đạt ≥ {{ qz.lessons[0].passingScore }}/3 mỗi bài để hoàn
              thành.
            </p>
            <div class="space-y-6">
              @for (quiz of qz.lessons; track quiz.id) {
                <app-quiz-runner
                  [quiz]="quiz"
                  [completed]="progress.isQuizPassed(track(), quiz.id)"
                  (passedChange)="onQuizPassed(quiz.id)"
                />
              }
            </div>

            @if (allQuizzesPassed() && allCodeLabsPassed()) {
              <div class="mt-6 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-4 text-center">
                <p class="font-medium text-emerald-600 dark:text-emerald-400">
                  Chúc mừng! Bạn đã hoàn thành quiz và bài thực hành code.
                </p>
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
          <div class="mt-8 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-5 text-center">
            <p class="text-sm text-slate-500 dark:text-slate-500">
              Chủ đề này có tài liệu tóm tắt. Ví dụ bài học chi tiết
              @if (track() === 'angular') {
                xem tại
                <a
                  routerLink="/angular/phase/angular-basics/topic/components"
                  class="text-red-600 dark:text-red-400 hover:underline"
                >
                  Components & Templates
                </a>
                (kèm IDE + 3 quiz).
              } @else {
                xem tại
                <a
                  routerLink="/dotnet/phase/aspnet-core/topic/webapi-basics"
                  class="text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Web API & Controllers
                </a>
                (kèm IDE + 3 quiz).
              }
            </p>
          </div>
        }
      </section>
    } @else {
      <section class="mx-auto max-w-3xl px-4 py-16 text-center transition-colors duration-300">
        <p class="text-slate-600 dark:text-slate-400">Không tìm thấy chủ đề.</p>
        <a [routerLink]="['/', track()]" class="mt-4 inline-block hover:underline" [class]="linkAccent()"
          >← Về trang chủ</a
        >
      </section>
    }
  `,
})
export class TopicDetailComponent {
  readonly track = input.required<RoadmapTrack>();
  readonly phaseId = input.required<string>();
  readonly topicId = input.required<string>();

  private readonly roadmaps = inject(RoadmapService);
  protected readonly progress = inject(ProgressService);

  protected readonly context = computed(() => {
    if (!this.roadmaps.isValidTrack(this.track())) return undefined;
    return this.roadmaps.findTopic(this.track(), this.phaseId(), this.topicId());
  });

  protected readonly lesson = computed(() => {
    const ctx = this.context();
    return ctx ? this.roadmaps.getTopicLesson(this.track(), ctx.topic.id) : undefined;
  });

  protected readonly featuredLesson = computed(() => {
    const ctx = this.context();
    return ctx ? this.roadmaps.hasFeaturedLesson(this.track(), ctx.topic.id) : false;
  });

  protected readonly quizzes = computed(() => {
    const ctx = this.context();
    return ctx ? this.roadmaps.getTopicQuizzes(this.track(), ctx.topic.id) : undefined;
  });

  protected readonly codeExercises = computed(() => this.lesson()?.codeExercises ?? []);

  protected readonly allQuizzesPassed = computed(() => {
    const qz = this.quizzes();
    if (!qz) return true;
    return qz.lessons.every((l) => this.progress.isQuizPassed(this.track(), l.id));
  });

  protected readonly allCodeLabsPassed = computed(() => {
    const labs = this.codeExercises();
    if (labs.length === 0) return true;
    return labs.every((ex) => this.progress.isCodeLabPassed(this.track(), ex.id));
  });

  protected onQuizPassed(quizId: string): void {
    this.progress.markQuizPassed(this.track(), quizId);
  }

  protected onCodeLabPassed(exerciseId: string): void {
    this.progress.markCodeLabPassed(this.track(), exerciseId);
  }

  protected markTopicComplete(): void {
    const ctx = this.context();
    if (ctx && !this.progress.isCompleted(this.track(), ctx.topic.id)) {
      this.progress.toggleTopic(this.track(), ctx.topic.id);
    }
  }

  protected readonly linkAccent = computed(() =>
    this.track() === 'dotnet' ? 'text-violet-600 dark:text-violet-400' : 'text-red-600 dark:text-red-400',
  );
}
