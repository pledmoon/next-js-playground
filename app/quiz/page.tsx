import { Header } from '@/app/quiz/header'
import DateCounter from '@/app/quiz/date-counter'
import { BankAccount } from '@/app/quiz/bank-account'
import { Quiz } from '@/app/quiz/quiz'

export default function QuizPage() {
  return (
    <div className="app">
      <Header />

      <Quiz />

      <DateCounter />

      <BankAccount />
    </div>
  )
}
