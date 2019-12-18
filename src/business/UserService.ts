import { Response, Request } from "express"
import bcrypt from "bcryptjs"
import _ from "lodash"
import Database from "../persistence/Database"
import User, { IUser, validate, generateAuthToken } from "../persistence/models/UserModel"
import { isAuthorized } from "./AuthService"

export default class UserService {
    private readonly db = new Database<IUser>(User)

    public getUsers = async (req: Request, res: Response) => {
        try {
            const documents = await this.db.getAll()
            res.send(_.map(documents, (document) => this.truncate(document)))
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    public getUser = async (req: Request, res: Response) => {
        try {
            const document = await this.db.get({ _id: req.params.id })
            document ? res.send(this.truncate(document)) : res.status(404).send("User not found")
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    public postUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const body: IUser = this.createUser(req)
            await validate(body)

            if (!isAuthorized(req.header("x-auth-token") as string, body)) {
                return res.status(403).send("Insufficient Permissions.")
            } else if (await this.userExists(body)) {
                return res.status(400).send("This Email is already registered.")
            }

            const document = await this.db.post(await this.prepare(body))
            return document
                ? res
                      .header("x-auth-token", generateAuthToken(document))
                      .header("access-control-expose-headers", "x-auth-token")
                      .send(this.truncate(document))
                : res.status(404).send("User not found")
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }

    public putUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            const body: IUser = this.createUser(req)
            await validate(body)

            if (!isAuthorized(req.header("x-auth-token") as string, body)) {
                return res.status(403).send("Insufficient Permissions.")
            } else if (
                (await this.emailChanged(body, req.params.id)) &&
                (await this.userExists(body))
            ) {
                return res.status(400).send("This Email is already registered.")
            }

            const document = await this.db.put(await this.prepare(body), req.params.id)
            return document
                ? res
                      .header("x-auth-token", generateAuthToken(document))
                      .header("access-control-expose-headers", "x-auth-token")
                      .send(this.truncate(document))
                : res.status(404).send("User not found")
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const document = await this.db.delete(req.params.id)
            document ? res.send(document) : res.status(404).send("User not found")
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    public login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const body: IUser = this.createUser(req)
            await validate(body)

            const user: IUser = await this.db.get({ email: body.email })
            const valid = await bcrypt.compare(body.password, user.password)
            if (!valid) throw Error

            return res
                .header("x-auth-token", generateAuthToken(user))
                .header("access-control-expose-headers", "x-auth-token")
                .send(this.truncate(user))
        } catch (err) {
            return res.status(400).send("Invalid E-Mail or password.")
        }
    }

    private createUser({ body }: Request): IUser {
        return new User({
            email: body.email,
            password: body.password,
            level: body.level
        })
    }

    private async userExists(user: IUser): Promise<boolean> {
        return (await this.db.get({ email: user.email })) != null
    }

    private async emailChanged(user: IUser, _id: string): Promise<boolean> {
        const old: IUser = await this.db.get({ _id })
        return user.email != old.email
    }

    private async prepare(user: IUser): Promise<IUser> {
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
        return user
    }

    private truncate(user: IUser) {
        return _.omit(user.toObject(), "password")
    }
}
