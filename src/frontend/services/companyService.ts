import http from "./httpService"
import ICompany from "../../persistence/interfaces/ICompany"

const endpointApi = "/companies"

export async function getCompanies(): Promise<ICompany[]> {
    const { data: companies } = await http.get(`${endpointApi}`)
    return companies
}

export async function getCompany(id: string): Promise<ICompany> {
    const { data: company } = await http.get(`${endpointApi}/${id}`)
    return company
}

export async function createCompany(body: ICompany): Promise<ICompany> {
    const { data: company } = await http.post(`${endpointApi}/new`, body)
    return company
}

export async function updateCompany(id: string, body: ICompany): Promise<ICompany> {
    const { data: company } = await http.put(`${endpointApi}/${id}`, body)
    return company
}

export async function deleteCompany(id: string): Promise<ICompany> {
    const { data: company } = await http.delete(`${endpointApi}/${id}`)
    return company
}

export default {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}
