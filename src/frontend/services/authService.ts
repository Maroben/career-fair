import http from "./httpService"
import jwtDecode from "jwt-decode"
import IUser from "../../persistence/interfaces/IUser"

const tokenKey = "token"

http.setJwt(getJwt())

export async function login(email: string, password: string) {
    const { headers } = await http.post("/users/login", { email, password })
    localStorage.setItem(tokenKey, headers["x-auth-token"])
}

export function loginWithJwt(jwt: string) {
    localStorage.setItem(tokenKey, jwt)
}

export function logout() {
    localStorage.removeItem(tokenKey)
}

export function getCurrentUser(): IUser {
    try {
        const jwt = localStorage.getItem(tokenKey)
        return jwtDecode(jwt)
    } catch (ex) {
        return null
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey)
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}
