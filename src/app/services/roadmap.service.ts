import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { PHASE_GUIDES } from '../data/phase-docs.data';
import { DOTNET_PHASE_GUIDES } from '../data/dotnet-phase-docs.data';
import { DOCS_PHASE_GUIDES } from '../data/docs-phase-docs.data';
import { REACT_PHASE_GUIDES } from '../data/react-phase-docs.data';
import { getTopicLesson, hasQuizzes } from '../data/topic-docs';
import { COMPONENTS_QUIZZES } from '../data/topic-docs/components.quizzes';
import {
  dotnetHasFeaturedLesson,
  dotnetHasQuizzes,
  getDotnetTopicLesson,
} from '../data/dotnet-topic-docs';
import { WEBAPI_BASICS_QUIZZES } from '../data/dotnet-topic-docs/webapi-basics.quizzes';
import { SQL_BASICS_QUIZZES } from '../data/dotnet-topic-docs/sql-basics.quizzes';
import {
  getDocsTopicLesson,
  docsHasFeaturedLesson,
  docsHasQuizzes,
} from '../data/docs-topic-docs';
import {
  getReactTopicLesson,
  reactHasFeaturedLesson,
  reactHasQuizzes,
} from '../data/react-topic-docs';
import { PhaseGuide, TopicLesson, TopicQuizzes } from '../models/content.model';
import { isRoadmapTrack, RoadmapTrack, TRACKS } from '../models/track.model';
import { Phase, Roadmap, Topic } from '../models/roadmap.model';

@Injectable({ providedIn: 'root' })
export class RoadmapService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7021/api/roadmaps'; // C# API URL

  getTrack(track: RoadmapTrack) {
    return TRACKS[track];
  }

  // Returns roadmap from local data, fallback if API is not used for this specific call
  getRoadmap(track: RoadmapTrack): Roadmap {
    return TRACKS[track].roadmap;
  }

  // New method to fetch from C# API
  getRoadmapFromApi(track: RoadmapTrack): Observable<Roadmap> {
    return this.http.get<Roadmap>(`${this.apiUrl}/${track}`).pipe(
      tap(data => console.log('Fetched from API:', data)),
      catchError(err => {
        console.error('API failed, fallback to local data', err);
        return of(this.getRoadmap(track));
      })
    );
  }

  isValidTrack(value: string): value is RoadmapTrack {
    return isRoadmapTrack(value);
  }

  getPhaseGuide(track: RoadmapTrack, phaseId: string): PhaseGuide | undefined {
    if (track === 'dotnet') return DOTNET_PHASE_GUIDES.find((g) => g.phaseId === phaseId);
    if (track === 'docs') return DOCS_PHASE_GUIDES.find((g) => g.phaseId === phaseId);
    if (track === 'react') return REACT_PHASE_GUIDES.find((g) => g.phaseId === phaseId);
    return PHASE_GUIDES.find((g) => g.phaseId === phaseId);
  }

  getTopicLesson(track: RoadmapTrack, topicId: string): TopicLesson | undefined {
    if (track === 'dotnet') return getDotnetTopicLesson(topicId);
    if (track === 'docs') return getDocsTopicLesson(topicId);
    if (track === 'react') return getReactTopicLesson(topicId);
    return getTopicLesson(topicId);
  }

  getTopicQuizzes(track: RoadmapTrack, topicId: string): TopicQuizzes | undefined {
    if (track === 'angular' && hasQuizzes(topicId)) {
      if (topicId === 'components') return COMPONENTS_QUIZZES;
    }
    if (track === 'dotnet' && dotnetHasQuizzes(topicId)) {
      if (topicId === 'webapi-basics') return WEBAPI_BASICS_QUIZZES;
      if (topicId === 'sql-basics') return SQL_BASICS_QUIZZES;
    }
    return undefined;
  }

  hasFeaturedLesson(track: RoadmapTrack, topicId: string): boolean {
    if (track === 'dotnet') return dotnetHasFeaturedLesson(topicId);
    if (track === 'docs') return docsHasFeaturedLesson(topicId);
    if (track === 'react') return reactHasFeaturedLesson(topicId);
    return topicId === 'components';
  }

  findTopic(
    track: RoadmapTrack,
    phaseId: string,
    topicId: string,
  ): { phase: Phase; topic: Topic } | undefined {
    const phase = this.getRoadmap(track).phases.find((p) => p.id === phaseId);
    if (!phase) return undefined;
    const topic = phase.topics.find((t) => t.id === topicId);
    if (!topic) return undefined;
    return { phase, topic };
  }

  getQuizLesson(track: RoadmapTrack, topicId: string, quizId: string) {
    return this.getTopicQuizzes(track, topicId)?.lessons.find((l) => l.id === quizId);
  }

  totalTopics(track: RoadmapTrack): number {
    return this.getRoadmap(track).phases.reduce((sum, phase) => sum + phase.topics.length, 0);
  }
}
