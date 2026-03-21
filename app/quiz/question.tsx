import type { Question as QuestionType } from '@/app/quiz/quiz.types'
import { useQuiz } from '@/app/quiz/quiz-context'

export const Question = () => {
  const { questions, index } = useQuiz()

  const question = questions[index]

  return (
    <div className="question">
      <h4>{question.question}</h4>

      <Options question={question} />
    </div>
  )
}

interface OptionsProps {
  question: QuestionType
}

const Options = ({ question }: OptionsProps) => {
  const { answer, dispatch } = useQuiz()

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
