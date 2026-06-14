export interface DocSection {
  id: string;
  title: string;
  content: string;
  code?: string;
}

export type CodeLanguage = 'typescript' | 'csharp' | 'sql' | 'shell' | 'javascript';

export interface CodeCheck {
  id: string;
  description: string;
  pattern: string;
  flags?: string;
}

export interface CodeExercise {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  language: CodeLanguage;
  checks: CodeCheck[];
  hints?: string[];
}

export interface TopicLesson {
  topicId: string;
  summary: string;
  objectives: string[];
  sections: DocSection[];
  practice?: string;
  codeExercises?: CodeExercise[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface QuizLesson {
  id: string;
  order: number;
  title: string;
  description: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface TopicQuizzes {
  topicId: string;
  lessons: QuizLesson[];
}

export interface PhaseGuide {
  phaseId: string;
  overview: string;
  goals: string[];
  tips: string[];
  checklist: string[];
}
