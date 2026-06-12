import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_META } from '../../data/meta/app-meta.data';
import { TECH_HISTORY } from '../../data/meta/tech-history.data';
import {
  TRACK_COMPARISON,
  TRACK_DIFFERENCES_SUMMARY,
} from '../../data/meta/track-comparison.data';
import { TRACK_LIST } from '../../models/track.model';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-slate-950 to-slate-950"
      ></div>
      <div class="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <!-- Hero -->
        <div class="mb-12 text-center">
          <p
            class="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-400"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
            v{{ meta.version }} · {{ meta.startedAt }}–nay
          </p>
          <h1 class="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Về {{ meta.name }}
          </h1>
          <p class="mx-auto max-w-2xl text-base text-slate-400">
            {{ meta.description }}
          </p>
        </div>

        <!-- Overview -->
        <div class="mb-12 grid gap-6 sm:grid-cols-2">
          <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 class="mb-3 text-lg font-semibold text-white">Tổng quan</h2>
            <p class="mb-4 text-sm leading-relaxed text-slate-400">{{ meta.tagline }}</p>
            <ul class="space-y-2 text-sm text-slate-400">
              @for (item of meta.techStack; track item) {
                <li class="flex gap-2">
                  <span class="text-violet-400">·</span>
                  {{ item }}
                </li>
              }
            </ul>
          </div>
          <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 class="mb-3 text-lg font-semibold text-white">Hai lộ trình hiện có</h2>
            <div class="space-y-4">
              @for (track of tracks; track track.id) {
                <a
                  [routerLink]="['/', track.id]"
                  class="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3 transition hover:border-slate-700"
                >
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white"
                    [class]="track.accentFrom + ' ' + track.accentTo"
                  >
                    {{ track.icon }}
                  </span>
                  <div class="min-w-0">
                    <p class="font-medium text-white group-hover:text-slate-100">{{ track.label }}</p>
                    <p class="truncate text-xs text-slate-500">{{ track.tagline }}</p>
                  </div>
                  <span class="ml-auto text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white"
                    >→</span
                  >
                </a>
              }
            </div>
          </div>
        </div>

        <!-- Track comparison -->
        <div class="mb-20">
          <h2 class="mb-2 text-2xl font-bold text-white">So sánh Angular vs .NET</h2>
          <p class="mb-6 text-sm text-slate-400">
            Hai track bổ sung cho nhau trong kiến trúc full-stack — khác về công nghệ nhưng cùng cấu trúc học.
          </p>

          <ul class="mb-6 space-y-2 text-sm text-slate-400">
            @for (note of diffSummary; track $index) {
              <li class="flex gap-2">
                <span class="text-violet-400">{{ $index + 1 }}.</span>
                {{ note }}
              </li>
            }
          </ul>

          <div class="overflow-x-auto rounded-2xl border border-slate-800">
            <table class="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-900/80">
                  <th class="px-4 py-3 font-medium text-slate-300">Khía cạnh</th>
                  <th class="px-4 py-3 font-medium text-red-400">Angular</th>
                  <th class="px-4 py-3 font-medium text-violet-400">.NET</th>
                </tr>
              </thead>
              <tbody>
                @for (row of comparison; track row.aspect) {
                  <tr class="border-b border-slate-800/80 last:border-0">
                    <td class="px-4 py-3 font-medium text-slate-300">{{ row.aspect }}</td>
                    <td class="px-4 py-3 text-slate-400">{{ row.angular }}</td>
                    <td class="px-4 py-3 text-slate-400">{{ row.dotnet }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tech History -->
        <div class="space-y-16">
          <!-- Angular History -->
          <div>
            <div class="mb-8 flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-2xl">🅰️</div>
              <div>
                <h2 class="text-2xl font-bold text-white">Lịch sử Angular</h2>
                <p class="text-sm text-slate-400">Sự tiến hóa từ framework template đến kỷ nguyên Signals.</p>
              </div>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              @for (item of history.angular; track item.era) {
                <div class="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-red-500/30">
                  <div class="mb-3 flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-red-400">{{ item.era }}</span>
                    <span class="text-xs text-slate-500">{{ item.period }}</span>
                  </div>
                  <h3 class="mb-2 text-lg font-bold text-white group-hover:text-red-400 transition-colors">{{ item.title }}</h3>
                  <p class="mb-4 text-xs leading-relaxed text-slate-400">{{ item.description }}</p>
                  <ul class="space-y-2">
                    @for (ms of item.milestones; track ms) {
                      <li class="flex items-start gap-2 text-[11px] text-slate-500">
                        <span class="mt-1 h-1 w-1 shrink-0 rounded-full bg-slate-700"></span>
                        {{ ms }}
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>
          </div>

          <!-- .NET History -->
          <div>
            <div class="mb-8 flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">💎</div>
              <div>
                <h2 class="text-2xl font-bold text-white">Lịch sử .NET</h2>
                <p class="text-sm text-slate-400">Từ nền tảng Windows đến hệ sinh thái mã nguồn mở, đa nền tảng.</p>
              </div>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              @for (item of history.dotnet; track item.era) {
                <div class="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-violet-500/30">
                  <div class="mb-3 flex items-center justify-between">
                    <span class="text-xs font-bold uppercase tracking-wider text-violet-400">{{ item.era }}</span>
                    <span class="text-xs text-slate-500">{{ item.period }}</span>
                  </div>
                  <h3 class="mb-2 text-lg font-bold text-white group-hover:text-violet-400 transition-colors">{{ item.title }}</h3>
                  <p class="mb-4 text-xs leading-relaxed text-slate-400">{{ item.description }}</p>
                  <ul class="space-y-2">
                    @for (ms of item.milestones; track ms) {
                      <li class="flex items-start gap-2 text-[11px] text-slate-500">
                        <span class="mt-1 h-1 w-1 shrink-0 rounded-full bg-slate-700"></span>
                        {{ ms }}
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="mt-16 text-center">
          <a
            routerLink="/"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:border-slate-600 hover:bg-slate-800"
          >
            ← Về Hub chọn lộ trình
          </a>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected readonly meta = APP_META;
  protected readonly history = TECH_HISTORY;
  protected readonly comparison = TRACK_COMPARISON;
  protected readonly diffSummary = TRACK_DIFFERENCES_SUMMARY;
  protected readonly tracks = TRACK_LIST;
}
