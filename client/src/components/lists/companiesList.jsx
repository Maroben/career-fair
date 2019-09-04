import React, { useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import SearchHeader from "../headers/searchHeader"
import CompaniesCardsList from "./companiesCardsList"
import FilterDrawer from "../sideDrawers/filterDrawer"
import FloorMap from "../FloorMap"

import Fab from "@material-ui/core/Fab"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"
import Chip from "@material-ui/core/Chip"
import AddIcon from "@material-ui/icons/Add"
import Switch from "@material-ui/core/Switch"

import ListIcon from "@material-ui/icons/List"
import MapIcon from "@material-ui/icons/Map"
const ViewSwitch = withStyles((theme) => ({
	switchBase: {
		color: theme.palette.primary.main
	},
	track: {
		backgroundColor: theme.palette.primary.light
	}
}))(Switch)

const drawerWidth = 300
const styles = (theme) => ({
	container: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2)
	},
	content: {
		[theme.breakpoints.up("md")]: {
			marginLeft: drawerWidth,
			paddingLeft: theme.spacing(2)
		}
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2)
	},
	drawer: {
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	view: {
		margin: theme.spacing(2),
		textAlign: "center"
	},
	viewIcon: {
		verticalAlign: "middle"
	},
	viewSwitch: {
		colorPrimary: "red"
	}
})

const CompaniesList = (props) => {
	const { classes, theme, user, companies, labels, filterData, onEvents } = props
	const { active, labels: filterLabels } = filterData.filters

	const [drawer, setDrawer] = useState(false)
	const [view, setView] = React.useState(false)

	const sideFilterDrawer = (
		<FilterDrawer
			labels={labels}
			filterData={filterData}
			onCheckboxSelect={onEvents.onCheckboxSelect}
			onCheckboxReset={onEvents.onCheckboxReset}
			onClose={() => setDrawer(false)}
		/>
	)

	return (
		<div className={classes.root}>
			<SearchHeader
				name={labels.title}
				value={filterData.searchQuery}
				onSearch={onEvents.onSearch}
				onFilterSelect={() => setDrawer(!drawer)}
			/>

			<nav className={classes.drawer}>
				<Hidden mdUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={drawer}
						onClose={() => setDrawer(false)}
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
				<div className={classes.view}>
					<MapIcon className={classes.viewIcon} /> Karte
					<ViewSwitch checked={view} onChange={() => setView(!view)} />
					<ListIcon className={classes.viewIcon} /> Liste
				</div>

				{filterData.search.query && (
					<Chip
						label={`Suche: ${filterData.search.query}`}
						variant={"default"}
						className={classes.container}
						onDelete={onEvents.onSearchDelete}
					/>
				)}

				{filterLabels.map((filterLabel) => (
					<React.Fragment key={filterLabel}>
						{active[filterLabel[0]].map((filter) => (
							<Chip
								key={`${filterLabel}${filter}`}
								label={filter}
								variant={"default"}
								className={classes.container}
								onDelete={() => onEvents.onCheckboxSelect(filterLabel[0], filter)}
							/>
						))}
					</React.Fragment>
				))}

				{view ? (
					<CompaniesCardsList
						user={user}
						companies={companies}
						labels={labels}
						filterData={filterData}
						onEvents={onEvents}
					/>
				) : (
					<FloorMap />
				)}

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

CompaniesList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CompaniesList)
