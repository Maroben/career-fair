const { Company } = require("../services/companyService")
const mongoose = require("mongoose")
const config = require("config")

let companies = [
	{
		name: "Unternehmen 1",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["gross", "backend"]'
	},
	{
		name: "Unternehmen 2",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["gross", "backend"]'
	},
	{
		name: "Unternehmen 3",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["gross", "einzeln"]'
	},
	{
		name: "Unternehmen 4",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["klein"]'
	},
	{
		name: "Unternehmen 5",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["klein", "informatik"]'
	},
	{
		name: "Unternehmen 6",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["klein", "frontend", "informatik"]'
	},
	{
		name: "Unternehmen 7",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["klein", "frontend", "something"]'
	},
	{
		name: "Unternehmen 8",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["mittel", "frontend", "something"]'
	},
	{
		name: "Unternehmen 9",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["mittel", "backend", "something"]'
	},
	{
		name: "Unternehmen 10",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["gross", "backend", "informatik"]'
	},
	{
		name: "Unternehmen 12",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["gross", "backend", "informatik"]'
	},
	{
		name: "Unternehmen 13",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["gross", "informatik"]'
	},
	{
		name: "Unternehmen 14",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["klein", "informatik"]'
	},
	{
		name: "Unternehmen 15",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["klein", "informatik"]'
	},
	{
		name: "Unternehmen 16",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["klein", "frontend", "informatik"]'
	},
	{
		name: "Unternehmen 17",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["klein", "frontend", "something"]'
	},
	{
		name: "Unternehmen 18",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["mittel", "frontend", "something"]'
	},
	{
		name: "Unternehmen 19",
		info: "A short company description",
		location: "Gebäude 1, Foyer",
		categories: '["Informatik", "Elektrotechnik", "Maschinenbau"]',
		links:
			'{ "homepage": "https://www.hsr.ch", "twitter": "https://twitter.com/hsr_rapperswil", "facebook": "https://www.facebook.com/hochschule.rapperswil", "linkedin": "https://www.linkedin.com/school/hsr-hochschule-f%C3%BCr-technik-rapperswil/", "xing": "https://www.xing.com/companies/hsrhochschulefürtechnikrapperswil", "instagram": "https://www.instagram.com/hsr_rapperswil/", "youtube": "https://www.youtube.com/user/hsrwebmaster" }',
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		tags: '["mittel", "backend", "something"]'
	}
]

async function seed() {
	mongoose
		.connect(config.db, {
			useNewUrlParser: true,
			useCreateIndex: true
		})
		.then(() => console.info("Connected to MongoDB ..."))
		.catch((error) => console.error("Could not connect to MongoDB ..."))

	await Company.deleteMany({})
	await Company.insertMany(companies)

	mongoose.disconnect()
	console.info("Done!")
}

seed()
