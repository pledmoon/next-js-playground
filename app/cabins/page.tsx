import type { Metadata } from 'next'
import { Suspense } from 'react'
import Spinner from '@/app/_components/spinner'
import { CabinList } from '@/app/_components/cabin-list'
import { Filter } from '@/app/_components/filter'
import ReservationReminder from '@/app/_components/reservation-reminder'

// так как мы используетм searchParams, это будет проигнорено,
// так как мы включили dynamic режим
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Cabins',
}

interface CabinsPageProps {
  //searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function CabinsPage({ searchParams }: CabinsPageProps) {
  const queryString = await searchParams

  const filter = queryString?.capacity ?? 'all'

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">Our Luxury Cabins</h1>

      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine
        waking up to beautiful mountain views, spending your days exploring the dark forests around,
        or just relaxing in your private hot tub under the stars. Enjoy nature&apos;s beauty in your
        own little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to
        paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* KEY разобрать почему не работает и почему должен (все page navigation обернуты в useTransition (router переходы)) */}
      {/* FALLBACK не показывается без KEY, при переключении фильтра, KEY ставим и работает корректно */}
      <Suspense
        key={filter}
        fallback={
          <div className="grid items-center justify-center">
            <Spinner />
            <p className="text-xl text-primary-200">Loading cabin data...</p>
          </div>
        }
      >
        <CabinList filter={filter as 'all' | 'small' | 'medium' | 'large'} />
      </Suspense>

      <ReservationReminder />
    </div>
  )
}
