import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoadmapTrack } from '../../models/track.model';
import { Topic } from '../../models/roadmap.model';

const LEVEL_LABELS: Record<Topic['level'], string> = {
  beginner: 'Cơ bản',
  intermediate: 'Trung cấp',
  advanced: 'Nâng cao',
};

const LEVEL_STYLES: Record<Topic['level'], string> = {
  beginner: 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-500/30',
  intermediate: 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-amber-200 dark:ring-amber-500/30',
  advanced: 'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 ring-rose-200 dark:ring-rose-500/30',
};

@Component({
  selector: 'app-topic-card',
  imports: [RouterLink],
  template: `
    <article
      class="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 transition hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm"
      [class.ring-1]="completed()"
      [class.ring-emerald-500/40]="completed()"
      [class.border-emerald-300]="completed()"
      [class.dark:border-emerald-800/50]="completed()"
    >
      <div class="flex items-start gap-3">
        <button
          type="button"
          (click)="toggle.emit()"
          [attr.aria-label]="completed() ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'"
          class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition"
          [class]="
            completed()
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-400'
          "
        >
          @if (completed()) {
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          }
        </button>

        <div class="min-w-0 flex-1">
          <div class="mb-1 flex flex-wrap items-center gap-2">
            <a
              [routerLink]="['/', track(), 'phase', phaseId(), 'topic', topic().id]"
              class="font-medium text-slate-900 dark:text-white transition"
              [class]="linkHover()"
              [class.line-through]="completed()"
              [class.text-slate-400]="completed()"
              [class.dark:text-slate-500]="completed()"
            >
              {{ topic().title }}
            </a>
            @if (featured()) {
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-medium"
                [class]="featuredBadge()"
              >
                {{ featuredLabel() }}
              </span>
            }
            <span
              class="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ring-1 ring-inset"
              [class]="levelStyle()"
            >
              {{ levelLabel() }}
            </span>
            <span class="text-xs text-slate-500">{{ topic().duration }}</span>
          </div>
          <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ topic().description }}</p>

          <a
            [routerLink]="['/', track(), 'phase', phaseId(), 'topic', topic().id]"
            class="mt-2 inline-flex text-xs hover:underline"
            [class]="linkAccent()"
          >
            Đọc tài liệu →
          </a>

          @if (topic().resources.length > 0) {
            <div class="mt-3 flex flex-wrap gap-2">
              @for (res of topic().resources; track res.url) {
                <a
                  [href]="res.url"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 transition hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                >
                  {{ res.label }}
                  <span class="text-slate-400 dark:text-slate-500">↗</span>
                </a>
              }
            </div>
          }
        </div>
      </div>
    </article>
  `,
})
export class TopicCardComponent {
  readonly topic = input.required<Topic>();
  readonly track = input.required<RoadmapTrack>();
  readonly phaseId = input.required<string>();
  readonly completed = input(false);
  readonly featured = input(false);
  readonly toggle = output<void>();

  protected readonly levelLabel = computed(() => LEVEL_LABELS[this.topic().level]);

  protected readonly levelStyle = computed(() => LEVEL_STYLES[this.topic().level]);

  protected readonly linkHover = computed(() =>
    this.track() === 'dotnet' ? 'hover:text-violet-600 dark:hover:text-violet-400' : 'hover:text-red-600 dark:hover:text-red-400',
  );

  protected readonly linkAccent = computed(() =>
    this.track() === 'dotnet' ? 'text-violet-600 dark:text-violet-400' : 'text-red-600 dark:text-red-400',
  );

  protected readonly featuredBadge = computed(() => {
    if (
      (this.track() === 'angular' && this.topic().id === 'components') ||
      (this.track() === 'dotnet' && this.topic().id === 'webapi-basics')
    ) {
      return 'bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400';
    }
    return 'bg-sky-100 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400';
  });

  protected readonly featuredLabel = computed(() => {
    if (
      (this.track() === 'angular' && this.topic().id === 'components') ||
      (this.track() === 'dotnet' && this.topic().id === 'webapi-basics')
    ) {
      return 'IDE + quiz';
    }
    return 'bài học chi tiết';
  });
}
