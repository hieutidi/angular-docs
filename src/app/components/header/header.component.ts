import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { isRoadmapTrack, RoadmapTrack, TRACKS, TRACK_LIST } from '../../models/track.model';
import { ProgressService } from '../../services/progress.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a routerLink="/" class="group flex items-center gap-2.5">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white shadow-lg"
            [class]="brandGradient()"
            >{{ brandIcon() }}</span
          >
          <div class="leading-tight">
            <span
              class="block text-sm font-semibold text-white transition-colors"
              [class]="brandHover()"
              >{{ brandTitle() }}</span
            >
            <span class="hidden text-xs text-slate-500 sm:block">{{ brandSubtitle() }}</span>
          </div>
        </a>

        <nav class="flex items-center gap-1 sm:gap-2">
          <a
            routerLink="/"
            routerLinkActive="bg-slate-800 text-white"
            [routerLinkActiveOptions]="{ exact: true }"
            class="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
            >Hub</a
          >
          @for (t of roadmapTracks; track t.id) {
            <a
              [routerLink]="['/', t.id]"
              routerLinkActive="bg-slate-800 text-white"
              class="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
              >{{ t.shortLabel }}</a
            >
          }

          <!-- Docs Dropdown -->
          <div class="group relative">
            <button
              class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
              [class.bg-slate-800]="isDocsActive()"
              [class.text-white]="isDocsActive()"
            >
              Docs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4 opacity-50 group-hover:opacity-100"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              class="absolute right-0 top-full hidden w-56 pt-1 group-hover:block sm:left-0 sm:right-auto"
            >
              <div
                class="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-1.5 shadow-2xl"
              >
                @if (docsTrack; as t) {
                  <a
                    [routerLink]="['/', t.id]"
                    class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
                  >
                    <span class="text-base">{{ t.icon }}</span>
                    <span>Thư viện tài liệu</span>
                  </a>
                  <div class="my-1 border-t border-slate-800"></div>
                }
                @for (t of roadmapTracks; track t.id) {
                  <a
                    [href]="t.docsUrl"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
                  >
                    <div class="flex items-center gap-2.5">
                      <span class="text-xs font-bold">{{ t.icon }}</span>
                      <span>{{ t.shortLabel }} Official</span>
                    </div>
                    <span class="text-[10px] opacity-40">↗</span>
                  </a>
                }
              </div>
            </div>
          </div>

          <a
            routerLink="/about"
            routerLinkActive="bg-slate-800 text-white"
            class="hidden rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white sm:block"
            >Về dự án</a
          >
        </nav>

        <div class="flex items-center gap-3">
          @if (activeTrack(); as current) {
            <div class="hidden text-right sm:block">
              <p class="text-xs text-slate-500">Tiến độ</p>
              <p class="text-sm font-semibold text-white">
                {{ progress.overallProgress(current.id) }}%
              </p>
            </div>
            <div class="h-2 w-16 overflow-hidden rounded-full bg-slate-800 sm:w-24">
              <div
                class="h-full rounded-full bg-gradient-to-r transition-all duration-500"
                [class]="current.accentFrom + ' ' + current.accentTo"
                [style.width.%]="progress.overallProgress(current.id)"
              ></div>
            </div>
          }
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly tracks = TRACK_LIST;
  protected readonly roadmapTracks = TRACK_LIST.filter((t) => t.id !== 'docs');
  protected readonly docsTrack = TRACK_LIST.find((t) => t.id === 'docs');

  protected readonly progress = inject(ProgressService);

  private readonly router = inject(Router);

  private readonly urlTrack = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.extractTrack(this.router.url)),
    ),
    { initialValue: this.extractTrack(this.router.url) },
  );

  protected readonly activeTrack = computed(() => {
    const track = this.urlTrack();
    return track ? TRACKS[track] : null;
  });

  protected isDocsActive(): boolean {
    return this.router.url.startsWith('/docs');
  }

  protected brandTitle(): string {
    return this.activeTrack()?.label ?? 'Dev Roadmaps';
  }

  protected brandSubtitle(): string {
    return this.activeTrack()?.tagline ?? 'Angular · .NET';
  }

  protected brandIcon(): string {
    return this.activeTrack()?.icon ?? 'D';
  }

  protected brandGradient(): string {
    const track = this.activeTrack();
    if (!track) return 'from-slate-600 to-slate-800 shadow-slate-500/20';
    return `${track.accentFrom} ${track.accentTo} shadow-violet-500/20`;
  }

  protected brandHover(): string {
    const track = this.activeTrack();
    if (!track) return 'group-hover:text-slate-300';
    if (track.id === 'dotnet') return 'group-hover:text-violet-400';
    if (track.id === 'react') return 'group-hover:text-blue-400';
    return 'group-hover:text-red-400';
  }

  private extractTrack(url: string): RoadmapTrack | null {
    const segment = url.split('/').filter(Boolean)[0];
    return segment && isRoadmapTrack(segment) ? segment : null;
  }
}
