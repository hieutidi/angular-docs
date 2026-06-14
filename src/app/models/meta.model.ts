import { RoadmapTrack } from './track.model';

export type ChangeType = 'feature' | 'improvement' | 'fix' | 'breaking';

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  summary: string;
  changes: {
    type: ChangeType;
    text: string;
    tracks?: RoadmapTrack[];
  }[];
}

export interface TrackComparisonRow {
  aspect: string;
  angular: string;
  react: string;
  dotnet: string;
}

export interface AppMeta {
  name: string;
  version: string;
  tagline: string;
  description: string;
  techStack: string[];
  startedAt: string;
}

export interface TechHistoryEntry {
  era: string;
  period: string;
  title: string;
  description: string;
  milestones: string[];
}

export interface TechHistory {
  angular: TechHistoryEntry[];
  dotnet: TechHistoryEntry[];
}
