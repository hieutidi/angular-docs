import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoadmapTrack, TRACKS } from '../../models/track.model';
import { ProgressService } from '../../services/progress.service';
import { RoadmapService } from '../../services/roadmap.service';

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  emerald: {
    border: 'border-emerald-500/20 dark:border-emerald-500/30',
    bg: 'bg-emerald-500/5 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    glow: 'shadow-emerald-500/5 dark:shadow-emerald-500/10',
  },
  red: {
    border: 'border-red-500/20 dark:border-red-500/30',
    bg: 'bg-red-500/5 dark:bg-red-500/10',
    text: 'text-red-600 dark:text-red-400',
    glow: 'shadow-red-500/5 dark:shadow-red-500/10',
  },
  violet: {
    border: 'border-violet-500/20 dark:border-violet-500/30',
    bg: 'bg-violet-500/5 dark:bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400',
    glow: 'shadow-violet-500/5 dark:shadow-violet-500/10',
  },
  blue: {
    border: 'border-blue-500/20 dark:border-blue-500/30',
    bg: 'bg-blue-500/5 dark:bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    glow: 'shadow-blue-500/5 dark:shadow-blue-500/10',
  },
  amber: {
    border: 'border-amber-500/20 dark:border-amber-500/30',
    bg: 'bg-amber-500/5 dark:bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    glow: 'shadow-amber-500/5 dark:shadow-amber-500/10',
  },
  cyan: {
    border: 'border-cyan-500/20 dark:border-cyan-500/30',
    bg: 'bg-cyan-500/5 dark:bg-cyan-500/10',
    text: 'text-cyan-600 dark:text-cyan-400',
    glow: 'shadow-cyan-500/5 dark:shadow-cyan-500/10',
  },
  indigo: {
    border: 'border-indigo-500/20 dark:border-indigo-500/30',
    bg: 'bg-indigo-500/5 dark:bg-indigo-500/10',
    text: 'text-indigo-600 dark:text-indigo-400',
    glow: 'shadow-indigo-500/5 dark:shadow-indigo-500/10',
  },
};

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden transition-colors duration-300">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]"
        [class]="heroGradient()"
      ></div>
      <div class="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div class="mb-10 text-center">
          <p
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-xs text-slate-500 dark:text-slate-400"
          >
            <span class="h-1.5 w-1.5 rounded-full" [class]="accentDot()"></span>
            {{ roadmap().totalWeeks }} tuần · {{ totalTopics() }} chủ đề
          </p>
          <h1 class="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {{ roadmap().title }}
          </h1>
          <p class="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            {{ roadmap().description }}
          </p>

          <div class="mx-auto mt-8 max-w-md">
            <div class="mb-2 flex justify-between text-sm">
              <span class="text-slate-500 dark:text-slate-400">Tiến độ tổng</span>
              <span class="font-medium text-slate-900 dark:text-white"
                >{{ progress.completedCount(track()) }}/{{ totalTopics() }} chủ đề</span
              >
            </div>
            <div class="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                class="h-full rounded-full bg-gradient-to-r transition-all duration-700"
                [class]="progressBar()"
                [style.width.%]="progress.overallProgress(track())"
              ></div>
            </div>
            @if (progress.completedCount(track()) > 0) {
              <button
                type="button"
                (click)="resetProgress()"
                class="mt-3 text-xs text-slate-500 underline-offset-2 hover:text-slate-700 dark:hover:text-slate-300 hover:underline"
              >
                Đặt lại tiến độ
              </button>
            }
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b sm:block"
            [class]="timelineGradient()"
          ></div>

          <div class="space-y-6">
            @for (phase of roadmap().phases; track phase.id) {
              <a
                [routerLink]="['/', track(), 'phase', phase.id]"
                class="group relative block rounded-2xl border bg-white dark:bg-slate-900/60 p-5 transition hover:scale-[1.01] sm:ml-12 sm:p-6 shadow-sm hover:shadow-md"
                [class]="phaseColor(phase.color).border + ' shadow-lg ' + phaseColor(phase.color).glow"
              >
                <div
                  class="absolute -left-12 top-6 hidden h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-lg sm:flex"
                >
                  {{ phase.icon }}
                </div>

                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex items-start gap-3 sm:gap-4">
                    <span class="text-2xl sm:hidden">{{ phase.icon }}</span>
                    <div>
                      <p class="mb-0.5 text-xs font-medium uppercase tracking-wider" [class]="phaseColor(phase.color).text">
                        Giai đoạn {{ phase.order }} · {{ phase.subtitle }}
                      </p>
                      <h2 class="text-xl font-semibold text-slate-900 dark:text-white transition-colors" [class]="phaseHover()">
                        {{ phase.title }}
                      </h2>
                      <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ phase.description }}</p>
                      <p class="mt-2 text-xs text-slate-400 dark:text-slate-500">
                        {{ phase.topics.length }} chủ đề · ~{{ phase.estimatedWeeks }} tuần
                      </p>
                    </div>
                  </div>

                  <div class="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end">
                    <div class="text-right">
                      <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ phaseProgress(phase.id) }}%</p>
                      <p class="text-xs text-slate-500 dark:text-slate-500">hoàn thành</p>
                    </div>
                    <div class="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        class="h-full rounded-full bg-gradient-to-r transition-all"
                        [class]="progressBar()"
                        [style.width.%]="phaseProgress(phase.id)"
                      ></div>
                    </div>
                    <span class="text-slate-400 dark:text-slate-500 transition group-hover:translate-x-1 group-hover:text-slate-900 dark:group-hover:text-white">→</span>
                  </div>
                </div>
              </a>
            }
          </div>
        </div>

        <div class="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-6 text-center shadow-sm">
          <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Mẹo học hiệu quả</h3>
          <ul class="mx-auto max-w-xl space-y-2 text-left text-sm text-slate-600 dark:text-slate-400">
            @for (tip of studyTips(); track $index) {
              <li class="flex gap-2">
                <span [class]="tipAccent()">{{ $index + 1 }}.</span>
                {{ tip }}
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  readonly track = input.required<RoadmapTrack>();

  private readonly roadmaps = inject(RoadmapService);
  protected readonly progress = inject(ProgressService);

  protected readonly roadmap = computed(() => this.roadmaps.getRoadmap(this.track()));
  protected readonly trackInfo = computed(() => TRACKS[this.track()]);

  protected readonly totalTopics = computed(() => this.roadmaps.totalTopics(this.track()));

  protected phaseColor(color: string) {
    return COLOR_MAP[color] ?? COLOR_MAP['violet'];
  }

  protected phaseProgress(phaseId: string): number {
    return this.progress.phaseProgress(this.track(), phaseId);
  }

  protected resetProgress(): void {
    if (confirm('Bạn có chắc muốn đặt lại tiến độ lộ trình này?')) {
      this.progress.resetProgress(this.track());
    }
  }

  protected readonly heroGradient = computed(() => {
    if (this.track() === 'dotnet') return 'from-violet-500/10 dark:from-violet-900/20 via-white dark:via-slate-950 to-white dark:to-slate-950';
    if (this.track() === 'react') return 'from-blue-500/10 dark:from-blue-900/20 via-white dark:via-slate-950 to-white dark:to-slate-950';
    return 'from-red-500/10 dark:from-red-900/20 via-white dark:via-slate-950 to-white dark:to-slate-950';
  });

  protected readonly timelineGradient = computed(() => {
    if (this.track() === 'dotnet') return 'from-violet-500/30 dark:from-violet-500/50 via-sky-500/20 dark:via-sky-500/30 to-transparent';
    if (this.track() === 'react') return 'from-blue-500/30 dark:from-blue-500/50 via-blue-700/20 dark:via-blue-700/30 to-transparent';
    return 'from-red-500/30 dark:from-red-500/50 via-violet-500/20 dark:via-violet-500/30 to-transparent';
  });

  protected readonly progressBar = computed(
    () => `${TRACKS[this.track()].accentFrom} ${TRACKS[this.track()].accentTo}`,
  );

  protected readonly accentDot = computed(() => {
    if (this.track() === 'dotnet') return 'bg-violet-500';
    if (this.track() === 'react') return 'bg-blue-500';
    return 'bg-red-500';
  });

  protected readonly phaseHover = computed(() => {
    if (this.track() === 'dotnet') return 'group-hover:text-violet-600 dark:group-hover:text-violet-300';
    if (this.track() === 'react') return 'group-hover:text-blue-600 dark:group-hover:text-blue-300';
    return 'group-hover:text-red-600 dark:group-hover:text-red-300';
  });

  protected readonly tipAccent = computed(() => {
    if (this.track() === 'dotnet') return 'text-violet-600 dark:text-violet-400';
    if (this.track() === 'react') return 'text-blue-600 dark:text-blue-400';
    return 'text-red-600 dark:text-red-400';
  });

  protected readonly studyTips = computed(() => {
    if (this.track() === 'dotnet') {
      return [
        'Code mỗi ngày — chạy dotnet run và test API bằng Swagger.',
        'Làm dự án mini sau mỗi giai đoạn, đừng chỉ đọc lý thuyết.',
        'Đọc docs chính thức tại learn.microsoft.com/dotnet.',
        'Đánh dấu chủ đề đã học để theo dõi tiến độ của bạn.',
      ];
    }
    if (this.track() === 'react') {
      return [
        'Học cách tư duy theo component — chia nhỏ UI nhất có thể.',
        'Thực hành sử dụng Hooks một cách thành thạo, đặc biệt là useState và useEffect.',
        'Đọc docs chính thức tại react.dev — rất dễ hiểu và đầy đủ.',
        'Đánh dấu chủ đề đã học để theo dõi tiến độ của bạn.',
      ];
    }
    return [
      'Code mỗi ngày — ít nhất 1 giờ, dù chỉ là refactor nhỏ.',
      'Làm dự án mini sau mỗi giai đoạn, đừng chỉ đọc lý thuyết.',
      'Đọc docs chính thức tại angular.dev — luôn cập nhật nhất.',
      'Đánh dấu chủ đề đã học để theo dõi tiến độ của bạn.',
    ];
  });
}
