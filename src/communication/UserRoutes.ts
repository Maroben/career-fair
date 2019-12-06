import express from "express"
import UserService from "../business/UserService"

const router = express.Router()
const service = new UserService()

router.get("/", service.getUsers)
router.get("/:id", service.getUser)
router.post("/new", service.postUser)
router.put("/:id", service.putUser)
router.delete("/:id", service.deleteUser)

export default router
