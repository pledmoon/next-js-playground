import { getCabin, getCabins } from '@/app/_lib/data-service'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Reservation } from '@/app/_components/reservation'
import { Suspense } from 'react'
import Spinner from '@/app/_components/spinner'
import { CabinDetail } from '@/app/_components/cabin-detail'

interface CabinDetailPageProps {
  params: Promise<{ cabinId: string }>
}

export const generateMetadata = async ({ params }: CabinDetailPageProps): Promise<Metadata> => {
  const { cabinId } = await params
  const cabin = await getCabin(cabinId)

  if (!cabin) notFound()

  const { name } = cabin

  return {
    title: `Cabin ${name}`,
  }
}

export const generateStaticParams = async () => {
  const cabins = await getCabins()

  //return [{ cabinId: '1' }, { cabinId: '2' }]
  return cabins.map(({ id }) => ({ cabinId: String(id) }))
}

export default async function CabinDetailPage({ params }: CabinDetailPageProps) {
  const { cabinId } = await params
  const cabin = await getCabin(cabinId)
  const { name } = cabin

  //if (!cabin) notFound()

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <CabinDetail cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  )
}
