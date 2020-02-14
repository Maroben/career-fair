import mongoose, { Schema } from "mongoose"
import _ from "lodash"
import ICompany from "../interfaces/ICompany"
import { companyObjectSchema } from "../joiSchemas/companySchema"

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
        },
        subjects: {
            type: [String]
        },
        employmentTypes: {
            type: [String]
        }
    },
    { versionKey: false }
)

export const properties = ["name", "info", "description", "location", "subjects", "employmentTypes"]

export const validate = async (company: ICompany) => {
    return await companyObjectSchema.validateAsync(_.pick(company, properties), {
        abortEarly: false
    })
}

export default mongoose.model<ICompany>("companies", companySchema)
