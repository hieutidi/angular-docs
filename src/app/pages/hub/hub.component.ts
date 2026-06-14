import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_META } from '../../data/meta/app-meta.data';
import { TRACK_LIST } from '../../models/track.model';
import { ProgressService } from '../../services/progress.service';
import { RoadmapService } from '../../services/roadmap.service';

@Component({
  selector: 'app-hub',
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden transition-colors duration-300">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200/40 dark:from-slate-800/40 via-white dark:via-slate-950 to-white dark:to-slate-950"
      ></div>
      <div class="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div class="mb-12 text-center">
          <p
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-xs text-slate-500 dark:text-slate-400"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
            Dev Roadmaps · Tiếng Việt
          </p>
          <h1 class="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Chọn lộ trình học
          </h1>
          <p class="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
            Lộ trình có thứ tự, mục tiêu rõ ràng, tài liệu tóm tắt và theo dõi tiến độ — bắt đầu từ
            frontend Angular/React hoặc backend .NET.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (track of tracks; track track.id) {
            <a
              [routerLink]="['/', track.id]"
              class="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-6 transition hover:scale-[1.02] hover:border-slate-300 dark:hover:border-slate-700 sm:p-8 shadow-sm hover:shadow-md"
            >
              <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-5 dark:opacity-10 transition group-hover:opacity-10 dark:group-hover:opacity-20"
                [class]="track.accentFrom + ' ' + track.accentTo"
              ></div>
              <div class="relative">
                <div class="mb-4 flex items-center gap-3">
                  <span
                    class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-lg"
                    [class]="track.accentFrom + ' ' + track.accentTo"
                  >
                    {{ track.icon }}
                  </span>
                  <div>
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-100">
                      {{ track.label }}
                    </h2>
                    <p class="text-sm text-slate-500 dark:text-slate-500">{{ track.tagline }}</p>
                  </div>
                </div>

                <p class="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {{ track.roadmap.description }}
                </p>

                <div class="mb-4 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-500">
                  <span>{{ track.roadmap.totalWeeks }} tuần</span>
                  <span>·</span>
                  <span>{{ totalTopics(track.id) }} chủ đề</span>
                  <span>·</span>
                  <span>{{ track.roadmap.phases.length }} giai đoạn</span>
                </div>

                <div class="mb-1 flex justify-between text-sm">
                  <span class="text-slate-500 dark:text-slate-400">Tiến độ của bạn</span>
                  <span class="font-medium text-slate-900 dark:text-white">{{ progress.overallProgress(track.id) }}%</span>
                </div>
                <div class="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    class="h-full rounded-full bg-gradient-to-r transition-all duration-500"
                    [class]="track.accentFrom + ' ' + track.accentTo"
                    [style.width.%]="progress.overallProgress(track.id)"
                  ></div>
                </div>

                <p class="mt-4 text-sm font-medium text-slate-900 dark:text-white transition group-hover:translate-x-1">
                  Vào lộ trình →
                </p>
              </div>
            </a>
          }
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2">
          <div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-6 shadow-sm">
            <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Full-stack?</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Học song song cả hai lộ trình: Angular cho UI, .NET cho API. Tiến độ được lưu riêng cho
              từng track trong trình duyệt.
            </p>
          </div>
          <a
            routerLink="/about"
            class="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-6 transition hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md"
          >
            <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-100">
              Lịch sử & so sánh lộ trình
            </h3>
            <p class="mb-3 text-sm text-slate-600 dark:text-slate-400">
              Xem lịch sử phát triển Angular & .NET, so sánh và chi tiết về dự án.
            </p>
            <p class="text-sm font-medium text-violet-600 dark:text-violet-400 transition group-hover:translate-x-1">
              Về dự án · v{{ meta.version }} →
            </p>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HubComponent {
  protected readonly meta = APP_META;
  protected readonly tracks = TRACK_LIST;
  protected readonly progress = inject(ProgressService);
  private readonly roadmaps = inject(RoadmapService);

  protected totalTopics(trackId: (typeof TRACK_LIST)[number]['id']): number {
    return this.roadmaps.totalTopics(trackId);
  }
}
