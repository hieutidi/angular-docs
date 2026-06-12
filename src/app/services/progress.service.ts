import { Injectable, computed, signal } from '@angular/core';
import { ANGULAR_ROADMAP } from '../data/roadmap.data';

const STORAGE_KEY = 'angular-roadmap-progress';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly completedTopics = signal<Set<string>>(this.loadFromStorage());

  readonly totalTopics = ANGULAR_ROADMAP.phases.reduce(
    (sum, phase) => sum + phase.topics.length,
    0,
  );

  readonly completedCount = computed(() => this.completedTopics().size);

  readonly overallProgress = computed(() =>
    this.totalTopics === 0
      ? 0
      : Math.round((this.completedCount() / this.totalTopics) * 100),
  );

  isCompleted(topicId: string): boolean {
    return this.completedTopics().has(topicId);
  }

  toggleTopic(topicId: string): void {
    this.completedTopics.update((set) => {
      const next = new Set(set);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      this.saveToStorage(next);
      return next;
    });
  }

  phaseProgress(phaseId: string): number {
    const phase = ANGULAR_ROADMAP.phases.find((p) => p.id === phaseId);
    if (!phase || phase.topics.length === 0) return 0;
    const done = phase.topics.filter((t) => this.isCompleted(t.id)).length;
    return Math.round((done / phase.topics.length) * 100);
  }

  resetProgress(): void {
    this.completedTopics.set(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadFromStorage(): Set<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const ids: string[] = JSON.parse(raw);
      return new Set(ids);
    } catch {
      return new Set();
    }
  }

  private saveToStorage(set: Set<string>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  }
}
