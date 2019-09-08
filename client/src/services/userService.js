import http from "./httpService"

const endpointApi = "/users"

export async function getUsers() {
	const { data } = await http.get(`${endpointApi}`)
	return data
}

export async function getUser(id) {
	const { data } = await http.get(`${endpointApi}/${id}`)
	return data
}

export async function register(email, password) {
	return await http.post(`${endpointApi}/register`, { email, password })
}

export async function updateUser(id, body) {
	return await http.put(`${endpointApi}/${id}`, body)
}

export async function deleteUser(id) {
	return await http.delete(`${endpointApi}/${id}`)
}
