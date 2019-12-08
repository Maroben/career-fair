import _ from "lodash"
import User, { IUser, validate, properties, level } from "../../../src/persistence/models/UserModel"

describe("User Model", () => {
    describe("Valid User Creations", () => {
        it("Simple User", () => {
            const user: IUser = new User({
                email: "maroben@example.com",
                password: "security_lv_9000",
                level: level.user
            })
            expect(_.pick(user, properties)).toMatchSnapshot()
            expect(async () => await validate(user)).resolves
        })
    })

    describe("Joi User Validation Rejections", () => {
        it("Empty Object", () => {
            const user: IUser = new User({})
            expect(async () => await validate(user)).rejects
        })

        describe("Email", () => {
            it("Empty", () => {
                const user: IUser = new User({
                    email: "",
                    password: "very secure",
                    level: level.user
                })
                expect(async () => await validate(user)).rejects
            })

            it("wrong format 1", () => {
                const user: IUser = new User({
                    email: "this is not an email",
                    password: "very secure",
                    level: level.admin
                })
                expect(async () => await validate(user)).rejects
            })

            it("wrong format 2", () => {
                const user: IUser = new User({
                    email: "fake@totoally",
                    password: "very secure",
                    level: level.root
                })
                expect(async () => await validate(user)).rejects
            })

            it("wrong format 3", () => {
                const user: IUser = new User({
                    email: "might@look,correct",
                    password: "very secure",
                    level: level.user
                })
                expect(async () => await validate(user)).rejects
            })

            it("wrong format 4", () => {
                const user: IUser = new User({
                    email: "might(at)look.correct",
                    password: "very secure",
                    level: level.user
                })
                expect(async () => await validate(user)).rejects
            })
        })

        describe("Password", () => {
            it("Empty", () => {
                const user: IUser = new User({
                    email: "maroben@example.com",
                    password: "",
                    level: level.user
                })
                expect(async () => await validate(user)).rejects
            })

            it("Too long", () => {
                const user: IUser = new User({
                    email: "maroben@example.com",
                    password: "wayyyyy tooooo looooong",
                    level: level.user
                })
                expect(async () => await validate(user)).rejects
            })
        })

        describe("Permission Level", () => {
            it("Admin", () => {
                const user: IUser = new User({
                    email: "maroben@example.com",
                    password: "",
                    level: level.admin
                })
                expect(async () => await validate(user)).toMatchSnapshot()
            })

            it("negative", () => {
                const user: IUser = new User({
                    email: "maroben@example.com",
                    password: "",
                    level: level.root - 1
                })
                expect(async () => await validate(user)).rejects
            })

            it("too high", () => {
                const user: IUser = new User({
                    email: "maroben@example.com",
                    password: "",
                    level: level.user + 1
                })
                expect(async () => await validate(user)).rejects
            })
        })

        it("Wrong data type", () => {
            const user: IUser = new User({
                email: 8,
                password: {},
                level: "admin"
            })
            expect(async () => await validate(user)).rejects
        })
    })
})
