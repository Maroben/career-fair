import http from "./httpService"

import { ICompany } from "../../persistence/models/CompanyModel"
import { AxiosResponse } from "axios"

const endpointApi = "/companies"

export async function getCompanies(): Promise<AxiosResponse<ICompany[]>> {
    const { data: companies } = await http.get(`${endpointApi}`)
    return companies
}

export async function getCompany(id: string): Promise<AxiosResponse<ICompany>> {
    const { data: company } = await http.get(`${endpointApi}/${id}`)
    return company
}

export async function createCompany(body: ICompany): Promise<AxiosResponse<ICompany>> {
    return await http.post(`${endpointApi}/new`, body)
}

export async function updateCompany(id: string, body: ICompany): Promise<AxiosResponse<ICompany>> {
    return await http.put(`${endpointApi}/${id}`, body)
}

export async function deleteCompany(id: string): Promise<AxiosResponse<ICompany>> {
    return await http.delete(`${endpointApi}/${id}`)
}

export default {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
}
