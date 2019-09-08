import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { Icon, IconButton } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"

const styles = {
	root: {
		width: "100%"
	},
	title: {
		display: "block",
		width: "100%"
	}
}

const SimpleHeader = ({ classes, title, user }) => {
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
				<Typography className={classes.title} variant="h6" color="inherit" noWrap>
					{title}
				</Typography>
				{user && (
					<>
						<IconButton edge="end" color="inherit" component={Link} to={"/logout"}>
							<Icon className={"fas fa-sign-out-alt"} />
						</IconButton>
						<IconButton edge="end" color="inherit" component={Link} to={"/companies"}>
							<HomeIcon />
						</IconButton>
					</>
				)}
			</Toolbar>
		</AppBar>
	)
}

SimpleHeader.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleHeader)
