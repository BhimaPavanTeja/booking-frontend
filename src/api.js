import axios from "axios"

const api = axios.create({
  baseURL: "https://booking-backend-bofk.onrender.com/"
})

export default api