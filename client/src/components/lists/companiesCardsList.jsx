import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import InfiniteScroll from "react-infinite-scroll-component"

import CompanyCard from "../cards/companyCard"

import List from "@material-ui/core/List"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

const styles = (theme) => ({
	root: {
		width: "100%",
		[theme.breakpoints.up("md")]: {
			display: "flex",
			flexWrap: "wrap"
		}
	},
	container: {
		margin: theme.spacing(2),
		marginBottom: 0
	},
	empty: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		margin: theme.spacing(2)
	},
	progress: {
		margin: theme.spacing(2)
	},
	noMore: {
		marginBottom: theme.spacing(2)
	},
	button: {
		marginTop: theme.spacing()
	}
})

const CompaniesCardsList = (props) => {
	const { classes, user, companies, labels, filterData, onEvents } = props

	return (
		<InfiniteScroll
			dataLength={filterData.displaySize}
			next={onEvents.onLoad}
			hasMore={filterData.displaySize < companies.length}
			loader={
				<div className={classes.container}>
					<CircularProgress className={classes.progress} />
				</div>
			}
		>
			{!labels.messages.isEmptyError && (
				<React.Fragment>
					<List className={classes.root}>
						{filterData.companies.map((company) => (
							<CompanyCard
								key={company._id}
								user={user}
								company={company}
								labels={labels}
								filterData={filterData}
								onDelete={onEvents.onDelete}
							/>
						))}
					</List>
				</React.Fragment>
			)}

			{labels.messages.isEmptyError && (
				<Paper className={classes.empty} elevation={1}>
					<Typography variant="body1">{labels.messages.isEmptyError}</Typography>
					<Button color="primary" className={classes.button} onClick={onEvents.onReset}>
						Reset Filters
					</Button>
				</Paper>
			)}
		</InfiniteScroll>
	)
}

CompaniesCardsList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompaniesCardsList)
