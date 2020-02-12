import Filter from "../types/IFilter"
import Info from "../types/IInfo"
import { ICompany } from "../../persistence/models/CompanyModel"

export function filterCompanies(filter: Filter, info: Info, companies: ICompany[]): ICompany[] {
    return companies
}
