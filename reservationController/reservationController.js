import Reservation from "../Schemas/reservationsData.js"

const getAll = (req, res) => {
  Reservation.find().then((data) => res.send(data))
}

const getId = async (req, res) => {
  const reservation = await Reservation.findById(req.params.id)

  if (reservation) res.send(reservation)
  else {
    return res.status(404).send("Error 404 : Not found")
  }
}

const postNew = async (req, res) => {
  try {
    const reservationData = new Reservation(req.body)
    const savedReservation = await reservationData.save()
    res.status(200).json({ id: savedReservation._id.toString() })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const renderNew = (req, res) => {
  res.render("create")
}

const renderDelete = (req, res) => {
  res.render("delete")
}

const renderEdit = (req, res) => {
  res.render("edit")
}

const deleteId = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id)

    if (!reservation) {
      const error = new Error("Reservation not found")
      error.status = 404
      return next(error)
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

const putId = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body
    )

    if (!reservation) {
      const error = new Error("Reservation not found")
      error.status = 404
      return next(error)
    }

    res.status(204).end()
  } catch (error) {
    error.status = 500
    return next(error)
  }
}

//Exports all
export {
  getAll,
  postNew,
  getId,
  renderNew,
  renderDelete,
  renderEdit,
  deleteId,
  putId,
}
