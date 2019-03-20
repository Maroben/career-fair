import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import CompanyCard from "../cards/companyCard"
import InfiniteScroll from "react-infinite-scroll-component"
import CircularProgress from "@material-ui/core/CircularProgress"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const styles = (theme) => ({
	root: {
		width: "100%",
		maxWidth: 600
	},
	empty: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		margin: theme.spacing.unit * 2
	},
	progress: {
		margin: theme.spacing.unit * 2
	},
	container: {
		textAlign: "center",
		marginTop: 0
	},
	noMore: {
		marginBottom: theme.spacing.unit * 2
	}
})

const CompanyList = (props) => {
	const { classes, companies, user, count, emptyMessage, onDelete, onLoad } = props
	return (
		<InfiniteScroll
			dataLength={companies.length} //This is important field to render the next data
			next={onLoad}
			hasMore={companies.length < count}
			loader={
				<div className={classes.container}>
					<CircularProgress className={classes.progress} />
				</div>
			}
			endMessage={
				<Typography align="center" color="textSecondary" className={classes.noMore}>
					Keine weiteren Unternehmen.
				</Typography>
			}
		>
			{!emptyMessage && (
				<List className={classes.root}>
					{companies.map((company) => (
						<CompanyCard
							key={company.name}
							user={user}
							company={company}
							onDelete={onDelete}
						/>
					))}
				</List>
			)}

			{emptyMessage && (
				<Paper className={classes.empty} elevation={1}>
					<Typography variant="body1">{emptyMessage}</Typography>
				</Paper>
			)}
		</InfiniteScroll>
	)
}

CompanyList.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyList)
