/**
 * GET /api/cabins/:cabinId
 * @description получаем информацию об объекте и даты его бронирования
 */
import type { NextRequest } from 'next/server'
import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cabinId: string }> },
) {
  const { cabinId } = await params

  try {
    //const cabin = await getCabin(cabinId)
    //const bookedDates = await getBookedDatesByCabinId(cabinId)

    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ])

    return Response.json({ cabin, bookedDates }, { status: 200 })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
