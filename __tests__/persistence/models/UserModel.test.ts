import _ from "lodash"
import User, { IUser, validate, properties } from "../../../src/persistence/models/UserModel"

describe("User Model", () => {
    describe("Valid User Creations", () => {
        it("Simple User", () => {
            const user: IUser = new User({
                email: "maroben@example.com",
                password: "security_lv_9000",
                isAdmin: false
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
                    isAdmin: false
                })
                expect(async () => await validate(user)).rejects
            })

            it("wrong format 1", () => {
                const user: IUser = new User({
                    email: "this is not an email",
                    password: "very secure",
                    isAdmin: false
                })
                expect(async () => await validate(user)).rejects
            })

            it("wrong format 2", () => {
                const user: IUser = new User({
                    email: "fake@totoally",
                    password: "very secure",
                    isAdmin: false
                })
                expect(async () => await validate(user)).rejects
            })

            it("wrong format 3", () => {
                const user: IUser = new User({
                    email: "might@look,correct",
                    password: "very secure",
                    isAdmin: false
                })
                expect(async () => await validate(user)).rejects
            })

            it("wrong format 4", () => {
                const user: IUser = new User({
                    email: "might(at)look.correct",
                    password: "very secure",
                    isAdmin: false
                })
                expect(async () => await validate(user)).rejects
            })
        })

        describe("Password", () => {
            it("Empty", () => {
                const user: IUser = new User({
                    email: "maroben@example.com",
                    password: "",
                    isAdmin: false
                })
                expect(async () => await validate(user)).rejects
            })

            it("Too long", () => {
                const user: IUser = new User({
                    email: "maroben@example.com",
                    password: "wayyyyy tooooo looooong",
                    isAdmin: false
                })
                expect(async () => await validate(user)).rejects
            })
        })

        it("Wrong data type", () => {
            const user: IUser = new User({
                email: 8,
                password: {},
                isAdmin: "true"
            })
            expect(async () => await validate(user)).rejects
        })
    })
})
