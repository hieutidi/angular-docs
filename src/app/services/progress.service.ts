import { Injectable, computed, signal } from '@angular/core';
import { ANGULAR_ROADMAP } from '../data/roadmap.data';

const STORAGE_KEY = 'angular-roadmap-progress';
const QUIZ_STORAGE_KEY = 'angular-roadmap-quizzes';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly completedTopics = signal<Set<string>>(this.loadFromStorage(STORAGE_KEY));
  private readonly passedQuizzes = signal<Set<string>>(this.loadFromStorage(QUIZ_STORAGE_KEY));

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

  isQuizPassed(quizId: string): boolean {
    return this.passedQuizzes().has(quizId);
  }

  markQuizPassed(quizId: string): void {
    this.passedQuizzes.update((set) => {
      const next = new Set(set);
      next.add(quizId);
      this.saveToStorage(QUIZ_STORAGE_KEY, next);
      return next;
    });
  }

  toggleTopic(topicId: string): void {
    this.completedTopics.update((set) => {
      const next = new Set(set);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      this.saveToStorage(STORAGE_KEY, next);
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
    this.passedQuizzes.set(new Set());
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  }

  private loadFromStorage(key: string): Set<string> {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return new Set();
      const ids: string[] = JSON.parse(raw);
      return new Set(ids);
    } catch {
      return new Set();
    }
  }

  private saveToStorage(key: string, set: Set<string>): void {
    localStorage.setItem(key, JSON.stringify([...set]));
  }
}
