import { useState, useEffect } from "react"
import api from "../api"

function AdminPanel() {
  const [bookingId, setBookingId] = useState("")
  const [newStatus, setNewStatus] = useState("completed")
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  const loadBookings = async () => {
    try {
      setLoading(true)
      const response = await api.get("/admin/bookings")
      setBookings(response.data)
    } catch (error) {
      console.log(error)
      alert("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const overrideStatus = async () => {
    try {
      setLoading(true)

      await api.post("/admin/bookings/" + bookingId + "/override", {
        newStatus: newStatus
      })

      alert("Booking overridden")
      setBookingId("")
      loadBookings()
    } catch (error) {
      console.log(error)
      alert("Failed to override booking")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Admin / Ops Panel</h2>

      <div className="mb-4">
        <h3 className="font-medium mb-2">All Bookings</h3>

        {loading && (
          <div className="text-sm text-gray-500">Loading bookings...</div>
        )}

        <div className="max-h-64 overflow-y-auto border rounded">
          {bookings.map(b => (
            <div
              key={b._id}
              className="border-b p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setBookingId(b._id)}
            >
              <div className="text-sm font-medium">
                {b.serviceType} | {b.status}
              </div>

              <div className="text-xs text-gray-500">
                ID: {b._id}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Override Booking</h3>

        <input
          className="border rounded p-2 w-full mb-2"
          placeholder="Booking ID"
          value={bookingId}
          onChange={e => setBookingId(e.target.value)}
        />

        <select
          className="border rounded p-2 w-full mb-2"
          value={newStatus}
          onChange={e => setNewStatus(e.target.value)}
        >
          <option value="pending">pending</option>
          <option value="assigned">assigned</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
          <option value="cancelled">cancelled</option>
        </select>

        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 w-full"
          disabled={!bookingId || loading}
          onClick={overrideStatus}
        >
          {loading ? "Updating..." : "Override Status"}
        </button>
      </div>
    </div>
  )
}

export default AdminPanel