import { createContext, useState } from "react"

export const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [lastBookingId, setLastBookingId] = useState("")

  return (
    <BookingContext.Provider value={{ lastBookingId, setLastBookingId }}>
      {children}
    </BookingContext.Provider>
  )
}
