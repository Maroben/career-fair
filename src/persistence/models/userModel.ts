import mongoose, { Schema, Document } from "mongoose"
import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"
import config from "config"
import _ from "lodash"
import jwt from "jsonwebtoken"
import { ICompany, joiSchema as companySchema } from "./CompanyModel"

export interface IUser extends Document {
    email: string
    password: string
    level: number
    company: ICompany
}

export enum level {
    root,
    admin,
    user
}

export const joiSchema: SchemaMap<IUser> = {
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
        .max(2),
    company: Joi.object(companySchema)
}

export const objectSchema: ObjectSchema = Joi.object<IUser>(joiSchema)

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
            type: Schema.Types.ObjectId,
            ref: "Company"
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
    return await objectSchema.validateAsync(_.pick(user, properties), {
        abortEarly: false
    })
}

export default mongoose.model<IUser>("users", userSchema)
