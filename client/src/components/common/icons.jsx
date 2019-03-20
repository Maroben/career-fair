import React from "react"
import Icon from "@material-ui/core/Icon"
import Home from "@material-ui/icons/Home"

const Icons = ({ name }) => {
	const icons = {
		homepage: <Home />,
		twitter: <Icon className="fa fa-twitter" />,
		instagram: <Icon className="fa fa-instagram" />,
		linkedin: <Icon className="fa fa-linkedin-square" />,
		xing: <Icon className="fa fa-xing-square" />,
		facebook: <Icon className="fa fa-facebook-square" />
	}

	return <React.Fragment>{icons[name]}</React.Fragment>
}

export default Icons
