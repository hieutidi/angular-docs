export type TopicLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: TopicLevel;
  resources: { label: string; url: string }[];
}

export interface Phase {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  estimatedWeeks: number;
  topics: Topic[];
}

export interface Roadmap {
  title: string;
  description: string;
  totalWeeks: number;
  phases: Phase[];
}
