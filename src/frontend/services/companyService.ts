import http from "./httpService"

import { ICompany } from "../../persistence/models/CompanyModel"

const endpointApi = "/companies"

export async function getCompanies() {
    const { data: companies } = await http.get(`${endpointApi}`)
    return companies
}

export async function getCompany(id: string) {
    const { data: company } = await http.get(`${endpointApi}/${id}`)
    return company
}

export async function createCompany(body: ICompany) {
    return await http.post(`${endpointApi}/new`, body)
}

export async function updateCompany(id: string, body: ICompany) {
    return await http.put(`${endpointApi}/${id}`, body)
}

export async function deleteCompany(id: string) {
    return await http.delete(`${endpointApi}/${id}`)
}

export default {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}
