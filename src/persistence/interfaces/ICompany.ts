import { Document } from "mongoose"

export default interface ICompany extends Document {
    name: string
    info: string
    description: string
    location: string
}
