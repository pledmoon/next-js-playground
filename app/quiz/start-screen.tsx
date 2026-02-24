interface StartScreenProps {
  numQuestions: number
}

export const StartScreen = ({ numQuestions }: StartScreenProps) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <p>{numQuestions} questions to test your React mastery</p>
      <button className="btn btn-ui">Let&apos;s start</button>
    </div>
  )
}
