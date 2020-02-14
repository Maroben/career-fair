import Joi, { ObjectSchema, SchemaMap } from "@hapi/joi"
import ILinks from "../interfaces/ILinks"

export const linksSchema: SchemaMap<ILinks> = {
    homepage: Joi.string()
        .uri()
        .allow(""),
    linkedin: Joi.string()
        .uri()
        .allow(""),
    xing: Joi.string()
        .uri()
        .allow(""),
    facebook: Joi.string()
        .uri()
        .allow(""),
    instagram: Joi.string()
        .uri()
        .allow(""),
    twitter: Joi.string()
        .uri()
        .allow(""),
    youtube: Joi.string()
        .uri()
        .allow("")
}

export const linksObjectSchema: ObjectSchema = Joi.object<ILinks>(linksSchema)
