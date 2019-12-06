import mongoose from "mongoose"
import _ from "lodash"
import config from "config"
import Database from "../../src/persistence/database"
import Company, { ICompany, properties } from "../../src/persistence/models/companyModel"

describe("Company Model", () => {
    beforeAll(async () => {
        await mongoose.connect(config.get("db"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
    })

    afterAll(async () => {
        await Company.deleteMany({})
        await mongoose.connection.close()
    })

    it("CRUD Company", async () => {
        const db = new Database<ICompany>(Company)
        const company: ICompany = new Company({
            name: "Name1",
            info: "Info1",
            description: "Description1",
            location: "Location1"
        })

        const received = await db.post(company)
        expect(_.pick(received, properties)).toMatchSnapshot()
    })
})
