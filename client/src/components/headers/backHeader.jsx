import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeft from "@material-ui/icons/ChevronLeft"

const styles = (theme) => ({
	root: {
		width: "100%"
	},
	title: {
		display: "block",
		width: "100%"
	},
	backButton: {
		marginRight: theme.spacing(2)
	}
})

const BackHeader = ({ classes, title }) => {
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.backButton}
					color="inherit"
					component={Link}
					to={"/companies"}
				>
					<ChevronLeft />
				</IconButton>
				<Typography className={classes.title} variant="h6" color="inherit" noWrap>
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

BackHeader.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BackHeader)
