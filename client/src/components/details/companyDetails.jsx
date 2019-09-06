import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import service from "../../services/companyService"

import Icons from "../common/icons"
import BackHeader from "../headers/backHeader"

import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

const styles = (theme) => ({
	root: {
		margin: theme.spacing(2)
	},
	container: {
		margin: theme.spacing()
	},
	body: {
		marginBottom: theme.spacing(2)
	},
	items: {
		display: "flex",
		justifyContent: "start",
		flexWrap: "wrap",
		marginBottom: theme.spacing(2)
	},
	item: {
		marginRight: theme.spacing()
	}
})

class CompanyDetails extends Component {
	state = {
		company: null,
		linkKeys: [],
		hasMounted: false
	}

	componentDidMount = async () => {
		const company = await service.getCompany(this.props.match.params.id)
		const linkKeys = Object.keys(company.links)
		this.setState({ company, linkKeys, hasMounted: true })
	}

	render() {
		const { classes, filterLabels } = this.props
		const { company, linkKeys, hasMounted } = this.state

		return (
			<>
				<BackHeader title={hasMounted ? company.name : "Unternehmen"} />

				{hasMounted && (
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
				)}
			</>
		)
	}
}

CompanyDetails.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyDetails)
