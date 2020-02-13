import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"
import { companySchema } from "./companySchema"
import IUser from "../interfaces/IUser"

export const userSchema: SchemaMap<IUser> = {
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

export const userObjectSchema: ObjectSchema = Joi.object<IUser>(userSchema)
