import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Icon from "@material-ui/core/Icon"
import Home from "@material-ui/icons/Home"

const styles = (theme) => ({
	icon: {
		marginRight: theme.spacing.unit * 2,
		fontSize: "32px"
	}
})

const Icons = ({ classes, name }) => {
	const icons = {
		homepage: <Home className={classes.icon} />,
		twitter: <Icon className={`fa fa-twitter ${classes.icon}`} />,
		instagram: <Icon className={`fa fa-instagram ${classes.icon}`} />,
		linkedin: <Icon className={`fa fa-linkedin-square ${classes.icon}`} />,
		xing: <Icon className={`fa fa-xing-square ${classes.icon}`} />,
		facebook: <Icon className={`fa fa-facebook-square ${classes.icon}`} />
	}

	return <React.Fragment>{icons[name]}</React.Fragment>
}

Icons.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Icons)
