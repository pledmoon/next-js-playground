import '@/app/quiz/quiz.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="quizRoot">{children}</div>
}
