import { Document } from "mongoose"
import ILinks from "./ILinks"

export default interface ICompany extends Document {
    name: string
    info: string
    description: string
    location: string
    subjects: string[]
    employmentTypes: string[]
    links: ILinks
}
