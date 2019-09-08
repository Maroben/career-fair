import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import Joi from "joi-browser"

import Form from "./form"
import authService from "../../services/authService"
import { register } from "../../services/userService"
import { Typography } from "@material-ui/core"

const styles = (theme) => ({
	buttonBox: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		margin: theme.spacing(2),
		marginLeft: 0
	},
	info: {
		margin: theme.spacing(2)
	}
})

class RegisterForm extends Form {
	state = {
		data: {
			email: "",
			password: "",
			confirmPassword: ""
		},
		errors: {}
	}

	schema = {
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
			.label("Password"),
		confirmPassword: Joi.string()
			.min(5)
			.max(255)
			.required()
			.label("ConfirmPassword")
	}

	doSubmit = async () => {
		try {
			const { email, password } = this.state.data
			const response = await register(email, password)
			authService.loginWithJwt(response.headers["x-auth-token"])
			window.location = "/account"
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				let errors = { ...this.state.errors }
				errors = ex.response.data
				this.setState({ errors })
			}
		}
	}

	render() {
		const { classes } = this.props
		return (
			<>
				<Typography className={classes.info}>
					Teilnehmende Unternehmen können sich hier registrieren.
				</Typography>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Email")}
					{this.renderInput("password", "Passwort", "password")}
					{this.renderInput("confirmPassword", "Passwort bestätigen", "password")}
					<div className={classes.buttonBox}>
						{this.renderSecondaryAction("Login", "/account/login", classes)}
						{this.renderSubmit("Registrieren", classes)}
					</div>
				</form>
			</>
		)
	}
}

RegisterForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RegisterForm)
