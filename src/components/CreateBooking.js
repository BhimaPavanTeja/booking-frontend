import { useState, useContext } from "react"
import api from "../api"
import { BookingContext } from "../BookingContext"
import { useNavigate } from "react-router-dom"


function CreateBooking() {
  const [customerId, setCustomerId] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const { setLastBookingId } = useContext(BookingContext)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      setLoading(true)
  
      const response = await api.post("/bookings", {
        customerId: customerId,
        serviceType: serviceType
      })
  
      setResult(response.data)
      setLastBookingId(response.data._id)
  
      setCustomerId("")
      setServiceType("")
  
      setTimeout(() => {
        navigate("/status")
      }, 800)
    } catch (error) {
      console.log(error)
      alert("Failed to create booking")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Create Booking</h2>

      <div className="flex flex-col gap-3">
        <input
          className="border rounded p-2"
          placeholder="Customer ID"
          value={customerId}
          onChange={e => setCustomerId(e.target.value)}
        />

        <input
          className="border rounded p-2"
          placeholder="Service Type"
          value={serviceType}
          onChange={e => setServiceType(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!customerId || !serviceType || loading}
          onClick={handleSubmit}
        >
          {loading ? "Creating..." : "Create Booking"}
        </button>
      </div>

      {result && (
        <div className="mt-4 border-t pt-4">
          <div className="font-medium text-green-600">
            Booking Created Successfully
          </div>
          <div>ID: {result._id}</div>
          <div>Status: {result.status}</div>
        </div>
      )}
    </div>
  )
}

export default CreateBooking
