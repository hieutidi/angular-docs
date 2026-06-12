import { Injectable } from '@angular/core';
import { PHASE_GUIDES } from '../data/phase-docs.data';
import { COMPONENTS_QUIZZES } from '../data/topic-docs/components.quizzes';
import { getTopicLesson, hasQuizzes } from '../data/topic-docs';
import { ANGULAR_ROADMAP } from '../data/roadmap.data';
import { PhaseGuide, QuizLesson, TopicLesson, TopicQuizzes } from '../models/content.model';
import { Phase, Topic } from '../models/roadmap.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  getPhaseGuide(phaseId: string): PhaseGuide | undefined {
    return PHASE_GUIDES.find((g) => g.phaseId === phaseId);
  }

  getTopicLesson(topicId: string): TopicLesson | undefined {
    return getTopicLesson(topicId);
  }

  getTopicQuizzes(topicId: string): TopicQuizzes | undefined {
    if (!hasQuizzes(topicId)) return undefined;
    if (topicId === 'components') return COMPONENTS_QUIZZES;
    return undefined;
  }

  findTopic(phaseId: string, topicId: string): { phase: Phase; topic: Topic } | undefined {
    const phase = ANGULAR_ROADMAP.phases.find((p) => p.id === phaseId);
    if (!phase) return undefined;
    const topic = phase.topics.find((t) => t.id === topicId);
    if (!topic) return undefined;
    return { phase, topic };
  }

  getQuizLesson(topicId: string, quizId: string): QuizLesson | undefined {
    return this.getTopicQuizzes(topicId)?.lessons.find((l) => l.id === quizId);
  }
}
