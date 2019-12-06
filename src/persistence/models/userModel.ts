import mongoose, { Schema, Document } from "mongoose"
import Joi, { ObjectSchema } from "@hapi/joi"
import _ from "lodash"

export interface IUser extends Document {
    email: string
    password: string
    isAdmin: string
}

const joiSchema: ObjectSchema = Joi.object<IUser>({
    email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email(),
    password: Joi.string()
        .min(5)
        .max(20)
        .required(),
    isAdmin: Joi.boolean
})

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
    isAdmin: Boolean
})

export const properties = ["email", "password", "isAdmin"]

export const validate = async (user: IUser) => {
    return await joiSchema.validateAsync(_.pick(user, properties), {
        abortEarly: false
    })
}

export default mongoose.model<IUser>("users", userSchema)
