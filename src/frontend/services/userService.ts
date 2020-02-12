import http from "./httpService"

import { IUser } from "../../persistence/models/UserModel"
import { AxiosResponse } from "axios"

const endpointApi = "/users"

export async function getUsers(): Promise<AxiosResponse<IUser[]>> {
    return await http.get(`${endpointApi}`)
}

export async function getUser(id: string): Promise<AxiosResponse<IUser>> {
    return await http.get(`${endpointApi}/${id}`)
}

export async function register(email: string, password: string): Promise<AxiosResponse<IUser>> {
    return await http.post(`${endpointApi}/new`, { email, password })
}

export async function addUserCompany(
    userId: string,
    companyId: string
): Promise<AxiosResponse<IUser>> {
    return await http.post(`${endpointApi}/${userId}/${companyId}`)
}

export async function removeUserCompany(
    userId: string,
    companyId: string
): Promise<AxiosResponse<IUser>> {
    return await http.delete(`${endpointApi}/${userId}/${companyId}`)
}

export async function updateUser(id: string, body: IUser): Promise<AxiosResponse<IUser>> {
    return await http.put(`${endpointApi}/${id}`, body)
}

export async function deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return await http.delete(`${endpointApi}/${id}`)
}
