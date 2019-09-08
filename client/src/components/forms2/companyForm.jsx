import React from "react"
import global from "./../../utils/global"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Joi from "joi-browser"
import Form from "./form"
import { CardActions } from "@material-ui/core"

import companyService from "../../services/companyService"
import { toast } from "react-toastify"

const styles = (theme) => ({
	container: {
		margin: theme.spacing(2)
	},
	cardAction: {
		margin: theme.spacing(2),
		justifyContent: "flex-end",
		padding: 0
	},
	buttonList: {
		margin: theme.spacing(2)
	},
	button: {
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}
})

class CompanyForm extends Form {
	state = {
		data: {
			name: "",
			info: "",
			description: ""
			// subjects: [],
			// employments: [],
			// tags: [],
			// links: {
			// 	homepage: "",
			// 	linkedin: "",
			// 	xing: "",
			// 	facebook: "",
			// 	instagram: "",
			// 	twitter: "",
			// 	youtube: ""
			// }
		},
		errors: {}
	}

	schema = {
		name: Joi.string()
			.min(2)
			.max(32)
			.required(),
		info: Joi.string().max(512),
		description: Joi.string().max(2056)
	}

	doSubmit = async () => {
		const { data } = this.state

		try {
			await companyService.createCompany(data)
			this.props.onSubmit()
			toast.info("Erfolgreich", { autoClose: 2500 })
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				let errors = { ...this.state.erros }
				errors = ex.response.data
				toast.errors(errors)
			}
		}
	}

	render() {
		const { classes, onSubmit } = this.props

		return (
			<form onSubmit={this.handleSubmit}>
				{this.renderInput("name", "Name")}
				{this.renderInput("info", "Info", "text", true)}
				{this.renderInput("description", "Beschreibung", "text", true)}

				{/* 
				{labels.map((label) => (
					<div key={label[0]} className={classes.filters}>
						{this.renderCheckbox(label, allFilters[label[0]])}
					</div>
				))} */}

				<CardActions className={classes.cardAction}>
					{this.renderCancel("Abbrechen", classes, onSubmit)}
					{this.renderSubmit("Erstellen", classes)}
				</CardActions>
			</form>
		)
	}
}

CompanyForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyForm)
