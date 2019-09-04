const mongoose = require("mongoose")
const Joi = require("@hapi/joi")

const companySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 32
	},
	location: {
		type: String,
		maxlength: 16
	},
	info: {
		type: String,
		maxlength: 512
	},
	description: {
		type: String,
		maxlength: 2056
	},
	subjects: {
		type: Array
	},
	employments: {
		type: Array
	},
	tags: {
		type: Array
	},
	links: {
		type: Object
	}
})

const companyJoi = {
	name: Joi.string()
		.min(2)
		.max(32)
		.required(),
	info: Joi.string().max(512),
	description: Joi.string().max(2056),
	subjects: Joi.array(),
	employments: Joi.array(),
	tags: Joi.array(),
	links: Joi.object()
}

const locationJoi = {
	location: Joi.string().max(16)
}

module.exports = {
	Model: mongoose.model("companies", companySchema),
	attr: [
		["name", "location", "info", "description", "subjects", "employments", "links", "tags"],
		["_id", "name", "location", "info", "subjects", "tags"]
	],
	validateCompany: (company) => {
		return Joi.validate(company, companyJoi)
	},
	validateLocation: (location) => {
		return Joi.validate(location, locationJoi)
	}
}
