import express from "express"
import CompanyService from "../business/CompanyService"

const router = express.Router()
const service = new CompanyService()

router.get("/", service.getCompanies)
router.get("/:id", service.getCompany)
router.post("/new", service.postCompany)
router.put("/:id", service.putCompany)
router.delete("/:id", service.deleteCompany)

export default router
