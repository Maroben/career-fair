import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import Icons from "../common/icons"
import SimpleHeader from "../headers/simpleHeader"

import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

const styles = (theme) => ({
	root: {
		margin: theme.spacing.unit * 2
	},
	container: {
		margin: theme.spacing.unit
	},
	body: {
		marginBottom: theme.spacing.unit * 2
	},
	items: {
		display: "flex",
		justifyContent: "start",
		flexWrap: "wrap",
		marginBottom: theme.spacing.unit * 2
	},
	item: {
		marginRight: theme.spacing.unit
	}
})

const CompanyDetails = (props) => {
	const { classes, match, companies, hasMounted, filterLabels } = props
	const { id } = match.params
	let company = companies.filter((c) => c._id === id)

	// somehow if I don't scroll to the top the position will be at the lowest possible position, as in the list view.
	window.scrollTo(0, 0)

	if (!hasMounted)
		return (
			<React.Fragment>
				<SimpleHeader title={"Company"} />
			</React.Fragment>
		)
	else if (hasMounted && company.length === 0) return (window.location = "/404")
	else {
		company = company[0]
		const linkKeys = Object.keys(company.links)

		return (
			<React.Fragment>
				<SimpleHeader title={company.name} />

				<div className={classes.root}>
					<Typography variant="h5" className={classes.body}>
						{company.location}
					</Typography>

					<Typography variant="body1" color="textPrimary" className={classes.body}>
						{company.info}
					</Typography>
					<Typography variant="body1" color="textPrimary" className={classes.body}>
						{company.description}
					</Typography>

					<div className={classes.items}>
						{linkKeys.map((key) =>
							company.links[key].length === 0 ? null : (
								<Link key={key} href={company.links[key]} target={"_blank"}>
									<Icons name={key} />
								</Link>
							)
						)}
					</div>

					{filterLabels.map((labels) =>
						company[labels[0]].length === 0 ? null : (
							<div key={labels[0]}>
								<Typography color="textPrimary" variant="subtitle1">
									{labels[1]}
								</Typography>
								<div className={classes.items}>
									{company[labels[0]].map((filter) => (
										<Typography
											key={filter}
											color="textSecondary"
											className={classes.item}
										>
											{filter}
										</Typography>
									))}
								</div>
							</div>
						)
					)}
				</div>
			</React.Fragment>
		)
	}
}

CompanyDetails.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyDetails)
