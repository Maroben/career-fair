import mongoose, { Schema, Document } from "mongoose"
import Joi, { ObjectSchema } from "@hapi/joi"
import config from "config"
import _ from "lodash"
import jwt from "jsonwebtoken"

export interface IUser extends Document {
    email: string
    password: string
    level: number
}

export enum level {
    root,
    admin,
    user
}

export const joiSchema: ObjectSchema = Joi.object<IUser>({
    email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email(),
    password: Joi.string()
        .min(5)
        .max(20)
        .required(),
    level: Joi.number()
        .min(0)
        .max(2)
})

const userSchema: Schema = new Schema(
    {
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
        level: {
            type: Number,
            required: true,
            min: 0,
            max: 2
        }
    },
    { versionKey: false }
)

export const generateAuthToken = (user: IUser): string => {
    return jwt.sign(
        { _id: user._id, email: user.email, level: user.level },
        config.get("jwtPrivateKey")
    )
}

export const properties = ["email", "password", "level"]

export const validate = async (user: IUser) => {
    return await joiSchema.validateAsync(_.pick(user, properties), {
        abortEarly: false
    })
}

export default mongoose.model<IUser>("users", userSchema)
