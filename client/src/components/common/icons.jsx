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
		Homepage: <Home className={classes.icon} />,
		Twitter: <Icon className={`fa fa-twitter ${classes.icon}`} />,
		Instagram: <Icon className={`fa fa-instagram ${classes.icon}`} />,
		LinkedIn: <Icon className={`fa fa-linkedin-square ${classes.icon}`} />,
		Xing: <Icon className={`fa fa-xing-square ${classes.icon}`} />,
		Facebook: <Icon className={`fa fa-facebook-square ${classes.icon}`} />
	}

	return <React.Fragment>{icons[name]}</React.Fragment>
}

Icons.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Icons)
