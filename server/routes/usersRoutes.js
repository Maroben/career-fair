const express = require("express")
const router = express.Router()

const service = require("../services/userService")
const auth = require("../utils/auth")
const admin = require("../utils/admin")

router.get("/", service.getUsers)
router.get("/:id", service.getUser)
router.post("/register", service.createUser)
router.post("/login", service.loginUser)
router.put("/:id", service.updateUser)
router.delete("/:id", service.deleteUser)

module.exports = router
