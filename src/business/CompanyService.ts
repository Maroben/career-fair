import { Response, Request } from "express"
import Database from "../persistence/Database"
import Company, { ICompany, validate } from "../persistence/models/CompanyModel"

export default class CompanyService {
    private readonly db = new Database<ICompany>(Company)

    public getCompanies = async (req: Request, res: Response) => {
        try {
            const documents = await this.db.getAll()
            res.send(documents)
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    public getCompany = async (req: Request, res: Response) => {
        try {
            const document = await this.db.get({ _id: req.params.id })
            document ? res.send(document) : res.status(404).send("Company not found")
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

    public postCompany = async (req: Request, res: Response) => {
        try {
            const company: ICompany = this.createCompany(req)
            await validate(company)

            const document = await this.db.post(company)
            res.send(document)
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    public putCompany = async (req: Request, res: Response) => {
        try {
            const company: ICompany = this.createCompany(req)
            await validate(company)

            const document = await this.db.put(company, req.params.id)
            document ? res.send(document) : res.status(404).send("Company not found")
        } catch (err) {
            res.status(400).send(err.message)
        }
    }

    public deleteCompany = async (req: Request, res: Response) => {
        try {
            const document = await this.db.delete(req.params.id)
            document ? res.send(document) : res.status(404).send("Company not found")
        } catch (err) {
            res.status(404).send(err.message)
        }
    }

    private createCompany({ body }: Request): ICompany {
        return new Company({
            name: body.name,
            info: body.info,
            description: body.description,
            location: body.location
        })
    }
}
