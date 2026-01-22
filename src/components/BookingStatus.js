import { useState, useContext, useEffect } from "react"
import api from "../api"
import { BookingContext } from "../BookingContext"

function BookingStatus() {
  const [bookingId, setBookingId] = useState("")
  const [booking, setBooking] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  const { lastBookingId } = useContext(BookingContext)

  useEffect(() => {
    if (lastBookingId) {
      setBookingId(lastBookingId)
    }
  }, [lastBookingId])

  const fetchStatus = async () => {
    try {
      setLoading(true)

      const response = await api.get("/bookings/" + bookingId)
      setBooking(response.data)

      const historyResponse = await api.get("/bookings/" + bookingId + "/history")
      setHistory(historyResponse.data)
    } catch (error) {
      console.log(error)
      alert("Booking not found")
    } finally {
      setLoading(false)
    }
  }

  const statusColor = (status) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-800"
    if (status === "assigned") return "bg-blue-100 text-blue-800"
    if (status === "in-progress") return "bg-purple-100 text-purple-800"
    if (status === "completed") return "bg-green-100 text-green-800"
    if (status === "cancelled") return "bg-red-100 text-red-800"
    if (status === "no-show") return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Booking Status</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border rounded p-2 flex-1"
          placeholder="Booking ID"
          value={bookingId}
          onChange={e => setBookingId(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!bookingId || loading}
          onClick={fetchStatus}
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {booking && (
        <div className="border rounded p-4 mb-4">
          <div className="flex items-center gap-2">
            <span>Status:</span>
            <span
              className={
                "px-2 py-1 rounded text-sm font-medium " +
                statusColor(booking.status)
              }
            >
              {booking.status}
            </span>
          </div>

          <div>Provider:{" "} {booking.providerName ? booking.providerName : booking.providerId ? "Assigned": "Not assigned"}</div>
          <div>Provider: {booking.providerId || "Not assigned"}</div>

          <div>Retry Count: {booking.retryCount}</div>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">History</h4>
          <div className="flex flex-col gap-1 text-sm">
            {history.map(event => (
              <div key={event._id} className="border-b pb-1">
                [{new Date(event.createdAt).toLocaleString()}]{" "}
                {event.eventType} | {event.oldStatus} → {event.newStatus}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingStatus