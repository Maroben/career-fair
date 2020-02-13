import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"
import ILogin from "../interfaces/ILogin"

export const loginSchema: SchemaMap<ILogin> = {
    email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
    password: Joi.string()
        .min(5)
        .max(20)
        .required()
        .label("Passwort")
}

export const loginObjectSchema: ObjectSchema = Joi.object<ILogin>(loginSchema)
