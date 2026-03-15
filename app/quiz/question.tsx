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

interface QuestionProps {
  question: Question
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

interface QuestionItemProps {
  question: Question
  answer: number | null
  dispatch: Dispatch<QuizAction>
}

const Options = ({ question, dispatch, answer }: QuestionItemProps) => {
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
