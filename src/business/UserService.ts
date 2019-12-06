import { Response, Request } from "express"
import Database from "../persistence/Database"
import User, { IUser, validate } from "../persistence/models/UserModel"

export default class UserService {
    private readonly db = new Database<IUser>(User)

    public getUsers = async (req: Request, res: Response) => {
        try {
            const documents = await this.db.getAll()
            res.send(documents)
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    public getUser = async (req: Request, res: Response) => {
        try {
            const document = await this.db.get(req.params.id)
            res.send(document)
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    public postUser = async (req: Request, res: Response) => {
        try {
            const user: IUser = this.createUser(req)
            await validate(user)

            const document = await this.db.post(user)
            res.send(document)
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    public putUser = async (req: Request, res: Response) => {
        try {
            const user: IUser = this.createUser(req)
            await validate(user)

            const document = await this.db.put(user, req.params.id)
            res.send(document)
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const document = await this.db.delete(req.params.id)
            res.send(document)
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    private createUser({ body }: Request): IUser {
        return new User({
            email: body.email,
            password: body.password,
            isAdmin: false
        })
    }
}
