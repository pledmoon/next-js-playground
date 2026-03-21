import { useQuiz } from '@/app/quiz/quiz-context'

export const StartScreen = () => {
  const { numQuestions, dispatch } = useQuiz()

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <p>{numQuestions} questions to test your React mastery</p>
      <button
        className="btn btn-ui mt-12"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let&apos;s start
      </button>
    </div>
  )
}
