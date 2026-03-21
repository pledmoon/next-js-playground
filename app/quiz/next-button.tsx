import { useQuiz } from '@/app/quiz/quiz-context'

export const NextButton = () => {
  const { state, dispatch } = useQuiz()
  const { questions, index: currentQuestionIndex, answer } = state

  const numQuestions = questions.length

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
