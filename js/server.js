import express from "express"
import reservationsRouter from "../routes/reservations.js"
import logger from "../middleware/logger.js"
import errorHandler from "../middleware/error.js"
import mongoose from "mongoose"
const app = express()
mongoose.connect("mongodb://localhost/reservations")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(logger)
app.use("/reservations", reservationsRouter)
app.use(errorHandler)

app.listen(3000)
