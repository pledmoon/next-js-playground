import { useQuiz } from '@/app/quiz/quiz-context'

export const Progress = () => {
  const { state } = useQuiz()
  const { index: currentQuestionIndex, points, questions, answer } = state

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((acc, question) => acc + question.points, 0)

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        //value={answer ? currentQuestionIndex + 1 : currentQuestionIndex}
        value={currentQuestionIndex + Number(answer !== null)}
      />

      <p>
        Question <strong>{currentQuestionIndex + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  )
}
