import DateSelector from '@/app/_components/date-selector'
import ReservationForm from '@/app/_components/reservation-form'
import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service'
import type { Cabin } from '@/app/_types/cabin-card.type'

interface IReservationsProps {
  cabin: Cabin
}

export const Reservation = async ({ cabin }: IReservationsProps) => {
  const cabinId = cabin.id
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabinId),
    getSettings(),
  ])

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        bookedDates={bookedDates}
        settings={settings}
      />

      <ReservationForm cabin={cabin} />
    </div>
  )
}
