import { Roadmap } from './roadmap.model';
import { ANGULAR_ROADMAP } from '../data/roadmap.data';
import { DOTNET_ROADMAP } from '../data/dotnet-roadmap.data';
import { DOCS_ROADMAP } from '../data/docs-roadmap.data';

export type RoadmapTrack = 'angular' | 'dotnet' | 'docs';

export interface TrackInfo {
  id: RoadmapTrack;
  label: string;
  shortLabel: string;
  tagline: string;
  icon: string;
  accentFrom: string;
  accentTo: string;
  docsUrl: string;
  roadmap: Roadmap;
}

export const TRACKS: Record<RoadmapTrack, TrackInfo> = {
  angular: {
    id: 'angular',
    label: 'Angular Roadmap',
    shortLabel: 'Angular',
    tagline: 'Frontend · SPA · TypeScript',
    icon: 'A',
    accentFrom: 'from-red-500',
    accentTo: 'to-violet-500',
    docsUrl: 'https://angular.dev',
    roadmap: ANGULAR_ROADMAP,
  },
  dotnet: {
    id: 'dotnet',
    label: '.NET Roadmap',
    shortLabel: '.NET',
    tagline: 'Backend · C# · ASP.NET Core',
    icon: 'N',
    accentFrom: 'from-violet-500',
    accentTo: 'to-sky-500',
    docsUrl: 'https://learn.microsoft.com/dotnet',
    roadmap: DOTNET_ROADMAP,
  },
  docs: {
    id: 'docs',
    label: 'Technical Docs',
    shortLabel: 'Docs',
    tagline: 'Deep Dives · Reference · Architecture',
    icon: '📚',
    accentFrom: 'from-emerald-500',
    accentTo: 'to-cyan-500',
    docsUrl: '/',
    roadmap: DOCS_ROADMAP,
  },
};

export const TRACK_LIST: TrackInfo[] = [TRACKS.angular, TRACKS.dotnet, TRACKS.docs];

export function isRoadmapTrack(value: string): value is RoadmapTrack {
  return value === 'angular' || value === 'dotnet' || value === 'docs';
}
