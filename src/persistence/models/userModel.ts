import mongoose, { Schema } from "mongoose"
import _ from "lodash"
import config from "config"
import jwt from "jsonwebtoken"
import { userObjectSchema } from "../joiSchemas/userSchema"
import IUser from "../interfaces/IUser"

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
        },
        company: {
            type: String
        }
    },
    { versionKey: false }
)

export const generateAuthToken = (user: IUser): string => {
    return jwt.sign(
        { _id: user._id, email: user.email, level: user.level },
        config.get("jwtPrivateKey") as string
    )
}

export const properties = ["email", "password", "level"]

export const validate = async (user: IUser) => {
    return await userObjectSchema.validateAsync(_.pick(user, properties), {
        abortEarly: false
    })
}

export default mongoose.model<IUser>("users", userSchema)
