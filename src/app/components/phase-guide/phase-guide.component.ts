import { Component, input } from '@angular/core';
import { PhaseGuide } from '../../models/content.model';

@Component({
  selector: 'app-phase-guide',
  template: `
    <div class="mb-8 space-y-4 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6">
      <h2 class="text-lg font-semibold text-white">📖 Tài liệu giai đoạn</h2>
      <p class="text-sm leading-relaxed text-slate-300">{{ guide().overview }}</p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 class="mb-2 text-sm font-medium text-emerald-400">Mục tiêu</h3>
          <ul class="space-y-1.5">
            @for (goal of guide().goals; track goal) {
              <li class="text-sm text-slate-400">• {{ goal }}</li>
            }
          </ul>
        </div>
        <div>
          <h3 class="mb-2 text-sm font-medium text-amber-400">Mẹo học</h3>
          <ul class="space-y-1.5">
            @for (tip of guide().tips; track tip) {
              <li class="text-sm text-slate-400">• {{ tip }}</li>
            }
          </ul>
        </div>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium text-violet-400">Checklist hoàn thành</h3>
        <ul class="space-y-1.5">
          @for (item of guide().checklist; track item) {
            <li class="flex gap-2 text-sm text-slate-400">
              <span class="text-slate-600">☐</span>
              {{ item }}
            </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class PhaseGuideComponent {
  readonly guide = input.required<PhaseGuide>();
}
