import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ANGULAR_ROADMAP } from '../../data/roadmap.data';
import { ProgressService } from '../../services/progress.service';

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  emerald: {
    border: 'border-emerald-500/30',
    bg: 'from-emerald-500/10',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  red: {
    border: 'border-red-500/30',
    bg: 'from-red-500/10',
    text: 'text-red-400',
    glow: 'shadow-red-500/10',
  },
  violet: {
    border: 'border-violet-500/30',
    bg: 'from-violet-500/10',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/10',
  },
  blue: {
    border: 'border-blue-500/30',
    bg: 'from-blue-500/10',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/10',
  },
  amber: {
    border: 'border-amber-500/30',
    bg: 'from-amber-500/10',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/10',
  },
  cyan: {
    border: 'border-cyan-500/30',
    bg: 'from-cyan-500/10',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/10',
  },
};

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-slate-950 to-slate-950"
      ></div>
      <div class="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div class="mb-10 text-center">
          <p
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-400"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
            {{ roadmap.totalWeeks }} tuần · {{ progress.totalTopics }} chủ đề
          </p>
          <h1 class="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {{ roadmap.title }}
          </h1>
          <p class="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
            {{ roadmap.description }}
          </p>

          <div class="mx-auto mt-8 max-w-md">
            <div class="mb-2 flex justify-between text-sm">
              <span class="text-slate-400">Tiến độ tổng</span>
              <span class="font-medium text-white"
                >{{ progress.completedCount() }}/{{ progress.totalTopics }} chủ đề</span
              >
            </div>
            <div class="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                class="h-full rounded-full bg-gradient-to-r from-red-500 via-fuchsia-500 to-violet-500 transition-all duration-700"
                [style.width.%]="progress.overallProgress()"
              ></div>
            </div>
            @if (progress.completedCount() > 0) {
              <button
                type="button"
                (click)="resetProgress()"
                class="mt-3 text-xs text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
              >
                Đặt lại tiến độ
              </button>
            }
          </div>
        </div>

        <div class="relative">
          <div class="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-red-500/50 via-violet-500/30 to-transparent sm:block"></div>

          <div class="space-y-6">
            @for (phase of roadmap.phases; track phase.id) {
              <a
                [routerLink]="['/phase', phase.id]"
                class="group relative block rounded-2xl border bg-gradient-to-br to-transparent p-5 transition hover:scale-[1.01] sm:ml-12 sm:p-6"
                [class]="phaseColor(phase.color).border + ' ' + phaseColor(phase.color).bg + ' shadow-lg ' + phaseColor(phase.color).glow"
              >
                <div
                  class="absolute -left-12 top-6 hidden h-10 w-10 items-center justify-center rounded-full border-2 border-slate-800 bg-slate-900 text-lg sm:flex"
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
                      <h2 class="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                        {{ phase.title }}
                      </h2>
                      <p class="mt-1 text-sm text-slate-400">{{ phase.description }}</p>
                      <p class="mt-2 text-xs text-slate-500">
                        {{ phase.topics.length }} chủ đề · ~{{ phase.estimatedWeeks }} tuần
                      </p>
                    </div>
                  </div>

                  <div class="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end">
                    <div class="text-right">
                      <p class="text-2xl font-bold text-white">{{ phaseProgress(phase.id) }}%</p>
                      <p class="text-xs text-slate-500">hoàn thành</p>
                    </div>
                    <div class="h-2 w-24 overflow-hidden rounded-full bg-slate-800">
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-red-500 to-violet-500 transition-all"
                        [style.width.%]="phaseProgress(phase.id)"
                      ></div>
                    </div>
                    <span class="text-slate-500 transition group-hover:translate-x-1 group-hover:text-white">→</span>
                  </div>
                </div>
              </a>
            }
          </div>
        </div>

        <div class="mt-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
          <h3 class="mb-2 text-lg font-semibold text-white">Mẹo học hiệu quả</h3>
          <ul class="mx-auto max-w-xl space-y-2 text-left text-sm text-slate-400">
            <li class="flex gap-2"><span class="text-red-400">1.</span> Code mỗi ngày — ít nhất 1 giờ, dù chỉ là refactor nhỏ.</li>
            <li class="flex gap-2"><span class="text-red-400">2.</span> Làm dự án mini sau mỗi giai đoạn, đừng chỉ đọc lý thuyết.</li>
            <li class="flex gap-2"><span class="text-red-400">3.</span> Đọc docs chính thức tại angular.dev — luôn cập nhật nhất.</li>
            <li class="flex gap-2"><span class="text-red-400">4.</span> Đánh dấu chủ đề đã học để theo dõi tiến độ của bạn.</li>
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  protected readonly roadmap = ANGULAR_ROADMAP;
  protected readonly progress = inject(ProgressService);

  protected phaseColor(color: string) {
    return COLOR_MAP[color] ?? COLOR_MAP['red'];
  }

  protected phaseProgress(phaseId: string): number {
    return this.progress.phaseProgress(phaseId);
  }

  protected resetProgress(): void {
    if (confirm('Bạn có chắc muốn đặt lại toàn bộ tiến độ?')) {
      this.progress.resetProgress();
    }
  }
}
