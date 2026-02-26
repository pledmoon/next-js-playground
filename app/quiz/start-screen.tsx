import { ActionDispatch } from 'react'

interface StartScreenProps {
  numQuestions: number
  dispatch: ActionDispatch<[action: Action]>
}

type Action =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }

type Question = {
  id: string
  question: string
  options: string[]
  correctOption: number
  points: number
}

export const StartScreen = ({ numQuestions, dispatch }: StartScreenProps) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <p>{numQuestions} questions to test your React mastery</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let&apos;s start
      </button>
    </div>
  )
}
