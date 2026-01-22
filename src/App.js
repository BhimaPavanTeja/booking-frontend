import { Routes, Route, Link } from "react-router-dom"
import CreateBooking from "./components/CreateBooking"
import BookingStatus from "./components/BookingStatus"
import ProviderPanel from "./components/ProviderPanel"
import AdminPanel from "./components/AdminPanel"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center py-6">
        Home Services Booking System
      </h1>

      <div className="flex justify-center gap-10 bg-white shadow p-4 mx-6 rounded text-xs md:text-lg">
        <Link
          to="/"
          className="text-gray-600 hover:text-blue-800 font-medium"
        >
          Create Booking
        </Link>

        <Link
          to="/status"
          className="text-gray-600 hover:text-blue-800 font-medium"
        >
          Booking Status
        </Link>

        <Link
          to="/provider"
          className="text-gray-600 hover:text-blue-800 font-medium"
        >
          Provider Panel
        </Link>

        <Link
          to="/admin"
          className="text-gray-600 hover:text-blue-800 font-medium"
        >
          Admin Panel
        </Link>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-xl">
          <Routes>
            <Route path="/" element={<CreateBooking />} />
            <Route path="/status" element={<BookingStatus />} />
            <Route path="/provider" element={<ProviderPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App