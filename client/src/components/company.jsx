import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import service from "../services/companyService"
import CompanyHeader from "./headers/companyHeader"
import Icons from "./common/icons"
import Typography from "@material-ui/core/Typography"

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		margin: theme.spacing.unit * 2
	},
	container: {
		margin: theme.spacing.unit * 2
	},
	body: {
		marginTop: theme.spacing.unit * 2
	},
	items: {
		display: "flex",
		justifyContent: "start",
		flexWrap: "wrap",
		marginTop: theme.spacing.unit * 2
	},
	item: {
		paddingRight: 8
	},
	icon: {
		margin: theme.spacing.unit * 2
	}
})

class Company extends Component {
	state = {
		company: {
			name: "",
			loc: "",
			info: "",
			description: "",
			categories: [],
			tags: [],
			links: [{ name: "", link: "" }]
		}
	}

	componentDidMount = async () => {
		const { id } = this.props.match.params
		const company = await service.getCompany(id).catch((error) => {
			window.location = "/404/1"
		})
		this.setState({ company })
	}

	render() {
		const { company } = this.state
		const { classes } = this.props

		const items = company.categories.concat(company.tags)

		return (
			<React.Fragment>
				<CompanyHeader label={"Unternehmen"} isEditing={false} />

				<div className={classes.root}>
					<Typography variant="h5">{company.name}</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						{company.loc}
					</Typography>

					<Typography variant="body1" color="textPrimary" className={classes.body}>
						{company.info}
					</Typography>
					<Typography variant="body1" color="textPrimary" className={classes.body}>
						{company.description}
					</Typography>

					{company.links.map((link) => (
						<Icons key={link.name} name={link.name} className={classes.icon} />
					))}

					<div className={classes.items}>
						{items.map((item) => (
							<div key={item} className={classes.item}>
								<Typography color="textSecondary">{item}</Typography>
							</div>
						))}
					</div>
				</div>
			</React.Fragment>
		)
	}
}

Company.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Company)
