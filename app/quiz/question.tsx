import { useQuiz } from '@/app/quiz/quiz-context'

export const Question = () => {
  const { state } = useQuiz()
  const { questions, index } = state

  const question = questions[index]

  return (
    <div className="question">
      <h4>{question.question}</h4>

      <Options />
    </div>
  )
}

const Options = () => {
  const { state, dispatch } = useQuiz()
  const { questions, index, answer } = state

  const question = questions[index]
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
