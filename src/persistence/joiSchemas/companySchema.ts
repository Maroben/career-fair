import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"
import ICompany from "../interfaces/ICompany"
import { linksSchema } from "./linksSchema"

export const companySchema: SchemaMap<ICompany> = {
    name: Joi.string()
        .min(2)
        .max(32)
        .required(),
    info: Joi.string()
        .max(512)
        .allow(""),
    description: Joi.string()
        .max(2056)
        .allow(""),
    location: Joi.string()
        .max(16)
        .allow(""),
    subjects: Joi.array().items(Joi.string().allow("")),
    employmentTypes: Joi.array().items(Joi.string().allow("")),
    links: linksSchema
}

export const companyObjectSchema: ObjectSchema = Joi.object<ICompany>(companySchema)
