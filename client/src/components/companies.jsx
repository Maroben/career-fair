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
		companiesFiltered: [],
		companiesDisplayed: [],
		categories: [],
		activeCategories: [],
		tags: [],
		activeTags: [],
		loadingSize: 7,
		displaySize: 7,
		isEmptyErrorMessage: "",
		searchAttributes: ["name", "info"],
		searchQuery: ""
	}

	componentDidMount() {
		if (localStorage.hasOwnProperty("companiesState")) return this.getLocalStorage()
		return this.initializeData()
	}

	initializeData = async () => {
		const user = await auth.getCurrentUser()
		const companies = await getCompanies()
		const categories = getAllFilters(companies, "categories")
		const activeCategories = []
		const tags = getAllFilters(companies, "tags")
		const activeTags = []
		const displaySize = 7

		this.setState({
			user,
			companies,
			categories,
			activeCategories,
			tags,
			activeTags,
			displaySize
		})

		await this.setPageData()
	}

	setPageData() {
		let {
			companies,
			displaySize,
			activeCategories,
			activeTags,
			searchAttributes,
			searchQuery,
			isEmptyErrorMessage
		} = this.state

		let companiesFiltered =
			activeCategories.length > 0 || activeTags.length > 0
				? filtering(companies, ["categories", "tags"], [activeCategories, activeTags])
				: companies

		if (searchQuery) {
			companiesFiltered = searching(companiesFiltered, searchAttributes, searchQuery)
		}

		if (companiesFiltered.length === 0) {
			isEmptyErrorMessage = "Es wurde kein Unternehmen gefunden."
		}

		const companiesDisplayed = _(companiesFiltered)
			.slice(0)
			.take(displaySize)
			.value()

		this.setState({
			companiesFiltered,
			companiesDisplayed,
			isEmptyErrorMessage
		})

		this.setLocalStorage()
	}

	getLocalStorage = () => {
		const {
			companies,
			companiesFiltered,
			companiesDisplayed,
			categories,
			activeCategories,
			tags,
			activeTags,
			displaySize,
			isEmptyErrorMessage
		} = JSON.parse(localStorage.getItem("companiesState"))

		this.setState({
			companies,
			companiesFiltered,
			companiesDisplayed,
			categories,
			activeCategories,
			tags,
			activeTags,
			displaySize,
			isEmptyErrorMessage
		})
	}

	setLocalStorage = () => {
		const companiesState = _.pick(this.state, [
			"companies",
			"companiesFiltered",
			"companiesDisplayed",
			"categories",
			"activeCategories",
			"tags",
			"activeTags",
			"displaySize",
			"isEmptyErrorMessage"
		])

		localStorage.setItem("companiesState", JSON.stringify(companiesState))
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
		const { displaySize, loadingSize } = this.state
		let newContentCount = displaySize + loadingSize
		this.setState({ displaySize: newContentCount })
		this.setPageData()
	}

	handleSearch = async (e) => {
		await this.setState({
			searchQuery: e.target.value,
			displaySize: this.state.loadingSize
		})
		this.setPageData()
	}

	handleCheckboxSelect = async (label, badge) => {
		const active = _.xor(this.state[label], [badge])
		await this.setState({
			[label]: active,
			displaySize: this.state.loadingSize
		})
		this.setPageData()
	}

	handleCheckboxReset = async () => {
		await this.setState({
			activeCategories: [],
			activeTags: [],
			displaySize: this.state.loadingSize
		})
		this.setPageData()
	}

	handleDrawerToggle = async () => {
		await this.setState({
			filterDrawerIsOpen: !this.state.filterDrawerIsOpen
		})
		if (this.state.filterDrawerIsOpen) {
			this.setPageData()
		}
	}

	render() {
		const {
			user,
			companiesFiltered,
			companiesDisplayed,
			searchQuery,
			categories,
			activeCategories,
			tags,
			activeTags,
			isEmptyErrorMessage
		} = this.state

		const { classes } = this.props

		const sideFilters = (
			<FilterDrawer
				count={companiesFiltered.length}
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
						{`${companiesFiltered.length} Unternehmen`}
					</Typography>

					<CompanyList
						companies={companiesDisplayed}
						user={user}
						count={companiesFiltered.length}
						isEmptyErrorMessage={isEmptyErrorMessage}
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
