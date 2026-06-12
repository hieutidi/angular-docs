import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a routerLink="/" class="group flex items-center gap-2.5">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 via-fuchsia-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-red-500/20"
            >A</span
          >
          <div class="leading-tight">
            <span class="block text-sm font-semibold text-white group-hover:text-red-400 transition-colors"
              >Angular Roadmap</span
            >
            <span class="hidden text-xs text-slate-500 sm:block">Lộ trình học từ A → Z</span>
          </div>
        </a>

        <nav class="flex items-center gap-1 sm:gap-2">
          <a
            routerLink="/"
            routerLinkActive="bg-slate-800 text-white"
            [routerLinkActiveOptions]="{ exact: true }"
            class="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
            >Tổng quan</a
          >
          <a
            href="https://angular.dev"
            target="_blank"
            rel="noopener"
            class="hidden rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-slate-800/60 hover:text-white sm:block"
            >angular.dev ↗</a
          >
        </nav>

        <div class="flex items-center gap-3">
          <div class="hidden text-right sm:block">
            <p class="text-xs text-slate-500">Tiến độ</p>
            <p class="text-sm font-semibold text-white">{{ progress.overallProgress() }}%</p>
          </div>
          <div class="h-2 w-16 overflow-hidden rounded-full bg-slate-800 sm:w-24">
            <div
              class="h-full rounded-full bg-gradient-to-r from-red-500 to-violet-500 transition-all duration-500"
              [style.width.%]="progress.overallProgress()"
            ></div>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly progress = inject(ProgressService);
}
