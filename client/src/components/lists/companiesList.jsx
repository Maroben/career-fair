import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import SearchHeader from "../headers/searchHeader"
import CompaniesCardsList from "./companiesCardsList"
import ChipsSearchList from "./chipsSearchList"
import FilterDrawer from "../sideDrawers/filterDrawer"

import Fab from "@material-ui/core/Fab"
import Drawer from "@material-ui/core/Drawer"
import AddIcon from "@material-ui/icons/Add"

const styles = (theme) => ({
	fab: {
		position: "fixed",
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	}
})

class CompaniesList extends Component {
	state = {
		filterDrawerIsOpen: false
	}

	handleFilterDrawer = () => {
		this.setState({
			filterDrawerIsOpen: !this.state.filterDrawerIsOpen
		})
	}

	render() {
		const { filterDrawerIsOpen } = this.state
		const { classes, user, companies, labels, filterData, onEvents } = this.props
		const { active, labels: filterLabels } = filterData.filters

		const sideFilterDrawer = (
			<FilterDrawer
				labels={labels}
				filterData={filterData}
				onCheckboxSelect={onEvents.onCheckboxSelect}
				onCheckboxReset={onEvents.onCheckboxReset}
				onClose={this.handleFilterDrawer}
			/>
		)

		return (
			<React.Fragment>
				<Drawer open={filterDrawerIsOpen} onClose={this.handleFilterDrawer}>
					{sideFilterDrawer}
				</Drawer>

				<SearchHeader
					name={labels.title}
					value={filterData.searchQuery}
					onSearch={onEvents.onSearch}
					onFilterSelect={this.handleFilterDrawer}
				/>

				{filterLabels.map((filterLabel) => (
					<ChipsSearchList
						key={filterLabel[0]}
						items={active[filterLabel[0]]}
						labels={filterLabel}
						onDelete={onEvents.onCheckboxSelect}
					/>
				))}

				<CompaniesCardsList
					user={user}
					companies={companies}
					labels={labels}
					filterData={filterData}
					onEvents={onEvents}
				/>

				{user && (
					<Fab
						color="primary"
						className={classes.fab}
						component={Link}
						to={`${labels.path}/new`}
					>
						<AddIcon />
					</Fab>
				)}
			</React.Fragment>
		)
	}
}

CompaniesList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompaniesList)
