import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const styles = (theme) => ({
	root: {
		width: "100%"
	},
	title: {
		display: "block",
		width: "100%"
	}
})

class CompanyHeader extends Component {
	state = {
		isEditing: false,
		user: null,
		label: ""
	}

	componentDidMount = () => {
		let { isEditing, label } = this.props
		if (label.length <= 0) {
			label = "Create Company"
		}
		this.setState({ isEditing, label })
	}

	render() {
		const { label } = this.state
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography className={classes.title} variant="h6" color="inherit" noWrap>
							{label}
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

CompanyHeader.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyHeader)
