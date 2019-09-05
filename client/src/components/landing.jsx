import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import SimpleHeader from "./headers/simpleHeader"
import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"

const styles = (theme) => ({
	description: {
		margin: theme.spacing(2)
	}
})

const Landing = ({ classes }) => {
	return (
		<>
			<SimpleHeader title="HSR Stellenbörse" />
			<Typography variant="h5" align="center" className={classes.description}>
				Wegfinder
			</Typography>
			<Button color="primary" variant="contained">
				Studenten
			</Button>
			<Button color="primary" variant="contained">
				Unternehmen
			</Button>
		</>
	)
}

Landing.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Landing)
