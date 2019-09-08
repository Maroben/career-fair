import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import { AppBar, Toolbar, Typography, IconButton, Icon } from "@material-ui/core"

const styles = (theme) => ({
	root: {
		width: "100%"
	},
	title: {
		display: "block",
		width: "100%"
	}
})

const BackHeader = ({ classes, title }) => {
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
				<IconButton edge="start" color="inherit" component={Link} to={"/companies"}>
					<Icon className={"fas fa-chevron-left"} />
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
