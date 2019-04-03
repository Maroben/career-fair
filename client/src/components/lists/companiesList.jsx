import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import SearchHeader from "../headers/searchHeader"
import CompaniesCardsList from "./companiesCardsList"
import ChipsSearchList from "./chipsSearchList"
import FilterDrawer from "../sideDrawers/filterDrawer"

import Fab from "@material-ui/core/Fab"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"
import Chip from "@material-ui/core/Chip"
import AddIcon from "@material-ui/icons/Add"

const drawerWidth = 300

const styles = (theme) => ({
	container: {
		margin: theme.spacing.unit * 2
	},
	content: {
		[theme.breakpoints.up("md")]: {
			marginLeft: drawerWidth,
			paddingLeft: theme.spacing.unit * 2
		}
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	drawer: {
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			flexShrink: 0
		}
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
		const { classes, theme, user, companies, labels, filterData, onEvents } = this.props
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
			<div className={classes.root}>
				<SearchHeader
					name={labels.title}
					value={filterData.searchQuery}
					onSearch={onEvents.onSearch}
					onFilterSelect={this.handleFilterDrawer}
				/>

				<nav className={classes.drawer}>
					<Hidden mdUp implementation="css">
						<Drawer
							variant="temporary"
							anchor={theme.direction === "rtl" ? "right" : "left"}
							open={filterDrawerIsOpen}
							onClose={this.handleFilterDrawer}
						>
							{sideFilterDrawer}
						</Drawer>
					</Hidden>
					<Hidden smDown implementation="css">
						<Drawer variant="permanent" open>
							{sideFilterDrawer}
						</Drawer>
					</Hidden>
				</nav>

				<main className={classes.content}>
					{filterData.search.query && (
						<Chip
							label={`Suche: ${filterData.search.query}`}
							variant={"default"}
							className={classes.container}
							onDelete={onEvents.onSearchDelete}
						/>
					)}

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
				</main>
			</div>
		)
	}
}

CompaniesList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CompaniesList)
