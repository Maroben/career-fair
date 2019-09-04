import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import SimpleHeader from "./headers/simpleHeader"

import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		margin: theme.spacing(2)
	},
	message: {
		marginBottom: theme.spacing(2)
	}
})

const NotFound = ({ classes, history }) => {
	const handleBack = () => {
		history.replace("/companies")
	}

	return (
		<React.Fragment>
			<SimpleHeader title={"404 | Not Found"} />

			<Paper className={classes.root}>
				<Typography variant="body1" color="textPrimary" className={classes.message}>
					This resource doesn't exist.
				</Typography>
				<Button variant="contained" color="primary" onClick={handleBack}>
					Go to Home
				</Button>
			</Paper>
		</React.Fragment>
	)
}

NotFound.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotFound)
