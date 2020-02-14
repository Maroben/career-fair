import mongoose from "mongoose"
import config from "config"
import _ from "lodash"
import Database from "../../src/persistence/Database"
import Company, { properties } from "../../src/persistence/models/CompanyModel"
import ICompany from "../../src/persistence/interfaces/ICompany"

describe("Database with Company", () => {
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

        expect(async () => await db.get({ _id: "fakeid" })).rejects

        const company1: ICompany = new Company({
            name: "Name1",
            info: "Info1",
            description: "Description1",
            location: "Location1"
        })
        const company2: ICompany = new Company({
            name: "Name2",
            info: "Info2",
            description: "Description2",
            location: "Location2"
        })

        const received1 = await db.post(company1)
        const received2 = await db.post(company2)
        expect(_.pick(received1, properties)).toMatchSnapshot()
        expect(_.pick(received2, properties)).toMatchSnapshot()

        const received3 = await db.getAll()
        expect(received3).toHaveLength(2)

        const received4 = await db.get(received2._id)

        expect(_.pick(received2, ["_id", ...properties])).toMatchObject(
            _.pick(received4, ["_id", ...properties])
        )

        const company5: ICompany = new Company({
            name: "Name5",
            info: "Info5",
            description: "Description5",
            location: "Location5"
        })

        const received5 = await db.put(company5, received1._id)
        expect(_.pick(received5, properties)).toMatchSnapshot()

        const received6 = await db.delete(received1._id)
        expect(received6).toMatchObject(received5)
        expect(async () => await db.get(received1._id)).rejects
    })
})
