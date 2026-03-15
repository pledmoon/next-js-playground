import type { Dispatch } from 'react'

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
  | { type: 'finish' }
  | { type: 'restart' }

interface FinishScreenProps {
  points: number
  maxPossiblePoints: number
  highscore: number
  dispatch: Dispatch<QuizAction>
}

export const FinishScreen = ({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}: FinishScreenProps) => {
  const percentage = (points / maxPossiblePoints) * 100

  let emoji

  if (percentage === 100) {
    emoji = '🥇'
  }

  if (percentage >= 80 && percentage < 100) {
    emoji = '🎉'
  }

  if (percentage >= 50 && percentage < 80) {
    emoji = '😊'
  }

  if (percentage >= 0 && percentage < 80) {
    emoji = '🤔'
  }

  if (percentage === 0) {
    emoji = '🤦'
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart quiz
      </button>
    </>
  )
}
