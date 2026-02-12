'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'
import { type DateRange } from 'react-day-picker'

type ReservationContextValue = {
  range: DateRange | undefined
  setRange: (dates: DateRange | undefined) => void
  resetRange: () => void
}

const ReservationContext = createContext<ReservationContextValue | null>(null)

const initialState = {
  from: undefined,
  to: undefined,
}

const ReservationProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  const [range, setRange] = useState<DateRange | undefined>(initialState)
  const resetRange = () => setRange(initialState)

  return <ReservationContext value={{ range, setRange, resetRange }}>{children}</ReservationContext>
}

const useReservation = () => {
  const context = useContext(ReservationContext)

  if (!context) throw new Error('Context was used outside provider')

  return context
}

export { ReservationProvider, useReservation }
