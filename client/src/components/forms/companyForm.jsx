import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Joi from "joi-browser"
import Form from "./form"

import service from "../../services/companyService"
import SimpleHeader from "../headers/simpleHeader"

const styles = (theme) => ({
	header: {
		margin: theme.spacing.unit * 2
	},
	container: {
		marginTop: theme.spacing.unit * 2
	},
	button: {
		margin: theme.spacing.unit * 2
	},
	filters: {
		marginTop: theme.spacing.unit * 2
	}
})

class CompanyForm extends Form {
	state = {
		isEditing: false,
		hasMounted: false,
		data: {
			name: "",
			info: "",
			location: "",
			description: "",
			categories: [],
			tags: [],
			links: {
				facebook: "",
				homepage: "",
				instagram: "",
				linkedin: "",
				twitter: "",
				xing: "",
				youtube: ""
			}
		},
		errors: {
			links: {}
		}
	}

	schema = {
		name: Joi.string()
			.min(3)
			.max(64)
			.required(),
		location: Joi.string()
			.min(3)
			.max(64)
			.required(),
		info: Joi.string()
			.min(5)
			.max(180)
			.required(),
		description: Joi.string()
			.min(5)
			.required(),
		categories: Joi.array(),
		tags: Joi.array(),
		links: Joi.object().pattern(/^/, Joi.string().allow(""))
	}

	async componentDidMount() {
		const { id } = this.props.match.params
		const { hasMounted } = this.props
		this.setState({ hasMounted })

		if (id) {
			const company = await service.getCompany(id)
			const data = { ...company }
			delete data._id
			this.setState({ isEditing: true, data })
		}
	}

	doSubmit = async () => {
		const { isEditing, data } = this.state
		console.log(data)
		try {
			if (isEditing) {
				const { id } = this.props.match.params
				await service.updateCompany(id, data)
			} else {
				await service.createCompany(data)
			}
			window.location = "/companies"
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				let errors = { ...this.state.erros }
				errors = ex.response.data
				this.setState({ errors })
			}
		}
	}

	render() {
		const { classes, filterData } = this.props
		const { isEditing, hasMounted } = this.state

		if (!hasMounted) {
			return (
				<React.Fragment>
					<SimpleHeader
						title={isEditing ? "Unternehmen bearbeiten" : "Unternehmen erstellen"}
					/>
				</React.Fragment>
			)
		} else {
			const { all: allFilters, labels: filterLabels } = filterData.filters

			return (
				<React.Fragment>
					<SimpleHeader
						title={isEditing ? "Unternehmen bearbeiten" : "Unternehmen erstellen"}
					/>

					<main>
						<form className={classes.container} onSubmit={this.handleSubmit}>
							{this.renderInput("name", "Name")}
							{this.renderInput("location", "Location")}
							{this.renderInput("info", "Info", "text", true)}
							{this.renderInput("description", "Description", "text", true)}
							{this.renderLink(classes)}
							{filterLabels.map((label) => (
								<div key={label[0]} className={classes.filters}>
									{this.renderCheckbox(label, allFilters[label[0]])}
								</div>
							))}
							{this.renderSecondaryButton("cancel", "cancel", "/companies", classes)}
							{this.renderPrimaryButton("save", "submit", classes)}
						</form>
					</main>
				</React.Fragment>
			)
		}
	}
}

CompanyForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyForm)
