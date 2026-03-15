import type { Dispatch, ReactNode } from 'react'

type Question = {
  id: string
  question: string
  options: string[]
  correctOption: number
  points: number
}

type QuizAction =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number }
  | { type: 'nextQuestion' }

interface NextButtonProps {
  dispatch: Dispatch<QuizAction>
  answer: number | null
  children: Readonly<ReactNode>
}

export const NextButton = ({ dispatch, answer, children }: NextButtonProps) => {
  if (answer === null) return null

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
      type="button"
    >
      {children}
    </button>
  )
}
