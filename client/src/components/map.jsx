import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import _ from "lodash"

const styles = (theme) => ({
	box: {
		border: "10px solid black",
		margin: "10px",
		padding: "10px"
	}
})

class Map extends Component {
	handleMouse = (event) => {
		console.log(event.target.id)
	}
	render() {
		const { classes } = this.props

		return (
			<div className={classes.box}>
				<svg
					version="1.1"
					id="Ebene_1"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					viewBox="75 100 1900 1300"
					onClick={(event) => this.handleMouse(event)}
					enableBackground="new 0 0 2000 1308"
				>
					<rect
						id="Umriss"
						x="79"
						y="99"
						fill="#FFFFFF"
						stroke="#1D1D1B"
						strokeWidth="15"
						strokeMiterlimit="10"
						width="1887"
						height="1103"
					/>
					<rect
						id="_x31_001"
						x="142"
						y="158"
						fill="#878787"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="173"
						height="173"
					/>
					<rect
						id="_x31_002"
						x="377"
						y="158"
						fill="#DEDC00"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="180"
						height="180"
					/>
					<rect
						id="_x31_003"
						x="616"
						y="164"
						fill="#1D71B8"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="176"
						height="176"
					/>
					<rect
						id="_x31_004"
						x="870"
						y="153"
						fill="#FFED00"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="202"
						height="202"
					/>
					<rect
						id="_x31_005"
						x="1155"
						y="151"
						fill="#E71D73"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="207"
						height="207"
					/>
					<rect
						id="_x31_006"
						x="1442"
						y="186"
						fill="#BE1622"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="185"
						height="185"
					/>
					<rect
						id="_x31_007"
						x="1753"
						y="208"
						fill="#006633"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="171"
						height="171"
					/>
					<rect
						id="Wand1"
						x="118"
						y="473"
						fill="#1D1D1B"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="1778"
						height="65"
					/>
					<rect
						id="_x31_008"
						x="158"
						y="623"
						fill="#7D4E24"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="135"
						height="130"
					/>
					<rect
						id="Wand2"
						x="379"
						y="566"
						fill="#1D1D1B"
						stroke="#1D1D1B"
						strokeMiterlimit="10"
						width="96"
						height="578"
					/>
				</svg>
			</div>
		)
	}
}

Map.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Map)
