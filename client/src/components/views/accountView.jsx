import React, { useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"

import RegisterForm from "./../forms2/registerForm"
import CompanyForm from "./../forms2/companyForm"

const styles = (theme) => ({
	card: {
		marginBottom: theme.spacing(2),
		padding: theme.spacing()
	},
	header: {
		paddingBottom: 0
	},
	pos: {
		margin: theme.spacing(2)
	},
	cardAction: {
		justifyContent: "flex-end"
	},
	mainAction: {
		width: "100%"
	}
})

const AccountView = ({ classes, user, company, filterLabels }) => {
	const [userEdit, setUserEdit] = useState(false)
	const [companyEdit, setCompanyEdit] = useState(false)

	const linkKeys = company ? Object.keys(company.links) : []

	return (
		<>
			{user ? (
				<>
					<Card className={classes.card}>
						<CardHeader className={classes.header} title={"Benutzer"} />

						{userEdit ? (
							<RegisterForm user={user} onUpdateUser={() => setUserEdit(false)} />
						) : (
							<>
								<Typography className={classes.pos} color="textPrimary">
									{user.email}
								</Typography>

								<CardActions className={classes.cardAction}>
									<Button
										variant="contained"
										color="primary"
										onClick={() => setUserEdit(true)}
									>
										bearbeiten
									</Button>
								</CardActions>
							</>
						)}
					</Card>

					{!company && !companyEdit && (
						<Button
							color="primary"
							variant="contained"
							className={classes.mainAction}
							onClick={() => setCompanyEdit(true)}
						>
							Unternehmen hinzufügen
						</Button>
					)}

					{!company && companyEdit && (
						<Card className={classes.card}>
							<CardHeader className={classes.header} title={"Unternehmen"} />
							<CompanyForm onSubmit={() => setCompanyEdit(false)} />
						</Card>
					)}

					{company && !companyEdit && (
						<Card className={classes.card}>
							<CardHeader
								className={classes.header}
								title={company.name}
								subheader={company.location}
							/>

							<Typography
								variant="body1"
								color="textPrimary"
								className={classes.body}
							>
								{company.info}
							</Typography>
							<Typography
								variant="body1"
								color="textPrimary"
								className={classes.body}
							>
								{company.description}
							</Typography>

							<div className={classes.items}>
								{linkKeys.map((key) =>
									company.links[key].length === 0 ? null : (
										<Link key={key} href={company.links[key]} target={"_blank"}>
											{company.links[key]}
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

							{user && (
								<CardActions>
									{user.isAdmin && (
										<Button size="small" color="secondary">
											delete
										</Button>
									)}
									<Button size="small" color="primary">
										edit
									</Button>
								</CardActions>
							)}
						</Card>
					)}
				</>
			) : (
				<>
					<div>Account</div>
				</>
			)}
		</>
	)
}

AccountView.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AccountView)
