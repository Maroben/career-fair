import React from "react"
import Joi from "joi-browser"
import Form from "./form"
import auth from "../../services/authService"

import { createUser, getUser } from "../../services/userService"

class RegisterForm extends Form {
	state = {
		data: {
			name: "",
			password: "",
			email: ""
		},
		errors: {},
		page: {
			title: "Neuen Benutzer hinzufügen.",
			cancel: "Abbrechen",
			save: "Hinzufügen",
			password: "Password"
		}
	}

	schema = {
		name: Joi.string()
			.min(5)
			.max(64)
			.required()
			.label("Username"),
		email: Joi.string()
			.min(6)
			.max(255)
			.required()
			.email()
			.label("Email"),
		password: Joi.string()
			.min(5)
			.max(255)
			.required()
			.label("Password")
	}

	async componentDidMount() {
		const { id } = this.props.match.params
		if (id) {
			console.log(id)
			const user = await getUser(id)
			this.handleEdit(user)
		}
	}

	handleEdit = function(user) {
		user = { name: user.name, email: user.email, password: "" }
		const page = {
			title: "Benutzer bearbeiten",
			cancel: "Abbrechen",
			save: "Änderungen speichern",
			password: "Neues Password"
		}

		this.setState({ data: user, page })
	}

	doSubmit = async () => {
		try {
			const response = await createUser(this.state.data)
			auth.loginWithJwt(response.headers["x-auth-token"])
			window.location = "/users"
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				let errors = { ...this.state.erros }
				errors = ex.response.data
				this.setState({ errors })
			}
		}
	}

	render() {
		const { title, cancel, save, password } = this.state.page
		const { classes } = this.props
		return (
			<div>
				<h3>{title}</h3>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Email")}
					{this.renderInput("password", password, "password")}
					{/* {this.renderSecondaryButton(cancel, "/admin/users", classes)} */}
					{this.renderPrimaryButton(save, "text", classes)}
				</form>
			</div>
		)
	}
}

export default RegisterForm
