import { type Dispatch, useEffect } from 'react'

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
  | { type: 'tick' }

interface TimerProps {
  secondsRemaining: number | null
  dispatch: Dispatch<QuizAction>
}

export const Timer = ({ secondsRemaining, dispatch }: TimerProps) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => clearInterval(timerId)
  }, [dispatch])

  return <div className="timer">{formatTime(secondsRemaining)}</div>
}

const formatTime = (secondsRemaining: number | null) => {
  if (!secondsRemaining) return null

  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  return `${('0' + minutes).slice(-2)}:${seconds < 10 ? '0' : ''}${seconds}`
}
