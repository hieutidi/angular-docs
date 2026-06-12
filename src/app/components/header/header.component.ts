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
          @for (t of tracks; track t.id) {
            <a
              [routerLink]="['/', t.id]"
              routerLinkActive="bg-slate-800 text-white"
              class="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
              >{{ t.shortLabel }}</a
            >
          }
          <a
            routerLink="/about"
            routerLinkActive="bg-slate-800 text-white"
            class="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
            >Về dự án</a
          >
          @if (activeTrack(); as current) {
            <a
              [href]="current.docsUrl"
              target="_blank"
              rel="noopener"
              class="hidden rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white sm:block"
              >Docs ↗</a
            >
          }
        </nav>

        <div class="flex items-center gap-3">
          @if (activeTrack(); as current) {
            <div class="hidden text-right sm:block">
              <p class="text-xs text-slate-500">Tiến độ</p>
              <p class="text-sm font-semibold text-white">{{ progress.overallProgress(current.id) }}%</p>
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
    return track.id === 'dotnet' ? 'group-hover:text-violet-400' : 'group-hover:text-red-400';
  }

  private extractTrack(url: string): RoadmapTrack | null {
    const segment = url.split('/').filter(Boolean)[0];
    return segment && isRoadmapTrack(segment) ? segment : null;
  }
}
