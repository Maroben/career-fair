import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify"
import Joi from "joi-browser"

import Form from "./form"
import authService from "../../services/authService"
import { register, updateUser } from "../../services/userService"

import { CardActions } from "@material-ui/core"

const styles = (theme) => ({
	container: {
		marginTop: theme.spacing()
	},
	buttonBox: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: theme.spacing(2)
	},
	cardAction: {
		marginTop: theme.spacing(),
		justifyContent: "flex-end",
		padding: 0
	},
	button: {
		margin: theme.spacing(2),
		marginLeft: 0
	},
	info: {
		margin: theme.spacing()
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

	componentDidMount = () => {
		const { user } = this.props
		if (!user) return
		let data = {
			email: user.email,
			password: "",
			confirmPassword: ""
		}
		this.setState({ data })
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

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value }
		const schema = { [name]: this.schema[name] }
		const { error } = Joi.validate(obj, schema)

		if (name === "confirmPassword") {
			if (value !== this.state.data.password) {
				return "Not the same!"
			}
		}

		return error ? error.details[0].message : null
	}

	doSubmit = async () => {
		try {
			const { email, password } = this.state.data
			const { user } = this.props
			const res = user
				? await updateUser(user._id, { email, password })
				: await register(email, password)
			authService.loginWithJwt(res.headers["x-auth-token"])

			if (user) {
				this.props.onUpdateUser()
				toast.info("Update Erfolgreich", { autoClose: 2500 })
			} else {
				window.location = "/account"
			}
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				let errors = { ...this.state.errors }
				errors.email = ex.response.data
				this.setState({ errors })
			}
		}
	}

	render() {
		const { classes, onUpdateUser } = this.props
		return (
			<>
				{authService.getCurrentUser() && <Redirect to="/account" />}

				<form onSubmit={this.handleSubmit} className={classes.container}>
					{this.renderInput("email", "Email")}
					{this.renderInput("password", "Passwort", "password")}
					{this.renderInput("confirmPassword", "Passwort bestätigen", "password")}

					{this.props.user ? (
						<CardActions className={classes.cardAction}>
							{this.renderCancel("Cancel", classes, onUpdateUser)}
							{this.renderSubmit("Update", classes)}
						</CardActions>
					) : (
						<div className={classes.buttonBox}>
							{this.renderSecondaryAction("Login", "/account/login", classes)}
							{this.renderSubmit("Registrieren", classes)}
						</div>
					)}
				</form>
			</>
		)
	}
}

RegisterForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RegisterForm)
