import type { Dispatch } from 'react'
import type { Question as QuestionType, QuizAction } from '@/app/quiz/quiz.types'

interface QuestionProps {
  question: QuestionType
  answer: number | null
  dispatch: Dispatch<QuizAction>
}

export const Question = ({ question, dispatch, answer }: QuestionProps) => {
  return (
    <div className="question">
      <h4>{question.question}</h4>

      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  )
}

interface OptionsProps {
  question: QuestionType
  answer: number | null
  dispatch: Dispatch<QuizAction>
}

const Options = ({ question, dispatch, answer }: OptionsProps) => {
  const { options } = question
  const hasAnswered = answer !== null

  const handleClick = (index: number) => {
    dispatch({ type: 'newAnswer', payload: index })
  }

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer && 'answer'} ${hasAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''}`}
          onClick={() => handleClick(index)}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
