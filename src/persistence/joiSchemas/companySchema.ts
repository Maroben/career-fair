import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"
import ICompany from "../interfaces/ICompany"

export const companySchema: SchemaMap<ICompany> = {
    name: Joi.string()
        .min(2)
        .max(32)
        .required(),
    info: Joi.string().max(512),
    description: Joi.string().max(2056),
    location: Joi.string()
        .max(16)
        .allow("")
}

export const companyObjectSchema: ObjectSchema = Joi.object<ICompany>(companySchema)
