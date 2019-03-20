const express = require("express")
const router = express.Router()

const service = require("../services/companyService")
const auth = require("../utils/auth")
const admin = require("../utils/admin")

router.get("/", service.getCompanies)
router.get("/:id", service.getCompany)
router.post("/new", [auth, admin], service.createCompany)
router.put("/:id", [auth, admin], service.updateCompany)
router.delete("/:id", [auth, admin], service.deleteCompany)

module.exports = router
