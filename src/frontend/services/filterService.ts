import Filter from "../types/IFilter"
import ICompany from "../../persistence/interfaces/ICompany"

export function filterCompanies(filter: Filter, companies: ICompany[]): ICompany[] {
    return companies
}
