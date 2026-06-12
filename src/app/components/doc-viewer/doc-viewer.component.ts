import { Component, input } from '@angular/core';
import { TopicLesson } from '../../models/content.model';

@Component({
  selector: 'app-doc-viewer',
  template: `
    <article class="space-y-6">
      <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <h2 class="mb-2 text-lg font-semibold text-white">Tóm tắt</h2>
        <p class="text-sm leading-relaxed text-slate-300">{{ lesson().summary }}</p>
      </div>

      <div class="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <h2 class="mb-3 text-lg font-semibold text-white">Mục tiêu học</h2>
        <ul class="space-y-2">
          @for (obj of lesson().objectives; track obj) {
            <li class="flex gap-2 text-sm text-slate-300">
              <span class="text-emerald-400">✓</span>
              {{ obj }}
            </li>
          }
        </ul>
      </div>

      @for (section of lesson().sections; track section.id) {
        <section class="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
          <h3 class="mb-2 text-base font-semibold text-white">{{ section.title }}</h3>
          <p class="text-sm leading-relaxed text-slate-300">{{ section.content }}</p>
          @if (section.code) {
            <pre
              class="mt-4 overflow-x-auto rounded-lg border border-slate-700 bg-slate-950 p-4 text-xs leading-relaxed text-emerald-300"
            ><code>{{ section.code }}</code></pre>
          }
        </section>
      }

      @if (lesson().practice) {
        <div class="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
          <h2 class="mb-2 text-lg font-semibold text-amber-400">Bài tập thực hành</h2>
          <p class="text-sm leading-relaxed text-slate-300">{{ lesson().practice }}</p>
        </div>
      }
    </article>
  `,
})
export class DocViewerComponent {
  readonly lesson = input.required<TopicLesson>();
}
