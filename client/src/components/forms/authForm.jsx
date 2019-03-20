import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Redirect } from "react-router-dom"
import Joi from "joi-browser"

import CompanyHeader from "../headers/companyHeader"

import Form from "./form"
import auth from "../../services/authService"

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		margin: theme.spacing.unit * 2
	},
	button: {
		margin: theme.spacing.unit * 2
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
			.min(5)
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
			const { data } = this.state
			await auth.login(data.email, data.password)

			const { state } = this.props
			window.location = state ? state.from.pathname : "/companies"
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors }
				errors.email = ex.response.data
				this.setState({ errors })
			}
		}
	}

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />

		const { classes } = this.props

		return (
			<React.Fragment>
				<CompanyHeader label="Login" />

				<form onSubmit={this.handleSubmit} className={classes.root}>
					{this.renderInput("email", "Email")}
					{this.renderInput("password", "Password", "password")}
					{this.renderPrimaryButton("Login", "submit", classes)}
				</form>
			</React.Fragment>
		)
	}
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoginForm)
