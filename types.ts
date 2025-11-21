export interface Option {
  id: string;
  text: string;
  emoji: string;
  score: number; // Pontuação atribuída a esta resposta (1-4)
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface ResultLevel {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  color: string;
  badgeIcon: string;
}

export type GameState = 'welcome' | 'quiz' | 'calculating' | 'result';