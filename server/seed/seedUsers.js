const { User } = require("../services/userService")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const config = require("config")

const users = [
	{
		name: "Admin",
		email: "admin@admin.io",
		password: "admin1234"
	},
	{
		name: "Userino",
		email: "user@user.io",
		password: "user1234"
	}
]

async function createUser(user) {
	user = new User(user)
	let salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	await user.save()
}

async function seed() {
	mongoose
		.connect(config.db, {
			useNewUrlParser: true,
			useCreateIndex: true
		})
		.then(() => console.info("Connected to MongoDB ..."))
		.catch((error) => console.error("Could not connect to MongoDB ..."))

	await User.deleteMany({})

	users.map(async (user) => await createUser(user))
}

seed()
