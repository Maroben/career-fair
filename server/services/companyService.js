const _ = require("lodash")
const Company = require("../models/Company")

module.exports.getCompanies = async (req, res) => {
	await Company.Model.find()
		.then((companies) => {
			companies = companies.map((company) => {
				return _.pick(company, Company.attr[1])
			})
			res.send(companies)
		})
		.catch((error) => {
			res.status(404).send(`No companies were found ${error}`)
		})
}

module.exports.getCompanyLocations = async (req, res) => {
	await Company.Model.find()
		.then((companies) => {
			companies = companies.map((company) => {
				return _.pick(company, ["name", "location"])
			})
			res.send(companies)
		})
		.catch((error) => {
			res.status(404).send(`No companies were found ${error}`)
		})
}

module.exports.getCompany = async (req, res) => {
	await Company.Model.findOne({ _id: req.params.id })
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(404).send(`This company doesn't exist ${error}`)
		})
}

module.exports.createCompany = async (req, res) => {
	let company = _.pick(req.body, Company.attr[0])
	company.location = ""

	const { error } = Company.validateCompany(company)
	if (error) return res.status(400).send(error.details[0].message)

	let oldCompany = await Company.Model.findOne({ name: company.name })
	if (oldCompany) return res.status(400).send("This company name has already been used.")

	await new Company.Model(company)
		.save()
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(500).send(`unkown`)
		})
}

module.exports.updateCompany = async (req, res) => {
	let company = _.pick(req.body, Company.attr[0])
	let oldCompany = await Company.Model.findOne({ name: company.name })
	company.location = oldCompany.location

	const { error } = Company.validateCompany(company)
	if (error) return res.status(400).send(error.details[0].message)

	await Company.Model.findOneAndUpdate({ _id: req.params.id }, company)
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(404).send(`Could not update company ${error}`)
		})
}

module.exports.updateCompanyLocation = async (req, res) => {
	let companyLocation = _.pick(req.body, "location")
	const { error } = Company.validateLocation(companyLocation)
	if (error) return res.status(400).send(error.details[0].message)

	await Company.Model.findOneAndUpdate(
		{ _id: req.params.id },
		{ location: companyLocation.location },
		{ new: true }
	)
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(404).send(`Could not update company ${error}`)
		})
}

module.exports.deleteCompany = async (req, res) => {
	await Company.Model.findOneAndDelete({ _id: req.params.id })
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(400).send(`Could not delete Company ${error}`)
		})
}

module.exports.Company = Company
