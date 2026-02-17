import { Header } from '@/app/quiz/header'
import DateCounter from '@/app/quiz/date-counter'
import { Main } from '@/app/quiz/main'

export default function QuizPage() {
  return (
    <div className="app">
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>

      <DateCounter />
    </div>
  )
}
