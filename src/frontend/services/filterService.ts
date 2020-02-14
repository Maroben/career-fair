import Filter from "../types/IFilter"
import IInfo from "../types/IInfo"
import ICompany from "../../persistence/interfaces/ICompany"

export function filterCompanies(filter: Filter, info: IInfo, companies: ICompany[]): ICompany[] {
    return companies
}
