import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"
import IRegister from "../interfaces/IRegister"

export const registerSchema: SchemaMap<IRegister> = {
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
        .label("Passwort"),
    passwordRepeat: Joi.string()
        .min(5)
        .max(20)
        .required()
        .label("Passwort Bestätigen")
}

export const registerObjectSchema: ObjectSchema = Joi.object<IRegister>(registerSchema)
