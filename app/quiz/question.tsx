type Question = {
  id: string
  question: string
  options: string[]
  correctOption: number
  points: number
}

interface QuestionProps {
  question: Question
}

export const Question = ({ question }: QuestionProps) => {
  return (
    <div className="question">
      <h4>{question.question}</h4>

      <Options question={question} />
    </div>
  )
}

interface QuestionItemProps {
  question: Question
}

const Options = ({ question }: QuestionItemProps) => {
  const { options } = question

  return (
    <div className="options">
      {options.map((option) => (
        <button
          key={option}
          className="btn btn-option"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
