export interface QuizState {
  questions: Question[]
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
  index: number
  answer: number | null
  points: number
  highscore: number
  secondsRemaining: number | null
}

export type Question = {
  id: string
  question: string
  options: string[]
  correctOption: number
  points: number
}

export type QuizAction =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' }
  | { type: 'tick' }
