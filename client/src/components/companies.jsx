import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import _ from "lodash"
import { toast } from "react-toastify"

import { filtering, getAllFilters, searching } from "../utils/filtering"
import { getCompanies, deleteCompany } from "../services/companyService"
import auth from "../services/authService"
import CompaniesHeader from "./headers/companiesHeader"
import CompanyList from "./lists/companyList"
import FilterDrawer from "./sideDrawer/filterDrawer"

import Drawer from "@material-ui/core/Drawer"
import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		margin: theme.spacing.unit * 2
	},
	container: {
		margin: theme.spacing.unit * 2,
		marginBottom: 0
	},
	buttonMore: {
		width: 200,
		textAlign: "center"
	},
	button: {
		margin: theme.spacing.unit
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	}
})

class Companies extends Component {
	state = {
		filterDrawerIsOpen: false,
		companies: [],
		categories: [],
		activeCategories: [],
		tags: [],
		activeTags: [],
		displaySize: 7,
		totalContentCount: 7,
		emptyMessage: "",
		searchAttributes: ["name", "info"],
		searchQuery: ""
	}

	async componentDidMount() {
		const user = await auth.getCurrentUser()
		const companies = await getCompanies()
		const categories = getAllFilters(companies, "categories")
		const tags = getAllFilters(companies, "tags")
		this.setState({ user, companies, categories, tags })
	}

	handleDelete = async (id) => {
		const companies = this.state.companies
		const deleted = companies.filter((company) => company._id !== id)
		this.setState({ companies: deleted })

		await deleteCompany(id)
			.then(() => {
				toast.info("Company deleted", { autoClose: 1500 })
			})
			.catch((error) => {
				toast.error("An unexpected Error occurred!")
				this.setState({ companies })
			})
	}

	handleContentLoader = () => {
		const { totalContentCount, displaySize } = this.state
		let newContentCount = totalContentCount + displaySize
		this.setState({ totalContentCount: newContentCount })
	}

	handleSearch = (e) => {
		this.setState({
			searchQuery: e.target.value,
			totalContentCount: this.state.displaySize
		})
	}

	handleCheckboxSelect = (label, badge) => {
		const active = _.xor(this.state[label], [badge])
		this.setState({
			[label]: active,
			totalContentCount: this.state.displaySize
		})
	}

	handleCheckboxReset = () => {
		this.setState({
			activeCategories: [],
			activeTags: [],
			totalContentCount: this.state.displaySize
		})
	}

	handleDrawerToggle = () => {
		this.setState({
			filterDrawerIsOpen: !this.state.filterDrawerIsOpen
		})
	}

	getPageData = () => {
		const {
			companies,
			totalContentCount,
			activeCategories,
			activeTags,
			searchAttributes,
			searchQuery
		} = this.state

		let companiesFiltered =
			activeCategories.length > 0
				? filtering(companies, "categories", activeCategories)
				: companies

		companiesFiltered =
			activeTags.length > 0 ? filtering(companies, "tags", activeTags) : companies

		if (searchQuery) {
			companiesFiltered = searching(companiesFiltered, searchAttributes, searchQuery)
		}

		let emptyMessage = ""
		if (emptyMessage.length === 0 && companiesFiltered.length === 0) {
			emptyMessage = "Es wurde kein Unternehmen gefunden."
		}

		const companiesDisplayed = _(companiesFiltered)
			.slice(0)
			.take(totalContentCount)
			.value()

		return {
			companiesDisplayed,
			emptyMessage,
			count: companiesFiltered.length
		}
	}

	render() {
		const { user, searchQuery, categories, activeCategories, tags, activeTags } = this.state

		const { classes } = this.props

		const { companiesDisplayed, emptyMessage, count } = this.getPageData()

		const sideFilters = (
			<FilterDrawer
				count={count}
				categories={categories}
				activeCategories={activeCategories}
				tags={tags}
				activeTags={activeTags}
				onCheckboxSelect={this.handleCheckboxSelect}
				onCheckboxReset={this.handleCheckboxReset}
				onClose={this.handleDrawerToggle}
			/>
		)

		return (
			<React.Fragment>
				<CompaniesHeader
					name="HSR Stellenbörse"
					value={searchQuery}
					onSearch={this.handleSearch}
					onFilterSelect={this.handleDrawerToggle}
				/>
				<main>
					<Drawer open={this.state.filterDrawerIsOpen} onClose={this.handleDrawerToggle}>
						<div>{sideFilters}</div>
					</Drawer>

					<Typography align="center" color="textSecondary" className={classes.container}>
						{`${count} Unternehmen`}
					</Typography>

					<CompanyList
						companies={companiesDisplayed}
						user={user}
						count={count}
						emptyMessage={emptyMessage}
						onDelete={this.handleDelete}
						onLoad={this.handleContentLoader}
					/>

					{user && user.isAdmin && (
						<Fab
							color="secondary"
							aria-label="Add"
							className={classes.fab}
							component={Link}
							to="/companies/new"
						>
							<AddIcon />
						</Fab>
					)}
				</main>
			</React.Fragment>
		)
	}
}

Companies.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Companies)
