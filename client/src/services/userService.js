import http from "./httpService"

const endpointApi = "/users"

export async function getUsers() {
	const { data: users } = await http.get(`${endpointApi}`)
	return users
}

export async function getUser(id) {
	const { data: user } = await http.get(`${endpointApi}/${id}`)
	return user
}

export function createUser(user) {
	return http.post(`${endpointApi}/register`, {
		name: user.name,
		email: user.email,
		password: user.password
	})
}

export async function updateUser(id, body) {
	return await http.put(`${endpointApi}/${id}`, body)
}

export async function deleteUser(id) {
	return await http.delete(`${endpointApi}/${id}`)
}
