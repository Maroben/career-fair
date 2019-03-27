import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const styles = {
	root: {
		width: "100%"
	},
	title: {
		display: "block",
		width: "100%"
	}
}

const SimpleHeader = ({ classes, title }) => {
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
				<Typography className={classes.title} variant="h6" color="inherit" noWrap>
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

SimpleHeader.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleHeader)
