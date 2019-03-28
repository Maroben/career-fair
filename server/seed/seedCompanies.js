const { Company } = require("../services/companyService")
const mongoose = require("mongoose")
const config = require("config")
const csv = require("csv-parser")
const fs = require("fs")

const subjects = [
	"Bauingenieurwesen",
	"Elektrotechnik",
	"Erneuerbare Energien & Umwelttechnik",
	"Informatik",
	"Landschaftsarchitektur",
	"Maschinentechnik / Innovation",
	"Raumplanung",
	"Wirtschaftsingenieurwesen"
]

const employment = ["Internship", "Trainee", "Full-Time"]

const links = ["homepage", "linkedin", "xing", "facebook", "twitter", "instagram", "youtube"]

const headers = ["name", "location", "info", "description"]
	.concat(links)
	.concat(subjects)
	.concat(employment)

getCompany = (data) => {
	let dataSubjects = []
	for (let i = 0; i < subjects.length; i++) {
		if (data[subjects[i]]) {
			dataSubjects.push(subjects[i])
		}
	}

	let dataEmployment = []
	for (let i = 0; i < employment.length; i++) {
		if (data[employment[i]]) {
			dataEmployment.push(employment[i])
		}
	}

	let dataLinks = {}
	for (let i = 0; i < links.length; i++) {
		if (data[links[i]] != null) {
			dataLinks[links[i]] = data[links[i]]
		}
	}

	let company = {
		name: data.name,
		location: data.location,
		info: data.info,
		description: data.description,
		subjects: JSON.stringify(dataSubjects),
		employment: JSON.stringify(dataEmployment),
		links: JSON.stringify(dataLinks)
	}

	return company
}

seedCompanies = () => {
	let companies = []

	fs.createReadStream("seed/data.csv")
		.pipe(csv(headers))
		.on("data", (data) => {
			companies.push(getCompany(data))
		})
		.on("end", async () => {
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
			exit
		})
}

seedCompanies()
