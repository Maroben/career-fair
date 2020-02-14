import _ from "lodash"
import Company, { validate, properties } from "../../../src/persistence/models/CompanyModel"
import ICompany from "../../../src/persistence/interfaces/ICompany"

describe("Company Model", () => {
    describe("Valid Company Creations", () => {
        it("Simple Company", () => {
            const company: ICompany = new Company({
                name: "Name",
                info: "Info",
                description: "Description",
                location: "Location"
            })
            expect(_.pick(company, properties)).toMatchSnapshot()
            expect(async () => await validate(company)).resolves
        })
        it("Minimal Company", () => {
            const company: ICompany = new Company({
                name: "Name",
                info: "",
                description: "",
                location: ""
            })
            expect(_.pick(company, properties)).toMatchSnapshot()
            expect(async () => await validate(company)).resolves
        })
    })

    describe("Joi Company Validation Rejections", () => {
        it("Empty Object", () => {
            const company: ICompany = new Company({})
            expect(async () => await validate(company)).rejects
        })
        it("Empty Name", () => {
            const company: ICompany = new Company({
                name: "",
                info: "Info",
                description: "Description",
                location: "Location"
            })
            expect(async () => await validate(company)).rejects
        })
        it("Too long Name", () => {
            const company: ICompany = new Company({
                name: "My Company Name is wayyyyyy too Long",
                info: "Info",
                description: "Description",
                location: "Location"
            })
            expect(async () => await validate(company)).rejects
        })
        it("Wrong data type", () => {
            const company: ICompany = new Company({
                name: 8,
                info: {},
                description: [],
                location: false
            })
            expect(async () => await validate(company)).rejects
        })
    })
})
