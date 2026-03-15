interface ProgressProps {
  currentQuestion: number
  points: number
  numQuestions: number
  maxPossiblePoints: number
  answer: number | null
}

export const Progress = ({
  currentQuestion,
  points,
  numQuestions,
  maxPossiblePoints,
  answer,
}: ProgressProps) => {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        //value={answer ? currentQuestion + 1 : currentQuestion}
        value={currentQuestion + Number(answer !== null)}
      />

      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  )
}
