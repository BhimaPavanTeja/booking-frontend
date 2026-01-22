import { useState } from "react"
import api from "../api"

function ProviderPanel() {
  const [providerId, setProviderId] = useState("")
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  const loadBookings = async () => {
    try {
      setLoading(true)
      const response = await api.get("/providers/" + providerId + "/bookings")
      setBookings(response.data)
    } catch (error) {
      console.log(error)
      alert("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  const acceptBooking = async (id) => {
    try {
      await api.post("/providers/bookings/" + id + "/accept")
      loadBookings()
    } catch (error) {
      console.log(error)
      alert("Failed to accept booking")
    }
  }

  const rejectBooking = async (id) => {
    try {
      await api.post("/providers/bookings/" + id + "/reject")
      loadBookings()
    } catch (error) {
      console.log(error)
      alert("Failed to reject booking")
    }
  }

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Provider Panel</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border rounded p-2 flex-1"
          placeholder="Provider ID"
          value={providerId}
          onChange={e => setProviderId(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!providerId || loading}
          onClick={loadBookings}
        >
          {loading ? "Loading..." : "Load"}
        </button>
      </div>

      {bookings.length === 0 && !loading && (
        <div className="text-sm text-gray-500">
          No assigned bookings
        </div>
      )}

      <div className="flex flex-col gap-3">
        {bookings.map(b => (
          <div key={b._id} className="border rounded p-3">
            <div className="font-medium">{b.serviceType}</div>
            <div>Status: {b.status}</div>

            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:bg-gray-400"
                disabled={b.status !== "assigned"}
                onClick={() => acceptBooking(b._id)}
              >
                Accept
              </button>

              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-gray-400"
                disabled={b.status !== "assigned"}
                onClick={() => rejectBooking(b._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProviderPanel