import http from "./httpService"

const endpointApi = "/companies"

function parsePartialCompany(company) {
	return {
		...company,
		categories: JSON.parse(company.categories),
		tags: JSON.parse(company.tags)
	}
}

function parseCompany(company) {
	return {
		...company,
		categories: JSON.parse(company.categories),
		tags: JSON.parse(company.tags),
		links: JSON.parse(company.links)
	}
}

function stringifyCompany(company) {
	return {
		...company,
		categories: JSON.stringify(company.categories),
		tags: JSON.stringify(company.tags),
		links: JSON.stringify(company.links)
	}
}

export async function getCompanies() {
	const { data: companies } = await http.get(`${endpointApi}`)
	return companies.map((company) => parsePartialCompany(company))
}

export async function getCompany(id) {
	const { data: company } = await http.get(`${endpointApi}/${id}`)
	return parseCompany(company)
}

export async function createCompany(body) {
	body = stringifyCompany(body)
	return await http.post(`${endpointApi}/new`, body)
}

export async function updateCompany(id, body) {
	body = stringifyCompany(body)
	return await http.put(`${endpointApi}/${id}`, body)
}

export async function deleteCompany(id) {
	return await http.delete(`${endpointApi}/${id}`)
}

export default {
	getCompanies,
	getCompany,
	createCompany,
	updateCompany,
	deleteCompany
}
