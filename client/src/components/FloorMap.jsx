import React, { useState } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import _ from "lodash"
import Building1 from "../maps/building1"

const styles = (theme) => ({
	box: {
		border: "10px solid black",
		margin: "10px",
		padding: "10px"
	}
})

const Building = ({ classes }) => {
	const handleClick = (event) => {
		console.log(event.target.id)
	}

	return (
		<div className={classes.box}>
			<Building1 onClick={handleClick} />
		</div>
	)
}

Building.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Building)
