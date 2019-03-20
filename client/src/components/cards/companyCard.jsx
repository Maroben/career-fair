import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

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
	items: {
		display: "flex",
		justifyContent: "start",
		flexWrap: "wrap"
	},
	item: {
		paddingRight: 8
	}
}

const CompanyCard = (props) => {
	const { classes, user, company, onDelete } = props
	const items = company.categories.concat(company.tags)

	return (
		<Card className={classes.card}>
			<CardActionArea to={`/companies/${company._id}`} component={Link}>
				<CardHeader
					className={classes.header}
					title={company.name}
					subheader={company.loc}
				/>

				<CardContent>
					<Typography className={classes.pos} color="textPrimary">
						{company.info}
					</Typography>

					<div className={classes.items}>
						{items.map((item) => (
							<div key={item} className={classes.item}>
								<Typography color="textSecondary">{item}</Typography>
							</div>
						))}
					</div>

					{/* <InfoChips items={company.categories.concat(company.tags)} /> */}
				</CardContent>
			</CardActionArea>
			{user && (
				<CardActions>
					<Button size="small" color="secondary" onClick={() => onDelete(company._id)}>
						delete
					</Button>
					<Button
						size="small"
						color="primary"
						component={Link}
						to={`/companies/edit/${company._id}`}
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
