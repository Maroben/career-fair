import mongoose, { Schema, Document } from "mongoose"
import { ICompany } from "./companyModel"

export interface IUser extends Document {
    email: string
    password: string
    isAdmin: string
    company: ICompany
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "companies" }
})

export default mongoose.model<IUser>("companies", userSchema)
