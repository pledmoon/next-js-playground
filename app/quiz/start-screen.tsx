import type { ActionDispatch } from 'react'
import type { QuizAction } from '@/app/quiz/quiz.types'

interface StartScreenProps {
  numQuestions: number
  dispatch: ActionDispatch<[action: QuizAction]>
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
