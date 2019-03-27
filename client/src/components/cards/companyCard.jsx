import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import CardActionArea from "@material-ui/core/CardActionArea"

const styles = {
	card: {
		minWidth: 275,
		margin: 16
	},
	header: {
		paddingBottom: 0
	},
	pos: {
		marginBottom: 12
	},
	chips: {
		display: "flex",
		justifyContent: "start",
		flexWrap: "wrap"
	},
	chip: {
		paddingRight: 8
	}
}

const CompanyCard = (props) => {
	const { classes, user, labels, company, onDelete } = props
	const chips = company.categories.concat(company.tags)

	return (
		<Card className={classes.card}>
			<CardActionArea to={`${labels.path}/${company._id}`} component={Link}>
				<CardHeader
					className={classes.header}
					title={company.name}
					subheader={company.loc}
				/>

				<CardContent>
					<Typography className={classes.pos} color="textPrimary">
						{company.info}
					</Typography>

					<div className={classes.chips}>
						{chips.map((chip) => (
							<div key={chip} className={classes.chip}>
								<Typography color="textSecondary">{chip}</Typography>
							</div>
						))}
					</div>
				</CardContent>
			</CardActionArea>

			{user && user.isAdmin && (
				<CardActions>
					<Button size="small" color="secondary" onClick={() => onDelete(company._id)}>
						delete
					</Button>
					<Button
						size="small"
						color="primary"
						component={Link}
						to={`${labels.path}/edit/${company._id}`}
					>
						edit
					</Button>
				</CardActions>
			)}
		</Card>
	)
}

CompanyCard.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyCard)
