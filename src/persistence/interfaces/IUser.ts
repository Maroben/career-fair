import { Document } from "mongoose"
import ICompany from "./ICompany"
import { Level } from "./ILevel"

export default interface IUser extends Document {
    email: string
    password: string
    level: Level
    company: ICompany | null
}
