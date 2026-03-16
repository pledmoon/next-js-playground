import type { Dispatch } from 'react'
import type { QuizAction } from '@/app/quiz/quiz.types'

interface NextButtonProps {
  dispatch: Dispatch<QuizAction>
  answer: number | null
  numQuestions: number
  currentQuestionIndex: number
}

export const NextButton = ({
  dispatch,
  answer,
  numQuestions,
  currentQuestionIndex,
}: NextButtonProps) => {
  if (answer === null) return null

  if (currentQuestionIndex < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
        type="button"
      >
        Next
      </button>
    )
  }

  if (currentQuestionIndex === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finish' })}
        type="button"
      >
        Finish
      </button>
    )
  }
}
