import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs';
import { isRoadmapTrack, RoadmapTrack, TRACKS, TRACK_LIST } from '../../models/track.model';
import { ProgressService } from '../../services/progress.service';
import { ThemeService } from '../../services/theme.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-300">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a routerLink="/" class="group flex items-center gap-2.5">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white shadow-lg"
            [class]="brandGradient()"
            >{{ brandIcon() }}</span
          >
          <div class="leading-tight">
            <span
              class="block text-sm font-semibold text-slate-900 dark:text-white transition-colors"
              [class]="brandHover()"
              >{{ brandTitle() }}</span
            >
            <span class="hidden text-xs text-slate-500 dark:text-slate-500 sm:block">{{ brandSubtitle() }}</span>
          </div>
        </a>

        <nav class="hidden items-center gap-1 md:flex lg:gap-2">
          <a
            routerLink="/"
            routerLinkActive="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
            [routerLinkActiveOptions]="{ exact: true }"
            class="rounded-lg px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
            >Hub</a
          >
          @for (t of roadmapTracks; track t.id) {
            <a
              [routerLink]="['/', t.id]"
              routerLinkActive="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
              class="rounded-lg px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              >{{ t.shortLabel }}</a
            >
          }

          <!-- Docs Dropdown -->
          <div class="group relative">
            <button
              class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              [class.bg-slate-100]="isDocsActive()"
              [class.dark:bg-slate-800]="isDocsActive()"
              [class.text-slate-900]="isDocsActive()"
              [class.dark:text-white]="isDocsActive()"
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
                class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1.5 shadow-2xl"
              >
                @if (docsTrack; as t) {
                  <a
                    [routerLink]="['/', t.id]"
                    class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                  >
                    <span class="text-base">{{ t.icon }}</span>
                    <span>Thư viện tài liệu</span>
                  </a>
                  <div class="my-1 border-t border-slate-100 dark:border-slate-800"></div>
                }
                @for (t of roadmapTracks; track t.id) {
                  <a
                    [href]="t.docsUrl"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
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
            routerLinkActive="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
            class="hidden rounded-lg px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white sm:block"
            >Về dự án</a
          >
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Theme Toggle -->
          <button
            (click)="theme.toggleTheme()"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 transition hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white"
            [title]="theme.theme() === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'"
          >
            @if (theme.theme() === 'light') {
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            } @else {
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          </button>

          @if (activeTrack(); as current) {
            <div class="hidden text-right sm:block">
              <p class="text-xs text-slate-500">Tiến độ</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ progress.overallProgress(current.id) }}%
              </p>
            </div>
            <div class="hidden h-2 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 sm:block sm:w-24">
              <div
                class="h-full rounded-full bg-gradient-to-r transition-all duration-500"
                [class]="current.accentFrom + ' ' + current.accentTo"
                [style.width.%]="progress.overallProgress(current.id)"
              ></div>
            </div>
          }

          <!-- Mobile Menu Button -->
          <button
            (click)="isMobileMenuOpen.update(v => !v)"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 transition hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      @if (isMobileMenuOpen()) {
        <div class="border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 py-4 md:hidden">
          <nav class="flex flex-col gap-2">
            <a
              routerLink="/"
              routerLinkActive="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
              [routerLinkActiveOptions]="{ exact: true }"
              (click)="isMobileMenuOpen.set(false)"
              class="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
            >
              Hub
            </a>
            @for (t of roadmapTracks; track t.id) {
              <a
                [routerLink]="['/', t.id]"
                routerLinkActive="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                (click)="isMobileMenuOpen.set(false)"
                class="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              >
                {{ t.label }}
              </a>
            }
            @if (docsTrack; as t) {
              <a
                [routerLink]="['/', t.id]"
                routerLinkActive="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                (click)="isMobileMenuOpen.set(false)"
                class="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              >
                Docs (Tài liệu)
              </a>
            }
            <a
              routerLink="/about"
              routerLinkActive="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
              (click)="isMobileMenuOpen.set(false)"
              class="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
            >
              Về dự án
            </a>
          </nav>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly theme = inject(ThemeService);
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

  protected readonly isDocsActive = computed(() => this.router.url.startsWith('/docs'));

  protected readonly brandTitle = computed(() => this.activeTrack()?.label ?? 'Dev Roadmaps');

  protected readonly brandSubtitle = computed(() => this.activeTrack()?.tagline ?? 'Angular · .NET');

  protected readonly brandIcon = computed(() => this.activeTrack()?.icon ?? 'D');

  protected readonly brandGradient = computed(() => {
    const track = this.activeTrack();
    if (!track) return 'from-slate-600 to-slate-800 shadow-slate-500/20';
    return `${track.accentFrom} ${track.accentTo} shadow-violet-500/20`;
  });

  protected readonly brandHover = computed(() => {
    const track = this.activeTrack();
    if (!track) return 'group-hover:text-slate-600 dark:group-hover:text-slate-300';
    if (track.id === 'dotnet') return 'group-hover:text-violet-600 dark:group-hover:text-violet-400';
    if (track.id === 'react') return 'group-hover:text-blue-600 dark:group-hover:text-blue-400';
    return 'group-hover:text-red-600 dark:group-hover:text-red-400';
  });

  private extractTrack(url: string): RoadmapTrack | null {
    const segment = url.split('/').filter(Boolean)[0];
    return segment && isRoadmapTrack(segment) ? segment : null;
  }
}
