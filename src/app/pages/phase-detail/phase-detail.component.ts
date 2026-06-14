import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhaseGuideComponent } from '../../components/phase-guide/phase-guide.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { RoadmapTrack, TRACKS } from '../../models/track.model';
import { ProgressService } from '../../services/progress.service';
import { RoadmapService } from '../../services/roadmap.service';

@Component({
  selector: 'app-phase-detail',
  imports: [RouterLink, PhaseGuideComponent, TopicCardComponent],
  template: `
    @if (phase(); as p) {
      <section class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 transition-colors duration-300">
        <a
          [routerLink]="['/', track()]"
          class="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 transition hover:text-slate-900 dark:hover:text-white"
        >
          ← Quay lại tổng quan
        </a>

        <header class="mb-8">
          <p class="mb-2 text-sm text-slate-500 dark:text-slate-500">
            Giai đoạn {{ p.order }} · {{ p.subtitle }} · ~{{ p.estimatedWeeks }} tuần
          </p>
          <div class="flex items-center gap-3">
            <span class="text-4xl">{{ p.icon }}</span>
            <div>
              <h1 class="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{{ p.title }}</h1>
              <p class="mt-1 text-slate-600 dark:text-slate-400">{{ p.description }}</p>
            </div>
          </div>

          <div class="mt-6">
            <div class="mb-1 flex justify-between text-sm">
              <span class="text-slate-500 dark:text-slate-400">Tiến độ giai đoạn</span>
              <span class="font-medium text-slate-900 dark:text-white">{{ phaseProgress() }}%</span>
            </div>
            <div class="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                class="h-full rounded-full bg-gradient-to-r transition-all duration-500"
                [class]="progressBar()"
                [style.width.%]="phaseProgress()"
              ></div>
            </div>
          </div>
        </header>

        @if (phaseGuide(); as guide) {
          <app-phase-guide [guide]="guide" />
        }

        <h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Chủ đề trong giai đoạn</h2>
        <div class="space-y-3">
          @for (topic of p.topics; track topic.id) {
            <app-topic-card
              [topic]="topic"
              [track]="track()"
              [phaseId]="p.id"
              [completed]="progress.isCompleted(track(), topic.id)"
              [featured]="roadmaps.hasFeaturedLesson(track(), topic.id)"
              (toggle)="progress.toggleTopic(track(), topic.id)"
            />
          }
        </div>

        @if (nextPhase(); as next) {
          <div class="mt-10 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-5 text-center">
            <p class="mb-2 text-sm text-slate-500 dark:text-slate-500">Giai đoạn tiếp theo</p>
            <a
              [routerLink]="['/', track(), 'phase', next.id]"
              class="inline-flex items-center gap-2 text-lg font-medium text-slate-900 dark:text-white transition"
              [class]="linkHover()"
            >
              {{ next.icon }} {{ next.title }} →
            </a>
          </div>
        } @else if (phaseProgress() === 100) {
          <div
            class="mt-10 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-6 text-center"
          >
            <p class="text-2xl">🎉</p>
            <p class="mt-2 text-lg font-semibold text-emerald-600 dark:text-emerald-400">Chúc mừng!</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Bạn đã hoàn thành toàn bộ lộ trình {{ trackInfo().shortLabel }}. Hãy xây dựng portfolio
              và apply việc làm!
            </p>
          </div>
        }
      </section>
    } @else {
      <section class="mx-auto max-w-3xl px-4 py-16 text-center">
        <p class="text-slate-600 dark:text-slate-400">Không tìm thấy giai đoạn.</p>
        <a [routerLink]="['/', track()]" class="mt-4 inline-block hover:underline" [class]="linkAccent()"
          >← Về trang chủ</a
        >
      </section>
    }
  `,
})
export class PhaseDetailComponent {
  readonly track = input.required<RoadmapTrack>();
  readonly phaseId = input.required<string>();

  protected readonly roadmaps = inject(RoadmapService);
  protected readonly progress = inject(ProgressService);

  protected readonly trackInfo = computed(() => TRACKS[this.track()]);

  protected readonly phaseGuide = computed(() =>
    this.roadmaps.getPhaseGuide(this.track(), this.phaseId()),
  );

  protected readonly phase = computed(() => {
    if (!this.roadmaps.isValidTrack(this.track())) return undefined;
    return this.roadmaps.getRoadmap(this.track()).phases.find((p) => p.id === this.phaseId());
  });

  protected readonly phaseProgress = computed(() => {
    const p = this.phase();
    return p ? this.progress.phaseProgress(this.track(), p.id) : 0;
  });

  protected readonly nextPhase = computed(() => {
    const p = this.phase();
    if (!p) return null;
    return (
      this.roadmaps.getRoadmap(this.track()).phases.find((ph) => ph.order === p.order + 1) ?? null
    );
  });

  protected readonly progressBar = computed(
    () => `${TRACKS[this.track()].accentFrom} ${TRACKS[this.track()].accentTo}`,
  );

  protected readonly linkHover = computed(() =>
    this.track() === 'dotnet' ? 'hover:text-violet-600 dark:hover:text-violet-400' : 'hover:text-red-600 dark:hover:text-red-400',
  );

  protected readonly linkAccent = computed(() =>
    this.track() === 'dotnet' ? 'text-violet-600 dark:text-violet-400' : 'text-red-600 dark:text-red-400',
  );
}
