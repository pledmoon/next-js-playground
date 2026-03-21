'use client'

import { Main } from '@/app/quiz/main'
import Loader from '@/app/quiz/loader'
import ErrorFetching from '@/app/quiz/error-fetching'
import { StartScreen } from '@/app/quiz/start-screen'
import { Question } from '@/app/quiz/question'
import { NextButton } from '@/app/quiz/next-button'
import { Progress } from '@/app/quiz/progress'
import { FinishScreen } from '@/app/quiz/finish-screen'
import { Footer } from '@/app/quiz/footer'
import { Timer } from '@/app/quiz/timer'
import { useQuiz } from '@/app/quiz/quiz-context'

export const Quiz = () => {
  const { status } = useQuiz()

  return (
    <Main>
      {status === 'loading' && <Loader />}

      {status === 'error' && <ErrorFetching />}

      {status === 'ready' && <StartScreen />}

      {status === 'active' && (
        <>
          <Progress />

          <Question />

          <Footer>
            <Timer />

            <NextButton />
          </Footer>
        </>
      )}

      {status === 'finished' && <FinishScreen />}
    </Main>
  )
}
