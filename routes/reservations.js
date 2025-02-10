import express from "express"
import {
  deleteId,
  getAll,
  getId,
  postNew,
  putId,
  renderDelete,
  renderEdit,
  renderNew,
} from "../reservationController/reservationController.js"

const router = express.Router()

router.get("/new", renderNew)
router.get("/delete", renderDelete)
router.get("/edit", renderEdit)

router.get("/", getAll)
router.post("/", postNew)

router.get("/:id", getId)
router.delete("/:id", deleteId)
router.put("/:id", putId)

export default router
