import { Header } from '@/app/quiz/header'
import DateCounter from '@/app/quiz/date-counter'
import { BankAccount } from '@/app/quiz/bank-account'
import { Quiz } from '@/app/quiz/quiz'

export default function QuizPage() {
  return (
    <div className="app">
      <Header />

      <Quiz />

      <hr className="mt-24 border-b border-accent-400 w-full" />

      <DateCounter />

      <BankAccount />
    </div>
  )
}
