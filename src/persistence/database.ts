import mongoose from "mongoose"

export default class Database<T extends mongoose.Document> {
    constructor(private readonly model: mongoose.Model<T>) {}

    public async getAll() {
        return await this.model
            .find()
            .then((document) => {
                return document
            })
            .catch((err) => {
                throw new Error(`No Documents found!`)
            })
    }

    public async get(_id: string) {
        return await this.model
            .findOne({ _id })
            .then((document) => {
                if (document) {
                    return document
                } else {
                    throw Error
                }
            })
            .catch((err) => {
                throw new Error(`Document with ID: ${_id} not found!`)
            })
    }

    public async post(document: T) {
        return await this.model
            .create(document)
            .then((document) => {
                return document
            })
            .catch((err) => {
                throw new Error(`Failed to create Document!`)
            })
    }

    public async put(document: T, _id: string) {
        return await this.model
            .findOneAndUpdate({ _id }, document, { new: true })
            .then((document) => {
                return document
            })
            .catch((err) => {
                throw new Error(`Failed to update Document with ID: ${_id}!`)
            })
    }

    public async delete(_id: string) {
        return await this.model
            .findOneAndDelete({ _id })
            .then((document) => {
                if (document) {
                    return document
                } else {
                    throw Error
                }
            })
            .catch((err) => {
                throw new Error(`Failed to delete Document with ID: ${_id}!`)
            })
    }
}
