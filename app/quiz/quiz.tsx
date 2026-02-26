'use client'

import { Main } from '@/app/quiz/main'
import { useEffect, useReducer } from 'react'
import Loader from '@/app/quiz/loader'
import ErrorFetching from '@/app/quiz/error-fetching'
import { StartScreen } from '@/app/quiz/start-screen'
import { Question } from '@/app/quiz/question'

interface QuizState {
  questions: Question[]
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
  index: number
}

type Question = {
  id: string
  question: string
  options: string[]
  correctOption: number
  points: number
}

type Action =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }

const initialState: QuizState = {
  questions: [],
  status: 'loading',
  index: 0,
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return { ...state, status: 'active' }
    default:
      throw new Error('Action is not defined')
  }
}

export const Quiz = () => {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length

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

      {status === 'active' && <Question question={questions[index]} />}
    </Main>
  )
}
