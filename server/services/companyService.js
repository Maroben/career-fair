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

module.exports.getCompany = async (req, res) => {
	await Company.Model.findOne({ _id: req.params.id })
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(404).send(`This company doesn't exist ${error}`)
		})
}

module.exports.createCompany = async ({ body }, res) => {
	const { error } = Company.validate(body)
	if (error) return res.status(400).send(error.details[0].message)

	let company = await Company.Model.findOne({ name: body.name })
	if (company) return res.status(400).send("This company name has already been used.")

	await new Company.Model(_.pick(body, Company.attr[0]))
		.save()
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(500).send(`unkown`)
		})
}

module.exports.updateCompany = async (req, res) => {
	const { error } = Company.validateCompany(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	await Company.Model.findOneAndUpdate({ _id: req.params.id }, _.pick(req.body, Company.attr[0]))
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(404).send(`Could not update company ${error}`)
		})
}

module.exports.updateCompanyLocation = async (req, res) => {
	const { error } = Company.validateLocation(req.body.location)
	if (error) return res.status(400).send(error.details[0].message)

	await Company.Model.findOneAndUpdate({ _id: req.params.id }, { location: req.body.location })
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(404).send(`Could not update company ${error}`)
		})
}

module.exports.deleteCompany = async (req, res) => {
	await Company.findOneAndDelete({ _id: req.params.id })
		.then((company) => {
			res.send(company)
		})
		.catch((error) => {
			res.status(400).send(`Could not delete Company ${error}`)
		})
}

module.exports.Company = Company
