import express from "express"
import UserService from "../business/UserService"
import { auth } from "../business/AuthService"

const router = express.Router()
const service = new UserService()

router.get("/", service.getUsers)
router.get("/:id", service.getUser)
router.post("/:userid/:companyid", service.addUserCompany)
router.post("/new", service.postUser)
router.post("/login", service.login)
router.put("/:id", service.putUser)
router.delete("/:userid/:companyid", service.removeUserCompany)
router.delete("/:id", [auth], service.deleteUser)

export default router
