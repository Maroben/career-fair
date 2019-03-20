import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Joi from "joi-browser"
import Form from "./form"

import CompanyHeader from "../headers/companyHeader"
import service from "../../services/companyService"
import { getAllFilters } from "../../utils/filtering"

const styles = (theme) => ({
	header: {
		margin: theme.spacing.unit * 2
	},
	button: {
		margin: theme.spacing.unit * 2
	}
})

class CompanyForm extends Form {
	state = {
		exist: false,
		data: {
			name: "",
			info: "",
			description: "",
			categories: [],
			tags: [],
			links: []
		},
		errors: {},
		companies: {
			// all possible tags and categories
			categories: [],
			tags: []
		}
	}

	schema = {
		name: Joi.string()
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
		links: Joi.array()
	}

	async componentDidMount() {
		const { id } = this.props.match.params

		const companies = await service.getCompanies()
		const categories = getAllFilters(companies, "categories")
		const tags = getAllFilters(companies, "tags")
		this.setState({ companies: { categories, tags } })

		if (id) {
			const company = await service.getCompany(id)
			this.handleEdit(company)
		}
	}

	handleEdit = (company) => {
		company = {
			name: company.name,
			info: company.info,
			description: company.description,
			categories: company.categories,
			tags: company.tags,
			links: company.links
		}
		this.setState({ exist: true, data: company })
	}

	doSubmit = async () => {
		const { exist } = this.state
		try {
			if (exist) {
				const { id } = this.props.match.params
				await service.updateCompany(id, this.state.data)
			} else {
				await service.createCompany(this.state.data)
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
		const { name } = this.state.data
		const { categories, tags } = this.state.companies
		const { classes } = this.props

		return (
			<React.Fragment>
				<CompanyHeader label={name} isEditing={true} />
				<main>
					<form className={classes.container} onSubmit={this.handleSubmit}>
						{this.renderInput("name", "Name")}
						{this.renderInput("info", "Info", "text", true)}
						{this.renderInput("description", "Description", "text", true)}
						{this.renderCheckbox("categories", "Categories", categories)}
						{this.renderCheckbox("tags", "Tags", tags)}
						{this.renderSecondaryButton("cancel", "cancel", "/companies", classes)}
						{this.renderPrimaryButton("save", "submit", classes)}
					</form>
				</main>
			</React.Fragment>
		)
	}
}

CompanyForm.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyForm)
