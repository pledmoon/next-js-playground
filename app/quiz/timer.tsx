import { type Dispatch, useEffect } from 'react'
import { QuizAction } from '@/app/quiz/quiz.types'

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
