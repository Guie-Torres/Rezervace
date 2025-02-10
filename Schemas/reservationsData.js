import mongoose from "mongoose"

const reservationSchema = {
  name: String,
  surename: String,
  startDate: Date,
  endDate: Date,
  id: String,
}

const Reservation = mongoose.model("Reservation", reservationSchema)

export default Reservation
