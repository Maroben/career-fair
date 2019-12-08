import { Response, Request } from "express"
import bcrypt from "bcryptjs"
import _ from "lodash"
import Database from "../persistence/Database"
import User, { IUser, validate, generateAuthToken, level } from "../persistence/models/UserModel"

export default class UserService {
    private readonly db = new Database<IUser>(User)

    public getUsers = async (req: Request, res: Response) => {
        try {
            const documents = await this.db.getAll()
            res.send(_.map(documents, (doc) => this.truncate(doc)))
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

    public postUser = async (req: Request, res: Response) => {
        try {
            const body: IUser = await this.createUser(req, level.user)
            await validate(body)
            if (await this.userExists(body)) {
                res.status(400).send("This Email is already registered.")
            }

            const document = await this.db.post(await this.prepare(body))
            document
                ? res
                      .header("x-auth-token", generateAuthToken(document))
                      .header("access-control-expose-headers", "x-auth-token")
                      .send(this.truncate(document))
                : res.status(404).send("User not found")
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    public putUser = async (req: Request, res: Response) => {
        try {
            const body: IUser = await this.createUser(req, level.user)
            await validate(body)
            if ((await this.emailChanged(body, req.params.id)) && this.userExists(body)) {
                res.status(400).send("This Email is already registered.")
            }

            const document = await this.db.put(await this.prepare(body), req.params.id)
            document
                ? res
                      .header("x-auth-token", generateAuthToken(document))
                      .header("access-control-expose-headers", "x-auth-token")
                      .send(this.truncate(document))
                : res.status(404).send("User not found")
        } catch (err) {
            res.status(400).send(err.message)
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

    private async createUser({ body }: Request, lv: level): Promise<IUser> {
        return new User({
            email: body.email,
            password: body.password,
            level: lv.valueOf()
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
