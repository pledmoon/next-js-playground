import { useQuiz } from '@/app/quiz/quiz-context'

export const Progress = () => {
  const { index: currentQuestionIndex, points, numQuestions, maxPossiblePoints, answer } = useQuiz()

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
