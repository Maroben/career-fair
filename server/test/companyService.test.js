const companyService = require("../services/companyService")

const _ = require("lodash")

const company = {
	name: "HSR",
	info: "Short description of a Company",
	description: "long description of a Company",
	categories: '["Informatik", "Elektrotechnik"]',
	tags: '["frontend", "service", "new"]',
	links: '[{"name": "Facebook", "link": "https://facebook.com/hsr"}]'
}

test("Creates Company", async () => {
	let expected = await companyService.createCompany(company)
	expected = _.pick(received, ["name", "info", "description", "categories", "tags", "links"])
	expect(expected).toBe(company)
})
