import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Redirect } from "react-router-dom"

import Joi from "joi-browser"

import Form from "./form"
import auth from "../../services/authService"
import authService from "../../services/authService"

const styles = (theme) => ({
	buttonBox: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: theme.spacing(2)
	},
	button: {
		margin: theme.spacing(2),
		marginLeft: 0
	}
})

class LoginForm extends Form {
	state = {
		data: {
			email: "",
			password: ""
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
			.label("Password")
	}

	doSubmit = async () => {
		try {
			const { email, password } = this.state.data
			await auth.login(email, password)
			window.location = "/account"
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors }
				errors.email = ex.response.data
				this.setState({ errors })
			}
		}
	}

	render() {
		const { classes } = this.props

		return (
			<>
				{authService.getCurrentUser() && <Redirect to="/account" />}

				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Email")}
					{this.renderInput("password", "Passwort", "password")}
					<div className={classes.buttonBox}>
						{this.renderSecondaryAction("Registrieren", "/account/register", classes)}
						{this.renderSubmit("Login", classes)}
					</div>
				</form>
			</>
		)
	}
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginForm)
