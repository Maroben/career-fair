const express = require("express")
const router = express.Router()

const service = require("../services/companyService")
const auth = require("../utils/auth")
const admin = require("../utils/admin")

router.get("/locations", service.getCompanyLocations)
router.put("/locations/:id", service.updateCompanyLocation)

router.get("/", service.getCompanies)
router.get("/:id", service.getCompany)
router.post("/new", service.createCompany)
router.put("/:id", service.updateCompany)
router.delete("/:id", service.deleteCompany)

module.exports = router
