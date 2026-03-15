interface ProgressProps {
  currentQuestionIndex: number
  points: number
  numQuestions: number
  maxPossiblePoints: number
  answer: number | null
}

export const Progress = ({
  currentQuestionIndex,
  points,
  numQuestions,
  maxPossiblePoints,
  answer,
}: ProgressProps) => {
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
