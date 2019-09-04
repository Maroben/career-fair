import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import _ from "lodash"

import auth from "../services/authService"
import service from "../services/companyService"
import CompanyForm from "./forms/companyForm"
import ProtectedRoute from "./common/protectedRoute"
import { filtering, getAllFilters, searching } from "../utils/filtering"

import CompaniesList from "./lists/companiesList"
import CompanyDetails from "./details/companyDetails"

class Companies extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			companies: [],
			hasMounted: false,
			filterData: {
				companies: [],
				filterCount: 0,
				displaySize: 15,
				loadingSize: 15,
				search: {
					query: "",
					attr: ["name", "info", "description", "subjects", "employment", "tags"]
				},
				filters: {
					all: {
						subjects: [],
						employment: [],
						tags: []
					},
					displayed: {
						subjects: [],
						employment: [],
						tags: []
					},
					active: {
						subjects: [],
						employment: [],
						tags: []
					},
					labels: [
						["subjects", "Studiengänge"],
						["employment", "Anstellungsart"],
						["tags", "Kategorien"]
					]
				}
			},
			messages: {
				isEmptyError: ""
			}
		}
	}

	async componentDidMount() {
		const user = await auth.getCurrentUser()
		const companies = await service.getCompanies()

		let { filterData, hasMounted } = this.state
		let { all: allFilters, labels } = filterData.filters

		filterData.companies = companies
		labels.map((label) => (allFilters[label[0]] = getAllFilters(companies, label[0])))

		filterData.filters.all = allFilters
		filterData.filters.displayed = allFilters
		hasMounted = true

		await this.setState({ user, companies, hasMounted, filterData })
		this.handleData()
	}

	handleData = () => {
		let { companies, filterData, messages } = this.state
		let { filters, search } = filterData
		let { labels, displayed } = filters

		let companiesFiltered = filtering(companies, filters)

		companiesFiltered = searching(companiesFiltered, search)
		const filterCount = companiesFiltered.length

		labels.map((label) => (displayed[label[0]] = getAllFilters(companiesFiltered, label[0])))
		filterData.filters.displayed = displayed

		messages.isEmptyError = filterCount === 0 ? "Es wurden keine Unternehmen gefunden." : ""

		companiesFiltered = _(companiesFiltered)
			.slice(0)
			.take(filterData.displaySize)
			.value()

		filterData.companies = companiesFiltered
		filterData.filterCount = filterCount

		this.setState({ filterData, messages })
	}

	handleDelete = async (id) => {
		const { companies } = this.state
		const deleted = companies.filter((company) => company._id !== id)
		await this.setState({ companies: deleted })
		this.handleData()

		await service.deleteCompany(id).catch(() => {
			this.setState({ companies })
			this.handleData()
		})
	}

	handleSearch = async (event) => {
		let { filterData } = this.state

		filterData.search.query = event.target.value
		filterData.displaySize = filterData.loadingSize

		await this.setState({ filterData })
		this.handleData()
	}

	handleSearchDelete = async () => {
		let { filterData } = this.state

		filterData.search.query = ""
		filterData.displaySize = filterData.loadingSize

		await this.setState({ filterData })
		this.handleData()
	}

	handleContentLoader = async () => {
		let { filterData } = this.state

		filterData.displaySize += filterData.loadingSize

		await this.setState({ filterData })
		this.handleData()
	}

	handleCheckboxSelect = async (label, badge) => {
		let { filterData } = this.state
		filterData.filters.active[label] = _.xor(filterData.filters.active[label], [badge])
		filterData.displaySize = filterData.loadingSize

		await this.setState({ filterData })
		this.handleData()
	}

	handleCheckboxReset = async () => {
		let { filterData } = this.state
		let { active, labels } = filterData.filters

		for (let i = 0; i < labels.length; i++) {
			active[labels[i][0]] = []
		}

		filterData.filters.active = active
		filterData.displaySize = filterData.loadingSize

		await this.setState({ filterData })
		this.handleData()
	}

	handleReset = async () => {
		this.handleCheckboxReset()
		this.handleSearchDelete()
	}

	render() {
		const { user, companies, hasMounted, filterData, messages } = this.state

		const labels = {
			messages: messages,
			title: "HSR Stellenbörse",
			path: "/companies"
		}

		const onEvents = {
			onReset: this.handleReset,
			onDelete: this.handleDelete,
			onSearch: this.handleSearch,
			onSearchDelete: this.handleSearchDelete,
			onLoad: this.handleContentLoader,
			onCheckboxSelect: this.handleCheckboxSelect,
			onCheckboxReset: this.handleCheckboxReset
		}

		return (
			<Switch>
				<ProtectedRoute
					path="/companies/edit/:id"
					user={user}
					adminRequired={false}
					render={(props) => (
						<CompanyForm
							{...props}
							hasMounted={hasMounted}
							isEditing={true}
							filterData={filterData}
						/>
					)}
				/>
				<ProtectedRoute
					path="/companies/new"
					user={user}
					adminRequired={false}
					render={(props) => (
						<CompanyForm
							{...props}
							hasMounted={hasMounted}
							isEditing={false}
							filterData={filterData}
						/>
					)}
				/>
				<Route
					path="/companies/:id"
					render={(props) => (
						<CompanyDetails
							{...props}
							companies={companies}
							hasMounted={hasMounted}
							filterLabels={filterData.filters.labels}
						/>
					)}
				/>
				<Route
					path="/companies"
					render={(props) => (
						<CompaniesList
							{...props}
							user={user}
							companies={companies}
							labels={labels}
							filterData={filterData}
							onEvents={onEvents}
						/>
					)}
				/>
			</Switch>
		)
	}
}

export default Companies
