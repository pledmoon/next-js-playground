export type Cabin = {
  id: string
  name: string
  max_capacity: number
  regular_price: number
  discount: number
  image: string
  description?: string
}

export type Settings = {
  id: number
  created_at: string
  breakfast_price: number
  max_booking_length: number
  min_booking_length: number
  max_guests_per_booking: number
}
