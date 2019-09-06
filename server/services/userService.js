const bcrypt = require("bcryptjs")
const _ = require("lodash")

const User = require("../models/User")

module.exports.getUsers = async (req, res) => {
	await User.Model.find()
		.then((users) => {
			users = users.map((user) => {
				return _.pick(user, User.attr[1])
			})
			res.send(users)
		})
		.catch((error) => {
			res.status(404).send(`No Users found ${error}`)
		})
}

module.exports.getUser = async (req, res) => {
	const _id = req.params.id

	await User.Model.findOne({ _id })
		.then((user) => {
			res.send(_.pick(user, User.attr[1]))
		})
		.catch((error) => {
			res.status(404).send(`User doesn't exist ${error}`)
		})
}

module.exports.createUser = async ({ body }, res) => {
	const { error } = User.validate(body)
	if (error) return res.status(400).send(error.details[0].message)

	const email = await User.Model.findOne({ email: body.email })
	if (email) {
		return res.status(400).send("This Email is already registered")
	}

	user = new User.Model(_.pick(body, User.attr[0]))
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	user.isAdmin = false
	user.company = null

	await user
		.save()
		.then((user) => {
			res.header("x-auth-token", user.generateAuthToken())
				.header("access-control-expose-headers", "x-auth-token")
				.send(_.pick(user, User.attr[1]))
		})
		.catch((error) => {
			res.status(500).send(`An unexpected Error occured ${error}`)
		})
}

module.exports.updateUser = async (req, res) => {
	const { error } = User.validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let user = _.pick(req.body, User.attr[0])
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)

	await User.Model.findOneAndUpdate({ _id: req.params.id }, user)
		.then((user) => {
			res.send(_.pick(user, User.attr[1]))
		})
		.catch((error) => {
			res.status(404).send(`The selected user doesn't exist ${error}`)
		})
}

module.exports.deleteUser = async (req, res) => {
	await User.Model.findOneAndRemove({ _id: req.params.id })
		.then((user) => {
			res.send(_.pick(user, User.attr[1]))
		})
		.catch((error) => {
			res.status(404).send(`The selected user doesn't exist ${error}`)
		})
}

module.exports.loginUser = async ({ body }, res) => {
	const { error } = User.validate(body)
	if (error) return res.status(400).send(error.details[0].message)

	let user = await User.Model.findOne({ email: body.email })
	if (!user) return res.status(400).send("Invalid email or password.")

	const validPassword = await bcrypt.compare(body.password, user.password)
	if (!validPassword) return res.status(400).send("Invalid email or password.")

	res.header("x-auth-token", user.generateAuthToken())
		.header("access-control-expose-headers", "x-auth-token")
		.send(_.pick(user, User.attr[1]))
}
