import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import Icon from "@material-ui/core/Icon"
import Home from "@material-ui/icons/Home"

const styles = (theme) => ({
	icon: {
		marginRight: theme.spacing(2),
		fontSize: "32px"
	}
})

const Icons = ({ classes, name }) => {
	const icons = {
		homepage: <Home className={classes.icon} />,
		twitter: <Icon className={`fab fa-twitter ${classes.icon}`} />,
		instagram: <Icon className={`fab fa-instagram ${classes.icon}`} />,
		linkedin: <Icon className={`fab fa-linkedin ${classes.icon}`} />,
		xing: <Icon className={`fab fa-xing ${classes.icon}`} />,
		facebook: <Icon className={`fab fa-facebook ${classes.icon}`} />,
		youtube: <Icon className={`fab fa-youtube-play ${classes.icon}`} />
	}

	return <>{icons[name]}</>
}

Icons.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Icons)
