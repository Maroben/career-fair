const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const config = require("config")
const Joi = require("@hapi/joi")
const Company = require("./Company")

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		maxlength: 255
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	isAdmin: Boolean,
	company: Company.schema
})

const userJoi = {
	email: Joi.string()
		.min(6)
		.max(255)
		.required()
		.email(),
	password: Joi.string()
		.min(5)
		.max(255)
		.required()
}

userSchema.methods.generateAuthToken = (user) => {
	return jwt.sign(
		{ _id: user._id, email: user.email, isAdmin: user.isAdmin },
		config.get("jwtPrivateKey")
	)
}

module.exports = {
	Model: mongoose.model("users", userSchema),
	attr: [["email", "password"], ["_id", "email", "isAdmin", "company"]],
	validate: (user) => {
		return Joi.validate(user, userJoi)
	}
}
