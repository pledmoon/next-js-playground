'use client'

import {
  type ActionDispatch,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { type QuizAction, type QuizState } from '@/app/quiz/quiz.types'

const SECS_PER_QUESTION = 30

interface QuizContextProps {
  children: Readonly<ReactNode>
}

const QuizContext = createContext<{
  state: QuizState
  dispatch: ActionDispatch<[action: QuizAction]>
} | null>(null)

const initialState: QuizState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null, // calculate from a number of questions
}

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
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
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining && state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }
    default:
      throw new Error('Action is not defined')
  }
}

export const QuizProvider = ({ children }: QuizContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

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

  return <QuizContext value={{ state, dispatch }}>{children}</QuizContext>
}

export const useQuiz = () => {
  const context = useContext(QuizContext)

  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }

  return context
}
