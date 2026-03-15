'use client'

import { Main } from '@/app/quiz/main'
import { useEffect, useReducer } from 'react'
import Loader from '@/app/quiz/loader'
import ErrorFetching from '@/app/quiz/error-fetching'
import { StartScreen } from '@/app/quiz/start-screen'
import { Question } from '@/app/quiz/question'
import { NextButton } from '@/app/quiz/next-button'
import { Progress } from '@/app/quiz/progress'
import { FinishScreen } from '@/app/quiz/finish-screen'

interface QuizState {
  questions: Question[]
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
  index: number
  answer: number | null
  points: number
  highscore: number
}

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

const initialState: QuizState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
}

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return { ...state, status: 'active' }
    case 'newAnswer':
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore,
      }
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' }
    default:
      throw new Error('Action is not defined')
  }
}

export const Quiz = () => {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((acc, question) => acc + question.points, 0)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:8000/questions')
        const questions = await res.json()

        dispatch({ type: 'dataReceived', payload: questions })
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
        }

        dispatch({ type: 'dataFailed' })
      }
    }

    fetchQuestions()
  }, [])

  return (
    <Main>
      {status === 'loading' && <Loader />}

      {status === 'error' && <ErrorFetching />}

      {status === 'ready' && (
        <StartScreen
          numQuestions={numQuestions}
          dispatch={dispatch}
        />
      )}

      {status === 'active' && (
        <>
          <Progress
            currentQuestionIndex={index}
            points={points}
            numQuestions={numQuestions}
            maxPossiblePoints={maxPossiblePoints}
            answer={answer}
          />

          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />

          <NextButton
            dispatch={dispatch}
            answer={answer}
            numQuestions={numQuestions}
            currentQuestionIndex={index}
          />
        </>
      )}

      {status === 'finished' && (
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </Main>
  )
}
