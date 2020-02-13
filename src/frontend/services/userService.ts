import http from "./httpService"

import IUser from "../../persistence/interfaces/IUser"
import ICompany from "../../persistence/interfaces/ICompany"
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
    user: IUser,
    company: ICompany
): Promise<AxiosResponse<IUser>> {
    return await http.post(`${endpointApi}/${user._id}/${company._id}`)
}

export async function removeUserCompany(user: IUser): Promise<AxiosResponse<IUser>> {
    return await http.delete(`${endpointApi}/${user._id}/${user.company._id}`)
}

export async function updateUser(id: string, body: IUser): Promise<AxiosResponse<IUser>> {
    return await http.put(`${endpointApi}/${id}`, body)
}

export async function deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return await http.delete(`${endpointApi}/${id}`)
}
