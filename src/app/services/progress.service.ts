import { Injectable, signal } from '@angular/core';
import { RoadmapTrack } from '../models/track.model';
import { RoadmapService } from './roadmap.service';

const STORAGE_KEY = 'dev-roadmap-progress';
const QUIZ_STORAGE_KEY = 'dev-roadmap-quizzes';
const CODE_STORAGE_KEY = 'dev-roadmap-code-labs';
const LEGACY_PROGRESS_KEY = 'angular-roadmap-progress';
const LEGACY_QUIZ_KEY = 'angular-roadmap-quizzes';

type ProgressStore = Record<RoadmapTrack, string[]>;

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly completedByTrack = signal<ProgressStore>(this.loadProgressStore());
  private readonly quizzesByTrack = signal<ProgressStore>(this.loadQuizStore());
  private readonly codeLabsByTrack = signal<ProgressStore>(this.loadCodeLabStore());

  constructor(private readonly roadmaps: RoadmapService) {}

  totalTopics(track: RoadmapTrack): number {
    return this.roadmaps.totalTopics(track);
  }

  completedCount(track: RoadmapTrack): number {
    return this.completedByTrack()[track]?.length ?? 0;
  }

  overallProgress(track: RoadmapTrack): number {
    const total = this.totalTopics(track);
    if (total === 0) return 0;
    return Math.round((this.completedCount(track) / total) * 100);
  }

  isCompleted(track: RoadmapTrack, topicId: string): boolean {
    return this.completedByTrack()[track]?.includes(topicId) ?? false;
  }

  isQuizPassed(track: RoadmapTrack, quizId: string): boolean {
    return this.quizzesByTrack()[track]?.includes(quizId) ?? false;
  }

  markQuizPassed(track: RoadmapTrack, quizId: string): void {
    this.quizzesByTrack.update((store) => {
      const next = { ...store, [track]: [...new Set([...(store[track] ?? []), quizId])] };
      this.saveStore(QUIZ_STORAGE_KEY, next);
      return next;
    });
  }

  isCodeLabPassed(track: RoadmapTrack, exerciseId: string): boolean {
    return this.codeLabsByTrack()[track]?.includes(exerciseId) ?? false;
  }

  markCodeLabPassed(track: RoadmapTrack, exerciseId: string): void {
    this.codeLabsByTrack.update((store) => {
      const next = { ...store, [track]: [...new Set([...(store[track] ?? []), exerciseId])] };
      this.saveStore(CODE_STORAGE_KEY, next);
      return next;
    });
  }

  toggleTopic(track: RoadmapTrack, topicId: string): void {
    this.completedByTrack.update((store) => {
      const current = new Set(store[track] ?? []);
      if (current.has(topicId)) {
        current.delete(topicId);
      } else {
        current.add(topicId);
      }
      const next = { ...store, [track]: [...current] };
      this.saveStore(STORAGE_KEY, next);
      return next;
    });
  }

  phaseProgress(track: RoadmapTrack, phaseId: string): number {
    const phase = this.roadmaps.getRoadmap(track).phases.find((p) => p.id === phaseId);
    if (!phase || phase.topics.length === 0) return 0;
    const done = phase.topics.filter((t) => this.isCompleted(track, t.id)).length;
    return Math.round((done / phase.topics.length) * 100);
  }

  resetProgress(track?: RoadmapTrack): void {
    if (track) {
      this.completedByTrack.update((store) => {
        const next = { ...store, [track]: [] };
        this.saveStore(STORAGE_KEY, next);
        return next;
      });
      this.quizzesByTrack.update((store) => {
        const next = { ...store, [track]: [] };
        this.saveStore(QUIZ_STORAGE_KEY, next);
        return next;
      });
      this.codeLabsByTrack.update((store) => {
        const next = { ...store, [track]: [] };
        this.saveStore(CODE_STORAGE_KEY, next);
        return next;
      });
      return;
    }

    this.completedByTrack.set({ angular: [], dotnet: [], docs: [] });
    this.quizzesByTrack.set({ angular: [], dotnet: [], docs: [] });
    this.codeLabsByTrack.set({ angular: [], dotnet: [], docs: [] });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
    localStorage.removeItem(CODE_STORAGE_KEY);
    localStorage.removeItem(LEGACY_PROGRESS_KEY);
    localStorage.removeItem(LEGACY_QUIZ_KEY);
  }

  private loadProgressStore(): ProgressStore {
    return this.loadStore(STORAGE_KEY, LEGACY_PROGRESS_KEY);
  }

  private loadQuizStore(): ProgressStore {
    return this.loadStore(QUIZ_STORAGE_KEY, LEGACY_QUIZ_KEY);
  }

  private loadCodeLabStore(): ProgressStore {
    return this.loadStore(CODE_STORAGE_KEY, '');
  }

  private loadStore(key: string, legacyKey: string): ProgressStore {
    const empty: ProgressStore = { angular: [], dotnet: [], docs: [] };
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ProgressStore>;
        return {
          angular: parsed.angular ?? [],
          dotnet: parsed.dotnet ?? [],
          docs: parsed.docs ?? [],
        };
      }

      if (legacyKey) {
        const legacy = localStorage.getItem(legacyKey);
        if (legacy) {
          const ids: string[] = JSON.parse(legacy);
          return { ...empty, angular: ids };
        }
      }
    } catch {
      return empty;
    }
    return empty;
  }

  private saveStore(key: string, store: ProgressStore): void {
    localStorage.setItem(key, JSON.stringify(store));
  }
}
