import mongoose, { Schema, Document } from "mongoose"
import Joi, { ObjectSchema } from "@hapi/joi"
import _ from "lodash"

export interface ICompany extends Document {
    name: string
    info: string
    description: string
    location: string
}

const joiSchema: ObjectSchema = Joi.object<ICompany>({
    name: Joi.string()
        .min(2)
        .max(32)
        .required(),
    info: Joi.string().max(512),
    description: Joi.string().max(2056),
    location: Joi.string()
        .max(16)
        .allow("")
})

const companySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 32
        },
        info: {
            type: String,
            maxlength: 512
        },
        description: {
            type: String,
            maxlength: 2056
        },
        location: {
            type: String,
            maxlength: 16
        }
    },
    { versionKey: false }
)

export const properties = ["name", "info", "description", "location"]

export const validate = async (company: ICompany) => {
    return await joiSchema.validateAsync(_.pick(company, properties), {
        abortEarly: false
    })
}

export default mongoose.model<ICompany>("companies", companySchema)
