'use client'

import { Main } from '@/app/quiz/main'
import { useEffect, useReducer } from 'react'

interface QuizState {
  questions: Question[]
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
}

type Question = {
  id: string
  question: string
  options: string[]
  correctOption: number
  points: number
}

type Action = { type: 'dataReceived'; payload: Question[] } | { type: 'dataFailed' }

const initialState: QuizState = {
  questions: [],
  status: 'loading',
}

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    default:
      throw new Error('Action is not defined')
  }
}

export const Quiz = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

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
      <p>1/{questions.length}</p>
      <p>Question?</p>
    </Main>
  )
}
