import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ANGULAR_ROADMAP } from '../../data/roadmap.data';
import { ProgressService } from '../../services/progress.service';
import { PhaseGuideComponent } from '../../components/phase-guide/phase-guide.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-phase-detail',
  imports: [RouterLink, PhaseGuideComponent, TopicCardComponent],
  template: `
    @if (phase(); as p) {
      <section class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <a
          routerLink="/"
          class="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
        >
          ← Quay lại tổng quan
        </a>

        <header class="mb-8">
          <p class="mb-2 text-sm text-slate-500">
            Giai đoạn {{ p.order }} · {{ p.subtitle }} · ~{{ p.estimatedWeeks }} tuần
          </p>
          <div class="flex items-center gap-3">
            <span class="text-4xl">{{ p.icon }}</span>
            <div>
              <h1 class="text-2xl font-bold text-white sm:text-3xl">{{ p.title }}</h1>
              <p class="mt-1 text-slate-400">{{ p.description }}</p>
            </div>
          </div>

          <div class="mt-6">
            <div class="mb-1 flex justify-between text-sm">
              <span class="text-slate-400">Tiến độ giai đoạn</span>
              <span class="font-medium text-white">{{ phaseProgress() }}%</span>
            </div>
            <div class="h-2.5 overflow-hidden rounded-full bg-slate-800">
              <div
                class="h-full rounded-full bg-gradient-to-r from-red-500 to-violet-500 transition-all duration-500"
                [style.width.%]="phaseProgress()"
              ></div>
            </div>
          </div>
        </header>

        @if (phaseGuide(); as guide) {
          <app-phase-guide [guide]="guide" />
        }

        <h2 class="mb-4 text-lg font-semibold text-white">Chủ đề trong giai đoạn</h2>
        <div class="space-y-3">
          @for (topic of p.topics; track topic.id) {
            <app-topic-card
              [topic]="topic"
              [phaseId]="p.id"
              [completed]="progress.isCompleted(topic.id)"
              (toggle)="progress.toggleTopic(topic.id)"
            />
          }
        </div>

        @if (nextPhase(); as next) {
          <div class="mt-10 rounded-xl border border-dashed border-slate-700 p-5 text-center">
            <p class="mb-2 text-sm text-slate-500">Giai đoạn tiếp theo</p>
            <a
              [routerLink]="['/phase', next.id]"
              class="inline-flex items-center gap-2 text-lg font-medium text-white hover:text-red-400 transition"
            >
              {{ next.icon }} {{ next.title }} →
            </a>
          </div>
        } @else if (phaseProgress() === 100) {
          <div
            class="mt-10 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center"
          >
            <p class="text-2xl">🎉</p>
            <p class="mt-2 text-lg font-semibold text-emerald-400">Chúc mừng!</p>
            <p class="mt-1 text-sm text-slate-400">
              Bạn đã hoàn thành toàn bộ lộ trình Angular. Hãy xây dựng portfolio và apply việc làm!
            </p>
          </div>
        }
      </section>
    } @else {
      <section class="mx-auto max-w-3xl px-4 py-16 text-center">
        <p class="text-slate-400">Không tìm thấy giai đoạn.</p>
        <a routerLink="/" class="mt-4 inline-block text-red-400 hover:underline">← Về trang chủ</a>
      </section>
    }
  `,
})
export class PhaseDetailComponent {
  readonly phaseId = input.required<string>();

  private readonly content = inject(ContentService);
  protected readonly progress = inject(ProgressService);

  protected readonly phaseGuide = computed(() => this.content.getPhaseGuide(this.phaseId()));

  protected readonly phase = computed(() =>
    ANGULAR_ROADMAP.phases.find((p) => p.id === this.phaseId()),
  );

  protected readonly phaseProgress = computed(() => {
    const p = this.phase();
    return p ? this.progress.phaseProgress(p.id) : 0;
  });

  protected readonly nextPhase = computed(() => {
    const p = this.phase();
    if (!p) return null;
    return ANGULAR_ROADMAP.phases.find((ph) => ph.order === p.order + 1) ?? null;
  });
}
