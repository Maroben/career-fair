import mongoose from "mongoose"

export default class Database<T extends mongoose.Document> {
    constructor(private readonly model: mongoose.Model<T>) {}

    public async getAll(): Promise<T[]> {
        return await this.model
            .find()
            .then((documents) => {
                return documents
            })
            .catch((err) => {
                console.error(err)
                throw new Error(`!`)
            })
    }

    public async getAllAndPopulate(populate: string): Promise<T[]> {
        return await this.model
            .find()
            .populate(populate)
            .then((documents) => {
                return documents
            })
            .catch((err) => {
                console.error(err)
                throw new Error(`!`)
            })
    }

    public async get(filter: { [key: string]: string }): Promise<T> {
        return await this.model
            .findOne(filter)
            .then((document) => {
                return document as T
            })
            .catch((err) => {
                console.error(err)
                throw new Error(`Document with filter: ${filter} not found!`)
            })
    }

    public async getAndPopulate(filter: { [key: string]: string }, populate: string): Promise<T> {
        return await this.model
            .findOne(filter)
            .populate(populate)
            .then((document) => {
                return document as T
            })
            .catch((err) => {
                console.error(err)
                throw new Error(`Document with filter: ${filter} not found!`)
            })
    }

    public async post(document: T): Promise<T> {
        return await this.model
            .create(document)
            .then((document) => {
                return document as T
            })
            .catch((err) => {
                console.error(err)
                throw new Error(`Failed to create Document!`)
            })
    }

    public async put(document: T, _id: string): Promise<T> {
        document._id = _id // overwrite the generated id
        return await this.model
            .findOneAndUpdate({ _id: _id }, document, { new: true })
            .then((document) => {
                return document as T
            })
            .catch((err) => {
                console.error(err)
                throw new Error(`Failed to update Document with ID: ${_id}!`)
            })
    }

    public async putAndPopulate(document: T, _id: string, populate: string): Promise<T> {
        document._id = _id // overwrite the generated id
        return await this.model
            .findOneAndUpdate({ _id: _id }, document, { new: true })
            .populate(populate)
            .then((document) => {
                return document as T
            })
            .catch((err) => {
                console.error(err)
                throw new Error(`Failed to update Document with ID: ${_id}!`)
            })
    }

    public async delete(_id: string): Promise<T> {
        return await this.model
            .findOneAndDelete({ _id })
            .then((document) => {
                return document as T
            })
            .catch((err) => {
                console.error(err)
                throw new Error(`Failed to delete Document with ID: ${_id}!`)
            })
    }
}
